class   Input
extends EventTarget
{
    types = []; // an input can accept multiple types


    get data()
    {
        return (
            this.connected
            ? this.connectedOutput.data
            : null);
    }


    _node  = null; get node () { return this._node;  }
    _param = null; get param() { return this._param; }


    get index() { return this.node.inputs.indexOf(this); }

    
    colorLight;
    colorDark;
    wireColor;

    control;
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
                { 'input': this }));
        }

        this._connectedOutput = output;

        if (this._connectedOutput)
        {
            this.dispatchEvent(new CustomEvent(
                'connect', 
                { 
                    'output': output,
                    'input':  this 
                }));
        }
    }


    get connected() { return this.connectedOutput != null; }


    connection   = null;
    
    connecting   = false;
    mouseOver    = false;
    

    initialSeed  = 0;
    currentSeed  = 0;


    isNew        = false; // this indicates that the input is the empty "new" input of a variable node


    onconnect    = new Event('connect');
    ondisconnect = new Event('disconnect');


    getValuesForUndo; // function pointer, return array of [index,value] tuples



    constructor(types, getValuesForUndo = null)
    {
        super();
        
        this.types            = [...types];
        this.getValuesForUndo = getValuesForUndo;

        this.control          = createDiv('input');
        this.hitbox           = createDiv('inputHitbox');
        this.wireBall         = createDiv('inputBall');
        
        this.control.input    = this;
        
        this.colorLight       = [0, 0, 0, 0.12];
        this.colorDark        = [255, 255, 255, 0.12];

        this.wireColor        = rgbFromType(this.types[0], true);

        
        this.control.appendChild(this.hitbox);
        this.control.appendChild(this.wireBall);

                
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
                && this.types.includes(graphView.tempConn.output.type)
                && (  !this.connected
                    || this.connectedOutput != graphView.tempConn.output
                    || this == savedInput))
            {
                const rect = boundingRect(this.control);
                const loop = graphView.tempConn.output.node.follows(this.node);

                if (!loop)
                {
                    graphView.tempConn.wire.inputPos = point(
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
            graphView.tempConn.wire.inputPos = point_NaN;
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
                 && (  !this.types.includes(tc.output.type)
                     || tc.output.node.follows(this.node)));

        const color =
            isDarkMode()
            ? this.colorDark
            : this.colorLight;
                     
        const colorStyle = 
            graphView.showWires
            ? rgba2style(rgb_a(
                color,
                (mouseOver 
                 ? Math.min(color[3] * 1.8, 1) 
                 : color[3])))
            : 'transparent';


        const isConnected =
               this.connected
            ||     tc
               && (   tc.input == this
                   ||    graphView.overInput == this
                      && !tc.input)
               && !(    tc.output
                    && !this.types.includes(tc.output.type));

        this.control.style.transform = 
              'translateX(' + (isConnected ? -1 : 0) + 'px)'
            + 'translateY(-50%)';
        
        this.control.style.width         = (isConnected ? 8 : 6) + 'px';
        this.control.style.height        = (isConnected ? 8 : 6) + 'px';
        this.control.style.borderRadius  = (isConnected ? 4 : 4) + 'px';
        this.control.style.marginBottom  = (isConnected ? 4 : 6) + 'px';
        this.control.style.boxShadow     = '0 0 0 1px ' + colorStyle;
        this.control.style.pointerEvents = graphView.showWires ? 'auto' : 'none';

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
               && this.types.includes(tc.output.type)
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
}