class TextControl
extends Control
{
    value;


    textBehind;
    textbox;
    divAlias;
    placeholder;

    highlightText         = true;
    allowTabs             = false;
    
    
    valueText             = '';


    enableChangeEvent     = true;
    
    successOnFocusOut     = false;
    keyBlur               = false;

    requireFinishCtrl     = false;

    disableAfterSelectAll = null;
    
    testFunction          = null;
    readOnly              = false;
    
    tabSize               = 4;
    

    confirmTimer          = null;
    
    

    constructor(param, id, name, defaultValue = '', font = {})
    {
        const divTextValue = createDiv     ('textControlValue'    );
        const divAlias     = createDiv     ('textControlAlias'    );
        const textBehind   = createDiv     ('textControlHighlight');
        const textbox      = createTextarea('textControlTextarea' );


        super(divTextValue, param, id, name);


        this.divAlias = divAlias;


        this.value = defaultValue;

        if (font.family)
        {
            textBehind.style.fontFamily = font.family;
            textbox   .style.fontFamily = font.family;
        }

        if (font.size)
        {
            textBehind.style.fontSize = font.size;
            textbox   .style.fontSize = font.size;
        }

        
        this.initTextarea(textbox, textBehind);
        this.initEvents();

        
        divTextValue.appendChild(textBehind);
        divTextValue.appendChild(textbox);
        divTextValue.appendChild(divAlias);

        this.div.appendChild(divTextValue);
        

        createTooltipSrc(
            this.div, 
            this.div, 
            () => 
                    settings.showTooltipLongText
                &&  scrollbarVisible(this.textbox)
                && !hasFocus(this.textbox)
                ? ttText
                : null,
            1500,
            () => settings.showTooltipParams);
    

        //this.div.style.position  = 'relative';
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



    setFont(fontFamily)
    {
        textBehind.style.fontFamily = fontFamily;
        textbox   .style.fontFamily = fontFamily;
    }



    updateTextBehind()
    {
        const lines = this.textbox.value.split('\n');
        
        let highlight = '';


        const lb = 30;
        const tf = (Math.min(Math.max(1, this.textbox.value.length), lb) - 1) / (lb - 1);

        const textBehindBack =
            darkMode
            ? '#ffffff0f'
            : rgba2style([0, 0, 0, 0.07 - tf * 0.03]);


        for (let i = 0; i < lines.length; i++)
        {
            if (i > 0)
                highlight += '<br>';

            highlight += 
                '<span class="textBehind" style="background-color: ' 
                + textBehindBack 
                + ';' 
                // + (this.readOnly //textbox.disabled
                //       ? ' transform: skew(-15deg, 0);' 
                //       : '') 
                + '">' 
                + (   lines[i].length > 0
                   ||    this.textbox.value       == ''
                      && this.textbox.placeholder != ''
                       ? lines[i]
                       : '&hairsp;')
                + '</span>';
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
        //this.textbox.style.pointerEvents =  this.readOnly ? 'none' : 'all';


        if (this.param.showName)
            this.textbox.style.textAlign = 'left';


        if (this.overrideText != NULL)
        {
            this.divAlias.innerHTML = this.overrideText;
            
            this.textbox   .style.display = 'none';
            this.textBehind.style.display = 'none';
            this.divAlias  .style.display = 'inline-block';
        }
        else
        {
            this.divAlias.innerHTML = '';

            this.textbox   .style.display = 'inline-block';
            this.textBehind.style.display = 'inline-block';
            this.divAlias  .style.display = 'none';

                 if (this.valueText    != '') this.textbox.value = this.valueText;
            else if (this.value == NAN_CHAR ) this.textbox.value = '';
        }


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