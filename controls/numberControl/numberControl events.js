NumberControl.prototype.initEvents = function()
{
    const controlDiv = 
        this.param 
        ? this.param.div 
        : this.div;

        
    controlDiv.addEventListener('pointerenter', e =>
    {
        const param = this.param;
        

        if (this.delayUse > 0)
        {
            controlDiv.style.cursor = 'default';
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
                   && graph.currentPage.zoom <= settings.minZoomForParams)
                   controlDiv.style.cursor = 'default';
            else
                this.updateCursor();

                    
            const colShadow = 
                darkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)';

            if (param)
            {
                this.divFocus.style.boxShadow = '0 1px 0 0 ' + colShadow + ' inset';

                if (    param.node
                    &&  param.node.params.includes(param)
                    && !isLastInArray(param.node.params, param))
                    this.divFocus.style.boxShadow += ', 0 -1px 0 0 ' + colShadow + ' inset';
            }
            else
            {
                this.divFocus.style.boxShadow  = '0 0 0 1px ' + colShadow + ' inset ';
            }


            this.divFocus.style.visibility = 'visible';
            this.divFocus.style.opacity    = '100%';
    
            this.update();
        }
    });



    controlDiv.addEventListener('pointerdown', e =>
    {
        const param = this.param;

    
        if (   graphView.overOutput && graphView.overOutput == this.param.output
            || graphView.overInput  && graphView.overInput  == this.param.input )
        {
            e.preventDefault();
            return;
        }

        
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
                this.divFocus.style.boxShadow = '0 0 0 1px var(--figma-color-bg-brand) inset';

            else
            {
                this.divFocus.style.boxShadow = '0 1px 0 0 var(--figma-color-bg-brand) inset';
                    
                if (param.index < param.node.params.length-1)
                    this.divFocus.style.boxShadow += ', 0 -1px 0 0 var(--figma-color-bg-brand) inset';
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



    controlDiv.addEventListener('pointermove', e =>
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


        let rect = boundingRect(controlDiv);
        
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
                    const grain    = Math.pow(10, -this.decimals);
                    const drag     = grain * sqr(this.dragScale);

                    const val      = this.startValue + dx * drag * adaptive;

                    
                    // reset control movement at the limits for better UX
                    const min = e.shiftKey ? this.min : this.displayMin;
                    const max = e.shiftKey ? this.max : this.displayMax;


                    this.setValue(
                        Math.round(val / grain) * grain,
                        this.decimals, 
                        true, 
                        false,
                        e.shiftKey,
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
        else if (this.readOnly)
        {
            this.moved = true;
        }
    });
    
    
    
    controlDiv.addEventListener('pointerleave', e =>
    {
        const param = this.param;


        if (!this.canReact(e))
            return;


        overNumberControl = null;


        if (panMode)
            return;


        controlDiv.style.cursor        = 'default';
        
        this.divFocus.style.visibility = 'hidden';
        this.divFocus.style.opacity    = 0;

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



    controlDiv.addEventListener('losecapture', () =>
    {
        this.buttonDown0 = false;
        this.buttonDown1 = false;
        this.buttonDown2 = false;
        this.mouseOver   = false;
        this.shiftDown   = false;

        numberControlChanging = null;
        
        this.update();
    });



    controlDiv.addEventListener('pointerup', e =>
    {
        const param = this.param;


        if (!this.canReact(e))
            return;


        if (panMode)
            return;


        clearTimeout(this.clickTimer);


        if (e.button == 0)
        {
            const colShadow = 
                darkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)';

            this.divFocus.style.boxShadow = '0 1px 0 0 ' + colShadow + ' inset';

            if (    param.node
                &&  param.node.params.includes(param)
                && !isLastInArray(param.node.params, param))
                this.divFocus.style.boxShadow += ', 0 -1px 0 0 ' + colShadow + ' inset';
        }


        if (   this.moved
            || document.menuHadFocus)
        {
            if (param)
                param.noUpdate = false;  

            this.shiftDown        = false;
            numberControlChanging = null;
 

            this.setValue(
                this.value,
                this.decimals,
                false,
                true,
                e.shiftKey);

            this.unlockPointer(e.pointerId);


            this.update();

            pushUpdateFromParam(null, [param.node], param);


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
            overNumberControl     = null;

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
        }
        else if (e.button == 1
              && this.buttonDown1)
        {
            this.buttonDown1 = false;            
        }
    });


    
    controlDiv.addEventListener('wheel', e =>
    {
        const param = this.param;


        if (!this.canReact(e))
            return;


        if (  !this.pointerEvents
            || panMode
            || graphView.wheelTimer)
            return;


        //const dWheelX = e.deltaX /  20 * (this.dragReverse ? -1 : 1);
        const dWheelY = e.deltaY / 100 * (this.dragReverse ? -1 : 1);


        const touchpad = isTouchpad(e);

        if (touchpad)
        {
            e.preventDefault();
            return;
        }


        if (   !getCtrlKey(e)
            && !this.buttonDown1
            && dWheelY != 0)
        {
            if (  !this.readOnly
                && this.param.node.type != EXPAND)
                e.stopPropagation();

            if (!this.readOnly)
            {
                if (   document.activeElement
                    && (   document.activeElement.tagName.toLowerCase() == 'input'
                        || document.activeElement.tagName.toLowerCase() == 'textarea')
                    && document.activeElement.control)
                    document.activeElement.control.textbox.finish(true, false);

                this.oldValue = this.value;

                const dec = Math.pow(10, -this.decimals);

                const val =
                    //touchpad
                    //? this.value -  dWheelX               * this.wheelScale * dec
                    //: 
                    this.value + (dWheelY > 0 ? -1 : 1) * this.wheelScale * dec;


                this.setValue(val, dec, true, true, false, true, e.shiftKey);

                if (this.param) this.param.changing = true;
                if (this.confirmTimer) clearTimeout(this.confirmTimer);
                this.confirmTimer = setTimeout(() => controlTimer_confirm(this), 300);
            }
        }
    });

    
    
    controlDiv.addEventListener('keydown', e =>
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



    // controlDiv.addEventListener('keyup', e =>
    // {
    //     // if (e.key == 'Shift')
    //     // {
    //     //     this.shiftDown = true;
    //     //     this.update();
    //     // }

    // }, true);



    controlDiv.addEventListener('focus', () =>
    {
        if (   !graphView.spaceDown
            && !panMode
            && !this.buttonDown1
            &&  this.pointerEvents)
            this.showTextbox();
    });
};