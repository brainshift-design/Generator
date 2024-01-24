ColorControl.prototype.initEvents = function()
{
    this.div.addEventListener('pointerenter', e =>
    {
        if (panMode)
        {
            setCursor(panCursor);
            return;
        }


        if (   !graphView.spaceDown
            &&  this.pointerEvents)
        {
            if (graphView.tempConn)
                this.div.style.cursor = 'default';

                
            this.updateFocusBorder();


            this.divFocus.style.visibility = 'visible';
            this.divFocus.style.opacity    = '100%';
    
            this.update();
        }
    });



    this.div.addEventListener('pointerdown', e =>
    {
        if (e.button == 1)
        {
            e.preventDefault();
            return;
        }


        if (!this.canReact(e))
            return;
    
    
        if (   graphView.spaceDown
            || panMode)
            return;


        window.focus();
        
        hideAllMenus();


        if (this.param.node.div.style.zIndex < graphView.getTopNodeIndex())
            graphView.putNodeOnTop(this.param.node);


        if (e.button == 0)
        {
            if (!this.pointerEvents)
            {
                e.stopPropagation();
                return;
            }
    
            let nodeDiv = 
                   this.parentNode
                && this.parentNode.parentNode
                && this.parentNode.parentNode.parentNode
                ? this.parentNode.parentNode.parentNode
                : null;

            if (nodeDiv && nodeDiv.className == 'node') 
                graphView.putNodeOnTop(nodeDiv.node);


            e.preventDefault(); // this is fine since I lock the pointer anyway
            e.stopPropagation();

            
            this.buttonDown0  = true;
            this.buttonDown0_ = true;
            //this.moved        = false;
            this.clientX      = e.clientX;
            //this.movedX       = 0;


            if (!this.readOnly)
            {
                this.oldValue   = this.value;
                //this.startValue = this.value;
                //this.prevValue  = this.value;
                //this.sx         = e.clientX;
            }


            this.updateFocusBorder();



            this.textbox.selectionStart = 0;
            this.textbox.selectionEnd   = 0;

            this.showTextbox();

            //forwardEvent(e, this.textbox);


            if (this.param)
                this.param.noUpdate = true;  
        }
        else if (e.button == 1)
        {
            e.preventDefault();
            this.buttonDown1 = true;
        }
        else if (e.button == 2)
        {
            e.preventDefault();
            e.stopPropagation();
            this.buttonDown2 = true;
        }
    });



    this.div.addEventListener('pointermove', e =>
    {
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
        // else if (this.readOnly)
        // {
        //     this.moved = true;
        // }
    });
    
    
    
    this.div.addEventListener('pointerleave', e =>
    {
        if (panMode)
            return;


        this.div.style.cursor       = 'default';
        
        this.divFocus.style.visibility = 'hidden';
        this.divFocus.style.opacity    = 0;

        this.update();


        if (graphView.tempConn)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.node != this.param.node)
            {
                const input = graphView.overInput;
                
                graphView.overInput = null;
                
                if (input) // will be null if data types don't match or there's no auto input for someo other reason
                {
                    input.mouseOver = false;
                    input.updateControl();
                }
                
                graphView.tempConn.wire.inputPos = point_NaN;
                //graphView.tempConn.output.updateControl();
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

                graphView.tempConn.wire.outputPos = point_NaN;
                //graphView.tempConn.input.updateControl();
           }
        }
    });



    this.div.addEventListener('losecapture', () =>
    {
        this.buttonDown0 = false;
        this.buttonDown1 = false;
        this.buttonDown2 = false;
        this.mouseOver   = false;
        
        this.update();
    });



    this.div.addEventListener('pointerup', e =>
    {
        clearTimeout(this.clickTimer);


        if (graphView.tempConn)
        {
            if (    graphView.tempConn.output
                && !graphView.tempConn.output.node.isOrFollows(this.param.node)
                &&  graphView.overInput)
            {
                graphView.endConnection(e.pointerId, getCtrlKey(e), e.shiftKey);
                graphView.overInput.endConnection();
            }
            else if (graphView.tempConn.input
                && !this.param.node.isOrFollows(graphView.tempConn.input.node)
                &&  graphView.overOutput)
            {
                graphView.endConnection(e.pointerId, getCtrlKey(e), e.shiftKey);
                graphView.overOutput.endConnection();
            }
        }
        
        else if (/*this.moved
              ||*/ document.menuHadFocus)
        {
            this.unlockPointer(e.pointerId);

            if (this.param)
                this.param.noUpdate = false;  

            return;            
        }

        else if (this.buttonDown0_)
        {
            this.clicked = true;
            // this.showTextbox();
        }

             if (e.button == 0) this.buttonDown0 = false;
        else if (e.button == 1) this.buttonDown1 = false;
        else if (e.button == 2) this.buttonDown2 = false;

        this.buttonDown0_ = false;
    });    



    document.addEventListener('pointerup', e =>
    {
        e.stopPropagation();


        if (panMode)
            return;

            
        if (   e.button == 0 
            && this.buttonDown0)
        {
            this.buttonDown0 = false;
            this.unlockPointer(e.pointerId);

            this.divFocus.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1) inset';

            // if (    this.value != this.oldValue
            //     && !this.readOnly)
            //     this.dispatchEvent(this.onconfirm);
        }
        // else if (   e.button == 1
        //     && this.buttonDown1)
        // {
        //     this.buttonDown1 = false;            
        // }
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


        // const dWheelX = e.deltaX /  20 * (this.dragReverse ? -1 : 1);
        // const dWheelY = e.deltaY / 100 * (this.dragReverse ? -1 : 1);


        if (   !getCtrlKey(e)
            && !this.buttonDown1)
        {
            e.stopPropagation();

            if (!this.readOnly)
            {
                // if (   document.activeElement
                //     && document.activeElement.tagName.toLowerCase() == 'input'
                //     && document.activeElement.control)
                //     document.activeElement.control.textbox.finish(true, false);

                // this.oldValue = this.value;

                // const dec = Math.pow(10, -this.decimals);

                // const val =
                //     touchpad
                //     ? this.value -  dWheelX               * this.wheelScale * dec
                //     : this.value + (dWheelY > 0 ? -1 : 1) * this.wheelScale * dec;
                
                // this.setValue(val, dec, true, true, false, false);
            }
        }
    });



    // graphView.div.addEventListener('touchstart', e =>
    // {
    //     graphView.touches.push(e);
    //     e.preventDefault();
    // });
    
    
    
    // graphView.div.addEventListener('touchmove', e =>
    // {
    //     for (let i = 0; i < graphView.touches.length; i++)
    //         if (graphView.touches[i].pointerId == e.pointerId)
    //         {
    //             graphView.touches[i] = e;
    //             break;
    //         }
    
    //     e.preventDefault();
    // });
    
    
    
    // graphView.div.addEventListener('touchend', e =>
    // {
    //     for (let i = 0; i < graphView.touches.length; i++)
    //         if (graphView.touches[i].pointerId == e.pointerId)
    //         {
    //             graphView.touches.splice(i, 1);
    //             break;
    //         }
    
    //     e.preventDefault();
    // });
    
    
    
    // graphView.div.addEventListener('touchcancel', e =>
    // {
    //     for (let i = 0; i < graphView.touches.length; i++)
    //         if (graphView.touches[i].pointerId == e.pointerId)
    //         {
    //             graphView.touches.splice(i, 1);
    //             break;
    //         }
    
    //     e.preventDefault();
    // });
    
    
    
    this.div.addEventListener('keydown', e =>
    {
        if (   e.code == 'Enter'
            || e.code == 'NumpadEnter')
            this.showTextbox();

        // else if (e.code == 'Space')
        //     setCursor(panCursor, true);
    });



    this.div.addEventListener('focus', () =>
    {
        if (   !graphView.spaceDown
            && !panMode
            && !this.buttonDown1
            && this.pointerEvents)
            this.showTextbox();
    });
};
