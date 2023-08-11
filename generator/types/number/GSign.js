class GSign
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(NUMBER_SIGN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSign(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            consoleAssert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');

            if (this.options.enabled)
                this.value.value = Math.sign(this.value.value);
        }
        else
            this.value = NumberValue.NaN;


        this.setUpdateValues(parse, 
        [
            ['value', this.value]
        ]);


        this.validate();

        return this;
    }
}