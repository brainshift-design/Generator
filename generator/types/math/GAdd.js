class GAdd
extends GOperator
{
    inputs = [];



    constructor(nodeId, options)
    {
        super(NUMBER_ADD, nodeId, options);
    }


    
    // copy()
    // {
    //     const add = new GAdd(this.nodeId, this.options);
    //     add.inputs = this.inputs.map(i => i.copy());
    //     return add;
    // }



    eval(parse)
    {
        if (this.valid)
            return;


        this.value = new NumberValue(0);


        for (const input of this.inputs)
        {
            input.eval(parse);

            const val = input.toValue();

            console.assert(
                val.type == NUMBER_VALUE, 
                'val.type must belong to NUMBER_VALUE');

            this.value.value   += val.value;
            this.value.decimals = Math.max(this.value.decimals, val.decimals);
        }
        
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.valid = true;
    }



    toValue()
    {
        return this.value;
    }
}
