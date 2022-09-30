class   OpRectangle
extends OperatorBase
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


        this.addInput (new Input([RECTANGLE, RECTANGLE_VALUE], this.input_getValuesForUndo));
        this.addOutput(new Output([RECTANGLE], this.output_genRequest));


        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100,    0.01));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, true, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, true,   0, -180,   180));
        this.addParam(this.paramRound  = new NumberParam('round',  'round',  true, true, true,   0,    0));


        this.paramWidth .addEventListener('change', () => this.updateRound());
        this.paramHeight.addEventListener('change', () => this.updateRound());

        this.paramAngle.control.setSuffix('°', true);
        this.paramAngle.control.wrapValue   = true;
        this.paramAngle.control.dragReverse = true;
    }
    
    
    
    output_genRequest(gen)
    {
        // 'this' is the output

        // if (!isEmpty(this.cache))
        //     return this.cache;


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
                    && param.canShow())
                    paramIds.push(param.id);
        }
        else
        {
            for (const param of this.node.params)
                if (param.canShow())
                    paramIds.push(param.id);
        }


        request.push(paramIds.length);

        for (const paramId of paramIds)
            request.push(paramId, ...this.node.params.find(p => p.id == paramId).genRequest(gen));            


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        const enable = !this.inputs[0].connected;
        
        this.paramX     .enableControlText(enable);
        this.paramY     .enableControlText(enable);
        this.paramWidth .enableControlText(enable);
        this.paramHeight.enableControlText(enable);
        this.paramAngle .enableControlText(enable);
        this.paramRound .enableControlText(enable);

        super.updateParams();
    }

    

    updateRound()
    {
        const min = Math.min(this.paramWidth.value.value, this.paramHeight.value.value);

        this.paramRound.control.displayMin = 0;
        this.paramRound.control.displayMax = min/2;

        this.paramRound.control.update();
    }
}