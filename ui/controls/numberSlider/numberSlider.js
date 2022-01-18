function initNumberSliderChildren(slider)
{
    slider.bar = document.createElement('div');
    slider.bar.className = 'numberSliderBar';

    slider.text = document.createElement('div');
    slider.text.className = 'numberSliderText';

    slider.focus = document.createElement('div');
    slider.focus.className = 'numberSliderFocus';

    slider.appendChild(slider.bar);
    slider.appendChild(slider.text);
    slider.appendChild(slider.focus);
}



function initNumberSlider(slider, width, height, name, min, max, def, dragScale, wheelStep, dec, acc, suffix = '', log = false)
{
    slider.className         = 'numberSlider';

    slider.width             = width;
    slider.height            = height;
        
    slider.style.width       = width;
    slider.style.height      = height;
        
    slider.min               = min;
    slider.max               = max;
    slider.value             = def;
    slider.dec               = dec;
    slider.editDec           = dec;
    slider.acc               = acc;
               
    slider.name              = name;
    slider.suffix            = suffix;
    slider.log               = log;

    slider.dragScale         = dragScale;
    slider.wheelStep         = wheelStep;
        
    slider.backColor         = '#fff';
    slider.valueColor        = '#eee';
    slider.textColor         = '#000';
           
    slider.fontSize          = 11;
        
    slider.style.display     = 'inline';
        
    slider.mouseOver         = false;
    slider.buttonDown0       = false;
    slider.buttonDown1       = false;
        
    slider.clickSize         = 4;
    slider.moved             = false;
    
    slider.tabIndex          = 0;
    slider.inFocus           = false;
    slider.clicked           = false;

    slider.oldValue;

    slider.wrapValue         = false;
    slider.showHex           = false;
    
    slider.enableChangeEvent = true;

    slider.pointerEvents     = true;

    slider.valueText         = '';



    initNumberSliderChildren(slider);    
    initNumberSliderTextbox(slider);

    

    //

    slider.onchange  = new Event('change');
    slider.onconfirm = new Event('confirm');



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
            slider.clientX      = 0;
            slider.oldValue     = slider.value;

            slider.prevValue    = slider.value;
            slider.sx           = e.clientX;

            slider.focus.style.boxShadow = '0 0 0 1px ' + colorStyleRgb(rgbActiveObject) + ' inset';

            slider.clickTimer = setTimeout(function() { onSliderClickTimer(slider); }, 500);

            // I don't want to focus here, but I do want to take focus away from elsewhere
            document.activeElement.blur();
        }
        else if (e.button == 1)
        {
            e.preventDefault();
            slider.buttonDown1 = true;
        }
    });



    slider.addEventListener('pointermove', function(e)
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

        
        if (slider.buttonDown0)
        {
            //slider.style.boxShadow = '0 0 0 1px ' + colorStyleRgb(rgbActiveObject);
            
            if (slider.isPointerLocked())
            {
                slider.movedX += e.movementX;
                
                let dx       = slider.sx - slider.movedX;             
                let adaptive = 10 * Math.pow(Math.abs(dx), slider.acc);
                let drag     = slider.dragScale * Math.pow(10, -slider.editDec);

                
                // TODO: if (log) do log scaling
                let val = slider.oldValue - dx * drag * slider.dragScale * adaptive;
                
                const grain = Math.pow(10, -this.editDec);
                val = Math.floor(val / grain) * grain;
                
                slider.setValue(val, true, false);

                slider.prevValue = slider.value;
            }
            else
            {
                if (Math.abs(e.clientX - slider.sx) > slider.clickSize/2)
                {
                    slider.moved = true;
                    slider.lockPointer();
                }
            }
        }
        //else
        //    slider.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1) inset';
        
        // slider.update();
    });
    
    
    
    slider.addEventListener('losecapture', function()
    {
        slider.buttonDown0 = false;
        slider.mouseOver   = false;
        slider.update();
    });



    slider.addEventListener('pointerup', function(e)
    {
        clearTimeout(slider.clickTimer);

        if (   slider.moved
            || document.menuHadFocus)
        {
            slider.unlockPointer(e.pointerId);
            return;            
        }    

        if (slider.buttonDown0_)
        {
            slider.clicked = true;
            slider.showTextbox();
        }
        
        if (slider.buttonDown1)
            slider.buttonDown1 = false;

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
        if (   e.button == 1
            && slider.buttonDown1)
        {
            slider.buttonDown1 = false;            
        }
    });


    
    slider.addEventListener('pointerenter', function(e)
    {
        if (   !graphView.spaceDown
            && slider.pointerEvents)
        {
            slider.style.cursor           = 'ew-resize';
            
            slider.focus.style.boxShadow  = '0 0 0 1px rgba(0, 0, 0, 0.1) inset';
            slider.focus.style.visibility = 'visible';
            slider.focus.style.opacity    = '100%';
    
            slider.update();
        }
    });



    slider.addEventListener('pointerout', function(e)
    {
        slider.style.cursor           = 'default';
        
        slider.focus.style.visibility = 'hidden';
        slider.focus.style.opacity    = 0;

        slider.update();
    });



    slider.addEventListener('wheel', e =>
    {
        if (!slider.pointerEvents)
            return;

        if (   !getCtrlKey(e)
            && !slider.buttonDown1)
        {
            e.stopPropagation();

            slider.oldValue = slider.value;

            const dec = Math.pow(10, -slider.editDec);
            slider.setValue(slider.value + (e.deltaY > 0 ? -1 : 1) * slider.wheelStep * dec);
            // TODO conform after a delay and/or another action, same with key changes 
        }
    });



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
        this.name = name;
        this.update();
    };



    slider.setValue = function(value, fireChangeEvent = true, confirm = true, forceChange = false)
    {
        const oldValue = slider.value;


        if (slider.wrapValue)
        {
            while (value < slider.min) value += slider.max - slider.min;
            while (value > slider.max) value -= slider.max - slider.min;
        }
        else
            value = Math.min(Math.max(slider.min, value), slider.max);
        

        if (   value != oldValue
            || forceChange)
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




    slider.update = function()
    {
        let v  =  slider.value / (slider.max - slider.min);
        let cx = -slider.min   / (slider.max - slider.min) * slider.clientWidth;

        slider.focus.style.left   = 0;
        slider.focus.style.top    = 0;
        slider.focus.style.width  = slider.clientWidth;
        slider.focus.style.height = slider.clientHeight;


        slider.bar.style.background = slider.valueColor;

        slider.bar.style.top    = 0;//slider.mouseOver ? 1 : 0;
        slider.bar.style.height = slider.clientHeight;// - (slider.mouseOver ? 2 : 0);


        if (v >= 0)
        {
            slider.bar.style.left  = slider.offsetLeft + Math.round(cx);
            slider.bar.style.width = Math.round(v * slider.clientWidth);
        }
        else
        {
            slider.bar.style.left  = slider.offsetLeft + cx + v * slider.clientWidth;
            slider.bar.style.width = -v * slider.clientWidth;
        }


        slider    .style.background = slider.backColor;
        slider.bar.style.background = slider.valueColor;


        slider.text.style.color = slider.textColor;

        slider.text.innerHTML = '';
        
        if (slider.name.length > 0)
            slider.text.innerHTML += '<span class="sliderName">' + slider.name + "</span>&nbsp;&nbsp;";
        
        const valueText = 
            slider.valueText != ''
            ? slider.valueText
            : getNumberString(slider.value, slider.dec, slider.showHex).toUpperCase();

        slider.text.innerHTML += valueText + slider.suffix;
    };



    slider.lockPointer = function()
    {
        slider.requestPointerLock =    
               slider.requestPointerLock 
            || slider.mozRequestPointerLock;

        slider.requestPointerLock();
        clearTimeout(slider.clickTimer);

        slider.movedX = 0;
        slider.sx     = 0;
    };



    slider.unlockPointer = function()
    {
        document.exitPointerLock =    
               document.exitPointerLock    
            || document.mozExitPointerLock;

        document.exitPointerLock();
    };



    slider.isPointerLocked = function()
    {
        return (document.pointerLockElement    === slider 
             || document.mozPointerLockElement === slider);
    }
    


    slider.update();
}



function onSliderClickTimer(slider)
{
    if (!document.menuHadFocus)
    {
        slider.moved = true;
        slider.lockPointer();
    }
}