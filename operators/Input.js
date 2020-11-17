class Input
{
    #dataType;     
    get dataType() { return this.#dataType; }

    get data()
    {
        return (
            this.connected
            ? this.connectedOutput.data
            : null);
    }


    _op    = null; get op   () { return this._op;    }
    _param = null; get param() { return this._param; }

    control;
  
    connectedOutput = null;
    connection      = null;
    
    connecting      = false;
    
    initialSeed     = 0;
    currentSeed     = 0;

    get connected() { return this.connectedOutput != null; }


    constructor(dataType)
    {
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
            e.target.style.boxShadow = '0 0 0 1px ' + IO_COLOR;
        });
    }    
}