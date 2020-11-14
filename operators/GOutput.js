class GOutput
{
    #dataType;     
    get dataType() { return this.#dataType; }

    _op    = null; get op   () { return this._op;    }
    _param = null; get param() { return this._param; }
    
    _data = {};

    connectedInputs = [];
    
    connecting      = false;
    
    get connected() { return this.connectedInputs.length > 0; }


    constructor(dataType)
    {
        this.#dataType = dataType;
    }
    

    get data() 
    {
        if (!this.op.valid)
            this.op.generate();

        return this._data;
    }
}