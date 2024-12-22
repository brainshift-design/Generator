class   OpReversePath
extends OperatorBase
{
    static { Operator.types[REVERSE_PATH] = this; }



    constructor()
    {
        super(REVERSE_PATH, 'reversePath', 'reverse path', iconReversePath);

        this.canDisable  = true;

        
        this.addInput (new Input (PATH_VALUES));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));
    }
    
    

    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

       
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type  = values[paramIds.findIndex(id => id == 'type')];
        if (type) this.headerOutputs[0].types = [type.value];
    }
}