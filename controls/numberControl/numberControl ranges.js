NumberControl.prototype.updateRanges = function(controlWidth, controlHeight)
{
    if (this.overrideText != '') // assuming this is only used in emergencies where ranges are irrelevant
        this.resetRangeDivs();

    else
    {
        if (   this.showExtRanges
            && (   this.min < this.minDisplay
                || this.max > this.maxDisplay))
        {
            this.resetRanges();

            const warnLineColor = getWarningRangeColor();

            const val = (this.value - this.minDisplay) / (this.maxDisplay - this.minDisplay);

            if (this.value > this.maxDisplay) this.ranges.push(new NumberValueRange(0, Math.min(val-1, 1), warnLineColor, 0.8));
            if (this.value < this.minDisplay) this.ranges.push(new NumberValueRange(1-Math.max(0, -val), 1, warnLineColor, 0.8));    
        }


        if (this.ranges.length == this.rangeDivs.length) // update
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
                this.param.div.appendChild(div);
            
                updateControlRangeDiv(range, div, controlWidth, controlHeight);
            }
        }
    }
};



NumberControl.prototype.resetRanges = function()
{
    //this.ranges = [];
    this.resetRangeDivs();        
};



NumberControl.prototype.resetRangeDivs = function()
{
    for (const div of this.rangeDivs)
        if (this.param.div.contains(div))
            this.param.div.removeChild(div);

    this.rangeDivs = [];
};



function getWarningRangeColor()
{
    return darkMode
        ? [1, 0.38, 0.38, 0.5]
        : [1, 0, 0, 0.16];
}



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

        const rgb = colorOrToken(range.background, darkMode);
        console.log('rgb =', rgb);

        div.style.background = rgba2style(rgb);
    }
};
