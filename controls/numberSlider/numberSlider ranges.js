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



function updateSliderRanges(slider, sliderWidth, sliderHeight)
{
    if (slider.ranges.length == slider.rangeDivs.length) // update
    {
        for (let i = 0; i < slider.ranges.length; i++)
        {
            updateSliderRangeDiv(
                slider.ranges   [i],
                slider.rangeDivs[i],
                sliderWidth,
                sliderHeight);
        }
    }
    else // recreate
    {
        resetSliderRangeDivs(slider);

        for (let i = 0; i < slider.ranges.length; i++)
        {
            const range = slider.ranges[i];

            const div = createDiv('numberSliderRange');
            div.style.zIndex = 0;
            slider.rangeDivs.push(div);
            slider.appendChild(div);
        
            updateSliderRangeDiv(range, div, sliderWidth, sliderHeight);
        }
    }
};



function updateSliderRangeDiv(range, div, sliderWidth, sliderHeight)
{
    if (range.start == range.end)
        div.style.display = 'none';
    else
    {
        div.style.display    = 'block';
        div.style.left       = sliderWidth * range.start;  
        div.style.top        = range.top * sliderHeight;
        div.style.width      = sliderWidth * (range.end - range.start);
        div.style.height     = (range.bottom - range.top) * sliderHeight;
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