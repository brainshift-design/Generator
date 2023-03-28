class TextControl
extends EventTarget
{
    div;
    
    textarea;
    focus;
    

    param;
     
    id;

    name;

    width;
    height;
             
    
    value;


    enableChangeEvent = true;
    
    successOnFocusOut = false;
    keyBlur           = false;
    
    pointerEvents     = true;
    readOnly          = false;
     
    
    measureData       = {};



    get view() { return this.param.node.graph.view; }



    constructor(div, param, width, height, id, name, defaultValue = '')
    {
        super();


        this.div               = div ? div : createDiv('textControl');
        this.div.control       = this;

        this.param             = param;


        this.id                = id;

        this.name              = name;

    
        this.width             = width;
        this.height            = height;
                 
        this.div.style.width   = width;
        this.div.style.height  = height;
                 
        this.div.style.display = 'inline';


        this.value             = defaultValue;
        
        
        this.initTextarea();
        this.initEvents ();

        this.focus = createDiv('textControlFocus');
        

        this.div.appendChild(this.textarea);
        this.div.appendChild(this.focus);

        
        this.onstartchange = new Event('startchange');
        this.onchange      = new Event('change');
        this.onconfirm     = new Event('confirm');
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




    updateMeasureData()
    {
        this.measureData = 
        {
            offsetRect: offsetRect(this.div),
            clientRect: clientRect(this.div)
        };
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



    lockPointer(pointerId)
    {
        clearTimeout(this.clickTimer);

        this.requestPointerLock =    
               this.div.      requestPointerLock 
            || this.div.   mozRequestPointerLock
            || this.div.webkitRequestPointerLock;

        this.requestPointerLock();
    };



    unlockPointer(pointerId)
    {
        document.exitPointerLock =    
               document.      exitPointerLock    
            || document.   mozExitPointerLock
            || document.webkitExitPointerLock;

        document.exitPointerLock();
    };



    isPointerLocked()
    {
        return (document.      pointerLockElement === this.div 
             || document.   mozPointerLockElement === this.div
             || document.webkitPointerLockElement === this.div);
    }}