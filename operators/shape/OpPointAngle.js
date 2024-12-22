class   OpPointAngle
extends OperatorBase
{
    static { Operator.types[POINT_ANGLE] = this; }



    constructor()
    {
        super(POINT_ANGLE, 'pointAngle', 'point angle', iconPointAngle);

        this.outputValueType  = POINT_VALUE;
        this.canDisable = false;

        this.addInput (new Input([POINT_VALUE, SHAPE_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
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
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type) 
            this.headerOutputs[0].types = [type.value];
        
        if (this.hasConditionOutputs())
            this.headerInputs[0].types = [ANY_VALUE];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}