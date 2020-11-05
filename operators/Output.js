class Output
{
    _op;
    #dataType;
    
    _data;

    control;
    
    connectedInputs = [];
    
    connecting      = false;
    
    get connected() { return this.connectedInputs.length > 0; }


    constructor(dataType)
    {
        this.#dataType = dataType;
        
        this.control = document.createElement('div');
        this.control.className = 'output';

        this.control.addEventListener('pointerenter', e => this._op.graph.overOutput = this);
        this.control.addEventListener('pointerleave', e => this._op.graph.overOutput = null);
    }
    

    get data() 
    {
        return this._op.generate();
    }
}