class Output
{
    _op;

    control;

    #dataType;
    _data;
    
    
    connectedInputs = [];
    connections     = [];
    
    get connected() { return this.connectedInputs.length > 0; }


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