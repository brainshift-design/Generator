class ColorControl
extends Control
{
    value;
    acc;
     
     
    dragReverse       = false;
    dragScale;
    wheelScale;
             
    nameStyleLight    = 'rgba(255, 255, 255, 0.5 )';
    backStyleLight    = 'rgba(255, 255, 255, 0.95)';
    valueStyleLight   = 'transparent';
    textStyleLight    = '#000';
                
    nameStyleDark     = 'rgba(56, 56, 56, 0.5 )';
    backStyleDark     = 'rgba(56, 56, 56, 0.95)';
    valueStyleDark    = 'transparent';
    textStyleDark     = '#eee';

    //fontSize          = 11;
             
    mouseOver         = false;
    buttonDown0       = false;
    buttonDown1       = false;
             
    clickSize         = 4;
    moved             = false;
         
    tabIndex          = 0;
    inFocus           = false;
    clicked           = false;
 
    oldValue; 
 
    enableChangeEvent = true;
    
    successOnFocusOut = false;
    keyBlur           = false;
    
    readOnly          = false;
     
    valueText         = '';
    
    

    constructor(param, id, name, defaultValue, dragScale = 0.05, wheelScale = 1, acc = 0)
    {
        const divValue = createDiv('colorControlText');


        super(divValue, param, id, name);


        this.value       = defaultValue;
        this.acc         = acc;
         
        
        this.dragReverse = false;
        this.dragScale   = dragScale;
        this.wheelScale  = wheelScale;
                 

        this.divFocus    = createDiv('colorControlFocus');
        this.divValue    = divValue;
    
        this.div.appendChild(this.divFocus);
        this.div.appendChild(this.divValue);

        
        this.initTextbox();
        this.initEvents ();


        // this.div.style.boxShadow = '0 0 0 1px red inset';
    }    
    

    
    canReact(e)
    {
        if (   settings.enableZoomedOutParams
            || graph.currentPage.zoom > settings.minZoomForParams)
            return true;

        e.preventDefault();
        e.stopPropagation();

        forwardEvent(e, this.param.node.header);

        return false;
    }



    setName(name)
    {
        this.name = name;
        this.update();
    };



    setValue(value, fireChangeEvent = true, confirm = true)
    {
        //if (!(value instanceof ColorValue))
            //console.error('ColorControl.setValue(value) is ' + typeof value + ', must be a ColorValue');

        const oldValue = this.value.copy();

        this.value = value.copy();
        this.update();
        
        this.dispatchSetEvents(fireChangeEvent, value, oldValue, confirm);
    };



    dispatchSetEvents(fireChangeEvent, value, oldValue, confirm)
    {
        if (   fireChangeEvent
            && this.enableChangeEvent
            && !value.equals(this.prevValue))
            this.dispatchEvent(this.onchange);

        if (   confirm
            && this.enableChangeEvent
            && !value.equals(oldValue))
            this.dispatchEvent(this.onconfirm);
    }



    update()
    {
        if (!this.measureData.offsetRect)
            return;


        super.update();


        const sw = this.measureData.clientRect.width;
        const sh = this.measureData.clientRect.height;

        this.updateColors();
        this.updateText();
        this.updateFocus(sw, sh);
    };



    updateColors()
    {
        // this.param.div.style.background = 
        //     darkMode 
        //     ? this.backStyleDark 
        //     : this.backStyleLight;
        
        this.param.divName.style.color = !isDark(this.value.toRgb()) ? this.textStyleDark : this.textStyleLight;
        this.param.divName.style.opacity = 0.5;
        
        this.textbox.style.background = 'transparent';

        this.divValue.style.color = 
        this.textbox .style.color = 
            darkMode 
            ? this.textStyleDark 
            : this.textStyleLight;
    };



    updateText()
    {
        if (this.overrideText != NULL)
        {
            this.divValue.innerHTML = this.overrideText;
        }
        else
        {
            this.divValue.innerHTML = this.getValueText();
        }

        this.textbox.value = this.divValue.innerText;
        
        this.divValue.style.position = 'static';    
        this.divValue.style.width    = 'fit-content';    

        this.divValue.style.margin = 
            this.param.showName
            ? '4px auto 0 3px'
            : '4px auto 0 auto';
    };



    getValueText()
    {
        if (this.valueText != '')
            return this.valueText;

        else
            return this.value.isValid()
                && rgbIsValid(this.value.toRgb())
                ? rgb2hex(this.value.toRgb())
                : UNKNOWN_DISPLAY;
    }



    updateFocus(sw, sh)
    {
        this.divFocus.style.left   = 0;
        this.divFocus.style.top    = 0;
        this.divFocus.style.width  = sw;
        this.divFocus.style.height = sh;
    };



    updateFocusBorder()
    {
        const colShadow = 
            darkMode
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)';

        if (this.param)
        {
            this.divFocus.style.boxShadow = '0 1px 0 0 ' + colShadow + ' inset';

            if (    this.param.node
                &&  this.param.node.params.includes(this.param)
                && !isLastInArray(this.param.node.params, this.param))
                this.divFocus.style.boxShadow += ', 0 -1px 0 0 ' + colShadow + ' inset';
        }
        else
        {
            this.divFocus.style.boxShadow  = '0 0 0 1px ' + colShadow + ' inset ';
        }
    }
}