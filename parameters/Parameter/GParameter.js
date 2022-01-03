class GParameter
{
    #name;
    get name() { return this.#name; }

    #type; 
    get type() { return this.#type; }
    
    _op; 
    get op() { return this._op; }


    constructor(name, type)
    {
        this.#name = name;
        this.#type = type;
    }
}