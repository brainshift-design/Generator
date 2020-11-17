class   GNumberParam
extends GParameter
{
    #value;

    #min;
    #max;
    

    get value() 
    {
        var value = Math.min(Math.max(this.#min, this.#value), this.#max);

        if (this.input.connected)
        {
            value = Math.min(Math.max(this.#min, this.input.data.value), this.#max);

            postMessage({ 
                msg:   'showParamValue',
                nodeId: this.op.id,
                param:  this.name,
                value:  value
            });
        }

        return value;
    }
    
    set value(value) 
    {
        this.#value   = value;
        this.op.valid = false;
    }


    input; 


    constructor(name, 
                value = 0, 
                min   = Number.MIN_SAFE_INTEGER, 
                max   = Number.MAX_SAFE_INTEGER)
    {
        super(name, 'NUM');

        this.#value    = value;
   
        this.#min      = min;
        this.#max      = max;

        this.input = new GInput('NUM');
        this.input._param = this;
    }
}