class   GNumberParam
extends GParameter
{
    #value;

    get value() 
    {
        return (
            this.input.connected
            ? this.input.data.value
            : this.#value); 
    }
    
    set value(val) 
    {
        this.#value = val;
        this.op.valid = false;
    }


    input; 


    constructor(name, val = 0)
    {
        super(name, 'NUM');

        this.#value = val;

        this.input = new GInput ('NUM');
        this.input._param = this;
    }
}