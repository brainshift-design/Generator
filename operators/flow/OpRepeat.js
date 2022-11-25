class   OpRepeat
extends OperatorBase
{
    paramCount;



    constructor()
    {
        super(REPEAT, 'repeat', 100);

        this.addInput (new Input(ALL_TYPES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramCount = new NumberParam('count', 'count', true, true, false, 1, 0, 100, 0));
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
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramCount.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const count = values[paramIds.findIndex(id => id == 'count')];
        if (count) this.paramCount.setValue(count, false, true, false);
    }



    updateParams()
    {
        this.paramCount.formatControl(true);

        super.updateParams();
    }
}