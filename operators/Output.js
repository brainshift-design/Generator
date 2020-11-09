class Output
{
    #dataType;

    _op;
    get op() { return this._op; }
    
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

        this.control.addEventListener('pointerenter', e => this.op.graph.overOutput = this);
        this.control.addEventListener('pointerleave', e => this.op.graph.overOutput = null);
    }
    

    get data() 
    {
        if (!this.op.valid)
            this.op.generate();

        return this._data;
    }
}