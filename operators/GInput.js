class GInput
{
    #dataType;     
    get dataType() { return this.#dataType; }

    _op    = null; get op   () { return this._op;    }
    _param = null; get param() { return this._param; }

    connectedOutput = null;
    connection      = null;
    
    connecting      = false;
    

    get connected() { return this.connectedOutput != null; }


    constructor(dataType)
    {
        this.#dataType = dataType;
    }    
    

    get data()
    {
        return (
            this.connected
            ? this.connectedOutput.data
            : null);
    }
}