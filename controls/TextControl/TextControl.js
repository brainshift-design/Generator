class TextControl
extends Control
{
    value;


    textBehind;
    textbox;
    placeholder;

    highlightText     = true;
    allowTabs         = false;
    
    
    valueText         = '';


    enableChangeEvent = true;
    
    successOnFocusOut = false;
    keyBlur           = false;

    requireFinishCtrl = false;

    
    testFunction      = null;
    readOnly          = false;
    
    tabSize           = 4;
    

    confirmTimer      = null;
    
    

    constructor(param, id, name, defaultValue = '')
    {
        const textBehind = createDiv     ('textControlHighlight');
        const textbox    = createTextarea('textControlTextarea');


        super(textbox, param, id, name);


        this.value = defaultValue;
        
        
        this.div.appendChild(textBehind);
        this.div.appendChild(textbox);

        this.initTextarea(textbox, textBehind);
        this.initEvents();

        
        createTooltipSrc(this.div, this.div, () => 
                settings.showTooltipLongText
            &&  scrollbarVisible(this.textbox)
            && !hasFocus(this.textbox)
            ? ttText
            : null);


        this.div.style.position  = 'relative';
        // this.div.style.boxShadow = '0 0 0 2px orange inset';
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
    }



    setValue(value, fireChangeEvent = true, updateControl = true)
    {
        if (typeof value != 'string')
            consoleError('TextControl.setValue(value) is ' + typeof value + ', must be a string');

            
        this.value = value;

        if (updateControl)
            this.textbox.value = value;

        this.update();


        if (   fireChangeEvent
            && this.enableChangeEvent)
            this.dispatchEvent(this.onchange);
    }



    updateTextBehind()
    {
        const lines = this.textbox.value.split('\n');
        
        let highlight = '';


        const lb = 30;
        const tf = (Math.min(Math.max(1, this.textbox.value.length), lb) - 1) / (lb - 1);

        const textBehindBack =
            darkMode
            ? '#fff1'
            : rgba2style([0, 0, 0, 0.07 - tf * 0.03]);


        for (let i = 0; i < lines.length; i++)
        {
            // lines[i] = lines[i].replaceAll(' ', ' ');
            
            if (i > 0)
                highlight += '<br>';

            highlight += '<span class="textBehind" style="background-color: ' + textBehindBack + '">' + lines[i] + '</span>';
        }

        this.textBehind.innerHTML = highlight;


        const style = getComputedStyle(this.textbox);

        this.textBehind.style.fontFamily   =  style.fontFamily;
        this.textBehind.style.fontSize     =  style.fontSize;
        this.textBehind.style.lineHeight   =  style.lineHeight;
        this.textBehind.style.textAlign    =  style.textAlign;
        this.textBehind.style.height       = 'calc(' + style.height + ' - 0.6em)';
        this.textBehind.style.display      =  this.highlightText ? 'display-block' : 'none';
    }



    update()
    {
        super.update();


        if (typeof this.textbox.value !== 'string')
        {
            //console.trace();
            consoleError('TextControl.update() value is ' + typeof this.textbox.value + ', must be a string');
        }


        if (!this.measureData.offsetRect)
            return;
            

        this.textbox.placeholder = 
            this.value == NAN_CHAR
            ? UNKNOWN_DISPLAY
            : this.textbox.defPlaceholder;


        this.textbox.style.height        = '100%';
        this.textbox.style.pointerEvents =  this.readOnly ? 'none' : 'all';


        if (this.param.showName)
            this.textbox.style.textAlign = 'left';


             if (this.valueText != '')   this.textbox.value = this.valueText;
        else if (this.value == NAN_CHAR) this.textbox.value = '';


        this.updateTextBehind();
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