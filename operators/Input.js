class   Input
extends EventTarget
{
    types = []; // an input can accept multiple types


    _node  = null; get node () { return this._param ? this._param.node : this._node; }
    _param = null; get param() { return this._param; }


    get id()   
    { 
        return this.node
             ? this.node.getInputId(this)
             : this.param
               ? this.param.id
               : '';     
    }
    
    get fullId()   
    { 
        return this.node
             ? this.node.id + '.' + this.node.getInputId(this)
             : this.param
               ? this.node.id + '.' + this.param.id
               : '';     
    }
    

    get index() { return this.node.inputs.indexOf(this); }

    
    colorLight;
    colorDark;

    //wireColor;

    
    div;
    hitbox;
    wireBall;


    measureData = { divBounds: new Rect(0, 0, 0, 0) };


    _connectedOutput = null;
    
    
    get connectedOutput() { return this._connectedOutput; }

    set connectedOutput(output)
    {
        if (this._connectedOutput)
        {
            this                 .dispatchEvent(new CustomEvent('disconnect', { detail: { input:  this   }}));
            this._connectedOutput.dispatchEvent(new CustomEvent('disconnect', { detail: { output: output }}));
        }

        this._connectedOutput = output;

        if (this._connectedOutput)
        {
            this                 .dispatchEvent(new CustomEvent('connect', { detail: { output: output, input: this }}));
            this._connectedOutput.dispatchEvent(new CustomEvent('connect', { detail: { output: output, input: this }}));
        }
    }


    get connected() { return this.connectedOutput != null; }


    canConnect         = true; // all connections master switch for minimum zoom
    canAutoConnect     = true;
    outputMustBeCached = false;


    connection         = null;
           
    connecting         = false;
    mouseOver          = false;

    overFactor         = 1.7;
           
    
    initialSeed        = 0;
    currentSeed        = 0;
       
       
    isNew              = false; // this indicates that the input is the empty "new" input of a variable node


    getValuesForUndo; // function pointer, return array of [index,value] tuples

    getBackInitValue   = null;
    
    feedback           = false; // sends data back to the output



    constructor(types, getValuesForUndo = null, getBackInitValue = null)
    {
        super();
        

        this.types            = [...types];
        this.getValuesForUndo = getValuesForUndo;
        this.getBackInitValue = getBackInitValue;


        this.div              = createDiv('input');
        this.hitbox           = createDiv('inputHitbox');
        this.wireBall         = createDiv('inputBall');
        
        this.div.input        = this;
        
        
        this.div.appendChild(this.hitbox);
        this.div.appendChild(this.wireBall);


                
        this.hitbox.addEventListener('pointerenter', e => 
        {
            if (!this.canReact(e))
                return;


            if (graphView.headerInput)
            {
                graphView.headerInput.updateControl();
                graphView.headerInput = null;
            }

            
            let savedInput = 
                graphView.savedConn
                ? graphView.savedConn.input
                : null;

                
            this.mouseOver = true;
           
            
            const tc = graphView.tempConn;


            if (    tc
                &&  tc.output
                &&  this.canConnectFrom(tc.output)
                && !tc.output.node.isOrFollows(this.node)
                && (  !this.connected
                    || this.connectedOutput != tc.output
                    || this == savedInput))
            {
                graphView.overInput = this;
                if (tc) tc.input    = this;

                tc.wire.inputPos = this.getWirePosition();
                tc.wire.update();

                tc.output.updateControl();
                // this.node.inputs.forEach(i => i.updateControl());
            }
            else if (!tc
                   ||    tc.output
                      && this.canConnectFrom(tc.output))
            {
                graphView.overInput = this;
                if (tc) tc.input = graphView.overInput;
            }


            this.updateControl();
        });

        

        this.hitbox.addEventListener('pointerdown', e => 
        { 
            if (!this.canReact(e)) 
                return false; 
        });



        this.hitbox.addEventListener('pointerleave', e => 
        {
            this.endConnection();
        });
    }



    endConnection()
    {
        const overInput = graphView.overInput;

        const tc = graphView.tempConn;

        graphView.overInput = null;
        if (tc) tc.input = null;

        this.mouseOver = false;
        this.updateControl();
// /        if (graphView.headerInput == overInput)

        if (   graphView.tempConn
            && graphView.tempConn.output)
            graphView.tempConn.wire.inputPos = point_NaN;
    }



    canReact(e)
    {
        if (   settings.enableZoomedOutParams
            || graph.currentPage.zoom > settings.minZoomForParams)
            return true;

        e.preventDefault();
        e.stopPropagation();

        forwardEvent(e, this.node ? this.node.header : this.param.node.header);

        return false;
    }



    isLoop()
    {
        if (   this.param
            && this.param.id == 'loop'
            && (   this.node.type == REPEAT
                || this.node.type == TIMER))
            return true;

        if (  !this.param
            && this.node.type == COMBINE
            && this.node.outputs[0].connectedInputs.find(i => i.isLoop()))
            return true;

        return false;
    }



    updateMeasureData()
    {
        this.measureData = 
        {
            divBounds: boundingRect(this.div)
        };
    }


    
    updateControl()
    {
        const tc = graphView.tempConn;


        const mouseOver =
               this.mouseOver
            && !(   tc 
                 && tc.input)
            && !(   tc
                 && tc.output
                 && (  !this.canConnectFrom(tc.output)
                     || tc.output.node.isOrFollows(this.node)));


        const ballColor = this.getBallColor();
        const ringColor = this.getRingColor();

        const ringStyle = 
            rgba2style(rgb_a(
                ringColor,
                mouseOver 
                ? (tc ? tc.wire.color : Math.min(ringColor[3] * this.overFactor, 1))
                : ringColor[3]));


        const isConnected =
               this.connected
            ||     tc
               && (   tc.input == this
                   ||    graphView.overInput == this
                      && !tc.input)
               && !(    tc.output
                    && !this.canConnectFrom(tc.output));

        this.div.style.transform = 
              'translateX(' + (isConnected ? -1 : 0) + 'px)'
            + 'translateY(-50%)';
        
        this.div.style.width           = (isConnected ? 8 : 6) + 'px';
        this.div.style.height          = (isConnected ? 8 : 6) + 'px';
        this.div.style.borderRadius    = (isConnected ? 4 : 4) + 'px';
        this.div.style.marginBottom    = (isConnected ? 4 : 6) + 'px';
        this.div.style.boxShadow       = '0 0 0 1px ' + ringStyle;
        this.div.style.pointerEvents   = 'auto';
       
        this.hitbox.style.left         = isConnected ? -2 : -3;
        this.hitbox.style.top          = isConnected ? -2 : -3;


        const zoom = graph.currentPage.zoom;

        this.hitbox.style.left         = isConnected ? -2 : -3;
        this.hitbox.style.width        = 12 + Math.max(0, (1 - 1*zoom) * 10);
       
        this.hitbox.style.top          = (isConnected ? -2 : -3) - Math.max(0, (1 - 1*zoom) * 10);
        this.hitbox.style.height       = 12 + Math.max(0, (1 - 1*zoom) * 20);
       
       
        this.wireBall.style.left       = '1px';
        this.wireBall.style.top        = 'calc(50% - 3px)';
           
        this.wireBall.style.zIndex     = MAX_INT32;


        this.wireBall.style.background = rgba2style(ballColor);


        showElement(this.wireBall, isConnected); 
    }



    typeIsColor()
    {
        return this.types[0] == COLOR_VALUE
            || this.types[0] == FILL_VALUE
            || this.types[0] == STROKE_VALUE
            || this.types[0] == COLOR_STOP_VALUE
            || this.types[0] == GRADIENT_VALUE;
    }



    paramTypeIsColor()
    {
        return this.param
            && (   this.param.type == COLOR_VALUE
                || this.param.type == FILL_VALUE);
    }



    getBallColor()
    {
        if (   graphView.savedConn
            && graphView.savedConn.input == this
            && graphView.overInput != this)
            return transparent;

        if (this.connected)
            return this.connectedOutput.getWireColor();

        return this.getRingColor();
    }



    getRingColor()
    {
        return this.param
             ? this.getParamRingColor()
             : this.getHeaderRingColor();
    }



    getParamRingColor()
    {
        const typeColorDark  = rgbFromTypeMode(this.types[0], true, true );
        const typeColorLight = rgbFromTypeMode(this.types[0], true, false);
        
        let ringColor;


        if (darkMode)
        {
            if (   this.typeIsColor()
                && this.paramTypeIsColor())
            {
                ringColor = 
                    isLight(this.node.getInputWireColor())
                    ? [0, 0, 0, 0.25]
                    : [1, 1, 1, 0.25];
            }
            else if (this.types[0] == NUMBER_VALUE       ) ringColor = rgb_a(typeColorDark, 0.65);
            else if (this.types[0] == TEXT_VALUE         ) ringColor = rgb_a(typeColorDark, 0.45);
            else if (SHAPE_VALUES.includes(this.types[0])) ringColor = rgb_a(typeColorDark, 0.6 );
            else                                           ringColor = rgb_a(typeColorDark, 0.63);
        }
        else
        {
            if (   this.typeIsColor()
                && this.paramTypeIsColor())
            {
                ringColor = 
                    isLight(this.node.getInputWireColor())
                    ? [0, 0, 0, 0.2 ]
                    : [1, 1, 1, 0.37];
            }
            else if (this.types[0] == NUMBER_VALUE       ) ringColor = rgb_a(typeColorLight, 0.4);
            else if (this.types[0] == TEXT_VALUE         ) ringColor = rgb_a(typeColorLight, 0.76);
            else if (SHAPE_VALUES.includes(this.types[0])) ringColor = rgb_a(typeColorLight, 0.45);
            else                                           ringColor = rgb_a(typeColorLight, 0.78);
        }


        return ringColor;
    }



    getHeaderRingColor()
    {
        const colors = this.node.getHeaderColors();

        let ringColor;


        if (darkMode)
        {
            if (this.typeIsColor())
            {
                ringColor =
                    rgbIsNaN(colors.back)
                    ? [1, 1, 1, 0.25]
                    : isLight(colors.back)
                      ? [0, 0, 0, 0.25]
                      : [1, 1, 1, 0.25];
            }
            else if (this.types[0] == NUMBER_VALUE       ) ringColor = [1, 1, 1, 0.35];
            else if (this.types[0] == TEXT_VALUE         ) ringColor = [0, 0, 0, 0.28];
            else if (SHAPE_VALUES.includes(this.types[0])) ringColor = [1, 1, 1, 0.4 ];
            else                                           ringColor = [0, 0, 0, 0.28];
        }
        else // light mode
        {
            if (this.typeIsColor())
            {
                ringColor =
                    rgbIsNaN(colors.back)
                    ? [0, 0, 0, 0.22]
                    : isLight(colors.back)
                      ? [0, 0, 0, 0.2 ]
                      : [1, 1, 1, 0.37];
            }
            else if (this.types[0] == NUMBER_VALUE       ) ringColor = [1, 1, 1, 0.5 ];
            else if (this.types[0] == TEXT_VALUE         ) ringColor = [0, 0, 0, 0.23];
            else if (SHAPE_VALUES.includes(this.types[0])) ringColor = [1, 1, 1, 0.4 ];
            else                                           ringColor = [1, 1, 1, 0.4 ];
        }


        return ringColor;
    }



    getWirePosition()
    {
        const inputRect = boundingRect(this.div);

        return point(
            inputRect.x + inputRect.w/2,
            inputRect.y + inputRect.h/2 - getTopHeight());
    }



    getWireColor()
    {
        if (this.param)
            return this.param.getWireColor();

        else
        {
            let color = this.node.getInputWireColor();

            if (rgbIsNaN(color))
                color = rgbFromType(this.types[0], true);

            return color;
        }
    }



    supportsTypes(types)
    {
        return this.types.includes(ANY_VALUE)
             ? true
             : (   arraysIntersect(this.types, types)
                ||    this.param
                   && this.param.listTypes
                   && arraysIntersect(this.param.listTypes, types));
    }



    canConnectFrom(output)
    {
        if (   output.supportsTypes([ANY_VALUE])
            && !this.types.includes(ANY_VALUE))//this.types[0] != ANY_VALUE)
            return false;

        if (   !this.canConnect
            || !this.supportsTypes(output.types))
            return false;

        if (    this.outputMustBeCached 
            && !output.node.isCached())
            return false;

        if (output.node.follows(this.node))
            return false;
        
        if (    this.param
            &&  this.param.id == 'condition'
            &&  this.node.type == SORT
            &&  this.node.follows(output.node)
            && (   !this.connected
                || !this.connectedOutput.isCondition()))
            return false;


        return true;
    }



    // isConnectedUncached()
    // {
    //     return  this.connected 
    //         && !this.connectedOutput.node.isCached()
    //         && !this.connectedOutput.node.isOrPrecededByMultiplier();
    // }



    isUncached(stackOverflowProtect = 100)
    {
        if (stackOverflowProtect <= 0)
            return false;

        if (   this.connectedOutput
            && this.connectedOutput.node)
        {
            const result =
                    this.connectedOutput.param
                && !this.connectedOutput.param.isNodeValue
                ? this.connectedOutput.param.isUnknown(stackOverflowProtect-1)
                : this.connectedOutput.node.isOrPrecededByUncached(stackOverflowProtect-1);

            return result;
        }

        return false;
    }



    toJsDef(gen)
    {
        let js = '';


        js += gen.NL + 'const ' + this.name + ' = ';

        js += 
            this.connected
            ? this.connectedOutput.toJsCode(gen)
            : this.param
                ? this.param.toJsCode(gen)
                : 'Number.NaN';
                
        js += ';';


        return js;
    }
}