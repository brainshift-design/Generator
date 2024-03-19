class GAbsolute
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(NUMBER_ABSOLUTE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GAbsolute(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
        {
            this.value = await evalNumberValue(this.input, parse);

            consoleAssert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');

            if (this.options.enabled)
                this.value.value = Math.abs(this.value.value);
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse, [['value', this.value]]);


        this.validate();

        return this;
    }
}
