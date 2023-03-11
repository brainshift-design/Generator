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
    
    get index() { return this.node.inputs.indexOf(this); }

    
    colorLight;
    colorDark;

    wireColor;

    
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
            this.dispatchEvent(new CustomEvent(
                'disconnect', 
                { detail: { input: this }}));
        }

        this._connectedOutput = output;

        if (this._connectedOutput)
        {
            this.dispatchEvent(new CustomEvent(
                'connect', 
                { detail: {
                    output: output,
                    input:  this 
                }}));
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
        
        
        this.colorLight       = [0, 0, 0, 1];
        this.colorDark        = [1, 1, 1, 1];

        this.wireColor        = rgbHeaderFromType(this.types[0], true);

        
        this.div.appendChild(this.hitbox);
        this.div.appendChild(this.wireBall);

                
        this.hitbox.addEventListener('pointerenter', e => 
        {
            if (!this.canReact(e))
                return;


            if (graphView.headerInput)
            {
                graphView.headerInputs.updateControl();
                graphView.headerInput = null;
            }

            
            let savedInput = 
                graphView.savedConn
                ? graphView.savedConn.input
                : null;

                
            const tc = graphView.tempConn;

            if (   tc
                && tc.output
                && this.canConnectFrom(tc.output)
                && (  !this.connected
                    || this.connectedOutput != tc.output
                    || this == savedInput))
            {
                const rect = boundingRect(this.div);
                const loop = tc.output.node.isOrFollows(this.node);

                if (!loop)
                {
                    tc.wire.inputPos = point(
                        rect.x + rect.w/2,
                        rect.y + rect.h/2 - menuBarHeight);
                }

                this.mouseOver = true;
                this.updateControl();

                graphView.overInput = !loop ? this : null;
                this.node.inputs.forEach(i => i.updateControl());
            }
            else if (!tc
                   ||    tc.output
                      && this.canConnectFrom(tc.output))
                graphView.overInput = this;
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
        graphView.overInput = null;

        this.mouseOver = false;
        this.updateControl();

        if (   graphView.tempConn
            && graphView.tempConn.output)
            graphView.tempConn.wire.inputPos = point_NaN;
    }



    canReact(e)
    {
        if (   settings.enableZoomedOutParams
            || graphView.zoom > settings.minZoomForParams)
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

        const color =
            darkMode
            ? this.colorDark
            : this.colorLight;
                     
        const colorStyle = 
            rgba2style(rgb_a(
                color,
                mouseOver 
                ? Math.min(color[3] * this.overFactor, 1) 
                : color[3]));


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
        
        this.div.style.width         = (isConnected ? 8 : 6) + 'px';
        this.div.style.height        = (isConnected ? 8 : 6) + 'px';
        this.div.style.borderRadius  = (isConnected ? 4 : 4) + 'px';
        this.div.style.marginBottom  = (isConnected ? 4 : 6) + 'px';
        this.div.style.boxShadow     = '0 0 0 1px ' + colorStyle;
        this.div.style.pointerEvents = 'auto';

        this.hitbox.style.left   = isConnected ? -2 : -3;
        this.hitbox.style.top    = isConnected ? -2 : -3;

        this.wireBall.style.left = '1px';
        this.wireBall.style.top  = 'calc(50% - 3px)';

        this.wireBall.style.backgroundColor = [255, 0, 255];

        this.wireBall.style.zIndex = MAX_INT32;


        showElement(this.wireBall, isConnected); 
    }



    supportsTypes(types)
    {
        return arraysIntersect(this.types, types);
    }



    canConnectFrom(output)
    {
        if (   !this.canConnect
            || !this.supportsTypes(output.types))
            return false;

        if (    this.outputMustBeCached 
            && !output.node.isCached())
            return false;

        return true;
    }



    isConnectedUncached()
    {
        return  this.connected 
            && !this.connectedOutput.node.isCached();
    }
}