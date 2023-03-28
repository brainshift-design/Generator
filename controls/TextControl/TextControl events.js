TextControl.prototype.initEvents = function()
{
    this.div.addEventListener('pointerenter', e =>
    {
        overColorControl = this;


        if (panMode)
        {
            setCursor(panCursor);
            return;
        }


        if (   !this.view.spaceDown
            &&  this.pointerEvents)
        {
            this.div.style.cursor = 
                this.view.tempConn 
                ? 'default' 
                : 'text';

            const colShadow = 
                darkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)';

            if (this.param)
            {
                this.focus.style.boxShadow = '0 1px 0 0 ' + colShadow + ' inset';

                if (    this.param.node
                    &&  this.param.node.params.includes(this.param)
                    && !isLastInArray(this.param.node.params, this.param))
                    this.focus.style.boxShadow += ', 0 -1px 0 0 ' + colShadow + ' inset';
            }
            else
            {
                this.focus.style.boxShadow  = '0 0 0 1px ' + colShadow + ' inset ';
            }


            this.focus.style.visibility = 'visible';
            this.focus.style.opacity    = '100%';
    
            this.update();
        }
    });



    this.div.addEventListener('pointerdown', e =>
    {
        e.stopPropagation();
    
    
        if (   this.view.spaceDown
            || panMode)
            return;


        window.focus();
        
        hideAllMenus();


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
                this.view.putNodeOnTop(nodeDiv.node);


            e.preventDefault(); // this is fine since I lock the pointer anyway
                
            this.buttonDown0  = true;
            this.buttonDown0_ = true;
            this.moved        = false;
            this.clientX      = e.clientX;
            this.movedX       = 0;


            if (!this.readOnly)
            {
                this.oldValue   = this.value;
                // this.startValue = this.value;
                // this.prevValue  = this.value;
                // this.sx         = e.clientX;

                // this.clickTimer = setTimeout(() => 
                // {
                //     if (!document.menuHadFocus)
                //     {
                //         this.moved = true;
                //         //this.lockPointer(e.pointerId);
                //     }
                // }, 
                // 500);
            }


            if (   !this.param
                || !this.param.node.selected)
                this.focus.style.boxShadow = '0 0 0 1px var(--figma-color-bg-brand) inset';

            else
            {
                this.focus.style.boxShadow = '0 1px 0 0 var(--figma-color-bg-brand) inset';
                    
                if (this.param.index < this.param.node.params.length-1)
                    this.focus.style.boxShadow += ', 0 -1px 0 0 var(--figma-color-bg-brand) inset';
            }


            // I don't want to focus here, but I do want to take focus away from elsewhere
            document.activeElement.blur();


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
            // ...
        }
        else if (this.view.tempConn
              && this.param)
        {
            let savedInput = 
                this.view.savedConn
                ? this.view.savedConn.input
                : null;

            if (    this.view.tempConn.output
                &&  this.param.input
                &&  this.param.input.canConnectFrom(this.view.tempConn.output)
                && !this.view.tempConn.output.node.isOrFollows(this.param.node)
                && (  !this.param.input.connected // not already connected to this input
                    || this.param.input.connectedOutput != this.view.tempConn.output
                    || this.param.input == savedInput))
            {
                this.view.overInput = this.param.input;
                    
                this.param.input.mouseOver = true;
                this.param.input.updateControl();

                const rect = boundingRect(this.param.input.div);

                this.view.tempConn.wire .inputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - menuBarHeight);
            }
            else if ( this.view.tempConn.input
                  &&  this.param.output
                  &&  this.view.tempConn.input.canConnectTo(this.param.output)
                  && !this.param.node.isOrFollows(this.view.tempConn.input.node))
            {
                this.view.overOutput = this.param.output;
                    
                this.param.output.mouseOver = true;
                this.param.output.updateControl();


                const rect = boundingRect(this.param.output.div);

                this.view.tempConn.wire .outputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - menuBarHeight);


                this.view.tempConn.input.updateControl();
            }
        }
        else if (this.readOnly)
        {
            this.moved = true;
        }
    });
    
    
    
    this.div.addEventListener('pointerleave', e =>
    {
        overColorControl = null;

        
        if (panMode)
            return;


        this.div.style.cursor       = 'default';
        
        this.focus.style.visibility = 'hidden';
        this.focus.style.opacity    = 0;

        this.update();


        if (this.view.tempConn)
        {
            if (   this.view.tempConn.output
                && this.view.tempConn.output.node != this.param.node)
            {
                const input = this.view.overInput;
                
                this.view.overInput   = null;
                
                if (input) // will be null if data types don't match or there's no auto input for someo other reason
                {
                    input.mouseOver = false;
                    input.updateControl();
                }
                
                this.view.tempConn.wire .inputPos = point_NaN;
            }
            else if (this.view.tempConn.input
                  && this.view.tempConn.input.node != this.param.node)
            {
                const output = this.view.overOutput;
                
                this.view.overOutput = null;

                if (output) // will be null if data types don't match or there's no auto output for someo other reason
                {
                    output.mouseOver = false;
                    output.updateControl();
                }

                this.view.tempConn.wire .outputPos = point_NaN;

                this.view.tempConn.input.updateControl();
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


        if (this.view.tempConn)
        {
            if (    this.view.tempConn.output
                && !this.view.tempConn.output.node.isOrFollows(this.param.node)
                &&  this.view.overInput)
            {
                this.view.endConnection(e.pointerId, getCtrlKey(e));
                this.view.overInput.endConnection();
            }
            else if (this.view.tempConn.input
                && !this.param.node.isOrFollows(this.view.tempConn.input.node)
                &&  this.view.overOutput)
            {
                this.view.endConnection(e.pointerId, getCtrlKey(e));
                this.view.overOutput.endConnection();
            }
        }
        
        // else if (   this.moved
        //     || document.menuHadFocus)
        // {
        //     this.unlockPointer(e.pointerId);

        //     if (this.param)
        //         this.param.noUpdate = false;  

        //     return;            
        // }

        else if (this.buttonDown0_)
        {
            this.clicked = true;
            this.showTextarea();
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
            //this.unlockPointer(e.pointerId);

            this.focus.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1) inset';

            if (    this.value != this.oldValue
                && !this.readOnly)
                this.dispatchEvent(this.onconfirm);
        }
        else if (   e.button == 1
            && this.buttonDown1)
        {
            this.buttonDown1 = false;            
        }
    });


    
    this.div.addEventListener('wheel', e =>
    {
        if (  !this.pointerEvents
            || panMode
            || this.view.wheelTimer)
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
                //     document.activeElement.control.textarea.finish(true, false);

                // this.oldValue = this.value;

                // const dec = Math.pow(10, -this.dec);

                // const val =
                //     touchpad
                //     ? this.value -  dWheelX               * this.wheelScale * dec
                //     : this.value + (dWheelY > 0 ? -1 : 1) * this.wheelScale * dec;
                
                // this.setValue(val, true, true, false, false);
            }
        }
    });



    // this.view.div.addEventListener('touchstart', e =>
    // {
    //     this.view.touches.push(e);
    //     e.preventDefault();
    // });
    
    
    
    // this.view.div.addEventListener('touchmove', e =>
    // {
    //     for (let i = 0; i < this.view.touches.length; i++)
    //         if (this.view.touches[i].pointerId == e.pointerId)
    //         {
    //             this.view.touches[i] = e;
    //             break;
    //         }
    
    //     e.preventDefault();
    // });
    
    
    
    // this.view.div.addEventListener('touchend', e =>
    // {
    //     for (let i = 0; i < this.view.touches.length; i++)
    //         if (this.view.touches[i].pointerId == e.pointerId)
    //         {
    //             this.view.touches.splice(i, 1);
    //             break;
    //         }
    
    //     e.preventDefault();
    // });
    
    
    
    // this.view.div.addEventListener('touchcancel', e =>
    // {
    //     for (let i = 0; i < this.view.touches.length; i++)
    //         if (this.view.touches[i].pointerId == e.pointerId)
    //         {
    //             this.view.touches.splice(i, 1);
    //             break;
    //         }
    
    //     e.preventDefault();
    // });
    
    
    
    this.div.addEventListener('keydown', e =>
    {
        if (   e.code == 'Enter'
            || e.code == 'NumpadEnter')
            this.showTextarea();

        // else if (e.code == 'Space')
        //     setCursor(panCursor, true);
    });



    this.div.addEventListener('focus', () =>
    {
        if (   !this.view.spaceDown
            && !panMode
            && !this.buttonDown1
            && this.pointerEvents)
            this.showTextarea();
    });
};