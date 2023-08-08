class   OpSequence
extends OperatorBase
{
    paramStart;
    paramStep;



    constructor()
    {
        super(NUMBER_SEQUENCE, 'sequence', 'sequence', iconSequence);

        this.cached      = false;
        this.iconOffsetY = -1;
        this.canDisable  = true;
        

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramStart = new NumberParam('start', 'start', true, true, true, 0));
        this.addParam(this.paramStep  = new NumberParam('step',  'step',  true, true, true, 1));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramStart.genRequest(gen));
        request.push(...this.node.paramStep .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramStart.enableControlText(true, this.paramStart.isUnknown());
        this.paramStep .enableControlText(true, this.paramStep .isUnknown());

        this.updateParamControls();
    }
}