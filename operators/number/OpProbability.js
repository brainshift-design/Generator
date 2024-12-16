class   OpProbability
extends OperatorBase
{
    static { operatorTypes[PROBABILITY] = this; }



    paramSeed;
    paramIteration;
    paramChance;
    paramAlternate;



    constructor()
    {
        super(PROBABILITY, 'prob', 'probability', iconProbability);

        this.outputValueType   = ANY_VALUE;
        this.cached      = false;
        this.iconOffsetY = -2;

        
        this.addInput (new Input ([ANY_VALUE]));
        this.addInput (new Input ([ANY_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramSeed      = new NumberParam('seed',      'seed',      true, true, true, Math.floor(Math.random() * 10000), 0, 0x7fffffff));
        this.addParam(this.paramIteration = new NumberParam('iteration', 'iteration', true, true, true, Number.NaN, 0));
        this.addParam(this.paramChance    = new NumberParam('chance',    'chance',    true, true, true, 50, 0, 100));
        this.addParam(this.paramAlternate = new NumberParam('alternate', 'alternate', true, true, true,  0, 0, 100));

        this.paramSeed.controls[0].allowEditDecimals = false;
        this.paramSeed.isDefault = () => false;

        this.paramChance   .controls[0].suffix = '%';
        this.paramAlternate.controls[0].suffix = '%';
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input0 = this.node.inputs[0];
        const input1 = this.node.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, 0, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, 1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        request.push(...this.node.paramSeed     .genRequest(gen));
        request.push(...this.node.paramIteration.genRequest(gen));
        request.push(...this.node.paramChance   .genRequest(gen));
        request.push(...this.node.paramAlternate.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];
    }
}