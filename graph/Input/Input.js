class   Input
extends EventTarget
{
    #dataType;     
    get dataType() { return this.#dataType; }

    get data()
    {
        return (
            this.isConnected
            ? this.connectedOutput.data
            : null);
    }


    _op    = null; get op   () { return this._op;    }
    _param = null; get param() { return this._param; }

    
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


    connection   = null;
    
    connecting   = false;
    
    initialSeed  = 0;
    currentSeed  = 0;

    get isConnected() { return this.connectedOutput != null; }


    //onupdate     = new Event('update');

    onconnect    = new Event('connect');
    ondisconnect = new Event('disconnect');



    constructor(dataType)
    {
        super();
        
        this.#dataType = dataType;

        this.control = document.createElement('div');
        this.control.className = 'input';
        this.control.input = this;
    
        
        this.control.addEventListener('pointerdown', e => e.preventDefault());


        this.control.addEventListener('pointerenter', e => 
        {
            graphView.overInput = this;
            e.target.style.boxShadow = '0 0 0 1px ' + colorFromDataType(e.target.input.dataType, true);
        });


        this.control.addEventListener('pointerleave', e => 
        {
            graphView.overInput = null;
            e.target.style.boxShadow = '0 0 0 1px ' + inputColor;
        });
    }



    // update()
    // {
    //     this.dispatchEvent(this.onupdate);
    // }



    save()
    {
        let save = this.op.name;

        if (this.op.param != null)
            save += '.' + this.op.param.name;

        return save;
    }
}