class Output
{
    _op;

    #dataType;
    _data;
    
    connectedInputs = [];


    constructor(dataType)
    {
        this.#dataType = dataType;
    }


    connect(input)
    {
        if (input.connectedOutput != null)
            input.connectedOutput.disconnect(input);

        this.connectedInputs.push(input);
        input.connectedOutput = this;

        updateCanvas();
    }

    disconnect(input)
    {
        var index = this.connectedInputs.indexOf(input);

        if (index >= 0)
        {
            this.connectedInputs[index].connectedOutput = null;
            this.connectedInputs.slice(index, 1);

            updateCanvas();
        }
    }


    get data() 
    {
        this._op.update();
        return this._data;
    }
}