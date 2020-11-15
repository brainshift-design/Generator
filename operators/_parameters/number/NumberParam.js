class   NumberParam
extends Parameter
{
    #value;
    get value() { return this.#value; }
    set value(val) { this.#value = val; }


    input; 


    constructor(name, 
                val = 0, 
                min = Number.MIN_SAFE_INTEGER, 
                max = Number.MAX_SAFE_INTEGER)
    {
        super('NUM');
    }
}