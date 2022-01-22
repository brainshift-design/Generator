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
        
        this.control = document.createElement('div');
        this.control.className = 'output';
        this.control.output = this;
        
        this.wireBall = document.createElement('div');
        this.wireBall.className = 'outputBall';
        
        this.control.appendChild(this.wireBall);

        this.color     = [0, 0, 0, 0.12];
        this.wireColor = rgbFromDataType(this._dataType, true);
        
        this.updateControl();

        
        this.control.addEventListener('pointerenter', e => 
        { 
            graphView.overOutput = this; 
            
            this.color = [0, 0, 0, 0.24];
            this.updateControl();
        });

        this.control.addEventListener('pointerleave', e => 
        { 
            graphView.overOutput = null; 

            this.color = [0, 0, 0, 0.12];
            this.updateControl();
        });
    }



    updateControl()
    {
        this.control.style.backgroundColor = colorStyleRgba(toRgba(this.color));

        // this.control.style.boxShadow = 
        //        this.connectedInputs.length > 0
        //     ||    graphView.tempConn
        //        && graphView.tempConn.output == this
        //     ? '0 0 0 1px ' + colorStyleRgba(toRgba(this.color))
        //     : 'none';

        this.wireBall.style.backgroundColor = colorStyleRgba(toRgba(this.wireColor));

        this.wireBall.style.zIndex = MAX_INT32;

        show(
            this.wireBall,
               this.connectedInputs.length > 0
            ||    graphView.tempConn
               && graphView.tempConn.output == this);
    }
}