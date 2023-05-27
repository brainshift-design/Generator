class GSign
extends GNumberType
{
    input = null;



    constructor(nodeId, options)
    {
        super(NUMBER_SIGN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSign(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            console.assert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');

            if (this.options.enabled)
                this.value.value = Math.sign(this.value.value);
        }
        else
            this.value = NumberValue.NaN;


        this.updateValues = [['value', this.value]];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input) this.input.invalidateInputs();
    }
}