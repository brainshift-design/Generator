class NumberControlRange
{
    start;
    end;

    background;

    top;
    bottom;


    constructor(start, end = start, background = 'magenta', top = 0, bottom = 1)
    {
        this.start      = start;
        this.end        = end;

        this.background = background;

        this.top        = top;
        this.bottom     = bottom;
    }



    copy()
    {
        return new NumberControlRange(
            this.start,
            this.end,
            this.background,
            this.top,
            this.bottom);
    }
}



NumberControl.prototype.updateRanges = function(controlWidth, controlHeight)
{
    if (this.overrideText != '') // assuming this is only used in emergencies where ranges are irrelevant
        this.resetRangeDivs();

    else if (this.ranges.length == this.rangeDivs.length) // update
    {
        for (let i = 0; i < this.ranges.length; i++)
        {
            updateControlRangeDiv(
                this.ranges   [i],
                this.rangeDivs[i],
                controlWidth,
                controlHeight);
        }
    }
    else // recreate
    {
        this.resetRangeDivs();

        for (const range of this.ranges)
        {
            const div = createDiv('numberControlRange');
            
            div.style.zIndex = 0;

            this.rangeDivs.push(div);
            this.div.appendChild(div);
        
            updateControlRangeDiv(range, div, controlWidth, controlHeight);
        }
    }
};



NumberControl.prototype.resetRanges = function()
{
    this.ranges = [];
    this.resetRangeDivs();        
};



NumberControl.prototype.resetRangeDivs = function()
{
    for (const div of this.rangeDivs)
        if (this.div.contains(div))
            this.div.removeChild(div);

    this.rangeDivs = [];
};



function updateControlRangeDiv(range, div, controlWidth, controlHeight)
{
    if (range.start == range.end)
        div.style.display = 'none';
    else
    {
        div.style.display    = 'block';
        div.style.left       = controlWidth * range.start;  
        div.style.top        = range.top * controlHeight;
        div.style.width      = controlWidth * (range.end - range.start);
        div.style.height     = (range.bottom - range.top) * controlHeight;
        div.style.background = range.background;
    }
};
