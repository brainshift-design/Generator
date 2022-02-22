function initNumberSliderChildren(slider)
{
    slider.bar   = createDiv('numberSliderBar');
    slider.text  = createDiv('numberSliderText');
    slider.focus = createDiv('numberSliderFocus');

    slider.appendChild(slider.bar);
    slider.appendChild(slider.text);
    slider.appendChild(slider.focus);
}



function initNumberSlider(param, slider, width, height, id, name, showName, min, max, def, dec = 0, dragScale = 0.05, wheelScale = 1, acc = 0, suffix = '', log = false)
{
    slider.param                 = param;
    
    slider.className             = 'numberSlider';
    
    slider.width                 = width;
    slider.height                = height;
            
    slider.style.width           = width;
    slider.style.height          = height;
            
    slider.min                   = min;
    slider.max                   = max;
    slider.value                 = def;
    slider.acc                   = acc;
    
    slider.dec                   =
    slider.displayDec            = dec;
        
    slider.displayMin            = min;
    slider.displayMax            = max;
    slider.valueScale            = 1;
               
    slider.id                    = id;
    slider.name                  = name;
    slider.suffix                = suffix;
    slider.valueCanContainSuffix = false;
    slider.log                   = log;
    
    slider.dragScale             = dragScale;
    slider.wheelScale            = wheelScale;
            
    slider.backColor             = 'transparent';
    slider.valueColor            = '#7772';
    slider.textColor             = '#000';
               
    slider.fontSize              = 11;
            
    slider.style.display         = 'inline';
            
    slider.mouseOver             = false;
    slider.buttonDown0           = false;
    slider.buttonDown1           = false;
            
    slider.clickSize             = 4;
    slider.moved                 = false;
        
    slider.tabIndex              = 0;
    slider.inFocus               = false;
    slider.clicked               = false;

    slider.oldValue;

    slider.wrapValue             = false;
    
    slider.showName              = showName;
    slider.showHex               = false;
        
    slider.enableChangeEvent     = true;
    slider.successOnFocusOut     = false;
    
    slider.pointerEvents         = true;
    slider.readOnly              = false;
    
    slider.valueText             = '';
    
    slider.barTop                = 0;
    slider.barBottom             = 1;
    
    slider.ranges                = [];
    slider.rangeDivs             = [];
    
    slider.options               = []; // if dec == 0, show named choices instead of a value


    
    initNumberSliderChildren(slider);    
    initNumberSliderTextbox(slider);

    

    //

    slider.onstartchange = new Event('startchange');
    slider.onchange      = new Event('change');
    slider.onconfirm     = new Event('confirm');



    //

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
    
            let opDiv = 
                   slider.parentNode
                && slider.parentNode.parentNode
                && slider.parentNode.parentNode.parentNode
                ? slider.parentNode.parentNode.parentNode
                : null;

            if (opDiv && opDiv.className == 'node') 
                graphView.putNodeOnTop(opDiv.op);


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
                || !slider.param.op.selected)
                slider.focus.style.boxShadow = '0 0 0 1px ' + objCol + ' inset';

            else
            {
                slider.focus.style.boxShadow = '0 1px 0 0 ' + objCol + ' inset';
                    
                if (param.op.params.indexOf(param) < param.op.params.length-1)
                    slider.focus.style.boxShadow += ', 0 -1px 0 0 ' + objCol + ' inset';
            }


            // I don't want to focus here, but I do want to take focus away from elsewhere
            document.activeElement.blur();
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
                slider.movedX  += e.movementX;
                
                if (!isNaN(slider.value))
                {
                    const dx       = slider.movedX;
                    const adaptive = 10 * Math.pow(Math.abs(dx), slider.acc);
                    const grain    = Math.pow(10, -slider.dec);
                    const drag     = grain * sqr(slider.dragScale);

                    const val = slider.startValue + dx * drag * adaptive;


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
                        slider.param.op.pushUpdate();
                                        
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
            if (    graphView.tempConn.output
                &&  slider.param.input
                &&  graphView.tempConn.output.dataType == slider.param.input.dataType
                && !graphView.tempConn.output.op.follows(slider.param.op))
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
                  &&  graphView.tempConn.input.dataType == slider.param.output.dataType
                  && !slider.param.op.follows(graphView.tempConn.input.op))
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
                && !graphView.tempConn.output.op.follows(slider.param.op)
                &&  graphView.overInput)
            {
                graphView.endConnection(e.pointerId);
                graphView.overInput.endConnection();
            }
            else if (graphView.tempConn.input
                && !slider.param.op.follows(graphView.tempConn.input.op)
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

            if (slider.value != slider.oldValue)
                slider.dispatchEvent(slider.onconfirm);
        }
        // else if (   e.button == 1
        //     && slider.buttonDown1)
        // {
        //     slider.buttonDown1 = false;            
        // }
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
                    ? 'default' //(slider.readOnly ? 'default' : 'auto')
                    : 'ew-resize';
            
            if (slider.param)
            {
                slider.focus.style.boxShadow = '0  1px 0 0 rgba(0, 0, 0, 0.1) inset';
                
                if (param.op.params.indexOf(param) < param.op.params.length-1)
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



    slider.addEventListener('pointerleave', function(e)
    {
        slider.style.cursor           = 'default';
        
        slider.focus.style.visibility = 'hidden';
        slider.focus.style.opacity    = 0;

        slider.update();


        if (graphView.tempConn)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.op != slider.param.op)
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
                  && graphView.tempConn.input.op != slider.param.op)
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


        const dWheelX = e.deltaX /  20;
        const dWheelY = e.deltaY / 100;


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


    
    slider.setName = function(name)
    {
        slider.name = name;
        slider.update();
    };



    slider.setValue = function(value, fireChangeEvent = true, confirm = true, forceChange = false, fullRange = true)
    {
        const oldValue = slider.value;


        if (isNaN(value))
            forceChange = true;

        else
        {
            const dec = Math.pow(10, Math.abs(slider.dec));
            value = Math.round(value * dec) / dec;

            if (slider.wrapValue)
            {
                while (value < slider.displayMin) value += slider.displayMax - slider.displayMin;
                while (value > slider.displayMax) value -= slider.displayMax - slider.displayMin;
            }
            else if (fullRange)
                value = Math.min(Math.max(slider.min, value), slider.max);
            else
                value = Math.min(Math.max(slider.displayMin, value), slider.displayMax);
        }


        if (   forceChange
            || isNaN(oldValue)
            || Math.abs(value - oldValue) > Number.EPSILON)
        {
            slider.value = value;

            slider.update();

            if (   fireChangeEvent
                && slider.enableChangeEvent
                && value != slider.prevValue)
                slider.dispatchEvent(slider.onchange);

            if (   confirm
                && slider.enableChangeEvent
                && value != oldValue)
                slider.dispatchEvent(slider.onconfirm);
        }
    };




    slider.setSuffix = function(suffix, valueCanContainSuffix = false)
    {
        slider.suffix                = suffix;
        slider.valueCanContainSuffix = valueCanContainSuffix;
    };
    


    slider.setMin = (min, dispatchEvents = true) =>
    {
        slider.min        = min;
        slider.displayMin = min;

        if (slider.value < min) 
            slider.setValue(min, true, true, dispatchEvents);
    };



    slider.setMax = (max, dispatchEvents = true) =>
    {
        slider.max        = max;
        slider.displayMax = max;

        if (max < slider.value) 
            slider.setValue(max, true, true, dispatchEvents);
    };



    slider.setDecimals = (dec, dspDec = dec) =>
    {
        slider.dec        = dec;
        slider.displayDec = dspDec;
    };



    slider.update = function()
    {
        const sw = slider.clientWidth;
        const sh = slider.clientHeight;

        const sx = slider.offsetLeft;
        const cx = -slider.displayMin / (slider.displayMax - slider.displayMin) * sw;
        const v  =  slider.value      / (slider.displayMax - slider.displayMin);

        slider.updateBar(sx, cx, v, sw, sh);
        slider.updateColors();
        slider.updateText();
        slider.updateFocus(sw, sh);
        
        updateSliderRanges(slider, sw, sh);
    };



    slider.updateBar = function(sx, cx, v, sw, sh)
    {
        if (isNaN(slider.value))
            slider.bar.style.display = 'none';

        else
        {
            slider.bar.style.display = 'block';

            const x = 
                v >= 0
                ? sx + cx
                : sx + cx + v * sw;

            slider.bar.style.left   = Math.max(0, x);
            slider.bar.style.width  = Math.min(Math.max(0, Math.round(Math.abs(v) * sw) + Math.min(0, x)), slider.offsetWidth);

            slider.bar.style.top    = sh * slider.barTop;
            slider.bar.style.height = sh * (slider.barBottom - slider.barTop);
        }
    };



    slider.updateColors = function()
    {
        slider     .style.background = slider.backColor;
        slider.bar .style.background = slider.valueColor;
        slider.text.style.color      = slider.textColor;
    };



    slider.updateText = function()
    {
        slider.text.innerHTML = '';
        
        if (   slider.name.length > 0
            && slider.showName)
            slider.text.innerHTML += '<span class="numberSliderName">' + slider.name + "</span>&nbsp;&nbsp;";

        slider.text.innerHTML += slider.getValueText() + slider.suffix;
    };



    slider.updateFocus = function(sw, sh)
    {
        slider.focus.style.left   = 0;
        slider.focus.style.top    = 0;
        slider.focus.style.width  = sw;
        slider.focus.style.height = sh;
    };



    slider.getValueText = function()
    {
        if (   slider.options.length > 0
            && slider.displayDec == 0)
        {
            if (   slider.value <  0 
                || slider.value >= slider.options.length)
                return '?';
            else
                return slider.options[Math.round(slider.value)];
        }
        else if (slider.valueText != '')
        {
            return slider.valueText;
        }
        else
        {
            return isNaN(slider.value)
                   ? '?'
                   : getNumberString(
                         slider.value * slider.valueScale, 
                         slider.displayDec, 
                         slider.showHex
                     ).toUpperCase();
        }
    };



    slider.lockPointer = function(pointerId)
    {
        clearTimeout(slider.clickTimer);

        slider.requestPointerLock =    
               slider.      requestPointerLock 
            || slider.   mozRequestPointerLock
            || slider.webkitRequestPointerLock;

        slider.requestPointerLock();
    };



    slider.unlockPointer = function(pointerId)
    {
        document.exitPointerLock =    
               document.      exitPointerLock    
            || document.   mozExitPointerLock
            || document.webkitExitPointerLock;

        document.exitPointerLock();
    };



    slider.isPointerLocked = function()
    {
        return (document.      pointerLockElement === slider 
             || document.   mozPointerLockElement === slider
             || document.webkitPointerLockElement === slider);
    }



    slider.update();
}