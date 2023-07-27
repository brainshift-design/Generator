class   OpTextContains
extends OperatorBase
{
    paramValue;



    constructor()
    {
        super(TEXT_CONTAINS, 'contains', 'contains', iconTextContains);

        this.canDisable  = true;
        this.iconOffsetY = -1;
        

        this.addInput (new Input([TEXT_VALUE]));
        this.addInput (new Input([TEXT_VALUE]));

        this.addParam(this.paramValue = new NumberParam('value', '', false, false, true));

        this.paramValue.isNodeValue = true;
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });

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


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false);

        updateParamConditionText(this.paramValue, this.paramValue.isUnknown(), true);

        
        this.updateParamControls();
    }
}