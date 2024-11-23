class NumberValueRange
{
    start;
    end;

    background;

    top;
    bottom;



    constructor(start, end = start, background = [1, 0, 1], top = 0, bottom = 1)
    {
        this.start      = start;
        this.end        = end;

        this.background = background;

        this.top        = top;
        this.bottom     = bottom;
    }



    copy()
    {
        return new NumberValueRange(
            this.start,
            this.end,
            this.background,
            this.top,
            this.bottom);
    }



    toString()
    {
        return      this.start     .toString()
            + ' ' + this.end       .toString()
            + ' ' + 
                (typeof this.background == 'string'
                    ? '$' + this.background
                    : this.background.map(c => c.toString()).join(' '))
            + ' ' + this.top       .toString()
            + ' ' + this.bottom    .toString();
    }
}



function parseNumberValueRange(str, i = -1)
{
    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }

    
    const iStart = i;

    const start    = parseFloat(str[i]); i++;
    const end      = parseFloat(str[i]); i++;

    let background;

    if (str[i][0] == '$')
    {
        background = str[i].substring(1); i++;
    }
    else
    {
        const r    = parseFloat(str[i]); i++;
        const g    = parseFloat(str[i]); i++;
        const b    = parseFloat(str[i]); i++;
        background = [r, g, b];
    }

    const top      = parseFloat(str[i]); i++;
    const bottom   = parseFloat(str[i]); i++;


    const range = new NumberValueRange(
        start,
        end,
        background,
        top,
        bottom);


    return [range, i - iStart];
}
