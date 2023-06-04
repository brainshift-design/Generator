class   OpConstant
extends OperatorWithValue
{
    paramConstant;
    


    constructor()
    {
        super(NUMBER_CONSTANT, 'constant', 'constant', iconConstant);

        this.iconOffsetY = -3;


        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramConstant = new SelectParam('constant', 'constant', false, true, true, ['√2', 'e', 'φ', 'Φ', 'π', 'τ'], 4));

        this.paramConstant.reverseMenu = true;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramConstant.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false);

        this.updateParamControls();
    }
}