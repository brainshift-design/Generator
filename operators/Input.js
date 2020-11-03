class Input
{
    _op;
    
    #dataType;

    connectedOutput;

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

    get connected() { return this.connectedOutput != null; }
}