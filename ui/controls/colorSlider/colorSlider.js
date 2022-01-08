function initColorSliderChildren(slider)
{
    slider.text = document.createElement('div');
    slider.text.className = 'sliderText';

    slider.focus = document.createElement('div');
    slider.focus.className = 'sliderFocus';

    slider.appendChild(slider.text);
    slider.appendChild(slider.focus);
}



function initColorSlider(slider, width, height, name, def, dragScale, wheelStep, acc, suffix = '', log = false, backColor = '#fff', valueColor = '#eee', fontSize = 11)
{
    slider.className         = 'slider';

    slider.width             = width;
    slider.height            = height;
        
    slider.style.width       = width;
    slider.style.height      = height;
        
    slider.value             = def;
    slider.acc               = acc;
               
    slider.name              = name;
    slider.suffix            = suffix;
    slider.log               = log;

    slider.dragScale         = dragScale;
    slider.wheelStep         = wheelStep;
        
    slider.backColor         = backColor;
    slider.valueColor        = valueColor;
           
    slider.fontSize          = fontSize;
        
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

    //slider.wrapValue         = false;
    
    slider.enableChangeEvent = true;

    slider.inputConnected    = false;

    slider.valueText         = '';



    initColorSliderChildren(slider);    
    initColorSliderTextbox(slider);

    

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
            if (slider.inputConnected)
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

            slider.focus.style.boxShadow = '0 0 0 1px ' + activeObjectColor + ' inset';
            
            


            // I don't want to focus here, but I do want to take focus away from elsewhere
            document.activeElement.blur();

            slider.clickTimer = setTimeout(function() 
            {
                onSliderClickTimer(slider); 
            }, 500);
        }
        else if (e.button == 1)
        {
            e.preventDefault();
            slider.buttonDown1 = true;
        }
    });



    slider.addEventListener('pointermove', function(e)
    {
        if (slider.inputConnected)
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
            //slider.style.boxShadow = '0 0 0 1px ' + activeObjectColor;
            
            if (slider.isPointerLocked())
            {
                slider.movedX += e.movementX;
                
                let dx       = slider.sx - slider.movedX;             
                let adaptive = 10 * Math.pow(Math.abs(dx), slider.acc);
                
                // TODO: if (log) do log scaling
                let val = slider.oldValue - dx*slider.dragScale*adaptive;
                
                let editDec = 0;
                const grain = Math.pow(10, editDec);
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
            && !slider.inputConnected)
        {
            slider.style.cursor           = 'all-scroll';
            
            slider.focus.style.boxShadow  = '0 0 0 1px rgba(0, 0, 0, 0.1) inset';
            slider.focus.style.visibility = 'visible';
            slider.focus.style.opacity    = '100%';
    
            slider.update();
        }
    });



    slider.addEventListener('pointerout', function(e)
    {
        slider.style.cursor     = 'default';
        
        slider.focus.style.visibility = 'hidden';
        slider.focus.style.opacity    = 0;

        slider.update();
    });



    slider.addEventListener('wheel', e =>
    {
        if (   !getCtrlKey(e)
            && !slider.buttonDown1)
        {
            e.stopPropagation();

            slider.oldValue = slider.value;
            slider.setValue(slider.value + (e.deltaY > 0 ? -1 : 1) * slider.wheelStep);
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
            && !slider.inputConnected)
            slider.showTextbox();
    });


    
    slider.setValue = function(value, fireChangeEvent = true, confirm = true)
    {
        const oldValue = slider.value;

        // if (slider.wrapValue)
        // {
        //     while (value < slider.min) value += slider.max - slider.min;
        //     while (value > slider.max) value -= slider.max - slider.min;
        // }
        // else
        //     value = Math.min(Math.max(slider.min, value), slider.max);
        
        if (  !confirm
            || value != oldValue)
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
    };




    slider.update = function()
    {
        // let v  =  slider.value / (slider.max - slider.min);
        // let cx = -slider.min / (slider.max - slider.min) * slider.clientWidth;

        // slider.bar.style.background = slider.valueColor;

        // slider.bar.style.top    = 0;//slider.mouseOver ? 1 : 0;
        // slider.bar.style.height = slider.clientHeight;// - (slider.mouseOver ? 2 : 0);

        slider.focus.style.left   = 0;
        slider.focus.style.top    = 0;
        slider.focus.style.width  = slider.clientWidth;
        slider.focus.style.height = slider.clientHeight;

        // if (v >= 0)
        // {
        //     slider.bar.style.left  = slider.offsetLeft + Math.round(cx);
        //     slider.bar.style.width = Math.round(v * slider.clientWidth);
        // }
        // else
        // {
        //     slider.bar.style.left  = slider.offsetLeft + cx + v * slider.clientWidth;
        //     slider.bar.style.width = -v * slider.clientWidth;
        // }

        // slider.bar.style.background =
        //     slider.value >= 0
        //     ? slider.valueColor
        //     : 'repeating-linear-gradient(-60deg, #fff, #fff 1px, #e5e5e5 2px, #e5e5e5 3px, #fff 4px)';

        slider.text.innerHTML = '';
        
        if (slider.name.length > 0)
            slider.text.innerHTML += '<span class="sliderName">' + slider.name + "</span>&nbsp;&nbsp;";
        
        let valueText = 
            slider.valueText != ''
            ? slider.valueText
            : rgb2hex(slider.value);

        slider.text.innerHTML += valueText + slider.suffix;

        slider.style.backgroundColor = colorStyle(slider.value);
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