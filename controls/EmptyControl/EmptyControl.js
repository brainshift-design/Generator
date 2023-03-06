class EmptyControl
extends EventTarget
{
    div;

    param;

    

    constructor(div, param)
    {
        super();


        this.div         = div ? div : createDiv();
        this.div.control = this;
        this.div.style.boxShadow = '0 0 0 1px red inset';
        
        this.param       = param;
    }



    canReact(e)
    {
        return false;
    }



    updateMeasureData()
    {
        this.measureData = 
        {
            offsetRect: offsetRect(this.div),
            clientRect: clientRect(this.div)
        };
    }
}
