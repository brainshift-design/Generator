class Parameter
{
    #type;
    get type() { return this.#type; }
    
    _op;
    get op() { return this._op; }

    _control;
    get control() { return this._control; }

    constructor(type)
    {
        this.#type = type;
    }
}