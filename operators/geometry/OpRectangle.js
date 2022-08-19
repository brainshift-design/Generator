class   OpRectangle
extends OpGeometryBase
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;
    paramRound;


    
    constructor()
    {
        super(RECTANGLE, 'rect', 100);


        this.addInput(new Input([RECTANGLE, RECTANGLE_VALUE]));
        this.addOutput(new Output(RECTANGLE, this.output_genRequest));

        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100,    0.01));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, true, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, true,   0, -180,   180));
        this.addParam(this.paramRound  = new NumberParam('round',  'round',  true, true, true,   0,    0));
        

        this.paramAngle.control.setSuffix('°', true);
        this.paramAngle.control.wrapValue   = true;
        this.paramAngle.control.dragReverse = true;


        this.btnProportional = createToggleButton(12, 12);
        this.inner.appendChild(this.btnProportional);


        this.addBaseParams();

        
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
                this.refWidth  = this.paramWidth .genValue;
                this.refHeight = this.paramHeight.genValue;
            }
        });


        this.paramWidth.addEventListener('change', () =>
        {
            if (this.btnProportional.enabled)
                this.paramHeight.setValue(this.paramWidth.genValue * this.refHeight / this.refWidth, false, true, false);

            this.updateRound();
        });


        this.paramHeight.addEventListener('change', () =>
        {
            if (this.btnProportional.enabled)
                this.paramWidth.setValue(this.paramHeight.genValue * this.refWidth / this.refHeight, false, true, false);

            this.updateRound();
        });


        this.updateParamDisplay();
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

                
        const paramIds = [];
        


        const input = this.node.inputs[0];
        
        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));

            for (const param of this.node.params)
                if (   param.input 
                    && param.input.connected
                    && param.show())
                    paramIds.push(param.id);
        }
        else
        {
            for (const param of this.node.params)
                if (param.show())
                    paramIds.push(param.id);
        }


        request.push(paramIds.length);

        for (const paramId of paramIds)
            request.push(paramId, ...this.node.params.find(p => p.id == paramId).genRequest(gen));            


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values, src)
    {
        const rect = values[paramIds.findIndex(id => id == RECTANGLE_VALUE)];

        this.paramX     .setValue(rect.x,      false, true, false);
        this.paramY     .setValue(rect.y,      false, true, false);
        this.paramWidth .setValue(rect.width,  false, true, false);
        this.paramHeight.setValue(rect.height, false, true, false);
        this.paramAngle .setValue(rect.angle,  false, true, false);
        this.paramRound .setValue(rect.round,  false, true, false);

        console.log('rect =', rect);
        super.updateBaseValues(updateParamId, paramIds, values, rect);
    }



    updateNode()
    {
        this.btnProportional.style.left = 45;
        this.btnProportional.style.top  = 79;

        super.updateNode();
    }



    updateRound()
    {
        const min = Math.min(this.paramWidth.value, this.paramHeight.value);

        this.paramRound.control.displayMin = 0;
        this.paramRound.control.displayMax = min/2;

        this.paramRound.control.update();
    }

    

    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;

        let json = 
               super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"proportional": "' + boolString(this.btnProportional.enabled) + '"';

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
            this.btnProportional.enabled = isTrue(_node.proportional);
            this.btnProportional.updateBackground(false);

            if (this.btnProportional.enabled)
            {
                this.refWidth  = parseFloat(_node.refWidth);
                this.refHeight = parseFloat(_node.refHeight);
            }
        //}

        this.updateRound();
    }
}