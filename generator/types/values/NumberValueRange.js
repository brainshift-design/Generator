class NumberValueRange
{
    start;
    end;

    background;

    top;
    bottom;



    constructor(start, end = start, background = '#f0f', top = 0, bottom = 1)
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
}