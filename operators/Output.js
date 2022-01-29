class Output
{
    _dataType;     
    get dataType() { return this._dataType; }

    _op    = null; get op()    { return this._op;    }
    _param = null; get param() { return this._param; }
    
    
    //color;
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

        //this.color     = [0, 0, 0, 0.1];
        this.wireColor = dataType2rgb(this._dataType, true);
        
        this.updateControl();

        

        this.control.addEventListener('pointerenter', e => 
        { 
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
                const loop = this.op.follows(graphView.tempConn.input.op);

                if (!loop)
                {
                    graphView.tempConn.wire.outputPos = point(
                        rect.x + rect.w/2,
                        rect.y + rect.h/2 - controlBar.offsetHeight);
                }

                graph.overOutput = !loop;
            }
            else
                graphView.overOutput = this; 
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
                 && (   graphView.tempConn.input.dataType != this.dataType
                     || this.op.follows(graphView.tempConn.input.op)));

        const colorStyle = colorStyleRgba(rgb_a(dataType2rgb(this.dataType, true), mouseOver ? 0.2 : 0.1));

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
                   ||     graphView.overOutput == this
                      && !graphView.tempConn.output)
               && !(   graphView.tempConn.input
                    && graphView.tempConn.input.dataType != this.dataType);

        show(this.wireBall, isConnected);
    }
}