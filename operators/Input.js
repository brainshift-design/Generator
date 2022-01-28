class   Input
extends EventTarget
{
    _dataType;     
    get dataType() { return this._dataType; }

    get data()
    {
        return (
            this.isConnected
            ? this.connectedOutput.data
            : null);
    }


    _op    = null; get op   () { return this._op;    }
    _param = null; get param() { return this._param; }

    
    color;
    wireColor;

    control;
    wireBall;
  

    _connectedOutput = null;
    get connectedOutput() { return this._connectedOutput; }
    set connectedOutput(output)
    {
        if (this._connectedOutput)
        {
            this.dispatchEvent(new CustomEvent(
                'disconnect', 
                { 'input': this }));
        }

        this._connectedOutput = output;

        if (this._connectedOutput)
        {
            this.dispatchEvent(new CustomEvent(
                'connect', 
                { 
                    'output': output,
                    'input':  this 
                }));
        }
    }


    connection = null;
    
    connecting = false;
    mouseOver  = false;
    

    initialSeed = 0;
    currentSeed = 0;

    get isConnected() { return this.connectedOutput != null; }


    //onupdate     = new Event('update');

    onconnect    = new Event('connect');
    ondisconnect = new Event('disconnect');



    constructor(dataType)
    {
        super();
        
        this._dataType = dataType;

        this.control  = createDiv('input');
        this.wireBall = createDiv('inputBall');
        
        this.control.input = this;
        

        this.control.appendChild(this.wireBall);

        this.color     = [0, 0, 0, 0.2];
        this.wireColor = rgbFromDataType(this.dataType, true);

        
        this.control.addEventListener('pointerdown', e => e.preventDefault());


        this.control.addEventListener('pointerenter', e => 
        {
            graphView.overInput = this;

            if (graphView.headerInput)
            {
                graphView.headerInput.updateControl();
                graphView.headerInput = null;
            }

            this.mouseOver = true;
            this.updateControl();

            if (   graphView.tempConn
                && graphView.tempConn.output
                && graphView.tempConn.output.dataType == this.dataType)
            {
                const rect = boundingRect(this.control);

                graphView.tempConn.wire.inputPos = point(
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
        graphView.overInput = null;

        this.mouseOver = false;
        this.updateControl();

        if (   graphView.tempConn
            && graphView.tempConn.output)
            graphView.tempConn.wire.inputPos = point_NaN;
    }



    // update()
    // {
    //     this.dispatchEvent(this.onupdate);
    // }



    updateControl()
    {
        const mouseOver =
               this.mouseOver
            && !(   graphView.tempConn
                 && graphView.tempConn.input)
            && !(   graphView.tempConn
                 && graphView.tempConn.output
                 && graphView.tempConn.output.dataType != this.dataType);

        const colorStyle = colorStyleRgba(rgb_a(this.color, mouseOver ? 0.4 : 0.2));

        const isConnected =
               this.isConnected
            ||     graphView.tempConn
               && (   graphView.tempConn.input == this
                   ||    graphView.overInput == this//this.mouseOver
                      && !graphView.tempConn.input)
               && !(   graphView.tempConn.output
                    && graphView.tempConn.output.dataType != this.dataType);

        this.control.style.transform = 
              'translateX(' + (isConnected ? -1 : 0) + 'px)'
            + 'translateY(-50%)';
        
        this.control.style.width        = (isConnected ? 8 : 6) + 'px';
        this.control.style.height       = (isConnected ? 8 : 6) + 'px';
        this.control.style.borderRadius = (isConnected ? 4 : 4) + 'px';
        this.control.style.marginBottom = (isConnected ? 4 : 6) + 'px';

        this.control.style.boxShadow = '0 0 0 1px ' + colorStyle;


        this.wireBall.style.backgroundColor = 
            this.isConnected
            ? (    graphView.tempConn
               &&  graphView.tempConn.savedInput == this
               && !graphView.overInput
               ? 'transparent'
               : colorStyleRgba(toRgba(this.connectedOutput.wireColor)))
            : (   graphView.tempConn
               && graphView.tempConn.output
               && graphView.tempConn.output.dataType == this.dataType
               && graphView.overInput == this
               ? colorStyleRgba(toRgba(graphView.tempConn.output.wireColor))
               : (   graphView.tempConn
                  && graphView.tempConn.input
                  && graphView.tempConn.input == this)
                  ? (graphView.overOutput
                     ? colorStyleRgba(toRgba(graphView.overOutput.wireColor))
                     : (graphView.headerOutput
                        ? colorStyleRgba(toRgba(graphView.headerOutput.wireColor))
                        : colorStyleRgba(toRgba(graphView.tempConn.input.wireColor))))
                  : colorStyle);

        this.wireBall.style.zIndex = MAX_INT32;
        this.wireBall.style.left   = '1px';
        this.wireBall.style.top    = 'calc(50% - 3px)';


        show(this.wireBall, isConnected); 
    }
}