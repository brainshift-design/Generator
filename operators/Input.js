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

    
    color;
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


    connection = null;
    
    connecting = false;
    mouseOver  = false;
    

    initialSeed = 0;
    currentSeed = 0;

    get isConnected() { return this.connectedOutput != null; }


    isNew      = false; // this indicates that the input is the empty "new" input of a variable node


    onconnect    = new Event('connect');
    ondisconnect = new Event('disconnect');



    constructor(types)
    {
        super();
        
        this.types = [...types];

        this.control  = createDiv('input');
        this.hitbox   = createDiv('inputHitbox');
        this.wireBall = createDiv('inputBall');
        
        this.control.input = this;
        

        this.control.appendChild(this.hitbox);
        this.control.appendChild(this.wireBall);

        this.color     = [0, 0, 0, 0.12];
        this.wireColor = dataType2rgb(this.type, true);

        
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
                && graphView.tempConn.output.type == this.type
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
                        rect.y + rect.h/2 - controlBar.offsetHeight);
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
                 && (   tc.output.type != this.type
                     || tc.output.node.follows(this.node)));

        const colorStyle = 
            graphView.showWires
            ? colorStyleRgba(rgb_a(
                this.color, 
                mouseOver 
                ? Math.min(this.color[3] * 1.8, 1) 
                : this.color[3]))
            : 'transparent';


        const isConnected =
               this.connected
            ||     tc
               && (   tc.input == this
                   ||    graphView.overInput == this
                      && !tc.input)
               && !(   tc.output
                    && tc.output.type != this.type);

        this.control.style.transform = 
              'translateX(' + (isConnected ? -1 : 0) + 'px)'
            + 'translateY(-50%)';
        
        this.control.style.width         = (isConnected ? 8 : 6) + 'px';
        this.control.style.height        = (isConnected ? 8 : 6) + 'px';
        this.control.style.borderRadius  = (isConnected ? 4 : 4) + 'px';
        this.control.style.marginBottom  = (isConnected ? 4 : 6) + 'px';
        this.control.style.boxShadow     = '0 0 0 1px ' + colorStyle;
        this.control.style.pointerEvents = graphView.showWires ? 'auto' : 'none';

        this.hitbox.style.left = isConnected ? -2 : -3;
        this.hitbox.style.top  = isConnected ? -2 : -3;

        this.wireBall.style.backgroundColor = 
            this.connected
            ? (   graphView.savedConn
               && graphView.savedConn.input == this
               && graphView.overInput != this
               ? 'transparent'
               : colorStyleRgba(toRgba(this.connectedOutput.wireColor)))
            : (   tc
               && tc.output
               && tc.output.type == this.type
               && graphView.overInput == this
               ? colorStyleRgba(toRgba(tc.output.wireColor))
               : (   tc
                  && tc.input
                  && tc.input == this)
                  ? (graphView.overOutput
                     ? colorStyleRgba(toRgba(graphView.overOutput.wireColor))
                     : (graphView.headerOutput
                        ? colorStyleRgba(toRgba(graphView.headerOutput.wireColor))
                        : colorStyleRgba(toRgba(tc.input.wireColor))))
                  : colorStyle);

        this.wireBall.style.zIndex = MAX_INT32;
        this.wireBall.style.left   = '1px';
        this.wireBall.style.top    = 'calc(50% - 3px)';


        show(this.wireBall, isConnected); 
    }
}