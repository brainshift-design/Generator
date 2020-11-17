class   GNumberParam
extends GParameter
{
    #value;

    get value() 
    {
        if (this.input.connected)
        {
            const value = this.input.data.value;

            postMessage({ 
                msg:   'showParamValue',
                nodeId: this.op.id,
                param:  this.name,
                value:  value
            });

            return value;
        }

        else return this.#value;
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