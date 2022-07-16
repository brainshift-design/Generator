class GAdd
extends GOperator
{
    values;



    constructor(nodeId, values = [])
    {
        super(NUMBER_ADD, nodeId);
        
        this.values = values;
    }


    
    eval(parse)
    {
        if (this.valid)
            return this.value;


        this.value = new GNumberValue(0);


        for (const _val of this.values)
        {
            console.log('_val =', _val);
            const val = _val.eval(parse);
            console.assert(val.type == NUMBER_VALUE);

            this.value.value   += val.value;
            this.value.decimals = Math.max(this.value.decimals, val.decimals);
        }


        genPushUpdateParamValue(parse, this.nodeId, 'value', this.value);

        this.valid = true;
        return this.value;
    }
}
