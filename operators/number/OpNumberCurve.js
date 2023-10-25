class   OpNumberCurve
extends OperatorWithValue
{
    paramMin;
    paramMax;
    paramPower;
    paramBias;
    paramSpread;



    constructor()
    {
        super(NUMBER_CURVE, 'curve', 'curve', iconNumberCurve);

        this.canDisable  = true;


        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramMin    = new NumberParam('min',    'min',    true, true, true,   0));
        this.addParam(this.paramMax    = new NumberParam('max',    'max',    true, true, true, 100));
        this.addParam(this.paramPower  = new NumberParam('power',  'power',  true, true, true, 1));
        this.addParam(this.paramBias   = new NumberParam('bias',   'bias',   true, true, true, 0, -100, 100));
        this.addParam(this.paramSpread = new NumberParam('spread', 'spread', true, true, true, 0, -100, 100));

        this.paramMin.divider = 0.42;
        this.paramMax.divider = 0.42;

        this.paramPower .controls[0].setDecimals(2);
      
        this.paramBias  .controls[0].suffix = '%';
        this.paramSpread.controls[0].suffix = '%';
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

        request.push(...this.node.paramMin   .genRequest(gen));
        request.push(...this.node.paramMax   .genRequest(gen));
        request.push(...this.node.paramPower .genRequest(gen));
        request.push(...this.node.paramBias  .genRequest(gen));
        request.push(...this.node.paramSpread.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue .enableControlText(false, this.isUnknown());
        this.paramMin   .enableControlText(true);
        this.paramMax   .enableControlText(true);
        this.paramPower .enableControlText(true);
        this.paramBias  .enableControlText(true);
        this.paramSpread.enableControlText(true);

        this.updateParamControls();
    }



    // toJsCode(gen)
    // {
    //     return this.inputs[0].connected
    //          ? 'Math.min(Math.max(' 
    //                 + this.paramMin.toJsCode(gen) + ', ' + this.inputs[0].connectedOutput.toJsCode(gen) + '), ' 
    //                 + this.paramMax.toJsCode(gen) + ')'
    //          : 'Number.NaN';
    // }
}