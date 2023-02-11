function initColorControlEvents(control)
{
    control.addEventListener('pointerdown', function(e)
    {
        if (graphView.spaceDown)
            return;

        if (e.button == 0)
        {
            if (!control.pointerEvents)
            {
                e.stopPropagation();
                return;
            }
    
            let nodeDiv = 
                   control.parentNode
                && control.parentNode.parentNode
                && control.parentNode.parentNode.parentNode
                ? control.parentNode.parentNode.parentNode
                : null;

            if (nodeDiv && nodeDiv.className == 'node') 
                graphView.putNodeOnTop(nodeDiv.node);


            e.preventDefault(); // this is fine since I lock the pointer anyway
            e.stopPropagation();
                
            control.buttonDown0  = true;
            control.buttonDown0_ = true;
            control.moved        = false;
            control.clientX      = e.clientX;
            control.movedX       = 0;


            if (!control.readOnly)
            {
                control.oldValue   = control.value;
                control.startValue = control.value;
                control.prevValue  = control.value;
                control.sx         = e.clientX;

                control.clickTimer = setTimeout(() => 
                {
                    if (!document.menuHadFocus)
                    {
                        control.moved = true;
                        control.lockPointer(e.pointerId);
                    }
                }, 
                500);
            }


            if (   !control.param
                || !control.param.node.selected)
                control.focus.style.boxShadow = '0 0 0 1px var(--figma-color-bg-brand) inset';

            else
            {
                control.focus.style.boxShadow = '0 1px 0 0 var(--figma-color-bg-brand) inset';
                    
                if (control.param.index < control.param.node.params.length-1)
                    control.focus.style.boxShadow += ', 0 -1px 0 0 var(--figma-color-bg-brand) inset';
            }


            // I don't want to focus here, but I do want to take focus away from elsewhere
            document.activeElement.blur();


            if (control.param)
                control.param.noUpdate = true;  
        }
        else if (e.button == 1)
        {
            e.preventDefault();
            control.buttonDown1 = true;
        }
        else if (e.button == 2)
        {
            e.preventDefault();
            control.buttonDown2 = true;
        }
    });



    control.addEventListener('pointerenter', function(e)
    {
        if (   !graphView.spaceDown
            && control.pointerEvents)
        {
            // if (graphView.tempConn)
            //     control.style.cursor = 'default';
            
            // else
            //     control.style.cursor = 
            //            control.readOnly 
            //         || containsChild(control, control.textbox) 
            //         ? 'default'
            //         : 'ew-resize';

                    
            const colShadow = 
                darkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)';

            if (control.param)
            {
                control.focus.style.boxShadow = '0 1px 0 0 ' + colShadow + ' inset';

                if (    control.param.node
                    &&  control.param.node.params.includes(control.param)
                    && !isLastInArray(control.param.node.params, control.param))
                    control.focus.style.boxShadow += ', 0 -1px 0 0 ' + colShadow + ' inset';
            }
            else
            {
                control.focus.style.boxShadow  = '0 0 0 1px ' + colShadow + ' inset ';
            }


            control.focus.style.visibility = 'visible';
            control.focus.style.opacity    = '100%';
    
            control.update();
        }
    });



    control.addEventListener('pointermove', e =>
    {
        if (!control.pointerEvents)
            return;
        

        let rect = boundingRect(control);
        
        control.mouseOver = 
               e.clientX >= rect.left
            && e.clientX <  rect.right
            && e.clientY >= rect.top                                     
            && e.clientY <  rect.bottom;


        control.clientX = e.clientX;

        
        if (    control.buttonDown0
            && !control.readOnly)
        {
            // if (control.isPointerLocked())
            // {
            //     control.movedX += e.movementX;
                
            //     if (!isNaN(control.value))
            //     {
            //         const dx       = control.movedX * (control.dragReverse ? -1 : 1);
            //         const adaptive = 10 * Math.pow(Math.abs(dx), control.acc);
            //         const grain    = Math.pow(10, -control.dec);
            //         const drag     = grain * sqr(control.dragScale);

            //         const val      = control.startValue + dx * drag * adaptive;

                    
            //         // reset control movement at the limits for better UX
            //         const min = getCtrlKey(e) ? control.min : control.displayMin;
            //         const max = getCtrlKey(e) ? control.max : control.displayMax;

            //         control.setValue(
            //             Math.round(val / grain) * grain, 
            //             true, 
            //             false);


            //         if (   val <= min
            //             || val >= max)
            //         {
            //             control.movedX     = 0;
            //             control.startValue = control.value;
            //             control.sx         = e.clientX;
            //         }


            //         if (control.value != control.prevValue)
            //             pushUpdateFromParam(null, [control.param.node], control.param);

            //         control.prevValue = control.value;
            //     }
            // }
            // else
            // {
            //     if (Math.abs(e.clientX - control.sx) > control.clickSize/2)
            //     {
            //         control.moved = true;
            //         control.lockPointer(e.pointerId);

            //         control.dispatchEvent(control.onstartchange);
            //     }
            // }
        }
        else if (graphView.tempConn
              && control.param)
        {
            let savedInput = 
                graphView.savedConn
                ? graphView.savedConn.input
                : null;

            if (    graphView.tempConn.output
                &&  control.param.input
                &&  control.param.input.canConnectFrom(graphView.tempConn.output)
                && !graphView.tempConn.output.node.isOrFollows(control.param.node)
                && (  !control.param.input.connected // not already connected to this input
                    || control.param.input.connectedOutput != graphView.tempConn.output
                    || control.param.input == savedInput))
            {
                graphView.overInput = control.param.input;
                    
                control.param.input.mouseOver = true;
                control.param.input.updateControl();

                const rect = boundingRect(control.param.input.div);

                graphView.tempConn.wire .inputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - menuBar.offsetHeight);
            }
            else if ( graphView.tempConn.input
                  &&  control.param.output
                  &&  graphView.tempConn.input.canConnectTo(control.param.output)
                  && !control.param.node.isOrFollows(graphView.tempConn.input.node))
            {
                graphView.overOutput = control.param.output;
                    
                control.param.output.mouseOver = true;
                control.param.output.updateControl();


                const rect = boundingRect(control.param.output.div);

                graphView.tempConn.wire .outputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - menuBar.offsetHeight);


                graphView.tempConn.input.updateControl();
            }
        }
        else if (control.readOnly)
        {
            control.moved = true;
        }
    });
    
    
    
    control.addEventListener('pointerleave', function(e)
    {
        control.style.cursor           = 'default';
        
        control.focus.style.visibility = 'hidden';
        control.focus.style.opacity    = 0;

        control.update();


        if (graphView.tempConn)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.node != control.param.node)
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
                  && graphView.tempConn.input.node != control.param.node)
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



    control.addEventListener('losecapture', function()
    {
        control.buttonDown0 = false;
        control.buttonDown1 = false;
        control.buttonDown2 = false;
        control.mouseOver   = false;
        control.update();
    });



    control.addEventListener('pointerup', function(e)
    {
        clearTimeout(control.clickTimer);


        if (graphView.tempConn)
        {
            if (    graphView.tempConn.output
                && !graphView.tempConn.output.node.isOrFollows(control.param.node)
                &&  graphView.overInput)
            {
                graphView.endConnection(e.pointerId);
                graphView.overInput.endConnection();
            }
            else if (graphView.tempConn.input
                && !control.param.node.isOrFollows(graphView.tempConn.input.node)
                &&  graphView.overOutput)
            {
                graphView.endConnection(e.pointerId);
                graphView.overOutput.endConnection();
            }
        }
        
        else if (   control.moved
            || document.menuHadFocus)
        {
            control.unlockPointer(e.pointerId);

            if (control.param)
                control.param.noUpdate = false;  

            return;            
        }

        else if (control.buttonDown0_)
        {
            control.clicked = true;
            control.showTextbox();
        }

             if (e.button == 0) control.buttonDown0 = false;
        else if (e.button == 1) control.buttonDown1 = false;
        else if (e.button == 2) control.buttonDown2 = false;

        control.buttonDown0_ = false;
    });    



    document.addEventListener('pointerup', function(e)
    {
        if (   e.button == 0 
            && control.buttonDown0)
        {
            control.buttonDown0 = false;
            control.unlockPointer(e.pointerId);

            control.focus.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1) inset';

            // if (    control.value != control.oldValue
            //     && !control.readOnly)
            //     control.dispatchEvent(control.onconfirm);
        }
        // else if (   e.button == 1
        //     && control.buttonDown1)
        // {
        //     control.buttonDown1 = false;            
        // }
    });


    
    control.addEventListener('wheel', e =>
    {
        if (!control.pointerEvents)
            return;


        const isTouchpad = 
               Math.abs(e.deltaX) < 100
            && Math.abs(e.deltaY) < 100;


        if (isTouchpad)
        {
            e.preventDefault();
            return;
        }


        // const dWheelX = e.deltaX /  20 * (control.dragReverse ? -1 : 1);
        // const dWheelY = e.deltaY / 100 * (control.dragReverse ? -1 : 1);


        if (   !getCtrlKey(e)
            && !control.buttonDown1)
        {
            e.stopPropagation();

            if (!control.readOnly)
            {
                // if (   document.activeElement
                //     && document.activeElement.tagName.toLowerCase() == 'input'
                //     && document.activeElement.control)
                //     document.activeElement.control.textbox.finish(true, false);

                // control.oldValue = control.value;

                // const dec = Math.pow(10, -control.dec);

                // const val =
                //     isTouchpad
                //     ? control.value -  dWheelX               * control.wheelScale * dec
                //     : control.value + (dWheelY > 0 ? -1 : 1) * control.wheelScale * dec;
                
                // control.setValue(val, true, true, false, false);
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
    
    
    
    control.addEventListener('keydown', e =>
    {
        if (   e.code == 'Enter'
            || e.code == 'NumpadEnter')
            control.showTextbox();

        // else if (e.code == 'Space')
        //     setCursor(panCursor, true);
    });



    control.addEventListener('focus', function()
    {
        if (   !graphView.spaceDown
            && !control.buttonDown1
            && control.pointerEvents)
            control.showTextbox();
    });
}