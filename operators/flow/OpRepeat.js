class   OpRepeat
extends OperatorBase
{
    paramCount;
    paramRepeatId;



    constructor()
    {
        super(REPEAT, 'repeat', 'repeat');

        
        this.addInput (new Input([ANY_TYPE]));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));


        this.addParam(this.paramCount    = new NumberParam('count',    'count',     true, true, false, 1, 0, 1000, 0));
        this.addParam(this.paramRepeatId = new TextParam  ('repeatId', 'repeat ID', true, false));


        this.paramCount.controls[0].allowEditDecimals = false;
        this.paramCount.affectsHeader = false;
    }
    
    

    isMultiplier()
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

        request.push(...this.node.paramCount   .genRequest(gen));
        request.push(...this.node.paramRepeatId.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];
        const count = values[paramIds.findIndex(id => id == 'count')];

        if (count) this.paramCount.setValue(count, false, true, false);

        specifyListOutput(value, this.outputs[0]);
    }



    updateParams()
    {
        this.paramCount   .enableControlText(true);
        this.paramRepeatId.enableControlText(false);

        this.updateParamControls();
    }
}