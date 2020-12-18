function initSliderChildren(slider)
{
    slider.bar = document.createElement('DIV');
    slider.bar.className = 'sliderBar';

    slider.text = document.createElement('DIV');
    slider.text.className = 'sliderText';

    slider.appendChild(slider.bar);
    slider.appendChild(slider.text);
}


function initSlider(slider, width, height, name, min, max, def, dragScale, wheelStep, dec, acc, suffix = '', log = false, backColor = '#fff', valueColor = '#eee', fontSize = 11)
{
    slider.className         = 'slider';

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

    slider.wrapValue         = false;
    
    slider.enableChangeEvent = true;

    slider.inputConnected    = false;


    initSliderChildren(slider);    
    initSliderTextbox(slider);
    
    //

    slider.onchange = new Event('change');

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
    
            var opDiv = 
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
            slider.sx           = e.clientX;
            slider.sv           = slider.value;

            slider.style.boxShadow = '0 0 0 1px #18A0FB inset';
                        
            // I don't want to focus here, but I do want to take focus away from elsewhere
            document.activeElement.blur();

            slider.clickTimer = setTimeout(function() 
            {
                onSliderClickTimer(slider); 
            }, 500);
        }
        else if (e.button == 1)
            slider.buttonDown1 = true;
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

            slider.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1) inset';
        }
    });

    
    slider.addEventListener('pointerenter', function(e)
    {
        if (   !graphView.spaceDown
            && !slider.inputConnected)
        {
            slider.style.cursor    = 'ew-resize';
            slider.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1) inset';
        }
    });

    slider.addEventListener('pointerout', function(e)
    {
        slider.style.cursor    = 'default';
        slider.style.boxShadow = '0 -2px 0 -1px rgba(0, 0, 0, 0.1) inset';
    });


    slider.addEventListener('pointermove', function(e)
    {
        if (slider.inputConnected)
            return;

        var rect = slider.getBoundingClientRect();
        
        slider.mouseOver = 
               e.clientX >= rect.left
            && e.clientX <  rect.right
            && e.clientY >= rect.top                                     
            && e.clientY <  rect.bottom;
        
        slider.clientX = e.clientX;
        
        if (slider.buttonDown0)
        {
            slider.style.boxShadow = '0 0 0 1px #18A0FB inset';
            
            if (slider.isPointerLocked())
            {
                slider.movedX += e.movementX;
                
                var dx       = slider.sx - slider.movedX;             
                var adaptive = 10 * Math.pow(Math.abs(dx), slider.acc);
    
                // TODO: if (log) do log scaling
                var val = slider.sv - dx*slider.dragScale*adaptive;

                const grain = Math.pow(10, this.editDec);
                val = Math.floor(val / grain) * grain;
                
                slider.setValue(val);
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

        slider.update();
    });

    
    slider.addEventListener('wheel', e =>
    {
        if (!e.ctrlKey)
        {
            e.stopPropagation();
            slider.setValue(slider.value + (e.deltaY > 0 ? -1 : 1) * slider.wheelStep);
        }
    });


    slider.addEventListener('keydown', e =>
    {
        if (   e.code == 'Enter'
            || e.code == 'NumpadEnter')
            slider.showTextbox();

        // else if (e.code == 'Space')
        //     graphView.setPanCursor();
    });


    slider.addEventListener('focus', function()
    {
        if (   !graphView.spaceDown
            && !slider.buttonDown1
            && !slider.inputConnected)
            slider.showTextbox();
    });

    //

    slider.setValue = function(value, fireChangeEvent = true)
    {
        const oldValue = slider.value;

        if (slider.wrapValue)
        {
            while (value < slider.min) value += slider.max - slider.min;
            while (value > slider.max) value -= slider.max - slider.min;
        }
        else
            value = Math.min(Math.max(slider.min, value), slider.max);
        
        if (value != oldValue)
            slider.value = value;


        var v  = value / (slider.max - slider.min);
        var cx = -slider.min / (slider.max - slider.min) * slider.clientWidth;

        slider.bar.style.background = slider.valueColor;

        if (v >= 0)
        {
            slider.bar.style.left  = 1 + slider.offsetLeft + Math.round(cx);
            slider.bar.style.width = Math.round(v * slider.clientWidth);
        }
        else
        {
            slider.bar.style.left  = slider.offsetLeft + cx + v * slider.clientWidth;
            slider.bar.style.width = -v * slider.clientWidth;
        }

        slider.bar.style.background =
            slider.value >= 0
            ? slider.valueColor
            : 'repeating-linear-gradient(-60deg, #fff, #fff 1px, #e5e5e5 2px, #e5e5e5 3px, #fff 4px)';

        slider.bar.style.height = slider.clientHeight;

        slider.text.innerHTML = '';
        
        if (slider.name.length > 0)
            slider.text.innerHTML += slider.name + "&nbsp;&nbsp;";
            
        slider.text.innerHTML += getNumberString(value, slider.dec) + slider.suffix;

        if (   fireChangeEvent
            && slider.enableChangeEvent
            && value != oldValue)
            slider.dispatchEvent(slider.onchange);
    };


    slider.update = function()
    {
        slider.setValue(slider.value, false);
    }


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
    
    //

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