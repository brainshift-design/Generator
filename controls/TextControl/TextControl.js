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



    setValue(value, fireChangeEvent = true, confirm = true, fullRange = true)
    {
        if (typeof value != 'string')
            console.assert(false, 'TextControl.setValue(value) is ' + typeof value + ', must be a string');

            
        const oldValue = this.value;

        
        if (   value == NAN_CHAR && oldValue != NAN_CHAR
            || value != NAN_CHAR && oldValue == NAN_CHAR)
        {
            this.value = value;

            this.update();

            if (   fireChangeEvent
                && this.enableChangeEvent
                && value != oldValue)
                this.dispatchEvent(this.onchange);
        }


        if (   confirm
            && this.enableChangeEvent)
            this.dispatchEvent(this.onconfirm);
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
}