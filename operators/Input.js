class   Input
extends EventTarget
{
    types = []; // an input can accept multiple types


    get data()
    {
        return this.connected
             ? this.connectedOutput.data
             : null;
    }


    _node  = null; get node () { return this._node;  }
    _param = null; get param() { return this._param; }


    get id()    { return this.node.getInputId(this);     }
    get index() { return this.node.inputs.indexOf(this); }

    
    colorLight;
    colorDark;

    wireColor;


    div;
    hitbox;
    wireBall;
  

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


    connection   = null;
    
    connecting   = false;
    mouseOver    = false;
    
    overFactor   = 1.7;
    

    initialSeed  = 0;
    currentSeed  = 0;


    isNew        = false; // this indicates that the input is the empty "new" input of a variable node


    //onconnect    = new Event('connect');
    //ondisconnect = new Event('disconnect');


    getValuesForUndo; // function pointer, return array of [index,value] tuples



    constructor(types, getValuesForUndo = null)
    {
        super();
        
        this.types            = [...types];
        this.getValuesForUndo = getValuesForUndo;

        this.div              = createDiv('input');
        this.hitbox           = createDiv('inputHitbox');
        this.wireBall         = createDiv('inputBall');
        
        this.div.input        = this;
        
        
        this.colorLight       = [0, 0, 0, 1];
        this.colorDark        = [1, 1, 1, 1];

        this.wireColor        = rgbHeaderFromType(this.types[0], true);

        
        this.div.appendChild(this.hitbox);
        this.div.appendChild(this.wireBall);

                
        //this.hitbox.addEventListener('pointerdown', e => e.preventDefault());


        this.hitbox.addEventListener('pointerenter', e => 
        {
            if (graphView.headerInput)
            {
                graphView.headerInput.updateControl();
                graphView.headerInput = null;
            }

            this.mouseOver = true;
            this.updateControl();


            let savedInput = 
                graphView.savedConn
                ? graphView.savedConn.input
                : null;

            if (   graphView.tempConn
                && graphView.tempConn.output
                && this.supports(graphView.tempConn.output.types)
                && (  !this.connected
                    || this.connectedOutput != graphView.tempConn.output
                    || this == savedInput))
            {
                const rect = boundingRect(this.div);
                const loop = graphView.tempConn.output.node.isOrFollows(this.node);

                if (!loop)
                {
                    graphView.tempConn.wire2.inputPos = 
                    graphView.tempConn.wire .inputPos = point(
                        rect.x + rect.w/2,
                        rect.y + rect.h/2 - menuBar.offsetHeight);
                }

                graphView.overInput = !loop ? this : null;
                this.node.inputs.forEach(i => i.updateControl());
            }
            else
                graphView.overInput = this;
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
            graphView.tempConn.wire2.inputPos =
            graphView.tempConn.wire .inputPos = point_NaN;
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
                 && (  !this.supports(tc.output.types)
                     || tc.output.node.isOrFollows(this.node)));

        const color =
            isDarkMode()
            ? this.colorDark
            : this.colorLight;
                     
        const colorStyle = 
            //settings.showWires
            //? 
            rgba2style(rgb_a(
                color,
                mouseOver 
                ? Math.min(color[3] * this.overFactor, 1) 
                : color[3]));
            //: 'transparent';


        const isConnected =
               this.connected
            ||     tc
               && (   tc.input == this
                   ||    graphView.overInput == this
                      && !tc.input)
               && !(    tc.output
                    && !this.supports(tc.output.types));

        this.div.style.transform = 
              'translateX(' + (isConnected ? -1 : 0) + 'px)'
            + 'translateY(-50%)';
        
        this.div.style.width         = (isConnected ? 8 : 6) + 'px';
        this.div.style.height        = (isConnected ? 8 : 6) + 'px';
        this.div.style.borderRadius  = (isConnected ? 4 : 4) + 'px';
        this.div.style.marginBottom  = (isConnected ? 4 : 6) + 'px';
        this.div.style.boxShadow     = '0 0 0 1px ' + colorStyle;
        this.div.style.pointerEvents = 'auto';//settings.showWires ? 'auto' : 'none';

        this.hitbox.style.left   = isConnected ? -2 : -3;
        this.hitbox.style.top    = isConnected ? -2 : -3;

        this.wireBall.style.left = '1px';
        this.wireBall.style.top  = 'calc(50% - 3px)';

        this.wireBall.style.backgroundColor = 
            this.connected
            ? (   graphView.savedConn
               && graphView.savedConn.input == this
               && graphView.overInput != this
               ? 'transparent'
               : rgba2style(toRgba(this.connectedOutput.wireColor)))
            : (   tc
               && tc.output
               && this.supports(tc.output.types)
               && graphView.overInput == this
               ? rgba2style(toRgba(tc.output.wireColor))
               : (   tc
                  && tc.input
                  && tc.input == this)
                  ? (graphView.overOutput
                     ? rgba2style(toRgba(graphView.overOutput.wireColor))
                     : (graphView.headerOutput
                        ? rgba2style(toRgba(graphView.headerOutput.wireColor))
                        : rgba2style(toRgba(tc.input.wireColor))))
                  : colorStyle);

        this.wireBall.style.zIndex = MAX_INT32;


        show(this.wireBall, isConnected); 
    }



    supports(types)
    {
        return arraysIntersect(this.types, types);
    }
}