NumberControl.prototype.initEvents = function()
{
    this.div.addEventListener('pointerenter', e =>
    {
        const param = this.param;
        

        if (this.delayUse > 0)
        {
            this.div.style.cursor = 'default';
            this.startDelayUseTimer();
        }


        if (!this.canReact(e))
            return;


        //tooltip_pointerLeave(currentTooltip);


        overNumberControl = this;


        if (panMode)
        {
            setCursor(panCursor);
            return;
        }


        if (   !graphView.spaceDown
            &&  this.pointerEvents)
        {
            if (   graphView.tempConn
                ||   !settings.enableZoomedOutParams
                   && graphView.zoom <= settings.minZoomForParams)
                this.div.style.cursor = 'default';
            else
                this.updateCursor();

                    
            const colShadow = 
                darkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)';

            if (param)
            {
                this.focus.style.boxShadow = '0 1px 0 0 ' + colShadow + ' inset';

                if (    param.node
                    &&  param.node.params.includes(param)
                    && !isLastInArray(param.node.params, param))
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
        const param = this.param;


        if (e.button == 0)
        {
            this.buttonDown0  = true;
            this.buttonDown0_ = true;
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

            if (   nodeDiv 
                && nodeDiv.className == 'node') 
                graphView.putNodeOnTop(nodeDiv.node);


            e.preventDefault(); // this is fine since I lock the pointer anyway
            e.stopPropagation();
                

            this.moved        = false;
            this.clientX      = e.clientX;
            this.movedX       = 0;


            if (!this.readOnly)
            {
                this.oldValue   = this.value;
                this.startValue = this.value;
                this.prevValue  = this.value;
                this.sx         = e.clientX;

                this.clickTimer = setTimeout(() => 
                {
                    if (!document.menuHadFocus)
                    {
                        numberControlChanging = this;
                        this.shiftDown = e.shiftKey;
                        this.update();

                        this.moved = true;
                        this.lockPointer(e.pointerId);
                    }
                }, 
                500);
            }


            if (   !param
                || !param.node.selected)
                this.focus.style.boxShadow = '0 0 0 1px var(--figma-color-bg-brand) inset';

            else
            {
                this.focus.style.boxShadow = '0 1px 0 0 var(--figma-color-bg-brand) inset';
                    
                if (param.index < param.node.params.length-1)
                    this.focus.style.boxShadow += ', 0 -1px 0 0 var(--figma-color-bg-brand) inset';
            }


            // I don't want to focus here, but I do want to take focus away from elsewhere
            document.activeElement.blur();


            if (param)
                param.noUpdate = true;  
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

            if (    param
                && !isEmpty(this.options))
            {
                initSelectParamMenu(param);
                menuSelectParam.showAt(e.clientX, e.clientY, false);
            }
        }
    });



    this.div.addEventListener('pointermove', e =>
    {
        const param = this.param;


        if (!this.canReact(e))
            return;


        if (panMode)
        {
            setCursor(panCursor);
            return;
        }

        if (!this.pointerEvents)
            return;
        


        // if (   !document.canResizeL
        //     && !document.canResizeR
        //     && !document.canResizeB)
            this.updateCursor();


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
            if (this.isPointerLocked())
            {
                numberControlChanging = this;

                this.movedX += e.movementX;
                
                if (!isNaN(this.value))
                {
                    const dx       = this.movedX * (this.dragReverse ? -1 : 1);
                    const adaptive = 10 * Math.pow(Math.abs(dx), this.acc);
                    const grain    = Math.pow(10, -this.dec);
                    const drag     = grain * sqr(this.dragScale);

                    const val      = this.startValue + dx * drag * adaptive;

                    
                    // reset control movement at the limits for better UX
                    const min = e.shiftKey ? this.min : this.displayMin;
                    const max = e.shiftKey ? this.max : this.displayMax;

                    this.setValue(
                        Math.round(val / grain) * grain, 
                        true, 
                        false,
                        e.shiftKey);


                    if (   val <= min
                        || val >= max)
                    {
                        this.movedX     = 0;
                        this.startValue = this.value;
                        this.sx         = e.clientX;
                    }


                    if (this.value != this.prevValue)
                        pushUpdateFromParam(null, [param.node], param);

                    this.prevValue = this.value;
                }


                this.shiftDown = e.shiftKey;
            }
            else
            {
                if (Math.abs(e.clientX - this.sx) > this.clickSize/2)
                {
                    this.moved = true;
                    this.lockPointer(e.pointerId);

                    this.dispatchEvent(this.onstartchange);
                }
            }
        }
        else if (graphView.tempConn
              && param)
        {
            let savedInput = 
                graphView.savedConn
                ? graphView.savedConn.input
                : null;

            if (    graphView.tempConn.output
                &&  param.input
                &&  param.input.canConnectFrom(graphView.tempConn.output)
                && !graphView.tempConn.output.node.isOrFollows(param.node)
                && (  !param.input.connected // not already connected to this input
                    || param.input.connectedOutput != graphView.tempConn.output
                    || param.input == savedInput))
            {
                graphView.overInput = param.input;
                    
                param.input.mouseOver = true;
                param.input.updateControl();

                const rect = boundingRect(param.input.div);

                graphView.tempConn.wire.inputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - menuBarHeight);
            }
            else if ( graphView.tempConn.input
                  &&  param.output
                  &&  graphView.tempConn.input.canConnectFrom(param.output)
                  && !param.node.isOrFollows(graphView.tempConn.input.node))
            {
                graphView.overOutput = param.output;
                    
                param.output.mouseOver = true;
                param.output.updateControl();


                const rect = boundingRect(param.output.div);

                graphView.tempConn.wire .outputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - menuBarHeight);


                graphView.tempConn.input.updateControl();
            }
        }
        else if (this.readOnly)
        {
            this.moved = true;
        }
    });
    
    
    
    this.div.addEventListener('pointerleave', e =>
    {
        const param = this.param;


        if (!this.canReact(e))
            return;


        overNumberControl = null;


        if (panMode)
            return;


        this.div.style.cursor       = 'default';
        
        this.focus.style.visibility = 'hidden';
        this.focus.style.opacity    = 0;

        this.update();


        if (graphView.tempConn)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.node != param.node)
            {
                const input = graphView.overInput;
                
                graphView.overInput   = null;
                
                if (input) // will be null if data types don't match or there's no auto input for someo other reason
                {
                    input.mouseOver = false;
                    input.updateControl();
                }
                
                graphView.tempConn.wire.inputPos = point_NaN;
            }
            else if (graphView.tempConn.input
                  && graphView.tempConn.input.node != param.node)
            {
                const output = graphView.overOutput;
                
                graphView.overOutput = null;

                if (output) // will be null if data types don't match or there's no auto output for someo other reason
                {
                    output.mouseOver = false;
                    output.updateControl();
                }

                graphView.tempConn.wire.outputPos = point_NaN;
                graphView.tempConn.input.updateControl();
           }
        }
    });



    this.div.addEventListener('losecapture', () =>
    {
        this.buttonDown0 = false;
        this.buttonDown1 = false;
        this.buttonDown2 = false;
        this.mouseOver   = false;
        this.shiftDown   = false;

        numberControlChanging = null;
        
        this.update();
    });



    this.div.addEventListener('pointerup', e =>
    {
        const param = this.param;


        if (!this.canReact(e))
            return;


        if (panMode)
            return;


        clearTimeout(this.clickTimer);

  
        if (this.isPointerLocked())
        {
            this.setValue(
                this.value,
                false, 
                true,
                e.shiftKey);
        }


        if (graphView.tempConn)
        {
            if (    graphView.tempConn.output
                && !graphView.tempConn.output.node.isOrFollows(param.node)
                &&  graphView.overInput)
            {
                graphView.endConnection(e.pointerId, getCtrlKey(e));
                graphView.overInput.endConnection();
            }
            else if (graphView.tempConn.input
                && !param.node.isOrFollows(graphView.tempConn.input.node)
                &&  graphView.overOutput)
            {
                graphView.endConnection(e.pointerId, getCtrlKey(e));
                graphView.overOutput.endConnection();
            }
        }
        
        else if (this.moved
              || document.menuHadFocus)
        {
            this.unlockPointer(e.pointerId);

            if (param)
                param.noUpdate = false;  

            this.shiftDown        = false;
            numberControlChanging = null;
 
            this.update();
            return;            
        }

        else if (this.buttonDown0_)
        {
            this.clicked = true;
            this.showTextbox();
        }


        if (e.button == 0) 
        {
            this.buttonDown0 = false;
            this.shiftDown   = false;

            numberControlChanging = null;


            overNumberControl = null;
            this.updateCursor();
            this.startDelayUseTimer();
        }

        else if (e.button == 1) 
            this.buttonDown1 = false;

        else if (e.button == 2) 
        {
            e.stopPropagation();
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
        else if (   e.button == 1
            && this.buttonDown1)
        {
            this.buttonDown1 = false;            
        }
    });


    
    this.div.addEventListener('wheel', e =>
    {
        const param = this.param;


        if (!this.canReact(e))
            return;


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


        const dWheelX = e.deltaX /  20 * (this.dragReverse ? -1 : 1);
        const dWheelY = e.deltaY / 100 * (this.dragReverse ? -1 : 1);


        if (   !getCtrlKey(e)
            && !this.buttonDown1)
        {
            e.stopPropagation();

            if (!this.readOnly)
            {
                if (   document.activeElement
                    && (   document.activeElement.tagName.toLowerCase() == 'input'
                        || document.activeElement.tagName.toLowerCase() == 'textarea')
                    && document.activeElement.control)
                    document.activeElement.control.textbox.finish(true, false);

                this.oldValue = this.value;

                const dec = Math.pow(10, -this.dec);

                const val =
                    touchpad
                    ? this.value -  dWheelX               * this.wheelScale * dec
                    : this.value + (dWheelY > 0 ? -1 : 1) * this.wheelScale * dec;


                this.setValue(val, true, true, false);

                if (this.param) this.param.changing = true;
                if (this.confirmTimer) clearTimeout(this.confirmTimer);
                this.confirmTimer = setTimeout(() => controlTimer_confirm(this), 400);
            }
        }
    });

    
    
    this.div.addEventListener('keydown', e =>
    {
        if (   e.code == 'Enter'
            || e.code == 'NumpadEnter')
            this.showTextbox();

        // else if (e.key == 'Shift')
        // {
        //     this.shiftDown = true;
        //     this.update();
        // }

    }, true);



    // this.div.addEventListener('keyup', e =>
    // {
    //     // if (e.key == 'Shift')
    //     // {
    //     //     this.shiftDown = true;
    //     //     this.update();
    //     // }

    // }, true);



    this.div.addEventListener('focus', () =>
    {
        if (   !graphView.spaceDown
            && !panMode
            && !this.buttonDown1
            &&  this.pointerEvents)
            this.showTextbox();
    });
}