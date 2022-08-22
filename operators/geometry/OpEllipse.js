class   OpEllipse
extends OpGeometryBase
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;

    //showAllParams = true;


    
    constructor()
    {
        super(ELLIPSE, 'elps', 90);

        this.addInput (new Input ([ELLIPSE, ELLIPSE_VALUE]));
        this.addOutput(new Output(ELLIPSE, this.output_genRequest));

        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100,    0.01));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, true, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, true,   0, -180,   180));
        

        this.paramAngle.control.setSuffix('°', true);
        this.paramAngle.control.wrapValue   = true;
        this.paramAngle.control.dragReverse = true;

        
        this.btnProportional = createToggleButton(12, 12);
        this.inner.appendChild(this.btnProportional);


        this.inputs[0].addEventListener('connect', () =>
        {
            for (const param of this.params)
                param.enableControlText(false);
        });


        this.inputs[0].addEventListener('disconnect', () =>
        {
            for (const param of this.params)
                if (!param.input.connected) 
                    param.enableControlText(true);
        });


        this.btnProportional.addEventListener('click', () =>
        {
            if (this.btnProportional.enabled)
            {
                this.refWidth  = this.paramWidth .value.value;
                this.refHeight = this.paramHeight.value.value;
            }
        });


        this.paramWidth.addEventListener('change', () =>
        {
            if (this.btnProportional.enabled)
                this.paramHeight.setValue(this.paramWidth.value.value * this.refHeight / this.refWidth, false, true, false);
        });


        this.paramHeight.addEventListener('change', () =>
        {
            if (this.btnProportional.enabled)
                this.paramWidth.setValue(this.paramHeight.value.value * this.refWidth / this.refHeight, false, true, false);
        });
    }
    
    
    
    output_genRequest(gen)
    {
        // 'this' is the output

        if (!isEmpty(this.cache))
            return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];

        const paramIds = [];


        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));


            for (const param of this.node.params)
                if (param.input && param.input.connected) 
                    paramIds.push(param.id);

            request.push(paramIds.join(','));


            if (this.node.paramX     .input.connected) request.push(...this.node.paramX     .genRequest(gen));
            if (this.node.paramY     .input.connected) request.push(...this.node.paramY     .genRequest(gen));
            if (this.node.paramWidth .input.connected) request.push(...this.node.paramWidth .genRequest(gen));
            if (this.node.paramHeight.input.connected) request.push(...this.node.paramHeight.genRequest(gen));
            if (this.node.paramAngle .input.connected) request.push(...this.node.paramAngle .genRequest(gen));
        }
        else
        {
            request.push(
                ...this.node.paramX     .genRequest(gen),
                ...this.node.paramY     .genRequest(gen),
                ...this.node.paramWidth .genRequest(gen),
                ...this.node.paramHeight.genRequest(gen),
                ...this.node.paramAngle .genRequest(gen));
        }


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateNode()
    {
        this.btnProportional.style.left = 45;
        this.btnProportional.style.top  = 79;

        super.updateNode();
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;

        let json = 
                 super.toJsonBase(nTab)
               //+ ',\n' + pos + tab + '"showAllParams": "' + boolString(this.showAllParams) + '"'
               + ',\n' + pos + tab + '"proportional": "'  + boolString(this.btnProportional.enabled) + '"';

        if (this.btnProportional.enabled)
        {
            json +=
                  ',\n' + pos + tab + '"refWidth": "'  + this.refWidth  + '"'
                + ',\n' + pos + tab + '"refHeight": "' + this.refHeight + '"';
        }

        return json;
    }



    loadParams(_node)
    {
        super.loadParams(_node);

        // if (_node.proportional)
        // {
            //this.showAllParams = isTrue(_node.proportional);
            
            this.btnProportional.enabled = isTrue(_node.proportional);
            this.btnProportional.updateBackground(false);

            if (this.btnProportional.enabled)
            {
                this.refWidth  = parseFloat(_node.refWidth);
                this.refHeight = parseFloat(_node.refHeight);
            }
        //}
    }
}