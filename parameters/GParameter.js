class GParameter
{
    _name;
    get name() { return this._name; }

    #type; 
    get type() { return this.#type; }
    
    _op; 
    get op() { return this._op; }

    constructor(name, type)
    {
        this._name = name;
        this.#type = type;
    }
}