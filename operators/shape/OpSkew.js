class   OpSkew
extends OpAffine
{
    paramSkewX;
    paramSkewY;



    constructor()
    {
        super(SKEW, 'skew', 'skew', iconSkew);


        this.addParam(this.paramSkewX = new NumberParam('skewX', 'skew X', true, true, true));
        this.addParam(this.paramSkewY = new NumberParam('skewY', 'skew Y', true, true, true));
    
    
        this.paramSkewX.divider = 0.55;
        this.paramSkewY.divider = 0.55;


        this.addBaseParamsAfter('skew');
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

        request.push(...this.node.paramSkewX      .genRequest(gen));
        request.push(...this.node.paramSkewY      .genRequest(gen));
        request.push(...this.node.paramAffectSpace.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }
}
