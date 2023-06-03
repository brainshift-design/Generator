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

        this.div.appendChild(this.divValue);

        this.setSize(width, height);
    }



    setSize(w, h)
    {
        this.width            = w;
        this.height           = h;
        
        this.div.style.width  = w + 'px';
        this.div.style.height = Math.max(20, h) + 'px';
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
        const  input = this.param && this.param. input;
        const output = this.param && this.param.output;

        const left = input ? 12 : 0;

        const dw = 
              ( input ? 12 : 0) 
            + (output ? 12 : 0);


        // this.divValue.style.left       = '50%';
        // this.divValue.style.transform  = 'translateX(-50%)';
        // this.divValue.style.marginLeft =  0;
        // this.divValue.style.width      = 'calc(100% - ' + dw + 'px)';
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



    checkDragConnection()
    {
        let savedInput = 
            graphView.savedConn
            ? graphView.savedConn.input
            : null;


        if (    graphView.tempConn.output
            &&  this.param.input
            &&  this.param.input.canConnectFrom(graphView.tempConn.output)
            && !graphView.tempConn.output.node.isOrFollows(this.param.node)
            && (  !this.param.input.connected // not already connected to this input
                || this.param.input.connectedOutput != graphView.tempConn.output
                || this.param.input == savedInput))
        {
            graphView.overInput = this.param.input;
                
            this.param.input.mouseOver = true;
            this.param.input.updateControl();


            const rect = boundingRect(this.param.input.div);

            graphView.tempConn.wire.inputPos = point(
                rect.x + rect.w/2,
                rect.y + rect.h/2 - getTopHeight());

            graphView.tempConn.wire.update();


            graphView.tempConn.output.updateControl();
        }
        else if ( graphView.tempConn.input
                &&  this.param.output
                &&  graphView.tempConn.input.canConnectFrom(this.param.output)
                && !this.param.node.isOrFollows(graphView.tempConn.input.node))
        {
            graphView.overOutput = this.param.output;
                
            this.param.output.mouseOver = true;
            this.param.output.updateControl();


            const rect = boundingRect(this.param.output.div);

            graphView.tempConn.wire.outputPos = point(
                rect.x + rect.w/2,
                rect.y + rect.h/2 - getTopHeight());

            graphView.tempConn.wire.update();


            graphView.tempConn.input.updateControl();
        }
    }
}



function controlTimer_confirm(control)
{
    if (control.param)
        control.param.changing = false;
}