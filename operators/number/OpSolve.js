class   OpSolve
extends OperatorWithValue
{
    paramCurrent;
    paramTarget;



    constructor()
    {
        super(NUMBER_SOLVE, 'solve', 'solve', iconSolve, defNodeWidth, true);

        this.canDisable = true;
        

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.inputs[0].feedback = true;


        this.addParam(this.paramValue);
        this.addParam(this.paramCurrent = new NumberParam('current', 'current', true,  true,  true, Number.NaN));
        this.addParam(this.paramTarget  = new NumberParam('target',  'target',  true,  true,  true));


        this.setAllParamDividers(0.53);
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

        request.push(...this.node.paramCurrent.genRequest(gen));
        request.push(...this.node.paramTarget .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        this.endProgress();
    }



    updateParams()
    {
        this.paramValue  .enableControlText(false, this.isUnknown());
        this.paramCurrent.enableControlText(false, this.isUnknown());
        this.paramTarget .enableControlText(true);

        this.updateParamControls();
    }



    toJsCode(gen)
    {
        return '';//this.inputs[0].connected
            //  ? 'Math.min(Math.max(' 
            //         + this.paramCurrent.toJsCode(gen) + ', ' + this.inputs[0].connectedOutput.toJsCode(gen) + '), ' 
            //         + this.paramTarget.toJsCode(gen) + ')'
            //  : 'Number.NaN';
    }
}