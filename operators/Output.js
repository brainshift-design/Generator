class Output
{
    _dataType;     
    get dataType() { return this._dataType; }

    _op    = null; get op()    { return this._op;    }
    _param = null; get param() { return this._param; }
    
    
    color;
    wireColor;

    control;
    wireBall;
    
    
    connectedInputs = [];
    
    mouseOver  = false;
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
        this._dataType = dataType;
        
        this.control  = createDiv('output');
        this.wireBall = createDiv('outputBall');
        
        this.control.output = this;
        
        
        this.control.appendChild(this.wireBall);

        this.color     = [0, 0, 0, 0.1];
        this.wireColor = rgbFromDataType(this._dataType, true);
        
        this.updateControl();

        
        this.control.addEventListener('pointerenter', e => 
        { 
            graphView.overOutput = this; 
            
            this.mouseOver = true;
            this.updateControl();
        });

        this.control.addEventListener('pointerleave', e => 
        { 
            graphView.overOutput = null; 

            this.mouseOver = false;
            this.updateControl();
        });
    }



    updateControl()
    {
        const colorStyle = colorStyleRgba(rgb_a(this.color, this.mouseOver ? 0.2 : 0.1));

        this.control.style.backgroundColor = colorStyle;

        this.control.style.boxShadow = 
               this.connectedInputs.length > 0
            ||    graphView.tempConn
               && graphView.tempConn.output == this
            ? '0 0 0 1px ' + colorStyle
            : 'none';

        this.wireBall.style.backgroundColor = colorStyleRgba(toRgba(this.wireColor));

        this.wireBall.style.zIndex = MAX_INT32;

        show(
            this.wireBall,
               this.connectedInputs.length > 0
            ||    graphView.tempConn
               && graphView.tempConn.output == this);
    }
}