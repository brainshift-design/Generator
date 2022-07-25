class   OpLine
extends OpGeometryBase
{
    paramX;
    paramY;
    paramWidth;
    paramAngle;


    
    constructor()
    {
        super(LINE, 'line', 90);

        this.addInput (new Input ([LINE, LINE_VALUE]));
        this.addOutput(new Output(LINE, this.output_genRequest));

        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, true,   0, -180,   180));
        

        this.paramAngle.control.setSuffix('°', true);
        this.paramAngle.control.wrapValue   = true;
        this.paramAngle.control.dragReverse = true;


        this.inputs[0].addEventListener('connect', () =>
        {
            for (const param of this.params)
                enableSliderText(param.control, false);
        });


        this.inputs[0].addEventListener('disconnect', () =>
        {
            for (const param of this.params)
                if (!param.input.connected) 
                    enableSliderText(param.control, true);
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

        const [req, ignore] = this.node.genRequestStart(gen);
        if (ignore) return req;

        
        const input = this.node.inputs[0];

        const paramIds = [];


        if (input.connected)
        {
            req.push(...pushInputOrParam(input, gen));


            for (const param of this.node.params)
                if (param.input && param.input.connected) 
                    paramIds.push(param.id);

            req.push(paramIds.join(','));


            if (this.node.paramX     .input.connected) req.push(...this.node.paramX     .genRequest(gen));
            if (this.node.paramY     .input.connected) req.push(...this.node.paramY     .genRequest(gen));
            if (this.node.paramWidth .input.connected) req.push(...this.node.paramWidth .genRequest(gen));
            if (this.node.paramAngle .input.connected) req.push(...this.node.paramAngle .genRequest(gen));
        }
        else
        {
            req.push(
                ...this.node.paramX     .genRequest(gen),
                ...this.node.paramY     .genRequest(gen),
                ...this.node.paramWidth .genRequest(gen),
                ...this.node.paramAngle .genRequest(gen));
        }


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return req;
    }
}