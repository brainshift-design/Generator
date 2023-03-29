class TextControl
extends Control
{
    textarea;
    focus;
            
    
    value;


    enableChangeEvent = true;
    
    successOnFocusOut = false;
    keyBlur           = false;
    
    pointerEvents     = true;
    readOnly          = false;
     
    

    constructor(div, param, id, name, defaultValue = '')
    {
        super(div, param, id, name);


        this.value = defaultValue;
        
        
        this.initTextarea();
        this.initEvents ();

        this.focus = createDiv('textControlFocus');


        this.div.appendChild(this.textarea);
        this.div.appendChild(this.focus);
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
        this.name      = name;
        this.savedName = name;
        
        this.update();
    }



    setValue(value, fireChangeEvent = true)//, confirm = true)
    {
        if (typeof value != 'string')
            console.assert(false, 'TextControl.setValue(value) is ' + typeof value + ', must be a string');

            
        // const oldValue = this.value;
        
        // console.log('value =', value);
        // console.log('oldValue =', oldValue);
        // if (   value == NAN_CHAR && oldValue != NAN_CHAR
        //     || value != NAN_CHAR && oldValue == NAN_CHAR)
        // {
        //     console.log('value =', value);
            this.value          = value;
            this.textarea.value = value;

            this.update();


            if (   fireChangeEvent
                && this.enableChangeEvent)
                //&& value != oldValue)
                this.dispatchEvent(this.onchange);
        // }


        // if (   confirm
        //     && this.enableChangeEvent)
        //     this.dispatchEvent(this.onconfirm);
    }




    update()
    {
        if (typeof this.value !== 'string')
            console.assert(false, 'TextControl.update() value is ' + typeof this.value + ', must be a string');

        if (!this.measureData.offsetRect)
            return;


        const sw =  this.measureData.clientRect.width;
        const sh =  this.measureData.clientRect.height;

        this.updateFocus(sw, sh);
    }



    updateFocus(sw, sh)
    {
        this.focus.style.left   = 0;
        this.focus.style.top    = 0;
        this.focus.style.width  = sw;
        this.focus.style.height = sh;
    };



    updateFocusBorder()
    {
        if (this.buttonDown0)
        {
            if (   !this.param
                || !this.param.node.selected)
                this.focus.style.boxShadow = '0 0 0 1px var(--figma-color-bg-brand) inset';

            else
            {
                this.focus.style.boxShadow = '0 1px 0 0 var(--figma-color-bg-brand) inset';
                    
                if (this.param.index < this.param.node.params.length-1)
                    this.focus.style.boxShadow += ', 0 -1px 0 0 var(--figma-color-bg-brand) inset';
            }
        }
        else
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
}