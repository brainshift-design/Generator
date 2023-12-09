class   OpAtan2
extends OperatorBase
{
    paramX;
    paramY;



    constructor()
    {
        super(NUMBER_ATAN2, 'atan2', 'atan2', iconAtan2);

        //this.iconOffsetY = 2;


        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramX = new NumberParam('x', 'X', true, true, true, 0));
        this.addParam(this.paramY = new NumberParam('y', 'Y', true, true, true, 0));

        this.setAllParamDividers(0.45);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramX.genRequest(gen));
        request.push(...this.node.paramY.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramX.enableControlText(true, this.paramX.isUnknown());
        this.paramY.enableControlText(true, this.paramY.isUnknown());

        this.updateParamControls();
    }
}