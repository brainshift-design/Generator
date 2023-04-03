class ColorControl
extends Control
{
    showName          = false;
    showColor         = true;

    value;
    acc;
     
     
    dragReverse       = false;
    dragScale;
    wheelScale;
             
    backStyleLight    = 'rgba(255, 255, 255, 0.95)';
    valueStyleLight   = 'transparent';
    textStyleLight    = '#000';
                
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
    
    pointerEvents     = true;
    readOnly          = false;
     
    valueText         = '';
    
    

    constructor(div, param, id, name, showName, defaultValue, dragScale = 0.05, wheelScale = 1, acc = 0)
    {
        super(div, param, id, name);


        this.showName          = showName;
        this.showColor         = true;
    
        this.value             = defaultValue;
        this.acc               = acc;
         
        
        this.dragReverse       = false;
        this.dragScale         = dragScale;
        this.wheelScale        = wheelScale;
                 

        this.text  = createDiv('colorControlText');
        this.focus = createDiv('colorControlFocus');
    
        this.div.appendChild(this.text);
        this.div.appendChild(this.focus);

        
        this.initTextbox();
        this.initEvents ();
    }    
    

    
    canReact(e)
    {
        if (   settings.enableZoomedOutParams
            || this.view.zoom > settings.minZoomForParams)
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
        if (!(value instanceof ColorValue))
            console.assert(false, 'ColorControl.setValue(value) is ' + typeof value + ', must be a ColorValue');


        const oldValue = this.value.copy();

        this.value = value.copy();


        if (this.showColor)
        {
            const rgb = this.value.toRgb();

            if (!rgbIsNaN(rgb))
            {
                this.valueStyleLight =
                this.valueStyleDark  = rgb2style(rgb);

                this.textStyleLight  = 
                this.textStyleDark   = rgba2style(getTextColorFromBackColor(rgb));
            }
            else
            {
                this.valueStyleLight =
                this.valueStyleDark  = 'var(--figma-color-bg)';
                
                this.textStyleLight  = 'black';
                this.textStyleDark   = 'white';
            }
        }


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

        const sw = this.measureData.clientRect.width;
        const sh = this.measureData.clientRect.height;

        this.updateColors();
        this.updateText();
        this.updateFocus(sw, sh);
    };



    updateColors()
    {
        this.div    .style.background = 
        this.textbox.style.background = 
            this.showColor
            ? (darkMode 
               ? this.valueStyleDark 
               : this.valueStyleLight)
            : (darkMode
               ? this.backStyleDark 
               : this.backStyleLight);

        this.text   .style.color = 
        this.textbox.style.color = 
            darkMode 
            ? this.textStyleDark 
            : this.textStyleLight;
    };



    updateText()
    {
        this.text.innerHTML = '';
        
        if (   this.name.length > 0
            && this.showName)
            this.text.innerHTML += (this.name.trim() != '' ? '<span class="colorControlName">' + this.name + '</span>&nbsp;&nbsp;' : '');

        this.text.innerHTML += 
               this.value.isValid()
            && rgbIsValid(this.value.toRgb())
            ? rgb2hex(this.value.toRgb())
            : UNKNOWN_DISPLAY;
    };



    updateFocus(sw, sh)
    {
        this.focus.style.left   = 0;
        this.focus.style.top    = 0;
        this.focus.style.width  = sw;
        this.focus.style.height = sh;
    };



    updateFocusBorder()
    {
        // if (this.buttonDown0)
        // {
        //     if (   !this.param
        //         || !this.param.node.selected)
        //         this.focus.style.boxShadow = '0 0 0 1px var(--figma-color-bg-brand) inset';

        //     else
        //     {
        //         this.focus.style.boxShadow = '0 1px 0 0 var(--figma-color-bg-brand) inset';
                    
        //         if (this.param.index < this.param.node.params.length-1)
        //             this.focus.style.boxShadow += ', 0 -1px 0 0 var(--figma-color-bg-brand) inset';
        //     }
        // }
        // else
        // {
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
        // }
    }
}