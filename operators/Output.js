class Output
{
    _dataType;     
    get dataType() { return this._dataType; }

    _op    = null; get op()    { return this._op;    }
    _param = null; get param() { return this._param; }
    
    
    color;
    wireColor;

    control;
    hitbox;
    wireBall;
    
    
    connectedInputs = [];
    
    mouseOver  = false;
    connecting = false;
    
    
    _data;

    get data() 
    {
        if (this.param) this.param.setOutputData();
        if (this.op   ) this.op.update();

        return this._data;
    }
    
    set data(value)
    {
        this._data = value;

        // for (const input of this.connectedInputs)
        //     input.op.pushUpdate();
    }



    get isConnected() { return this.connectedInputs.length > 0; }



    constructor(dataType)
    {
        this._dataType = dataType;
        
        this.control  = createDiv('output');
        this.hitbox   = createDiv('outputHitbox');
        this.wireBall = createDiv('outputBall');
        
        this.control.output = this;
        
        
        this.control.appendChild(this.hitbox);
        this.control.appendChild(this.wireBall);

        this.color     = [0, 0, 0, 0.12];
        this.wireColor = dataType2rgb(this.dataType, true);
        
        this.updateControl();

        
        //this.hitbox.addEventListener('pointerdown', e => e.preventDefault());


        this.hitbox.addEventListener('pointerenter', e => 
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

                graphView.overOutput = !loop ? this : null;
                this.op.outputs.forEach(o => o.updateControl());
            }
            else
                graphView.overOutput = this; 
        });



        this.hitbox.addEventListener('pointerleave', e => 
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

        const colorStyle = 
            graphView.showWires
            ? colorStyleRgba(rgb_a(this.color, mouseOver ? Math.min(this.color[3] * 1.4, 1) : this.color[3] / 1.4))
            : 'transparent';

        this.control.style.pointerEvents = graphView.showWires ? 'auto' : 'none';
        this.control.style.backgroundColor = colorStyle;

        this.control.style.boxShadow = 
               this.connectedInputs.length > 0
            ||    graphView.tempConn
               && (   graphView.tempConn.output == this
                   || graphView.overOutput == this)
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