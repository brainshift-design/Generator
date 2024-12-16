class   OpResetTransform
extends OperatorBase
{
    static { operatorTypes[RESET_XFORM] = this; }



    constructor()
    {
        super(RESET_XFORM, 'reset', 'reset transform', iconResetXform);

        this.canDisable  = true;
        this.iconOffsetY = -2;


        this.addInput (new Input([...SHAPE_VALUES, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));
    }



    canAutoConnectFrom(output)
    {
        return true;
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
        
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];
    }
}