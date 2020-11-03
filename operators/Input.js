class Input
{
    _op;
    
    #dataType;

    connectedOutput;

    constructor(dataType)
    {
        this.#dataType = dataType;
    }
    
    get connected() { return this.connectedOutput != null; }

    get data()
    {
        return (
            this.connected
            ? this.connectedOutput.data
            : null);
    }
}