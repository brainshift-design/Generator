class TextControl
extends Control
{
    value;


    textbox;
    placeholder;

    valueText         = '';


    enableChangeEvent = true;
    
    successOnFocusOut = false;
    keyBlur           = false;

    
    readOnly          = false;
    

    confirmTimer      = null;
    
    

    constructor(div, param, id, name, defaultValue = '')
    {
        super(div, param, id, name);


        this.value = defaultValue;
        
        
        this.div.className = 'textControl';


        this.initTextarea();
        this.initEvents ();
        

        this.div.appendChild(this.textbox);


        createTooltipSrc(this.div, this.div, () => 
                settings.showTooltipLongText
            &&  scrollbarVisible(this.textbox)
            && !hasFocus(this.textbox)
            ? ttText
            : null);
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
        this.name      = name;
        this.savedName = name;
        
        this.update();
    }



    setSize(w, h)
    {
        super.setSize(w, h);

        if (this.textbox)
        {
            this.textbox.style.left   = (this.param && this.param.input ? 8 : 0) + 'px';
            
            this.textbox.style.width  = this.param && this.param.input ? 'calc(100% - 8px)' : '100%';
            this.textbox.style.height = Math.max(defParamHeight, h);
        }
    }



    setValue(value, fireChangeEvent = true, updateControl = true)
    {
        if (typeof value != 'string')
            console.assert(false, 'TextControl.setValue(value) is ' + typeof value + ', must be a string');

            
        this.value = value;

        if (updateControl)
            this.textbox.value = value;


        this.update();


        if (   fireChangeEvent
            && this.enableChangeEvent)
            this.dispatchEvent(this.onchange);
    }




    update()
    {
        if (typeof this.value !== 'string')
            console.assert(false, 'TextControl.update() value is ' + typeof this.value + ', must be a string');

        if (!this.measureData.offsetRect)
            return;

            
        this.textbox.placeholder = 
            this.value == NAN_CHAR
            ? UNKNOWN_DISPLAY
            : this.textbox.defPlaceholder;


        if (this.valueText != '')
            this.textbox.value = this.valueText;
        else if (this.value == NAN_CHAR)
            this.textbox.value = '';


        const  input = this.param && this.param. input;
        const output = this.param && this.param.output;

        const left  = input ? 12 : 0;
        const dw = 
              ( input ? 12 : 0) 
            + (output ? 12 : 0);

        this.textbox.style.left  = left + 'px';
        this.textbox.style.width = 'calc(100% - ' + dw + 'px)';
    }



    updateCursor()
    {
        this.textbox.style.cursor = 
               hasFocus(this.textbox)
            && graph.currentPage.zoom >= settings.minZoomForParams
            ? 'text'
            : 'default';
    }
}