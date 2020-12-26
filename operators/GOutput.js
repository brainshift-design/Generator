class   GOutput
extends EventTarget
{
    #dataType;     
    get dataType() { return this.#dataType; }
    
    _op    = null; get op   () { return this._op;    }
    _param = null; get param() { return this._param; }

    
    // the output exists as bytes in the buffer
    _firstObject = 0;
    _firstObject = 0;

    
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

        return [this._firstObject, 
                this._lastObject];
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