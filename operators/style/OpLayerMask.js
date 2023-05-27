class OpLayerMask
extends OperatorBase
{
    constructor()
    {
        super(LAYER_MASK, 'mask', 'mask', iconMask);

        this.canDisable  = true;
        this.iconOffsetY = -1;
        

        this.addOutput(new Output([LAYER_MASK_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));
    }
    
    
    
    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}