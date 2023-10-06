class OpLayerBlend
extends OperatorBase
{
    paramOpacity;
    paramBlend;



    constructor()
    {
        super(LAYER_BLEND, 'blend', 'blend', iconColorBlend);

        this.canDisable  = true;
        this.iconOffsetY = -1;
        

        this.addOutput(new Output([LAYER_BLEND_VALUE], this.output_genRequest, getNodeOutputValuesForUndo));

        this.addParam(this.paramBlend   = new SelectParam('blend',   'blend',   false, true, true, BlendModes.map(bm => bm[1]), 0));
        this.addParam(this.paramOpacity = new NumberParam('opacity', 'opacity', true,  true, true, 100, 0, 100));
    
        this.paramOpacity.controls[0].suffix = '%';

        this.paramOpacity.divider = 0.54;
    }
    
    
    
    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        request.push(...this.node.paramOpacity.genRequest(gen));
        request.push(...this.node.paramBlend  .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}