class   OpPathLength
extends OperatorBase
{
    paramLength;



    constructor()
    {
        super(PATH_LENGTH, 'length', 'path length', iconPathLength);

        this.subscription = true;
        

        this.addInput(new Input([VECTOR_PATH_VALUE]));

        this.addParam(this.paramLength = new NumberParam('length', 'length', false, false, true));

        this.paramLength.isNodeValue = true;
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
        this.paramLength.enableControlText(false, this.isUnknown());

        this.updateParamControls();
    }
}