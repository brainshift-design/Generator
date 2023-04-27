class GNumberToText
extends GNumberType
{
    //input = null;

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

        if (this.input) 
            copy.input = this.input.copy();

        copy.number = this.number.copy();
        copy.format = this.format.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const number = (await this.number.eval(parse)).toValue();
        const format = (await this.format.eval(parse)).toValue();


        let str = NAN_CHAR;

        switch (format.value)
        {
            case 0: // dec
                str = numToString(number.value, -number.decimals);
            break;

            case 1: // hex
                str = numToString(Math.round(number.value), number.decimals, true).toUpperCase();
                break;
        }

        this.value = new TextValue(str);


        genPushUpdateValue(parse, this.nodeId, 'value',  this.value);
        genPushUpdateValue(parse, this.nodeId, 'number', number    );
        genPushUpdateValue(parse, this.nodeId, 'format', format    );


        this.validate();

        return this;
    }



    invalidate()
    {
        super.invalidate();

        if (this.number) this.number.invalidate();
        if (this.format) this.format.invalidate();
    }
}
