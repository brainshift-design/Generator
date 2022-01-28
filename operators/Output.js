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
            
            if (graphView.headerOutput)
            {
                graphView.headerOutput.updateControl();
                graphView.headerOutput = null;
            }

            this.mouseOver = true;
            this.updateControl();

            if (   graphView.tempConn
                && graphView.tempConn.input
                && graphView.tempConn.input.dataType == this.dataType)
            {
                const rect = boundingRect(this.control);

                graphView.tempConn.wire.outputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - controlBar.offsetHeight);
            }
        });



        this.control.addEventListener('pointerleave', e => 
        { 
            this.endConnection();
        });
    }



    endConnection()
    {
        graphView.overOutput = null; 

        this.mouseOver = false;
        this.updateControl();

        if (   graphView.tempConn
            && graphView.tempConn.input)
            graphView.tempConn.wire.outputPos = point_NaN;
    }



    updateControl()
    {
        const mouseOver =
               this.mouseOver
            && !(   graphView.tempConn
                 && graphView.tempConn.output)
            && !(   graphView.tempConn
                 && graphView.tempConn.input
                 && graphView.tempConn.input.dataType != this.dataType);

        const colorStyle = colorStyleRgba(rgb_a(this.color, mouseOver ? 0.2 : 0.1));

        this.control.style.backgroundColor = colorStyle;

        this.control.style.boxShadow = 
               this.connectedInputs.length > 0
            ||    graphView.tempConn
               && graphView.tempConn.output == this
            ? '0 0 0 1px ' + colorStyle
            : 'none';

        this.wireBall.style.backgroundColor = colorStyleRgba(toRgba(this.wireColor));

        this.wireBall.style.zIndex = MAX_INT32;


        const isConnected =
               this.connectedInputs.length > 0
            ||     graphView.tempConn
               && (   graphView.tempConn.output == this
                   ||    this.mouseOver
                      && !graphView.tempConn.output)
               && !(   graphView.tempConn.input
                    && graphView.tempConn.input.dataType != this.dataType);

        show(this.wireBall, isConnected);
    }
}