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
}



function updateControlRanges(control, controlWidth, controlHeight)
{
    if (control.overrideText != '') // assuming this is only used in emergencies where ranges are irrelevant
        resetControlRangeDivs(control);

    else if (control.ranges.length == control.rangeDivs.length) // update
    {
        for (let i = 0; i < control.ranges.length; i++)
        {
            updateControlRangeDiv(
                control.ranges   [i],
                control.rangeDivs[i],
                controlWidth,
                controlHeight);
        }
    }
    else // recreate
    {
        resetControlRangeDivs(control);

        for (let i = 0; i < control.ranges.length; i++)
        {
            const range = control.ranges[i];

            const div = createDiv('numberControlRange');
            div.style.zIndex = 0;
            control.rangeDivs.push(div);
            control.appendChild(div);
        
            updateControlRangeDiv(range, div, controlWidth, controlHeight);
        }
    }
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



function resetControlRanges(control)
{
    control.ranges = [];
    resetControlRangeDivs(control);        
};



function resetControlRangeDivs(control)
{
    for (const div of control.rangeDivs)
        if (control.contains(div))
            control.removeChild(div);

    control.rangeDivs = [];
}