class   OpGradient
extends OpColorBase
{
    paramType;
    paramX1;
    paramY1;
    paramX2;
    paramY2;
    paramAspect;
    paramAngle;

    checkersHolder;
    checkers;
    colorBack;



    constructor()
    {
        super(GRADIENT, 'grad', 'gradient', iconGradient);

        this.iconOffsetY    = 1;
        this.canDisable     = true;
        this.variableInputs = true;


        this.colorBack      = createDiv('colorBack');
        this.checkersHolder = createDiv('nodeHeaderCheckersHolder');
        this.checkers       = createDiv('nodeHeaderCheckers');

        this.inner.appendChild(this.colorBack);
        this.inner.insertBefore(this.checkersHolder, this.header);

        this.checkersHolder.appendChild(this.checkers);


        this.addNewInput();
        this.addOutput(new Output([GRADIENT_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));
        

        this.addParam(this.paramType   = new SelectParam('type',   '',       false, true, true,  ['linear', 'radial', 'angular', 'diamond'], 0));
        this.addParam(this.paramX1     = new NumberParam('x1',     'x ₁',    true,  true, true,   0));
        this.addParam(this.paramY1     = new NumberParam('y1',     'y ₁',    true,  true, true,  50));
        this.addParam(this.paramX2     = new NumberParam('x2',     'x ₂',    true,  true, true, 100));
        this.addParam(this.paramY2     = new NumberParam('y2',     'y ₂',    true,  true, true,  50));
        this.addParam(this.paramAspect = new NumberParam('aspect', 'aspect', true,  true, true,  50, 0, 100));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true,  true, true,  90));


        this.paramX1    .controls[0].suffix = '%';
        this.paramY1    .controls[0].suffix = '%';
        this.paramX2    .controls[0].suffix = '%';
        this.paramY2    .controls[0].suffix = '%';
        this.paramAspect.controls[0].suffix = '%';
        this.paramAngle .controls[0].suffix = '°';

        this.paramX1    .controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramY1    .controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramX2    .controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramY2    .controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramAspect.controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramAngle .controls[0].min = Number.MIN_SAFE_INTEGER;

        this.paramX1    .controls[0].max = Number.MAX_SAFE_INTEGER;
        this.paramY1    .controls[0].max = Number.MAX_SAFE_INTEGER;
        this.paramX2    .controls[0].max = Number.MAX_SAFE_INTEGER;
        this.paramY2    .controls[0].max = Number.MAX_SAFE_INTEGER;
        this.paramAspect.controls[0].max = Number.MAX_SAFE_INTEGER;
        this.paramAngle .controls[0].max = Number.MAX_SAFE_INTEGER;
    }
    
    
    
    addNewInput()
    {
        const input = new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE, GRADIENT_VALUE, LIST_VALUE]);
        input.isNew = true;

        input.addEventListener('connect',    e => { onVariableConnectInput(e.detail.input); input.isNew = false; });
        input.addEventListener('disconnect', e => onVariableDisconnectInput(e.detail.input));

        this.addInput(input);

        return input;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.node.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

        
        request.push(...this.node.paramType  .genRequest(gen));
        request.push(...this.node.paramX1    .genRequest(gen));
        request.push(...this.node.paramY1    .genRequest(gen));
        request.push(...this.node.paramX2    .genRequest(gen));
        request.push(...this.node.paramY2    .genRequest(gen));
        request.push(...this.node.paramAspect.genRequest(gen));
        request.push(...this.node.paramAngle .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}
