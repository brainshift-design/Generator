TextControl.prototype.initEvents = function()
{
    this.div.addEventListener('pointerenter', e =>
    {
        if (panMode)
        {
            setCursor(panCursor);
            return;
        }


        //if (   !graphView.spaceDown
        //    &&  this.pointerEvents)
        //{
        //    // if (graphView.tempConn)
        //    //     this.divControl.style.cursor = 'default';
//
        //        
        //    // this.textbox.style.visibility = 'visible';
        //    // this.textbox.style.opacity    = '100%';
    //
        //    this.update();
        //}
        //else 
        if (!currentTooltip)
            initTextTooltip(this.value);
    });



    this.div.addEventListener('pointerdown', e =>
    {
        if (e.button == 2)
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
        e.stopPropagation();


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

        
        if (    this.buttonDown0
            && !this.readOnly)
        {
            //forwardEvent(e, this.textbox);
            // ...
        }
        else if (graphView.tempConn
              && this.param)
        {
            this.checkDragConnection();
        }
        // else if (this.readOnly)
        // {
        //     this.moved = true;
        // }
    });



    this.div.addEventListener('pointerleave', e =>
    {
        if (panMode)
            return;


        // this.divControl.style.cursor  = 'default';
        
        // this.textbox.style.visibility = 'hidden';
        // this.textbox.style.opacity    = 0;

        
        this.update();


        if (graphView.tempConn)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.node != this.param.node)
            {
                const input = graphView.overInput;
                
                graphView.overInput   = null;
                
                if (input) // will be null if data types don't match or there's no auto input for someo other reason
                {
                    input.mouseOver = false;
                    input.updateControl();
                }
                
                graphView.tempConn.wire .inputPos = point_NaN;
            }
            else if (graphView.tempConn.input
                  && graphView.tempConn.input.node != this.param.node)
            {
                const output = graphView.overOutput;
                
                graphView.overOutput = null;

                if (output) // will be null if data types don't match or there's no auto output for someo other reason
                {
                    output.mouseOver = false;
                    output.updateControl();
                }

                graphView.tempConn.wire .outputPos = point_NaN;

                graphView.tempConn.input.updateControl();
           }
        }
    });



    this.div.addEventListener('pointerup', e =>
    {
        e.stopPropagation();


        const param = this.param;


        if (!this.canReact(e))
            return;


        if (panMode)
            return;


        clearTimeout(this.clickTimer);

  
        if (graphView.tempConn)
        {
            if (    graphView.tempConn.output
                && !graphView.tempConn.output.node.isOrFollows(param.node)
                &&  graphView.overInput)
            {
                graphView.endConnection(e.pointerId, getCtrlKey(e), e.shiftKey);
                graphView.overInput.endConnection();
            }
            else if (graphView.tempConn.input
                && !param.node.isOrFollows(graphView.tempConn.input.node)
                &&  graphView.overOutput)
            {
                graphView.endConnection(e.pointerId, getCtrlKey(e), e.shiftKey);
                graphView.overOutput.endConnection();
            }
        }


        if (e.button == 0) 
        {
            this.buttonDown0 = false;
            this.shiftDown   = false;

            this.updateCursor();
        }

        else if (e.button == 1) 
            this.buttonDown1 = false;

        else if (e.button == 2) 
        {
            //e.stopPropagation();
            this.buttonDown2 = false;
        }



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
            e.preventDefault();
            return;
        }


        if (   !getCtrlKey(e)
            && !this.buttonDown1)
            e.stopPropagation();
    });
};