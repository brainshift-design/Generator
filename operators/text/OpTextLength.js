class   OpTextLength
extends OperatorBase
{
    paramLength;



    constructor()
    {
        super(TEXT_LENGTH, 'length', 'length');


        this.addInput(new Input([TEXT_VALUE]));

        this.addParam(this.paramLength = new NumberParam('length', 'length', false, false, true));
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.inputs[0];


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        this.paramLength.enableControlText(false);

        this.updateParamControls();
    }
}