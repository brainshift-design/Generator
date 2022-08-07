class GFillValue
extends GType
{
    fills;



    constructor(fills = [])
    {
        super(FILL_VALUE);

        this.fills = [...fills];

        this.result = this;
        this.valid  = true;
    }



    copy()
    {
        return new GFillValue(this.fills);
    }



    isValid()
    {
        return this.fills.length > 0;
    }



    equals(fill)
    {
        if (this.fills.length != fill.fills.length)
            return false;

        for (let i = 0; i < this.fills.length; i++)
            if (!this.fills[i].equals(fill.fills[i]))
                return false;

        return true;
    }



    eval(parse)
    {
        return this.result = this.copy();
    }



    toString()
    {
        let str = this.fills.length.toString();

        for (let i = 0; i < this.fills.length; i++)
            str += ' ' + this.fills[i].toString();

        return str;
    }



    static NaN = new GFillValue();
}



function parseGFillValue(str)
{
    // if (str == INVALID)
    //     return GFillValue.NaN;

    const _fill = str.split(' ');

    const fill = new GFillValue();

    const nFills = parseInt(_fill[0]);

    for (let i = 1; i < nFills; i++)
        fill.fills.push(parseGColorValue(_fills[i]));

    return fill;
}
