class   OpSkew
extends OpAffine
{
    paramSkewX;
    paramSkewY;



    constructor()
    {
        super(SKEW, 'skew', 'skew', iconSkew);


        this.addParam(this.paramSkewX = new NumberParam('skewX', 'skew x', true, true, true));
        this.addParam(this.paramSkewY = new NumberParam('skewY', 'skew y', true, true, true));
    
    
        this.addBaseParams();
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
        request.push(...this.node.paramCenterX    .genRequest(gen));
        request.push(...this.node.paramCenterY    .genRequest(gen));
        request.push(...this.node.paramShowCenter .genRequest(gen));
        request.push(...this.node.paramAffectSpace.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateParams()
    {
        super.updateParams();

        updateParamConditionText(this.paramShowCenter, false /*this.isUnknown()*/, 1);
        updateParamConditionText(this.paramAffectSpace, false /*this.isUnknown()*/, 1);

        this.updateParamControls();
    }
}
