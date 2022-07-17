function initNumberSliderEvents(slider)
{
    slider.addEventListener('pointerdown', function(e)
    {
        if (graphView.spaceDown)
            return;

        if (e.button == 0)
        {
            if (!slider.pointerEvents)
            {
                e.stopPropagation();
                return;
            }
    
            let nodeDiv = 
                   slider.parentNode
                && slider.parentNode.parentNode
                && slider.parentNode.parentNode.parentNode
                ? slider.parentNode.parentNode.parentNode
                : null;

            if (nodeDiv && nodeDiv.className == 'node') 
                graphView.putNodeOnTop(nodeDiv.node);


            e.preventDefault(); // this is fine since I lock the pointer anyway
            e.stopPropagation();
                
            slider.buttonDown0  = true;
            slider.buttonDown0_ = true;
            slider.moved        = false;
            slider.clientX      = e.clientX;
            slider.movedX       = 0;


            if (!slider.readOnly)
            {
                slider.oldValue   = slider.value;
                slider.startValue = slider.value;
                slider.prevValue  = slider.value;
                slider.sx         = e.clientX;

                slider.clickTimer = setTimeout(() => 
                {
                    if (!document.menuHadFocus)
                    {
                        slider.moved = true;
                        slider.lockPointer(e.pointerId);
                    }
                }, 
                500);
            }


            const objCol = colorStyleRgb(rgbActiveObject);

            if (   !slider.param
                || !slider.param.node.selected)
                slider.focus.style.boxShadow = '0 0 0 1px ' + objCol + ' inset';

            else
            {
                slider.focus.style.boxShadow = '0 1px 0 0 ' + objCol + ' inset';
                    
                if (slider.param.index < slider.param.node.params.length-1)
                    slider.focus.style.boxShadow += ', 0 -1px 0 0 ' + objCol + ' inset';
            }


            // I don't want to focus here, but I do want to take focus away from elsewhere
            document.activeElement.blur();


            if (slider.param)
                slider.param.noUpdate = true;  
        }
        else if (e.button == 1)
        {
            e.preventDefault();
            slider.buttonDown1 = true;
        }
        else if (e.button == 2)
        {
            e.preventDefault();
            slider.buttonDown2 = true;
        }
    });



    slider.addEventListener('pointerenter', function(e)
    {
        if (   !graphView.spaceDown
            && slider.pointerEvents)
        {
            if (graphView.tempConn)
                slider.style.cursor = 'default';
            
            else
                slider.style.cursor = 
                       slider.readOnly 
                    || containsChild(slider, slider.textbox) 
                    ? 'default'
                    : 'ew-resize';
            
            if (slider.param)
            {
                slider.focus.style.boxShadow = '0  1px 0 0 rgba(0, 0, 0, 0.1) inset';

                if (    slider.param.node
                    &&  slider.param.node.params.includes(slider.param)
                    && !isLastInArray(slider.param.node.params, slider.param))
                    slider.focus.style.boxShadow += ', 0 -1px 0 0 rgba(0, 0, 0, 0.1) inset';
            }
            else
            {
                slider.focus.style.boxShadow  = '0 0 0 1px rgba(0, 0, 0, 0.1) inset ';
            }


            slider.focus.style.visibility = 'visible';
            slider.focus.style.opacity    = '100%';
    
            slider.update();
        }
    });



    slider.addEventListener('pointermove', e =>
    {
        if (!slider.pointerEvents)
            return;
        

        let rect = boundingRect(slider);
        
        slider.mouseOver = 
               e.clientX >= rect.left
            && e.clientX <  rect.right
            && e.clientY >= rect.top                                     
            && e.clientY <  rect.bottom;


        slider.clientX = e.clientX;

        
        if (    slider.buttonDown0
            && !slider.readOnly)
        {
            if (slider.isPointerLocked())
            {
                slider.movedX += e.movementX;
                
                if (!isNaN(slider.value))
                {
                    const dx       = slider.movedX * (slider.dragReverse ? -1 : 1);
                    const adaptive = 10 * Math.pow(Math.abs(dx), slider.acc);
                    const grain    = Math.pow(10, -slider.dec);
                    const drag     = grain * sqr(slider.dragScale);

                    const val      = slider.startValue + dx * drag * adaptive;

                    
                    // reset slider movement at the limits for better UX
                    const min = getCtrlKey(e) ? slider.min : slider.displayMin;
                    const max = getCtrlKey(e) ? slider.max : slider.displayMax;

                    slider.setValue(
                        Math.round(val / grain) * grain, 
                        true, 
                        false, 
                        false,
                        getCtrlKey(e));


                    if (   val <= min
                        || val >= max)
                    {
                        slider.movedX     = 0;
                        slider.startValue = slider.value;
                        slider.sx         = e.clientX;
                    }


                    if (slider.value != slider.prevValue)
                        pushUpdateFromParam([slider.param.node], slider.param);

                    slider.prevValue = slider.value;
                }
            }
            else
            {
                if (Math.abs(e.clientX - slider.sx) > slider.clickSize/2)
                {
                    slider.moved = true;
                    slider.lockPointer(e.pointerId);

                    slider.dispatchEvent(slider.onstartchange);
                }
            }
        }
        else if (graphView.tempConn
              && slider.param)
        {
            let savedInput = 
                graphView.savedConn
                ? graphView.savedConn.input
                : null;

            if (    graphView.tempConn.output
                &&  slider.param.input
                &&  slider.param.input.types.includes(graphView.tempConn.output.type)
                && !graphView.tempConn.output.node.follows(slider.param.node)
                && (  !slider.param.input.connected // not already connected to this input
                    || slider.param.input.connectedOutput != graphView.tempConn.output
                    || slider.param.input == savedInput))
            {
                graphView.overInput = slider.param.input;
                    
                slider.param.input.mouseOver = true;
                slider.param.input.updateControl();

                const rect = boundingRect(slider.param.input.control);

                graphView.tempConn.wire.inputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - controlBar.offsetHeight);
            }
            else if ( graphView.tempConn.input
                  &&  slider.param.output
                  &&  graphView.tempConn.input.types.includes(slider.param.output.type)
                  && !slider.param.node.follows(graphView.tempConn.input.node))
            {
                graphView.overOutput = slider.param.output;
                    
                slider.param.output.mouseOver = true;
                slider.param.output.updateControl();


                const rect = boundingRect(slider.param.output.control);

                graphView.tempConn.wire.outputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - controlBar.offsetHeight);


                graphView.tempConn.input.updateControl();
            }
        }
        else if (slider.readOnly)
        {
            slider.moved = true;
        }
    });
    
    
    
    slider.addEventListener('pointerleave', function(e)
    {
        slider.style.cursor           = 'default';
        
        slider.focus.style.visibility = 'hidden';
        slider.focus.style.opacity    = 0;

        slider.update();


        if (graphView.tempConn)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.node != slider.param.node)
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
                  && graphView.tempConn.input.node != slider.param.node)
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



    slider.addEventListener('losecapture', function()
    {
        slider.buttonDown0 = false;
        slider.buttonDown1 = false;
        slider.buttonDown2 = false;
        slider.mouseOver   = false;
        slider.update();
    });



    slider.addEventListener('pointerup', function(e)
    {
        clearTimeout(slider.clickTimer);


        if (graphView.tempConn)
        {
            if (    graphView.tempConn.output
                && !graphView.tempConn.output.node.follows(slider.param.node)
                &&  graphView.overInput)
            {
                graphView.endConnection(e.pointerId);
                graphView.overInput.endConnection();
            }
            else if (graphView.tempConn.input
                && !slider.param.node.follows(graphView.tempConn.input.node)
                &&  graphView.overOutput)
            {
                graphView.endConnection(e.pointerId);
                graphView.overOutput.endConnection();
            }
        }
        
        else if (   slider.moved
            || document.menuHadFocus)
        {
            slider.unlockPointer(e.pointerId);

            if (slider.param)
                slider.param.noUpdate = false;  

            return;            
        }

        else if (slider.buttonDown0_)
        {
            slider.clicked = true;
            slider.showTextbox();
        }

             if (e.button == 0) slider.buttonDown0 = false;
        else if (e.button == 1) slider.buttonDown1 = false;
        else if (e.button == 2) slider.buttonDown2 = false;

        slider.buttonDown0_ = false;
    });    



    document.addEventListener('pointerup', function(e)
    {
        if (   e.button == 0 
            && slider.buttonDown0)
        {
            slider.buttonDown0 = false;
            slider.unlockPointer(e.pointerId);

            slider.focus.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1) inset';

            // if (    slider.value != slider.oldValue
            //     && !slider.readOnly)
            //     slider.dispatchEvent(slider.onconfirm);
        }
        // else if (   e.button == 1
        //     && slider.buttonDown1)
        // {
        //     slider.buttonDown1 = false;            
        // }
    });


    
    slider.addEventListener('wheel', e =>
    {
        if (!slider.pointerEvents)
            return;


        const isTouchpad = 
               Math.abs(e.deltaX) < 100
            && Math.abs(e.deltaY) < 100;


        if (isTouchpad)
        {
            e.preventDefault();
            return;
        }


        const dWheelX = e.deltaX /  20 * (slider.dragReverse ? -1 : 1);
        const dWheelY = e.deltaY / 100 * (slider.dragReverse ? -1 : 1);


        if (   !getCtrlKey(e)
            && !slider.buttonDown1)
        {
            e.stopPropagation();

            if (!slider.readOnly)
            {
                if (   document.activeElement
                    && document.activeElement.tagName.toLowerCase() == 'input'
                    && document.activeElement.slider)
                    document.activeElement.slider.textbox.finish(true, false);

                slider.oldValue = slider.value;

                const dec = Math.pow(10, -slider.dec);

                const val =
                    isTouchpad
                    ? slider.value -  dWheelX               * slider.wheelScale * dec
                    : slider.value + (dWheelY > 0 ? -1 : 1) * slider.wheelScale * dec;
                
                slider.setValue(val, true, true, false, false);
            }
        }
    });



    // graphView.addEventListener('touchstart', e =>
    // {
    //     graphView.touches.push(e);
    //     e.preventDefault();
    // });
    
    
    
    // graphView.addEventListener('touchmove', e =>
    // {
    //     for (let i = 0; i < graphView.touches.length; i++)
    //         if (graphView.touches[i].pointerId == e.pointerId)
    //         {
    //             graphView.touches[i] = e;
    //             break;
    //         }
    
    //     e.preventDefault();
    // });
    
    
    
    // graphView.addEventListener('touchend', e =>
    // {
    //     for (let i = 0; i < graphView.touches.length; i++)
    //         if (graphView.touches[i].pointerId == e.pointerId)
    //         {
    //             graphView.touches.splice(i, 1);
    //             break;
    //         }
    
    //     e.preventDefault();
    // });
    
    
    
    // graphView.addEventListener('touchcancel', e =>
    // {
    //     for (let i = 0; i < graphView.touches.length; i++)
    //         if (graphView.touches[i].pointerId == e.pointerId)
    //         {
    //             graphView.touches.splice(i, 1);
    //             break;
    //         }
    
    //     e.preventDefault();
    // });
    
    
    
    slider.addEventListener('keydown', e =>
    {
        if (   e.code == 'Enter'
            || e.code == 'NumpadEnter')
            slider.showTextbox();

        // else if (e.code == 'Space')
        //     setCursor(panCursor, true);
    });



    slider.addEventListener('focus', function()
    {
        if (   !graphView.spaceDown
            && !slider.buttonDown1
            && slider.pointerEvents)
            slider.showTextbox();
    });
}