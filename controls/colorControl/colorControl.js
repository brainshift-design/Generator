class ColorControl
extends Control
{
    showColor         = true;

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


        this.showColor   = true;
    
        this.value       = defaultValue;
        this.acc         = acc;
         
        
        this.dragReverse = false;
        this.dragScale   = dragScale;
        this.wheelScale  = wheelScale;
                 

        this.divValue    = divValue;
        this.focus       = createDiv('colorControlFocus');
    
        this.div.appendChild(this.divValue);
        this.div.appendChild(this.focus);

        
        this.initTextbox();
        this.initEvents ();
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
        if (!(value instanceof ColorValue))
            console.assert(false, 'ColorControl.setValue(value) is ' + typeof value + ', must be a ColorValue');


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
        this.div    .style.background = darkMode ? this.backStyleDark : this.backStyleLight;
        this.textbox.style.background = 'transparent';

        this.divValue.style.color = 
        this.textbox .style.color = darkMode ? this.textStyleDark : this.textStyleLight;

        //this.divName .style.color = !isDark(this.value.toRgb()) ? this.textStyleDark : this.textStyleLight;
        //this.divName .style.opacity = 0.5;
    };



    updateText()
    {
        this.divValue.innerHTML = 
               this.value.isValid()
            && rgbIsValid(this.value.toRgb())
            ? rgb2hex(this.value.toRgb())
            : UNKNOWN_DISPLAY;

        this.textbox.value = this.divValue.innerText;


        // if (this.showName)
        // {
        //     this.divName .style.display    = 'inline-block';
        //     this.divName .style.right      = ((1-this.divider)*100) + '%';
        //     this.divValue.style.left       = (   this.divider *100) + '%';
            
        //     this.divName .style.transform  = 'translateX(' + (-(1-this.divider)*100) + '%' + ') tranlateY(-50%)';
        //     this.divValue.style.transform  = 'translateX(' + (-   this.divider *100) + '%' + ') tranlateY(-50%)';

        //     this.divValue.style.marginLeft = '3px';
        // }
        // else
        // {
        //     this.divName.style.display     = 'none';
            
            this.divValue.style.left       = '50%';
            this.divValue.style.transform  = 'translateX(-50%)';
            this.divValue.style.marginLeft =  0;
            this.divValue.style.width      = 'auto';
        // }
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
    }
}