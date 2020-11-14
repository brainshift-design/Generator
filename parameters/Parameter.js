class Parameter
{
    #type; get type() { return this.#type; }
    _op;   get op()   { return this._op;   }

    constructor(type)
    {
        this.#type = type;
    }
}