class GTextToNumber
extends GNumberType
{
    text;
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

        copy.text   = this.text.copy();
        copy.format = this.format.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const text   = (await this.text  .eval(parse)).toValue();
        const format = (await this.format.eval(parse)).toValue();


        let num = Number.NaN;

        switch (format.value)
        {
            case 0: // dec
                num = parseFloat(text.value);
            break;

            case 1: // hex
                num = parseInt(text.value, 16);
                break;
        }

        this.value = new NumberValue(num);


        this.updateValues =
        [
            ['value',  this.value],
            ['text',   text      ],
            ['format', format    ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.text  ) this.text  .pushValueUpdates(parse);
        if (this.format) this.format.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.text  ) this.text  .invalidateInputs(from);
        if (this.format) this.format.invalidateInputs(from);
    }
}
