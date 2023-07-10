class GTextToNumber
extends GNumberType
{
    input;

    format;


    
    constructor(nodeId, options)
    {
        super(TEXT_TO_NUMBER, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextToNumber(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        copy.format = this.format.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const format = (await this.format.eval(parse)).toValue();


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();


            let num = Number.NaN;

            switch (format.value)
            {
                case 0: // dec
                    num = parseFloat(input.value);
                    break;

                case 1: // hex
                    num = parseInt(input.value, 16);
                    break;
            }

            this.value = new NumberValue(num);
        }
        else
            this.value = NumberValue.NaN;


        this.updateValues =
        [
            ['value',  this.value],
            ['format', format    ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input)  this.input .pushValueUpdates(parse);
        if (this.format) this.format.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input)  this.input .invalidateInputs(from);
        if (this.format) this.format.invalidateInputs(from);
    }
}
