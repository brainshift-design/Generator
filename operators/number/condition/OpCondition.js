class   OpCondition
extends OperatorBase
{
    paramOperation;
    paramValue;



    constructor()
    {
        super(NUMBER_CONDITION, 'cond', 70);

        this.addInput(new Input(NUMBER_TYPES));
        this.addInput(new Input(NUMBER_TYPES));

        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true,  false, CONDITION_OPS.map(s => s[1]), 1));
        this.addParam(this.paramValue     = new NumberParam('value',     '', false, false, true,  50, 0, 100, 0));
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: '' });

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;

        
        const input0 = this.inputs[0];
        const input1 = this.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        request.push(...this.paramOperation.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        super.updateParams();

        // this.paramOperation.enableControlText(true);
        this.paramValue    .enableControlText(false);

        this.paramValue.control.valueText =  this.isUnknown() ? UNKNOWN_DISPLAY : '';
        this.paramValue.control.showBar   = !this.isUnknown();
    }
}