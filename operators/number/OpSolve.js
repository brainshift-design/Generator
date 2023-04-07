class   OpSolve
extends OperatorWithValue
{
    paramCurrent;
    paramTarget;



    constructor()
    {
        super(NUMBER_SOLVE, 'solve', 'solve');

        this.canDisable = true;
        

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.inputs[0].feedback = true;


        this.addParam(this.paramValue);
        this.addParam(this.paramCurrent = new NumberParam('current', 'current', true,  true,  true));
        this.addParam(this.paramTarget  = new NumberParam('target',  'target',  true,  true,  true));
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



    updateParams()
    {
        this.paramValue  .enableControlText(false);
        this.paramCurrent.enableControlText(true);
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