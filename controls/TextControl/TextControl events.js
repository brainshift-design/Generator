TextControl.prototype.initEvents = function()
{
    this.div.addEventListener('pointerenter', e =>
    {
        if (panMode)
        {
            setCursor(panCursor);
            return;
        }

        if (!currentTooltip)
            initTextTooltip(this.value);
    });



    this.div.addEventListener('pointerdown', e =>
    {
        if (e.button == 0)
        {
            e.stopPropagation();
        }

        else if (e.button == 2)
        {
            e.preventDefault();
            e.stopPropagation();

            if (this.param instanceof TextParam)
            {
                initTextboxMenu(this.textbox);
                menuTextbox.showAt(e.clientX, e.clientY, false, false);
            }
        }
    });



    this.div.addEventListener('pointermove', e =>
    {
        //e.stopPropagation();


        if (panMode)
        {
            setCursor(panCursor);
            return;
        }

        if (!this.pointerEvents)
            return;

            
        let rect = boundingRect(this.div);
        
        this.mouseOver = 
               e.clientX >= rect.left
            && e.clientX <  rect.right
            && e.clientY >= rect.top                                     
            && e.clientY <  rect.bottom;


        this.clientX = e.clientX;

        
        //if (    this.buttonDown0
        //    && !this.readOnly)
        //{
            //forwardEvent(e, this.textbox);
            // ...
        //}
    });



    this.div.addEventListener('pointerleave', e =>
    {
        if (panMode)
            return;


        this.update();
    });



    this.div.addEventListener('pointerup', e =>
    {
        //e.stopPropagation();


        const param = this.param;


        if (!this.canReact(e))
            return;


        if (panMode)
            return;


        clearTimeout(this.clickTimer);

  
        if (e.button == 0) 
        {
            this.buttonDown0 = false;
            this.shiftDown   = false;

            this.updateCursor();
        }

        else if (e.button == 1) 
            this.buttonDown1 = false;

        else if (e.button == 2) 
            this.buttonDown2 = false;


        this.buttonDown0_ = false;
    });    



    document.addEventListener('pointerup', e =>
    {
        if (   e.button == 0 
            && this.buttonDown0)
        {
            this.buttonDown0 = false;
            this.unlockPointer(e.pointerId);

            this.focus.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1) inset';
        }
        else if (e.button == 1
              && this.buttonDown1)
        {
            this.buttonDown1 = false;            
        }
    });



    this.div.addEventListener('dblclick', e =>
    {
        e.stopPropagation();
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
            e.stopImmediatePropagation();
            e.preventDefault();
            return;
        }


        if (   !getCtrlKey(e)
            && !this.buttonDown1)
            e.stopPropagation();
    });
};



function syncTextScroll(textarea, highlight) 
{
    highlight.scrollTop = textarea.scrollTop;
}
