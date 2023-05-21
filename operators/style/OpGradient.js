class   OpGradient
extends OpColorBase
{
    paramX1;
    paramY1;
    paramX2;
    paramY2;
    paramAspect;

    checkersHolder;
    checkers;
    colorBack;



    constructor()
    {
        super(GRADIENT, 'grad', 'gradient');

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
        

        this.addParam(this.paramX1     = new NumberParam('x1',     'x₁',     true, true, true, 0));
        this.addParam(this.paramY1     = new NumberParam('y1',     'y₁',     true, true, true, 0));
        this.addParam(this.paramX2     = new NumberParam('x2',     'x₂',     true, true, true, 0));
        this.addParam(this.paramY2     = new NumberParam('y2',     'y₂',     true, true, true, 0));
        this.addParam(this.paramAspect = new NumberParam('aspect', 'aspect', true, true, true, 0, 0));
    }
    
    
    
    addNewInput()
    {
        const input = new Input([COLOR_VALUE, FILL_VALUE, GRADIENT_VALUE]);
        input.isNew = true;

        input.addEventListener('connect',    () => { onVariableConnectInput(e.detail.input); input.isNew = false; });
        input.addEventListener('disconnect', () => onVariableDisconnectInput(e.detail.input));

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

        
        request.push(...this.node.paramX1    .genRequest(gen));
        request.push(...this.node.paramY1    .genRequest(gen));
        request.push(...this.node.paramX2    .genRequest(gen));
        request.push(...this.node.paramY2    .genRequest(gen));
        request.push(...this.node.paramAspect.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}
