class Input
{
    _op;
    
    control;

    #dataType;

    connectedOutput;

    constructor(dataType)
    {
        this.#dataType = dataType;

        this.control = document.createElement('div');
        this.control.className = 'input';
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