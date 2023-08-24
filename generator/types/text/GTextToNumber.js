class GTextToNumber
extends GOperator1
{
    format;


    
    constructor(nodeId, options)
    {
        super(TEXT_TO_NUMBER, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextToNumber(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.format) copy.format = this.format.copy();

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

            this.value = new NumberValue(num, decDigits(num));
        }
        else
            this.value = NumberValue.NaN;


        this.setUpdateValues(parse,
        [
            ['value',  this.value],
            ['format', format    ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.format && this.format.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.format) this.format.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.format) this.format.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.format) this.format.iterateLoop(parse);
    }
}
