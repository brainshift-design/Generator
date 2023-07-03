class GTextLength
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(TEXT_LENGTH, nodeId, options);
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


        let length;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            consoleAssert(input.type == TEXT_VALUE, 'input must be TEXT_VALUE');

            length = new NumberValue(input.value.length);
        }
        else
            length = NumberValue.NaN;
    

        this.updateValues = [['length', length]];


        this.validate();

        return this;
    }
}
