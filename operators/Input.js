class   Input
extends EventTarget
{
    _dataType;     
    get dataType() { return this._dataType; }

    get data()
    {
        return (
            this.isConnected
            ? this.connectedOutput.data
            : null);
    }


    _op    = null; get op   () { return this._op;    }
    _param = null; get param() { return this._param; }

    
    color;
    wireColor;

    control;
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


    connection  = null;
    
    connecting  = false;
    mouseOver   = false;
    

    initialSeed = 0;
    currentSeed = 0;

    get isConnected() { return this.connectedOutput != null; }


    //onupdate     = new Event('update');

    onconnect    = new Event('connect');
    ondisconnect = new Event('disconnect');



    constructor(dataType)
    {
        super();
        
        this._dataType = dataType;

        this.control  = createDiv('input');
        this.wireBall = createDiv('inputBall');
        
        this.control.input = this;
        

        this.control.appendChild(this.wireBall);

        this.color     = [0, 0, 0, 0.2];
        this.wireColor = rgbFromDataType(this._dataType, true);

        
        this.control.addEventListener('pointerdown', e => e.preventDefault());


        this.control.addEventListener('pointerenter', e => 
        {
            graphView.overInput = this;

            this.mouseOver = true;
            this.updateControl();
        });


        this.control.addEventListener('pointerleave', e => 
        {
            graphView.overInput = null;

            this.mouseOver = false;
            this.updateControl();
        });
    }



    // update()
    // {
    //     this.dispatchEvent(this.onupdate);
    // }



    updateControl()
    {
        const colorStyle = colorStyleRgba(rgb_a(this.color, this.mouseOver ? 0.4 : 0.2));

        this.control.style.boxShadow = '0 0 0 1px ' + colorStyle;

        this.wireBall.style.backgroundColor = 
            this.isConnected
            ? colorStyleRgba(toRgba(this.connectedOutput.wireColor))
            : (   graphView.tempConn
               && graphView.tempConn.output
               && graphView.overInput == this
               ? colorStyleRgba(toRgba(graphView.tempConn.output.wireColor))
               : colorStyle);

        this.wireBall.style.zIndex = MAX_INT32;

        show(
            this.wireBall, 
               this.isConnected
            ||    graphView.tempConn
               && (   graphView.tempConn.input == this
                   || this.mouseOver));

    }
}