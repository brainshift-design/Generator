class Output
{
    #dataType;     
    get dataType() { return this.#dataType; }

    _op = null; 
    get op() { return this._op; }
    
    _param = null; 
    get param() { return this._param; }
    
    _data = {};

    control;
    
    connectedInputs = [];
    
    connecting      = false;
    
    get connected() { return this.connectedInputs.length > 0; }


    constructor(dataType)
    {
        this.#dataType = dataType;
        
        this.control = document.createElement('div');
        this.control.className = 'output';
        this.control.output = this;

        this.control.addEventListener('pointerenter', e => 
        {
            graphView.overOutput = this;
            e.target.style.boxShadow = '0 0 0 1px ' + colorFromDataType(e.target.output.dataType, true);
        });

        this.control.addEventListener('pointerleave', e => 
        {
            graphView.overOutput = null;
            e.target.style.boxShadow = '0 0 0 1px ' + IO_COLOR;
        });
    }
    

    get data() 
    {
        if (!this.op.valid)
            this.op.generate();

        return this._data;
    }
}