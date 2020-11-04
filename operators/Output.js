class Output
{
    _op;

    control;

    #dataType;
    _data;
    
    connectedInputs = [];
    
    
    constructor(dataType)
    {
        this.#dataType = dataType;
        
        this.control = document.createElement('div');
        this.control.className = 'output';
    }
    
    get data() 
    {
        return this._op.generate();
    }
}