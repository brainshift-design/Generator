class NumberValue
extends GValue
{
    static { GNode.types[NUMBER_VALUE] = this; }



    value;
    initValue;
    decimals;

    isBoolean;


    meta;



    constructor(val = Number.NaN, dec = -1, isBoolean = false)
    {
        super(NUMBER_VALUE, 'number');


        if (typeof val !== 'number')
            consoleError('NumberValue(value) is ' + typeof val + ', must be a number');
        

        this.value     = val;
        this.initValue = val;
        
        this.decimals = 
              !isNaN(this.value) 
            && dec == -1 
            ? decDigits(this.value) 
            : dec;

        this.isBoolean = isBoolean;

        this.meta = null;
    }



    static fromString(str)
    {
             if (str === 'true' ) return new BooleanValue(true );
        else if (str === 'false') return new BooleanValue(false);

        else
            return new NumberValue(
                parseFloat(str),
                decCount(str));
    }



    copy()
    {
        const copy = new NumberValue(
            this.value, 
            this.decimals,
            this.isBoolean);

        copy.initValue = this.initValue;

        copy.copyBase(this);

        if (this.meta)
            copy.meta = this.meta.copy();

        return copy;
    }



    equals(num)
    {
        return num
            && this.value    == num.value
            && this.decimals == num.decimals;
    }



    // getMaxDecimals()
    // {
    //     return this.decimals;
    // }



    async eval(parse)
    {
        return this.copy();
    }



    hasInitValue()
    {
        return this.value == this.initValue;
    }



    isValid()
    {
        return !isNaN(this.value)
            && !isNaN(this.decimals);
    }



    toInteger()
    {
        return new NumberValue(Math.round(this.value));
    }



    toValue()
    {
        return this.toNumber();//this.value;
    }



    toNumber()
    {
        return roundTo(this.value, this.decimals);
    }



    toString()
    {
        let str =
            this.isBoolean
                ? this.value > 0 ? 'true' : 'false'
                :   printNum(this.value) 
                  + ',' 
                  + printNum(this.decimals);

        if (this.meta)
            str += ',' + encodeURIComponent(this.meta.toString());

        return str;
    }



    toPreviewString()
    {
        if (this.isBoolean)
            return this.value > 0 ? 'true' : 'false';
    
        else
            return this.isValid()
                ? numToString(this.value, this.decimals)
                : NAN_DISPLAY;
    }



    toDisplayString()
    {
        if (this.isBoolean)
            return this.value > 0 ? 'true' : 'false';
    
        else
            return printNum(this.value) 
                + (!isNaN(this.decimals)
                    ? '_' + this.decimals //subscriptNumber(this.decimals)
                    : '')
                + (this.meta
                    ? '_(' + this.meta.toString() + ')'
                    : '');
    }



    toJsCode(gen)
    {
        return this.toPreviewString();
    }



    static NaN()
    {
        return new NumberValue(
            Number.NaN, 
            Number.NaN);
    }



    static parseRequest(parse)
    {
        parse.pos++; // NUMBER_VALUE
    
        const val = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(NUMBER_VALUE, val, parse);
    
        return val.indexOf(',') >= 0
             ? NumberValue.parse      (val)[0]
             : NumberValue.parseSimple(val)[0];
    }




    static parse(str)
    {
             if (str === 'true' ) return [new BooleanValue(true ), 1];
        else if (str === 'false') return [new BooleanValue(false), 1];

        else
        {
            if (str.indexOf(',') < 0)
            {
                consoleError('number value \'' + str + '\' missing \',\'');
                console.trace();
            }


            const parts = str.split(',');

            const num = new NumberValue(
                parseNum(parts[0]),
                parseNum(parts[1]));

            if (parts.length == 3)
            {
                const meta = NumberValueMeta.parse(decodeURIComponent(parts[2]))[0];

                if (meta.isValid())
                    num.meta = meta;
            }


            return [num, 1];
        }
    }



    static parseSimple(str)
    {
             if (str === 'true' ) return [new BooleanValue(true ), 1];
        else if (str === 'false') return [new BooleanValue(false), 1];

        const num = 
            str == NAN_DISPLAY
            ? NumberValue.NaN()
            : NumberValue.fromString(str);

        return [num, 1];
    }
}
