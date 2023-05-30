class   OpArray
extends OperatorBase
{
    paramValues;



    constructor()
    {
        super(NUMBER_ARRAY, 'array', 'array', iconArray);

        this.cached      = false;
        this.iconOffsetY = 1;

        
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValues = new TextParam('values', 'values', true, true));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramValues.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}