class Output
{
    #dataType;     
    get dataType() { return this.#dataType; }

    _op = null; get op() { return this._op; }
    
    
    color;
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

        this.color = colorStyleRgba_(0, 0, 0, 0.12);
        this.updateControl();


        this.control.addEventListener('pointerenter', e => 
        {
            graphView.overOutput = this;
            //e.target.style.backgroundColor = colorFromDataType(e.target.output.dataType, true);
        });


        this.control.addEventListener('pointerleave', e => 
        {
            graphView.overOutput = null;
            //e.target.style.backgroundColor = inputColor;
        });
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