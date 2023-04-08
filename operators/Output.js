class Output
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
    get connected() { return !isEmpty(this.connectedInputs); }


    mouseOver  = false;
    connecting = false;
 
    overFactor = 1.7;
 
 
    genRequest = null; // function pointer, must be implemented
    cache      = [];


    getValuesForUndo; // function pointer, return array of [index,value] tuples

    backInit   = null;




    constructor(types, genRequest, getValuesForUndo = null, backInit = null)
    {
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


            const view = graphView;//this.node.graph.view;


            if (view.headerOutput)
            {
                view.headerOutput.updateControl();
                view.headerOutput = null;
            }


            this.mouseOver = true;
            this.updateControl();


            if (   view.tempConn
                && view.tempConn.input
                && view.tempConn.input.types.includes(this.type))
            {
                const rect = boundingRect(this.div);
                const loop = this.node.isOrFollows(view.tempConn.input.node);

                if (!loop)
                {
                    view.tempConn.wire.outputPos = point(
                        rect.x + rect.w/2,
                        rect.y + rect.h/2 - menuBarHeight);
                }

                view.overOutput = !loop ? this : null;
                this.node.outputs.forEach(o => o.updateControl());
            }
            else
            view.overOutput = this; 
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
        const view = graphView;//this.node.graph.view;


        view.overOutput = null; 

        this.mouseOver = false;
        this.updateControl();

        if (   view.tempConn
            && view.tempConn.input)
            view.tempConn.wire.outputPos = point_NaN;
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
        const view = graphView;//this.node.graph.view
        
        if (   settings.enableZoomedOutParams
            || view.zoom > settings.minZoomForParams)
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
        const view = graphView;//this.node.graph.view;


        const mouseOver =
               this.mouseOver
            && !(   view.tempConn
                 && view.tempConn.output)
            && !(   view.tempConn
                 && view.tempConn.input
                 && (  !view.tempConn.input.types.includes(this.type)
                     || this.node.isOrFollows(view.tempConn.input.node)));


        const color = 
               this.param
            && this.param.type != COLOR_VALUE
            && this.param.type !=  FILL_VALUE
            ? rgb_a(rgbFromType(this.param.type, true), 0.38)
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
            ||     view.tempConn
               && (   view.tempConn.output == this
                   ||     view.overOutput == this
                      && !view.tempConn.output)
               && !(    view.tempConn.input
                    && !view.tempConn.input.types.includes(this.type));

        this.div.style.transform = 
              'translateX(' + (isConnected ? -1 : 0) + 'px)'
            + 'translateY(-50%)';

        this.div.style.pointerEvents   = 'auto';
        this.div.style.backgroundColor = colorStyle;

        this.div.style.boxShadow = 
               !isEmpty(this.connectedInputs)
            ||    view.tempConn
               && (   view.tempConn.output == this
                   || view.overOutput == this)
            ? '0 0 0 1px ' + colorStyle
            : 'none';


        this.wireBall.style.zIndex = MAX_INT32;


        showElement(this.wireBall, isConnected);
    }



    supportsTypes(types)
    {
        return arraysIntersect(this.types, types);
    }



    canConnectTo(input)
    {
        return arraysIntersect(this.types, input.types);
    }



    isMultiplied()
    {
        if (this.connectedInputs.length > 1)
            return true;

        for (const input of this.connectedInputs)
        {
            if (isMultiplier(input.node))
                return true;

            else if (input.node.hasMultipliedOutputs())
                return true;
        }

        return false
    }



    toJsCode(gen)
    {
        return this.param
             ? this.param.toJsCode(gen)
             : this.node .toJsCode(gen);
    }
}