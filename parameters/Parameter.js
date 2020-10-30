class Parameter
{
    #type;
    _control;

    constructor(type)
    {
        this.#type = type;
    }

    get type()    { return this.#type;    }
    get control() { return this._control; }
}