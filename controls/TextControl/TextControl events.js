TextControl.prototype.initEvents = function()
{
    this.div.addEventListener('pointerenter', e =>
    {
        if (!currentTooltip)
            initTextTooltip(this.value);
    });



    this.div.addEventListener('wheel', e =>
    {
        if (  !this.pointerEvents
            || panMode
            || graphView.wheelTimer)
            return;


        const touchpad = isTouchpad(e);

        if (touchpad)
        {
            e.preventDefault();
            return;
        }


        if (   !getCtrlKey(e)
            && !this.buttonDown1)
            e.stopPropagation();
    });
};