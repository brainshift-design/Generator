class Control
extends EventTarget
{
    param;

    id;
    
    name;
    savedName    = '';

    overrideText = '';
    
    
    div;
    divValue;


    width;
    height;


    pointerEvents = true;


    measureData = { divBounds: new Rect(0, 0, 0, 0) };
 

    
    constructor(divValue, param, id, name, width = defNodeWidth, height = defParamHeight)
    {
        super();

        this.div           = createDiv('control');
        this.divValue      = divValue;
        
        this.param         = param;
        
        this.id            = id;
        this.name          = name;


        this.onstartchange = new Event('startchange');
        this.onchange      = new Event('change');
        this.onconfirm     = new Event('confirm');


        this.setSize(width, height);
    }



    setSize(w, h)
    {
        this.width            = w;
        this.height           = h;
        
        this.div.style.width  = '100%';//w + 'px';
        this.div.style.height = '100%';//Math.max(20, h) + 'px';
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