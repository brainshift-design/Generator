class   GOutput
extends EventTarget
{
    #dataType;     
    get dataType() { return this.#dataType; }
    
    _data = []; // output cache

    
    _op    = null; get op   () { return this._op;    }
    _param = null; get param() { return this._param; }

    
    connectedInputs = [];
    
    connecting      = false;
    
    get connected() { return this.connectedInputs.length > 0; }

    
    onconnect    = new Event('connect');
    ondisconnect = new Event('disconnect');


    constructor(dataType)
    {
        super();
        this.#dataType = dataType;
    }
    

    getData(callerInput = null) 
    {
        if (!this.op.valid)
            this.op.generate(callerInput);

        return this._data;
    }


    connect(input)
    {
        this.connectedInputs.push(input);

        this.dispatchEvent(new CustomEvent(
            'connect', 
            { 
                'output': this, 
                'input':  input 
            }));
    }


    disconnect(input)
    {
        removeFromArray(input, this.connectedInputs);

        this.dispatchEvent(new CustomEvent(
            'disconnect', 
            { 'input': input }));
    }
}