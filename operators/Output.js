class Output
{
    _op;

    control;

    #dataType;
    _data;
    
    connectedInputs = [];


    constructor(dataType)
    {
        this.#dataType = dataType;

        this.control = document.createElement('div');
        this.control.className = 'output';
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
        return this._op.generate();
    }
}