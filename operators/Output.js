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


    forceOutputColor = false;




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
        return this.param
             ? this.getParamBallColor()
             : this.getHeaderBallColor();
    }



    getHeaderBallColor()
    {
        const typeColorDark  = rgbFromTypeMode(this.types[0], true, true );
        const typeColorLight = rgbFromTypeMode(this.types[0], true, false);

        const colors       = this.node.getHeaderColors();

        const outColor     = this.node.getHeaderOutputColor();
        const outWireColor = this.node.getOutputWireColor();

        const conn = 
               !this.node.isUnknown()
            && (   this.connected
                ||    graphView.tempConn 
                   && graphView.tempConn.output == this);

        const connOrDiff = 
               conn 
            ||    this.node.outputValueType != NULL
               && this.node.outputValueType != this.types[0]
            || this.node.isUnknown();

        const tc = 
               graphView.tempConn 
            && graphView.tempConn.output == this;


        let ballColor;

        
        if (darkMode)
        {
            if (isColorType(this.types[0]))
            {
                ballColor = 
                       conn
                    || (    this.forceOutputColor
                        && !rgbIsNaN(outWireColor))
                    ? outWireColor
                    : rgbIsNaN(colors.back)
                      ? [1, 1, 1, 0.25]
                      : (   rgbIsNaN(outColor)
                         || rgbIsNaN(outWireColor)
                         || outColor[3] < TRANSPARENT_THRESHOLD_DARK
                         ? [1, 1, 1, 0.35]
                         : (isDark(outWireColor)
                             ? [1, 1, 1, 0.25]
                             : [0, 0, 0, 0.2 ]));
            }
            else if (this.types[0] == NUMBER_VALUE       ) ballColor = connOrDiff ? typeColorDark : (this.node.active ? [1, 1, 1, tc ? 0 : 0.35] : [1, 1, 1, tc ? 0 : 0.35]);
            else if (this.types[0] == TEXT_VALUE         ) ballColor = connOrDiff ? typeColorDark : (this.node.active ? [0, 0, 0, tc ? 0 : 0.25] : [1, 1, 1, tc ? 0 : 0.25]);
            else if (SHAPE_VALUES.includes(this.types[0])) ballColor = connOrDiff ? typeColorDark : (this.node.active ? [1, 1, 1, tc ? 0 : 0.4 ] : [1, 1, 1, tc ? 0 : 0.4 ]);
            else                                           ballColor = connOrDiff ? typeColorDark : (this.node.active ? [0, 0, 0, tc ? 0 : 0.28] : [1, 1, 1, tc ? 0 : 0.28]);
        }
        else // light mode
        {
            if (isColorType(this.types[0]))
            {
                ballColor = 
                       conn 
                    || (    this.forceOutputColor
                        && !rgbIsNaN(outWireColor))
                    ? outWireColor
                    : rgbIsNaN(colors.back)
                      ? [0, 0, 0, 0.22]
                      :    rgbIsNaN(outColor)
                        || rgbIsNaN(outWireColor)
                        || outColor[3] < TRANSPARENT_THRESHOLD_DARK
                        ? [0, 0, 0, 0.2]
                        : (isLight(outWireColor)
                           ? [0, 0, 0, 0.17]
                           : [1, 1, 1, 0.3 ]);
            }
            else if (this.types[0] == NUMBER_VALUE       ) ballColor = connOrDiff ? typeColorLight : (this.node.active ? [1, 1, 1, tc ? 0 : 0.35] : [0, 0, 0, tc ? 0 : 0.2 ]);
            else if (this.types[0] == TEXT_VALUE         ) ballColor = connOrDiff ? typeColorLight : (this.node.active ? [0, 0, 0, tc ? 0 : 0.25] : [0, 0, 0, tc ? 0 : 0.21]);
            else if (SHAPE_VALUES.includes(this.types[0])) ballColor = connOrDiff ? typeColorLight : (this.node.active ? [1, 1, 1, tc ? 0 : 0.4 ] : [0, 0, 0, tc ? 0 : 0.2 ]);
            else                                           ballColor = connOrDiff ? typeColorLight : (this.node.active ? [1, 1, 1, tc ? 0 : 0.28] : [0, 0, 0, tc ? 0 : 0.2 ]);
        }


        return ballColor;
    }



    getParamBallColor()
    {
        const typeColorDark  = rgbFromTypeMode(this.types[0], true, true );
        const typeColorLight = rgbFromTypeMode(this.types[0], true, false);

        const outWireColor = 
            isColorType(this.param.type)
            ? rgb_a(this.param.value.toRgba())
            : rgbFromType(this.param.type, true);


        let color;
        
        switch (this.param.value.type)
        {
            case      COLOR_VALUE: color = rgb_a(this.param.value.toRgb()); break;
            case       FILL_VALUE: color = this.param.value.toRgba();       break;
            case     STROKE_VALUE: color = this.param.value.toRgba();       break;
            case COLOR_STOP_VALUE: color = this.param.value.toRgba();       break;
            case   GRADIENT_VALUE: color = this.param.value.toRgba();       break;
            default:               color = rgbFromType(this.param.type, true); 
        }
        

        const conn = 
               !this.node.isUnknown()
            && (   this.connected
                ||    graphView.tempConn 
                   && graphView.tempConn.output == this);


        let ballColor;


        if (darkMode)
        {
            if (isColorType(this.types[0]))
            {
                ballColor =
                       conn
                    || (    this.forceOutputColor
                        && !rgbIsNaN(outWireColor))
                    ? rgb_a(outWireColor, conn ? 1 : 0.25)
                    : (   rgbIsNaN(color)
                       || color[3] < TRANSPARENT_THRESHOLD_DARK
                       ? [1, 1, 1, 0.35]
                       : (    isLight(color)
                           && !this.param.isUnknown())
                           ? [0, 0, 0, conn ? 0 : 0.2]
                           : [1, 1, 1, conn ? 0 : 0.2]);
            }
            else if (this.types[0] == NUMBER_VALUE       ) ballColor = rgb_a(typeColorDark, conn ? 1 : 0.5 );
            else if (this.types[0] == TEXT_VALUE         ) ballColor = rgb_a(typeColorDark, conn ? 1 : 0.32);
            else if (SHAPE_VALUES.includes(this.types[0])) ballColor = rgb_a(typeColorDark, conn ? 1 : 0.45);
            else                                           ballColor = rgb_a(typeColorDark, conn ? 1 : 0.26);
        }
        else // light mode
        {
            if (isColorType(this.types[0]))
            {
                ballColor = 
                       conn
                    || (    this.forceOutputColor
                        && !rgbIsNaN(outWireColor))
                    ? outWireColor
                    : (   rgbIsNaN(color)
                       || color[3] < TRANSPARENT_THRESHOLD_DARK
                       ? [0, 0, 0, 0.2]
                       : (isLight(color)
                          ? [0, 0, 0, conn ? 0 : 0.2]
                          : [1, 1, 1, conn ? 0 : 0.2]));
            }
            else if (this.types[0] == NUMBER_VALUE       ) ballColor = rgb_a(typeColorLight, conn ? 1 : 0.4 );
            else if (this.types[0] == TEXT_VALUE         ) ballColor = rgb_a(typeColorLight, conn ? 1 : 0.6 );
            else if (SHAPE_VALUES.includes(this.types[0])) ballColor = rgb_a(typeColorLight, conn ? 1 : 0.41);
            else                                           ballColor = rgb_a(typeColorLight, conn ? 1 : 0.32);
        }


        return ballColor;
    }



    getRingStyle()
    {
        const ringColor =
            this.param
            ? this.getParamRingColor()
            : this.getHeaderRingColor();

        return rgba2style(ringColor);
    }



    getHeaderRingColor()
    {
        const colors       = this.node.getHeaderColors();

        const outColor     = this.node.getHeaderOutputColor();
        const outWireColor = this.node.getOutputWireColor();

        const type =
            this.node.outputValueType != NULL
            ? this.node.outputValueType
            : this.types[0];


        let ringColor;
           

        if (darkMode)
        {
            if (isColorType(type))
            {
                ringColor = 
                    rgbIsNaN(colors.back)
                    ? [1, 1, 1, 0.25]
                    : (   rgbIsNaN(outColor)
                       || rgbIsNaN(outWireColor)
                       || outColor[3] < TRANSPARENT_THRESHOLD_DARK
                       ? [1, 1, 1, 0.35]
                         : isLight(outWireColor)
                           ? [0, 0, 0, 0.25]
                           : [1, 1, 1, 0.25]);
            }
            else if (type == NUMBER_VALUE       ) ringColor = this.node.active ? [1, 1, 1, 0.35] : [1, 1, 1, 0.35];
            else if (type == TEXT_VALUE         ) ringColor = this.node.active ? [0, 0, 0, 0.28] : [1, 1, 1, 0.28];
            else if (SHAPE_VALUES.includes(type)) ringColor = this.node.active ? [1, 1, 1, 0.4 ] : [1, 1, 1, 0.4 ];
            else                                  ringColor = this.node.active ? [0, 0, 0, 0.28] : [1, 1, 1, 0.28];
        }
        else // light mode
        {
            if (isColorType(type))
            {
                ringColor = 
                    rgbIsNaN(colors.back)
                    ? [0, 0, 0, 0.22]
                    :    rgbIsNaN(outColor)
                      || rgbIsNaN(outWireColor)
                      || outColor[3] < TRANSPARENT_THRESHOLD_DARK
                      ? [0, 0, 0, 0.2]
                      : isLight(this.node.getOutputWireColor())
                        ? [0, 0, 0, 0.2 ]
                        : [1, 1, 1, 0.37];
            }
            else if (type == NUMBER_VALUE       ) ringColor = this.node.active ? [1, 1, 1, 0.35] : [0, 0, 0, 0.35];
            else if (type == TEXT_VALUE         ) ringColor = this.node.active ? [0, 0, 0, 0.21] : [0, 0, 0, 0.21];
            else if (SHAPE_VALUES.includes(type)) ringColor = this.node.active ? [1, 1, 1, 0.4 ] : [0, 0, 0, 0.2 ];
            else                                  ringColor = this.node.active ? [1, 1, 1, 0.4 ] : [0, 0, 0, 0.2 ];
        }


        return ringColor;
    }



    getParamRingColor()
    {
        const typeColorDark  = rgbFromTypeMode(this.types[0], true, true );
        const typeColorLight = rgbFromTypeMode(this.types[0], true, false);


        let ringColor;


        if (darkMode)
        {
            if (   this.types[0] == COLOR_VALUE
                || this.types[0] == FILL_VALUE)
            {
                const color = 
                    this.types[0] == FILL_VALUE
                    ? this.param.value.color.toRgb()
                    : this.param.value.toRgb();

                ringColor = 
                    isLight(color)
                    ? [0, 0, 0, 0.25]
                    : [1, 1, 1, 0.25];
            }
            else if (this.types[0] == NUMBER_VALUE       ) ringColor = rgb_a(typeColorDark, 0.65);
            else if (this.types[0] == TEXT_VALUE         ) ringColor = rgb_a(typeColorDark, 0.45);
            else if (SHAPE_VALUES.includes(this.types[0])) ringColor = rgb_a(typeColorDark, 0.6 );
            else                                           ringColor = rgb_a(typeColorDark, 0.63);
        }
        else // light mode
        {
            if (   this.types[0] == COLOR_VALUE
                || this.types[0] == FILL_VALUE)
            {
                const color = 
                    this.types[0] == FILL_VALUE
                    ? this.param.value.color.toRgb()
                    : this.param.value.toRgb();

                ringColor = 
                    isLight(color)
                    ? [0, 0, 0, 0.2 ]
                    : [1, 1, 1, 0.37];
            }
            else if (this.types[0] == NUMBER_VALUE       ) ringColor = rgb_a(typeColorLight, 0.45);
            else if (this.types[0] == TEXT_VALUE         ) ringColor = rgb_a(typeColorLight, 0.76);
            else if (SHAPE_VALUES.includes(this.types[0])) ringColor = rgb_a(typeColorLight, 0.45);
            else                                           ringColor = rgb_a(typeColorLight, 0.78);
        }


        return ringColor;
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
            let color = this.node.getOutputWireColor();

            if (rgbIsNaN(color))
                color = rgbFromType(this.types[0], true);

            return color;
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
        if (this.connected)
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
            
            if (input.node.type == LIST)
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