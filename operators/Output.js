class Output
extends EventTarget
{
    types = []; // an output can have multiple types

    
    _node  = null; get node () { return this._param && this._param.node ? this._param.node : this._node; }
    _param = null; get param() { return this._param; }
    
    
    get id()    
    { 
        return this.node 
             ? this.node.getOutputId(this) 
             : this.param
               ? this.param.id
               : ''; 
    }

    get fullId()   
    { 
        return this.node
             ? this.node.id + '.' + this.node.getOutputId(this)
             : this.param
               ? this.node.id + '.' + this.param.id
               : '';     
    }


    get index() { return this.node ? this.node.outputs.indexOf(this) : ''; }


    colorLight;
    colorDark;

    //wireColor;


    div;
    hitbox;
    wireBall;


    measureData = { divBounds: new Rect(0, 0, 0, 0) };


    connectedInputs = [];

    get connectedHeaderInputs() { return this.connectedInputs.filter(i => !i.param); }
    get connected()             { return !isEmpty(this.connectedInputs); }

    
    get connections()           { return this.connectedInputs.map(i => i.connection); }


    mouseOver  = false;
    connecting = false;
 
    overFactor = 1.7;
 
 
    genRequest = null; // function pointer, must be implemented
    cache      = [];


    getValuesForUndo; // function pointer, return array of [index,value] tuples

    backInit   = null;




    constructor(types, genRequest, getValuesForUndo = null, backInit = null)
    {
        super();

        
        this.types            = [...types];
        this.genRequest       = genRequest;
        this.getValuesForUndo = getValuesForUndo;
        this.backInit         = backInit;

        
        this.div              = createDiv('output');
        this.hitbox           = createDiv('outputHitbox');
        this.wireBall         = createDiv('outputBall');
              
        this.div.output       = this;
              
              
        this.colorLight       = [0, 0, 0, 1];
        this.colorDark        = [1, 1, 1, 1];
      
        //this.wireColor        = rgb_NaN;
        

        this.div.appendChild(this.hitbox);
        this.div.appendChild(this.wireBall);



        this.hitbox.addEventListener('pointerenter', e => 
        { 
            if (!this.canReact(e))
                return false;


            if (graphView.headerOutput)
            {
                graphView.headerOutput.updateControl();
                graphView.headerOutput = null;
                //console.log('headerOutput = ', graphView.headerOutput);
            }


            this.mouseOver = true;
            this.updateControl();


            const tc = graphView.tempConn;


            if (    tc
                &&  tc.input
                &&  tc.input.canConnectFrom(this)
                && !this.node.isOrFollows(tc.input.node))//this.supportsTypes(graphView.tempConn.input.types))//.includes(this.type))
            {
                graphView.overOutput = this;
                tc.output            = this;

                tc.wire.outputPos = this.getWirePosition();

                tc.input.updateControl();
                // this.node.outputs.forEach(o => o.updateControl());
            }
            else
                graphView.overOutput = this; 
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
        graphView.overOutput = null; 

        this.mouseOver = false;
        this.updateControl();

        if (   graphView.tempConn
            && graphView.tempConn.input)
            graphView.tempConn.wire.outputPos = point_NaN;
    }



    updateSavedConnectionOrder(orderAfter, delta)
    {
        // update output order on existing connections created after this one
        
        const afterConns = this.connectedInputs
            .map   (i => i.connection)
            .filter(c => delta < 1 
                         ? (c.outputOrder >  orderAfter) 
                         : (c.outputOrder >= orderAfter));

        const oldKeys = afterConns.map(c => getConnKey(c));
        afterConns.forEach(c => c.outputOrder += delta);
        
        const newKeys = afterConns.map(c => getConnKey(c));

        uiUpdateSavedConnections(oldKeys, newKeys, afterConns);
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



    updateMeasureData()
    {
        this.measureData = 
        {
            divBounds: clientRect(this.div)
        };
    }


    
    updateControl()
    {
        const tc = graphView.tempConn;


        const mouseOver =
               this.mouseOver
            && !(   graphView.tempConn
                 && graphView.tempConn.output)
            && !(   graphView.tempConn
                 && graphView.tempConn.input
                 && (  !graphView.tempConn.input.types.includes(this.type)
                     || this.node.isOrFollows(graphView.tempConn.input.node)));


        const ballColor = this.getBallColor();
        const ringStyle = this.getRingStyle();

        const ballStyle = 
            rgba2style(rgb_a(
                ballColor, 
                mouseOver 
                ? Math.min(ballColor[3] * this.overFactor, 1) 
                : ballColor[3]));


        const isConnected =
               !isEmpty(this.connectedInputs)
            ||     graphView.tempConn
               && (   graphView.tempConn.output == this
                   ||     graphView.overOutput == this
                      && !graphView.tempConn.output)
               && !(    graphView.tempConn.input
                    && !graphView.tempConn.input.types.includes(this.type));

        this.div.style.transform = 
            //  'translateX(' + (isConnected ? -1 : 0) + 'px)'
            //+ 
            'translateY(-50%)';

        this.div.style.pointerEvents   = 'auto';
        this.div.style.backgroundColor = ballStyle;

        this.div.style.boxShadow =
               !isEmpty(this.connectedInputs)
            ||    graphView.tempConn
               && (   graphView.tempConn.output == this
                   || graphView.overOutput == this)
            ? '0 0 0 1px ' + ringStyle
            : 'none';


        const zoom = graph.currentPage.zoom;

        this.hitbox.style.left  = -3 - Math.max(0, (1 - 1*zoom) * 10);
        this.hitbox.style.width = 12 + Math.max(0, (1 - 1*zoom) * 10);

        this.hitbox.style.top    = -3 - Math.max(0, (1 - 1*zoom) * 10);
        this.hitbox.style.height = 12 + Math.max(0, (1 - 1*zoom) * 20);
        

        this.wireBall.style.top    = '50%';
        this.wireBall.style.zIndex =  MAX_INT32;


        this.wireBall.style.background = rgba2style(ballColor);


        showElement(this.wireBall, isConnected);
    }



    getBallColor()
    {
        let ballColor = 
            darkMode
            ? [1, 1, 1, 1]
            : [0, 0, 0, 1];

        const tc = 
               graphView.tempConn 
            && graphView.tempConn.output == this;
            
        const conn = this.connection;


        const typeColorDark  = rgbFromType(this.types[0], true, true );
        const typeColorLight = rgbFromType(this.types[0], true, false);


        if (this.param)
        {
            if (darkMode)
            {
                if (this.types[0] == COLOR_VALUE)
                {
                    ballColor = 
                        isLight(this.param.value.toRgb())
                        ? [0, 0, 0, 0.2]
                        : [1, 1, 1, 0.2];
                }
                else if (this.types[0] == NUMBER_VALUE       ) ballColor = rgb_a(typeColorDark, tc ? 1 : 0.5 );
                else if (this.types[0] == TEXT_VALUE         ) ballColor = rgb_a(typeColorDark, tc ? 1 : 0.32);
                else if (SHAPE_VALUES.includes(this.types[0])) ballColor = rgb_a(typeColorDark, tc ? 1 : 0.45);
                else                                           ballColor = rgb_a(typeColorDark, tc ? 1 : 0.26);
            }
            else // light mode
            {
                if (this.types[0] == COLOR_VALUE)
                {
                    ballColor = 
                        isLight(this.param.value.toRgb())
                        ? [0, 0, 0, 0.2]
                        : [1, 1, 1, 0.2];
                }
                else if (this.types[0] == NUMBER_VALUE       ) ballColor = rgb_a(typeColorLight, tc ? 1 : 0.4 );
                else if (this.types[0] == TEXT_VALUE         ) ballColor = rgb_a(typeColorLight, tc ? 1 : 0.6 );
                else if (SHAPE_VALUES.includes(this.types[0])) ballColor = rgb_a(typeColorLight, tc ? 1 : 0.41);
                else                                           ballColor = rgb_a(typeColorLight, tc ? 1 : 0.32);
            }
        }

        else // header
        {
            if (darkMode)
            {
                if (this.types[0] == COLOR_VALUE)
                {
                    ballColor = 
                        isLight(this.node.getOutputWireColor())
                        ? [0, 0, 0, 0.2 ]
                        : [1, 1, 1, 0.25];
                }
                else if (this.types[0] == NUMBER_VALUE       ) ballColor = conn ? typeColorDark : [1, 1, 1, tc ? 0 : 0.35];
                else if (this.types[0] == TEXT_VALUE         ) ballColor = conn ? typeColorDark : [0, 0, 0, tc ? 0 : 0.25];
                else if (SHAPE_VALUES.includes(this.types[0])) ballColor = conn ? typeColorDark : [1, 1, 1, tc ? 0 : 0.4 ];
                else                                           ballColor = conn ? typeColorDark : [0, 0, 0, tc ? 0 : 0.28];
            }
            else // light mode
            {
                if (this.types[0] == COLOR_VALUE)
                {
                    ballColor = 
                        isLight(this.node.getOutputWireColor())
                        ? [0, 0, 0, 0.17]
                        : [1, 1, 1, 0.3 ];
                }
                else if (this.types[0] == NUMBER_VALUE       ) ballColor = conn ? typeColorLight : [1, 1, 1, tc ? 0 : 0.4 ];
                else if (this.types[0] == TEXT_VALUE         ) ballColor = conn ? typeColorLight : [0, 0, 0, tc ? 0 : 0.21];
                else if (SHAPE_VALUES.includes(this.types[0])) ballColor = conn ? typeColorLight : [1, 1, 1, tc ? 0 : 0.4 ];
                else                                           ballColor = conn ? typeColorLight : [1, 1, 1, tc ? 0 : 0.4 ];
            }
        }


        return ballColor;
    }



    getRingStyle()
    {
        let ringColor = [1, 0, 1, 1];

        const typeColorDark  = rgbFromType(this.types[0], true, true );
        const typeColorLight = rgbFromType(this.types[0], true, false);


        if (this.param)
        {
            // ringColor = this.getBallColor();
            if (darkMode)
            {
                     if (this.types[0] == NUMBER_VALUE       ) ringColor = rgb_a(typeColorDark, 0.65);
                else if (this.types[0] == TEXT_VALUE         ) ringColor = rgb_a(typeColorDark, 0.45);
                else if (SHAPE_VALUES.includes(this.types[0])) ringColor = rgb_a(typeColorDark, 0.6 );
                else                                           ringColor = rgb_a(typeColorDark, 0.63);
            }
            else // light mode
            {
                     if (this.types[0] == NUMBER_VALUE       ) ringColor = rgb_a(typeColorLight, 0.45);
                else if (this.types[0] == TEXT_VALUE         ) ringColor = rgb_a(typeColorLight, 0.76);
                else if (SHAPE_VALUES.includes(this.types[0])) ringColor = rgb_a(typeColorLight, 0.45);
                else                                           ringColor = rgb_a(typeColorLight, 0.78);
            }
        }

        else // header
        {
            if (darkMode)
            {
                if (this.types[0] == COLOR_VALUE)
                {
                    ringColor = 
                        isLight(this.node.getInputWireColor())
                        ? [0, 0, 0, 0.25]
                        : [1, 1, 1, 0.25];
                }
                else 
                     if (this.types[0] == NUMBER_VALUE       ) ringColor = [1, 1, 1, 0.35];
                else if (this.types[0] == TEXT_VALUE         ) ringColor = [0, 0, 0, 0.28];
                else if (SHAPE_VALUES.includes(this.types[0])) ringColor = [1, 1, 1, 0.4 ];
                else                                           ringColor = [0, 0, 0, 0.28];
            }
            else // light mode
            {
                if (this.types[0] == COLOR_VALUE)
                {
                    ringColor = 
                        isLight(this.node.getInputWireColor())
                        ? [0, 0, 0, 0.2 ]
                        : [1, 1, 1, 0.37];
                }
                else if (this.types[0] == NUMBER_VALUE       ) ringColor = [1, 1, 1, 0.35];
                else if (this.types[0] == TEXT_VALUE         ) ringColor = [0, 0, 0, 0.21];
                else if (SHAPE_VALUES.includes(this.types[0])) ringColor = [1, 1, 1, 0.4 ];
                else                                           ringColor = [1, 1, 1, 0.4 ];
            }
        }


        return rgba2style(ringColor);
    }



    getWirePosition()
    {
        const rect = boundingRect(this.div);

        return point(
            rect.x + rect.w/2,
            rect.y + rect.h/2 - getTopHeight());
    }



    getWireColor()
    {
        if (this.param)
            return this.param.getWireColor();

        else
        {
            const color = this.node.getOutputWireColor();

            return !rgbIsNaN(color)
                ? color
                : rgbFromType(this.types[0], true);
        }
    }



    supportsTypes(types)
    {
        return this.types.includes(ANY_VALUE)
             ? true
             : arraysIntersect(this.types, types);
    }



    // canConnectTo(input)
    // {
    //     // console.log('this.supportsTypes([ANY_VALUE] =', this.supportsTypes([ANY_VALUE]));

    //     if (this.supportsTypes([ANY_VALUE]))
    //         return true;

    //     return arraysIntersect(this.types, input.types);
    // }



    isMultiplied()
    {
        if (this.connectedInputs.length > 1)
            return true;

        for (const input of this.connectedInputs)
        {
            if (input.node.isMultiplier)
                return true;

            else if (input.node.hasMultipliedOutputs())
                return true;
        }

        return false
    }



    isFollowedByRepeat()
    {
        for (const input of this.connectedInputs)
        {
            if (input.node.isOrFollowedByRepeat())
                return true;
        }

        return false;
    }



    isLooped()
    {
        for (const input of this.connectedInputs)
        {
            if (   input.node.type == REPEAT
                && input.param.id == 'loop')
                return true;

            // for (const out of input.node.headerOutputs)
            //     if (out.isLooped())
            //         return true;
            
            if (input.node.type == COMBINE)
                return input.node.outputs[0].isLooped();
        }

        return false;
    }



    isCondition()
    {
        return this.connectedInputs.find(i =>
        {
            if (   i.param
                && i.param.id == 'condition'
                && (   i.node.type == SORT
                    || i.node.type == FILTER))
                return true;

            for (const output of i.node.outputs)
                if (output.isCondition())
                    return true;

            return false;
        }) != null;
    }



    toJsCode(gen)
    {
        return this.param
             ? this.param.toJsCode(gen)
             : this.node .toJsCode(gen);
    }
}