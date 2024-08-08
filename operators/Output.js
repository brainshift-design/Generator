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

    wireColor;


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
      
        this.wireColor        = rgb_NaN;
        

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


            if (   graphView.tempConn
                && graphView.tempConn.input
                && graphView.tempConn.input.canConnectFrom(this))//this.supportsTypes(graphView.tempConn.input.types))//.includes(this.type))
            {
                const rect = boundingRect(this.div);
                const loop = this.node.isOrFollows(graphView.tempConn.input.node);

                if (!loop)
                {
                    graphView.tempConn.wire.outputPos = point(
                        rect.x + rect.w/2,
                        rect.y + rect.h/2 - getTopHeight());
                }

                graphView.overOutput = !loop ? this : null;
                this.node.outputs.forEach(o => o.updateControl());
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
        const mouseOver =
               this.mouseOver
            && !(   graphView.tempConn
                 && graphView.tempConn.output)
            && !(   graphView.tempConn
                 && graphView.tempConn.input
                 && (  !graphView.tempConn.input.types.includes(this.type)
                     || this.node.isOrFollows(graphView.tempConn.input.node)));


        const color = 
               this.param
            && this.param.type != COLOR_VALUE
            && this.param.type !=  FILL_VALUE
            ? rgb_a(rgbFromType(this.types[0], true), 0.38)
            : (darkMode
               ? this.colorDark
               : this.colorLight);

        const colorStyle = 
            rgba2style(rgb_a(
                color, 
                mouseOver 
                ? Math.min(color[3] * this.overFactor, 1) 
                : color[3]));


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
        this.div.style.backgroundColor = colorStyle;

        this.div.style.boxShadow = 
               !isEmpty(this.connectedInputs)
            ||    graphView.tempConn
               && (   graphView.tempConn.output == this
                   || graphView.overOutput == this)
            ? '0 0 0 1px ' + colorStyle
            : 'none';


        const zoom = graph.currentPage.zoom;

        this.hitbox.style.left  = -3 - Math.max(0, (1 - 1*zoom) * 10);
        this.hitbox.style.width = 12 + Math.max(0, (1 - 1*zoom) * 10);

        this.hitbox.style.top    = -3 - Math.max(0, (1 - 1*zoom) * 10);
        this.hitbox.style.height = 12 + Math.max(0, (1 - 1*zoom) * 20);
        

        this.wireBall.style.top    = '50%';
        this.wireBall.style.zIndex =  MAX_INT32;


        showElement(this.wireBall, isConnected);
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