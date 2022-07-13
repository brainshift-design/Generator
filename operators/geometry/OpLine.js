class   OpLine
extends OperatorBase
{
    #paramX;
    #paramY;
    #paramWidth;
    //#paramHeight;
    #paramAngle;


    
    constructor()
    {
        super(LINE, 'line', 90);

        this.addInput (new Input ([LINE]));
        this.addOutput(new Output(LINE, this.output_genRequest));

        this.addParam(this.#paramX      = new NumberParam('x',      'x',      true, true, true,   0));
        this.addParam(this.#paramY      = new NumberParam('y',      'y',      true, true, true,   0));
        this.addParam(this.#paramWidth  = new NumberParam('width',  'width',  true, true, true, 100,    0.01));
        //this.addParam(this.#paramHeight = new NumberParam('height', 'height', true, true, true, 100,    0.01));
        this.addParam(this.#paramAngle  = new NumberParam('angle',  'angle',  true, true, true,   0, -180,   180));
        

        this.#paramAngle.control.setSuffix('°', true);
        this.#paramAngle.control.wrapValue   = true;
        this.#paramAngle.control.dragReverse = true;


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
            nodeId:     this.node.id, 
            paramIndex: -1 });

        const req = this.node.getRequestStart();

        
        const input = this.node.inputs[0];

        const indices = [];


        if (input.connected)
        {
            req.push(...input.connectedOutput.genRequest(gen));


            for (const param of this.node.params)
                if (param.input && param.input.connected) 
                    indices.push(param.index);

            req.push(indices.join(','));


            if (this.node.#paramX     .input.connected) req.push(...this.node.#paramX     .genRequest(gen));
            if (this.node.#paramY     .input.connected) req.push(...this.node.#paramY     .genRequest(gen));
            if (this.node.#paramWidth .input.connected) req.push(...this.node.#paramWidth .genRequest(gen));
            //if (this.node.#paramHeight.input.connected) req.push(...this.node.#paramHeight.genRequest(gen));
            if (this.node.#paramAngle .input.connected) req.push(...this.node.#paramAngle .genRequest(gen));
        }
        else
        {
            req.push(
                ...this.node.#paramX     .genRequest(gen),
                ...this.node.#paramY     .genRequest(gen),
                ...this.node.#paramWidth .genRequest(gen),
                //...this.node.#paramHeight.genRequest(gen),
                ...this.node.#paramAngle .genRequest(gen));
        }


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return req;
    }
}