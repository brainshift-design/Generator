class   OpGradient
extends OpColorBase
{
    paramType;
    paramX;
    paramY;
    paramSize;
    paramAngle;
    paramAspect;
    paramSkew;
    paramBlend;


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
        this.addParam(this.paramX      = new NumberParam('x',      'x',      true,  true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true,  true, true,  50));
        this.addParam(this.paramSize   = new NumberParam('size',   'size',   true,  true, true, 100));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true,  true, true,   0));
        this.addParam(this.paramAspect = new NumberParam('aspect', 'aspect', true,  true, true, 100));
        this.addParam(this.paramSkew   = new NumberParam('skew',   'skew',   true,  true, true,   0));
        this.addParam(this.paramBlend  = new SelectParam('blend',  'blend',  false, true, true, BlendModes.map(bm => bm[1]), 0));


        this.paramX     .controls[0].suffix        = '%';
        this.paramY     .controls[0].suffix        = '%';
        this.paramSize  .controls[0].suffix        = '%';
        this.paramAngle .controls[0].suffix        = '°';
        this.paramAngle .controls[0].suffixOffsetY = -4;
        this.paramAspect.controls[0].suffix        = '%';
        this.paramSkew  .controls[0].suffix        = '%';
    }
    
    
    
    addNewInput()
    {
        const input = new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE, GRADIENT_VALUE, LIST_VALUE]);
        input.isNew = true;

        input.addEventListener('connect',    e => { onVariableListConnectInput(e.detail.input); input.isNew = false; });
        input.addEventListener('disconnect', e => onVariableListDisconnectInput(e.detail.input));

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
        request.push(...this.node.paramX     .genRequest(gen));
        request.push(...this.node.paramY     .genRequest(gen));
        request.push(...this.node.paramSize  .genRequest(gen));
        request.push(...this.node.paramAngle .genRequest(gen));
        request.push(...this.node.paramAspect.genRequest(gen));
        request.push(...this.node.paramSkew  .genRequest(gen));
        request.push(...this.node.paramBlend .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramType  .setValue(value.gradType, false, true, false);
        this.paramX     .setValue(value.x,        false, true, false);
        this.paramY     .setValue(value.y,        false, true, false);
        this.paramSize  .setValue(value.size,     false, true, false);
        this.paramAngle .setValue(value.angle,    false, true, false);
        this.paramAspect.setValue(value.aspect,   false, true, false);
        this.paramSkew  .setValue(value.skew,     false, true, false);
        this.paramBlend .setValue(value.blend,    false, true, false);
    }
}
