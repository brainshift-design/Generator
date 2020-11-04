class Input
{
    _op;
    
    control;

    #dataType;


    connectedOutput;
    connection;

    get connected() { return this.connectedOutput != null; }


    constructor(dataType)
    {
        this.#dataType = dataType;

        this.control = document.createElement('div');
        this.control.className = 'input';
    }    
    
    
    get data()
    {
        return (
            this.connected
            ? this.connectedOutput.data
            : null);
    }
}