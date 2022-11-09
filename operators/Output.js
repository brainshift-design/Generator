class Output
{
    types = []; // an output can have multiple types

    
    _node  = null;  get node () { return this._node;  }
    _param = null;  get param() { return this._param; }
    
    
    get index() { return this.node.outputs.indexOf(this); }


    colorLight;
    colorDark;

    wireColor;

    div;
    hitbox;
    wireBall;
    
    
    connectedInputs = [];
    
    mouseOver  = false;
    connecting = false;

    overFactor = 1.7;
    
    
    genRequest = null; // function pointer, must be implemented
    cache      = [];


    _data;

    get data() 
    {
        if (this.param) this.param.setOutputData();
        //if (this.node ) this.node.update();

        return this._data;
    }
    
    set data(value)
    {
        this._data = value;
    }



    get connected() { return this.connectedInputs.length > 0; }



    constructor(types, genRequest)
    {
        this.types      = [...types];
        this.genRequest = genRequest;

        this.div        = createDiv('output');
        this.hitbox     = createDiv('outputHitbox');
        this.wireBall   = createDiv('outputBall');
        
        this.div.output = this;
        
        
        this.colorLight = [0, 0, 0, 1];
        this.colorDark  = [1, 1, 1, 1];

        this.wireColor  = rgbHeaderFromType(this.types[0], true);
        

        this.div.appendChild(this.hitbox);
        this.div.appendChild(this.wireBall);


        //        this.updateControl();

        
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
                && graphView.tempConn.input.types.includes(this.type))
            {
                const rect = boundingRect(this.div);
                const loop = this.node.isOrFollows(graphView.tempConn.input.node);

                if (!loop)
                {
                    graphView.tempConn.wire2.outputPos =
                    graphView.tempConn.wire .outputPos = point(
                        rect.x + rect.w/2,
                        rect.y + rect.h/2 - menuBar.offsetHeight);
                }

                graphView.overOutput = !loop ? this : null;
                this.node.outputs.forEach(o => o.updateControl());
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
            graphView.tempConn.wire2.outputPos =
            graphView.tempConn.wire .outputPos = point_NaN;
    }



    updateControl()
    {
        const mouseOver =
               this.mouseOver
            && !(   graphView.tempConn
                 && graphView.tempConn.output)
            && !(   graphView.tempConn
                 && graphView.tempConn.input
                 && (  !graphView.tempConn.input.types.includes(this.type)
                     || this.node.isOrFollows(graphView.tempConn.input.node)));


        const color = 
            isDarkMode()
            ? this.colorDark
            : this.colorLight;

        const colorStyle = 
            settings.showWires
            ? rgba2style(rgb_a(
                color, 
                mouseOver 
                ? Math.min(color[3] * this.overFactor, 1) 
                : color[3]))
            : 'transparent';

        this.div.style.pointerEvents   = settings.showWires ? 'auto' : 'none';
        this.div.style.backgroundColor = colorStyle;

        this.div.style.boxShadow = 
               this.connectedInputs.length > 0
            ||    graphView.tempConn
               && (   graphView.tempConn.output == this
                   || graphView.overOutput == this)
            ? '0 0 0 1px ' + colorStyle
            : 'none';

        this.wireBall.style.backgroundColor = rgba2style(toRgba(this.wireColor));

        this.wireBall.style.zIndex = MAX_INT32;


        const isConnected =
               this.connectedInputs.length > 0
            ||     graphView.tempConn
               && (   graphView.tempConn.output == this
                   ||     graphView.overOutput == this
                      && !graphView.tempConn.output)
               && !(    graphView.tempConn.input
                    && !graphView.tempConn.input.types.includes(this.type));


        show(this.wireBall, isConnected);
    }
}