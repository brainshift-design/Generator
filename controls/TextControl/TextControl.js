class TextControl
extends Control
{
    value;


    textBehind;
    textbox;
    placeholder;

    valueText         = '';


    enableChangeEvent = true;
    
    successOnFocusOut = false;
    keyBlur           = false;

    
    readOnly          = false;
    
    tabSize           = 4;
    

    confirmTimer      = null;
    
    

    constructor(param, id, name, defaultValue = '')
    {
        const textbox = createTextarea('textControlTextarea');


        super(textbox, param, id, name);


        this.value = defaultValue;
        
        
        this.initTextarea(textbox);
        this.initEvents();
        

        this.div.appendChild(textbox);


        createTooltipSrc(this.div, this.div, () => 
                settings.showTooltipLongText
            &&  scrollbarVisible(this.textbox)
            && !hasFocus(this.textbox)
            ? ttText
            : null);


        this.div.style.position  = 'relative';
        this.div.style.boxShadow = '0 0 0 2px orange inset';
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
        h = Math.max(defParamHeight, h);


        super.setSize(w, h);


        // if (this.textbox) 
        // {
        //     this.textbox.style.width  = '100%';
        //     this.textbox.style.height = '100%';
        // }
    }



    // updateTextboxSize()
    // {
    //     const  input = this.param && this.param. input;
    //     const output = this.param && this.param.output;

    //     const left = input ? 12 : 0;

    //     const dw = 
    //           ( input ? 12 : 0) 
    //         + (output ? 12 : 0);


    //     // this.textbox.style.left  = left + 'px';
    //     // this.textbox.style.width = 'calc(100% - ' + dw + 'px)';
    // }



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
        super.update();


        if (typeof this.textbox.value !== 'string')
        {
            //console.trace();
            console.assert(false, 'TextControl.update() value is ' + typeof this.textbox.value + ', must be a string');
        }


        if (!this.measureData.offsetRect)
            return;
            

        this.textbox.placeholder = 
            this.value == NAN_CHAR
            ? UNKNOWN_DISPLAY
            : this.textbox.defPlaceholder;


        this.textbox.style.height        = '100%';
        this.textbox.style.pointerEvents = this.readOnly ? 'none' : 'all';



        if (this.param.showName)
            this.textbox.style.textAlign = 'left';


             if (this.valueText != '')   this.textbox.value = this.valueText;
        else if (this.value == NAN_CHAR) this.textbox.value = '';
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