class NumberSliderRange
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



function updateSliderRanges(slider)
{
    if (slider.ranges.length == slider.rangeDivs.length) // update
    {
        for (let i = 0; i < slider.ranges.length; i++)
        {
            updateSliderRangeDiv(
                slider,
                slider.ranges   [i],
                slider.rangeDivs[i]);
        }
    }
    else // recreate
    {
        resetSliderRangeDivs(slider);

        for (let i = 0; i < slider.ranges.length; i++)
        {
            const range = slider.ranges[i];

            const div = createDiv('numberSliderRange');
            slider.rangeDivs.push(div);
            slider.appendChild(div);
        
            updateSliderRangeDiv(slider, range, div);
        }
    }
};



function updateSliderRangeDiv(slider, range, div)
{
    if (range.start == range.end)
        div.style.display = 'none';
    else
    {
        div.style.display    = 'block';
        div.style.left       = slider.clientWidth * range.start;  
        div.style.top        = range.top * slider.clientHeight;
        div.style.width      = slider.clientWidth * (range.end - range.start);
        div.style.height     = (range.bottom - range.top) * slider.clientHeight;
        div.style.background = range.background;
    }
};



function resetSliderRanges(slider)
{
    slider.ranges = [];
    resetSliderRangeDivs(slider);        
};



function resetSliderRangeDivs(slider)
{
    for (const div of slider.rangeDivs)
        if (slider.contains(div))
            slider.removeChild(div);

    slider.rangeDivs = [];
}