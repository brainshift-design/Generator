class   GColorParam
extends GParameter
{
    #value; // [r, g, b]


    
    get value() 
    {
        let value = this.#value;

        if (this.input.connected)
        {
            value = this.input.data.value;

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



    constructor(name, 
                value = [0, 0, 0])
    {
        super(name, 'color');

        this.#value = value;
   
        this.input = new GInput('color');
        this.input._param = this;
    }
}