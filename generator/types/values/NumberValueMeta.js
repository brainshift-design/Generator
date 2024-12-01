class NumberValueMeta
{
    min; 
    minDisplay;

    max;
    maxDisplay;

    decimals;
    suffix;
    ranges;

    displayAbsolute;



    constructor(
        min             = Number.NaN, 
        minDisplay      = Number.NaN, 
        max             = Number.NaN, 
        maxDisplay      = Number.NaN, 
        decimals        = Number.NaN, 
        suffix          = NULL, 
        ranges          = null, 
        displayAbsolute = false)
    {
        this.min             = min;
        this.minDisplay      = minDisplay;

        this.max             = max;
        this.maxDisplay      = maxDisplay;

        this.decimals        = decimals;
        this.suffix          = suffix;
        this.ranges          = ranges;

        this.displayAbsolute = displayAbsolute;
    }



    static default()
    {
        return new NumberValueMeta(
            Number.MIN_SAFE_INTEGER, 
            Number.MIN_SAFE_INTEGER, 
            Number.MAX_SAFE_INTEGER, 
            Number.MAX_SAFE_INTEGER, 
            0,
            NULL, 
            [],
            false);
    }



    copy()
    {
        return new NumberValueMeta(
            this.min,
            this.minDisplay,
            this.max,
            this.maxDisplay,
            this.decimals,
            this.suffix,
            this.ranges ? this.ranges.map(r => r.copy()) : null,
            this.displayAbsolute);
    }



    toString()
    {
        return      this.min       .toString()
            + ' ' + this.minDisplay.toString()
            + ' ' + this.max       .toString()
            + ' ' + this.maxDisplay.toString()
            + ' ' + this.decimals  .toString()
            + ' ' + (this.suffix == NULL ? NULL_VALUE : encodeURIComponent(this.suffix))
            + ' ' + (this.ranges ? this.ranges.length.toString() : NULL_VALUE)
            + (   this.ranges
               && this.ranges.length > 0
                 ? ' ' + this.ranges.map(r => r.toString()).join(' ')
                 : '')
            + ' ' + boolToString(this.displayAbsolute)
    }
}



function parseNumberValueMeta(str, i = -1)
{
    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const min        = parseFloat(str[i]); i++;
    const minDisplay = parseFloat(str[i]); i++;
    const max        = parseFloat(str[i]); i++;
    const maxDisplay = parseFloat(str[i]); i++;
    const decimals   = parseInt  (str[i]); i++;
    const suffix     = str[i] == NULL_VALUE 
                          ? NULL 
                          : decodeURIComponent(str[i]); i++;

    let ranges = null;

    if (str[i] == NULL_VALUE)
        i++;

    else
    {
        const nRanges = parseInt(str[i]); i++;

        ranges = [];

        for (let j = 0; j < nRanges; j++)
        {
            const range = parseNumberValueRange(str, i); i += range[1];
            ranges.push(range[0]);
        }
    }

    
    const displayAbsolute = parseBool(str[i]); i++;


    const meta = new NumberValueMeta(
        min,
        minDisplay,
        max,
        maxDisplay,
        decimals,
        suffix,
        ranges,
        displayAbsolute);


    return [meta, i - iStart];
}
