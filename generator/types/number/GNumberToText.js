class GNumberToText
extends GNumberType
{
    input = null;

    format;
    digits;


    
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

        copy.format = this.format.copy();
        copy.digits = this.digits.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const format = (await this.format.eval(parse)).toValue();
        const digits = (await this.digits.eval(parse)).toValue();


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            console.assert(
                input.type == NUMBER_VALUE, 
                'input.type must be NUMBER_VALUE');

                
            let str = NAN_CHAR;

            switch (format.value)
            {
                case 0: 
                    str = numToString(Math.round(input.value), digits.value, false);
                    break;

                case 1: // hex
                    str = numToString(Math.round(input.value), digits.value, true).toUpperCase();
                    break;

                case 2: // float
                    str = numToString(input.value, -digits.value);
                    break;
            }

            this.value = new TextValue(str);
        }
        else
            this.value = TextValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'value',  this.value);
        genPushUpdateValue(parse, this.nodeId, 'format', format    );
        genPushUpdateValue(parse, this.nodeId, 'digits', digits    );


        this.validate();

        return this;
    }
}
