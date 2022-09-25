class   OpGradient
extends OperatorBase
{
    paramType;

    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;


    constructor()
    {
        super(GRADIENT, 'grad', 90);

        this.variableInputs = true;


        this.addNewInput();
        this.addOutput(new Output(GRADIENT, this.output_genRequest));
        

        this.addParam(this.paramType   = new SelectParam('type', '', false, true, true, ['linear', 'radial', 'angular', 'diamond'], 0));

        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, true, 0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, true, 0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 1));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, true, 1));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, true, 0));
    }
    
    
    
    addNewInput()
    {
        const input = new Input([COLOR_TYPES]);
        input.isNew = true;

        input.addEventListener('connect',    () => { OpGradient_onConnectInput(this); input.isNew = false; });
        input.addEventListener('disconnect', () => OpGradient_onDisconnectInput(this, input));

        this.addInput(input);

        return input;
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
            

        const connectedInputs = this.node.inputs.filter(i => i.connected);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        connectedInputs.forEach(input => 
            request.push(...pushInputOrParam(input, gen)));

            
        request.push(
            ...this.node.paramX     .genRequest(gen),
            ...this.node.paramY     .genRequest(gen),
            ...this.node.paramWidth .genRequest(gen),
            ...this.node.paramHeight.genRequest(gen),
            ...this.node.paramAngle .genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);
        
        return request;
    }



    // updateValues(updateParamId, paramIds, values)
    // {
    //     super.updateValues(updateParamId, paramIds, values);

    //     if (paramIds.includes('value'))
    //         this.outputs[0].cache = [NUMBER_VALUE, values[0].toString()];
    // }
}



function OpGradient_onConnectInput(node)
{
    node.addNewInput();
    //node.updateNode();
}



function OpGradient_onDisconnectInput(node, input)
{
    removeFromArray(node.inputs, input);
    node.inputControls.removeChild(input.control);
    //node.updateNode();
}