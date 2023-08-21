class GNumberToText
extends GOperator1
{
    number;
    format;


    
    constructor(nodeId, options)
    {
        super(NUMBER_TO_TEXT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNumberToText(this.nodeId, this.options);

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


            let str = NAN_CHAR;

            switch (format.value)
            {
                case 0: // dec
                    str = numToString(input.value, -input.decimals);
                break;

                case 1: // hex
                    str = numToString(Math.round(input.value), input.decimals, true).toUpperCase();
                    break;
            }

            this.value = new TextValue(str);
        }
        else
            this.value = TextValue.NaN;


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
}
