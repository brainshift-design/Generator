class OpLayerMask
extends OperatorBase
{
    static { operatorTypes[LAYER_MASK] = this; }



    paramMaskType;



    constructor()
    {
        super(LAYER_MASK, 'mask', 'mask', iconMask);

        this.canDisable  = true;
        this.iconOffsetY = -1;
        

        this.addOutput(new Output([LAYER_MASK_VALUE], this.output_genRequest, getNodeOutputValuesForUndo));

        this.addParam(this.paramMaskType = new OptionParam('maskType', 'type', false, true, true, LayerMaskTypes, 0));
    }
    
    
    
    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        request.push(...this.node.paramMaskType.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}