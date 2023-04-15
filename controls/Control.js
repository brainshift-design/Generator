class Control
extends EventTarget
{
    param;

    id;
    
    name;
    savedName   = '';


    div;

    width;
    height;


    pointerEvents = true;


    measureData = { divBounds: new Rect(0, 0, 0, 0) };
 

    
    constructor(div, param, id, name, width = defNodeWidth, height = defParamHeight)
    {
        super();


        this.div               = div ? div : createDiv();
        this.div.control       = this;
        

        this.param             = param;
        
        
        this.id                = id;
        this.name              = name;


        //this.div.style.display = 'inline';


        this.setSize(width, height);


        this.onstartchange     = new Event('startchange');
        this.onchange          = new Event('change');
        this.onconfirm         = new Event('confirm');
    }



    setSize(w, h)
    {
        this.width            = w;
        this.height           = h;
        
        this.div.style.width  = w;
        this.div.style.height = Math.max(20, h);
    }



    updateMeasureData()
    {
        this.measureData = 
        {
            offsetRect: offsetRect(this.div),
            clientRect: clientRect(this.div)
        };
    }


    
    lockPointer(pointerId)
    {
        clearTimeout(this.clickTimer);

        this.div.requestPointerLock =    
               this.div.      requestPointerLock 
            || this.div.   mozRequestPointerLock
            || this.div.webkitRequestPointerLock;

        this.div.requestPointerLock();
    }



    unlockPointer(pointerId)
    {
        document.exitPointerLock =    
               document.      exitPointerLock    
            || document.   mozExitPointerLock
            || document.webkitExitPointerLock;

        document.exitPointerLock();
    }



    isPointerLocked()
    {
        return (document.      pointerLockElement === this.div 
             || document.   mozPointerLockElement === this.div
             || document.webkitPointerLockElement === this.div);
    }
}



function controlTimer_confirm(control)
{
    if (control.param)
        control.param.changing = false;
}