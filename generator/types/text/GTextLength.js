class GTextLength
extends GOperator1
{
    length;



    constructor(nodeId, options)
    {
        super(TEXT_LENGTH, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.length = null;
    }



    copy()
    {
        const copy = new GTextLength(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.length) copy.length = this.length.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;

        if (   input
            && input.value)
        {
            consoleAssert(input.type == TEXT_VALUE, 'input must be TEXT_VALUE');

            this.length = new NumberValue(input.value.length);
        }
        else
            this.length = NumberValue.NaN.copy();
    

        this.setUpdateValues(parse,
        [
            ['length', this.length]
        ]);


        this.validate();

        return this;
    }
}
