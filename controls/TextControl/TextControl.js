class TextControl
extends Control
{
    value;


    textarea;


    enableChangeEvent = true;
    
    successOnFocusOut = false;
    keyBlur           = false;
    
    pointerEvents     = true;
    readOnly          = false;
    

    confirmTimer      = null;
    
    

    constructor(div, param, id, name, defaultValue = '')
    {
        super(div, param, id, name);


        this.value = defaultValue;
        
        
        this.div.className = 'textControl';


        this.initTextarea();
        this.initEvents ();
        

        this.div.appendChild(this.textarea);
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



    setSize(w, h)
    {
        super.setSize(w, h);

        if (this.textarea)
        {
            this.textarea.style.left   = (this.param && this.param.input ? 8 : 0) + 'px';
            
            this.textarea.style.width  = this.param && this.param.input ? 'calc(100% - 8px)' : '100%';
            this.textarea.style.height = Math.max(20, h);
        }
    }



    setValue(value, fireChangeEvent = true, updateControl = true)
    {
        if (typeof value != 'string')
            console.assert(false, 'TextControl.setValue(value) is ' + typeof value + ', must be a string');

            
        this.value = value;

        if (updateControl)
            this.textarea.value = value;


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


        const  input = this.param && this.param. input;
        const output = this.param && this.param.output;

        const left  = input ? 12 : 0;
        const dw = 
              ( input ? 12 : 0) 
            + (output ? 12 : 0);

        this.textarea.style.left  = left + 'px';
        this.textarea.style.width = 'calc(100% - ' + dw + 'px)';
    }
}