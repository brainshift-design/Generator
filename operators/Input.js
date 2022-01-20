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

        this.control = document.createElement('div');
        this.control.className = 'input';
        this.control.input = this;
        
        this.color     = colorStyleRgba_(0, 0, 0, 0.14);
        this.wireColor = rgbFromDataType(this._dataType, true);

        this.updateControl();
    
        
        this.control.addEventListener('pointerdown', e => e.preventDefault());


        this.control.addEventListener('pointerenter', e => 
        {
            graphView.overInput = this;
            // this.color = rgbFromDataType(e.target.input.dataType, true);
            // this.updateControl();
        });


        this.control.addEventListener('pointerleave', e => 
        {
            graphView.overInput = null;
            //this.control.style.boxShadow = '0 0 0 1px ' + inputColor;
        });
    }



    // update()
    // {
    //     this.dispatchEvent(this.onupdate);
    // }



    updateControl()
    {
        this.control.style.boxShadow = '0 0 0 1px ' + this.color;
    }
}