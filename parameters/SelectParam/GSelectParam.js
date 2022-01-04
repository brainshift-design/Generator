class   GSelectParam
extends GParameter
{
    #value;

    #options = [];
    

    
    get value() 
    {
        let value = Math.min(Math.max(0, this.#value), this.#options.length-1);

        if (this.input.connected)
        {
            value = Math.min(Math.max(0, this.input.data.value), this.#options.length-1);

            genPostMessageToUi({ 
                msg:   'uiShowParamValue',
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
    output;



    constructor(name,
                hasOutput,
                options,
                value = 0)
    {
        super(name, 'number');

        this.#options = options;
        this.#value   = value;
   
        this.input = new GInput('number');
        this.input._param = this;
 
        this.output = hasOutput ? new GOutput('number') : null;
        if (this.output) this.output._param = this;
    }
}