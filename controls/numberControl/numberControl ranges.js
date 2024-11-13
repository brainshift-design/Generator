NumberControl.prototype.updateRanges = function(controlWidth, controlHeight)
{
    if (this.overrideText != '') // assuming this is only used in emergencies where ranges are irrelevant
        this.resetRangeDivs();

    else
    {
        if (   this.showExtRanges
            && (   this.min < this.displayMin
                || this.max > this.displayMax))
        {
            this.resetRanges();

            const warnLineStyle = getWarningRangeStyle();

            const val = (this.value - this.displayMin) / (this.displayMax - this.displayMin);

            if (this.value > this.displayMax) this.ranges.push(new NumberValueRange(0, Math.min(val-1, 1), warnLineStyle, 0.8));
            if (this.value < this.displayMin) this.ranges.push(new NumberValueRange(1-Math.max(0, -val), 1, warnLineStyle, 0.8));    
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



function getWarningRangeStyle()
{
    return darkMode
        ? 'rgba(255, 96, 96, 0.5)'
        : 'rgba(255, 0, 0, 0.16)';
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
        div.style.background = range.background;
    }
};
