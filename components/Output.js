class Output
{
    _op;

    #dataType;
    _data;
    
    connectedInputs = {};


    constructor(dataType)
    {
        this.#dataType = dataType;
    }


    connect(input)
    {
        this.connectedInputs.push(input);
    }

    disconnect(input)
    {
        var index = this.connectedInputs.indexOf(input);

        if (index >= 0)
            this.connectedInputs.slice(index, 1);
    }


    get data() 
    {
        this._op.update();
        return this._data;
    }
}