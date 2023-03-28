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


    measureData = { divBounds: new Rect(0, 0, 0, 0) };
 

    get view() { return this.param.node.graph.view; }



    constructor(div, param, id, name, width = 120, height = 20)
    {
        super();


        this.div               = div ? div : createDiv();
        this.div.control       = this;
        

        this.param             = param;
        
        
        this.id                = id;
        this.name              = name;


        this.setWidth (width);
        this.setHeight(height);
        
        this.div.style.display = 'inline';


        this.onstartchange     = new Event('startchange');
        this.onchange          = new Event('change');
        this.onconfirm         = new Event('confirm');
    }



    setWidth(width)
    {
        this.width            = width;
        this.div.style.width  = width;
    }


    
    setHeight(height)
    {
        this.height           = height;
        this.div.style.height = height;

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