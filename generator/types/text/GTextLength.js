class GTextLength
extends GOperator
{
    input;



    constructor(nodeId, options)
    {
        super(TEXT_LENGTH, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextLength(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input ) copy.input  = this.input .copy();
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
            console.assert(input.type == TEXT_VALUE, 'input must be TEXT_VALUE');

            length = new NumberValue(input.value.length);
        }
        else
            length = NumberValue.NaN;
    

        this.updateValues = [['length', length]];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input ) this.input .invalidateInputs(from);
    }
}
