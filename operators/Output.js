class Output
{
    #dataType;     
    get dataType() { return this.#dataType; }

    _op = null; get op() { return this._op; }
    
    
    color;
    wireColor;

    control;

    
    connectedInputs = [];
    
    connecting = false;
    

    _data;

    get data() 
    {
        this.op.update();
        return this._data;
    }
    
    set data(value)
    {
        this._data = value;

        for (const input of this.connectedInputs)
            input.update();
    }



    get isConnected() { return this.connectedInputs.length > 0; }



    constructor(dataType)
    {
        this.#dataType = dataType;
        
        this.control = document.createElement('div');
        this.control.className = 'output';
        this.control.output    = this;
        
        this.color     = colorStyleRgba_(0, 0, 0, 0.12);
        this.wireColor = rgbFromDataType(this.#dataType, true);
        
        this.updateControl();

        
        this.control.addEventListener('pointerenter', e => { graphView.overOutput = this; });
        this.control.addEventListener('pointerleave', e => { graphView.overOutput = null; });
    }



    updateControl()
    {
        this.control.style.backgroundColor = this.color;
    }



    save()
    {
        return this.op.name;
    }
}