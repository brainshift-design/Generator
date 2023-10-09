class   OpSequence
extends OperatorBase
{
    paramStart;
    paramMultiply;
    paramAdd;
    paramEnd;



    constructor()
    {
        super(NUMBER_SEQUENCE, 'sequence', 'sequence', iconSequence);

        this.cached      =  false;
        this.iconOffsetY = -1;
        this.canDisable  =  true;
        

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramStart    = new NumberParam('start',    '[ start', true,  true, true,  0));
        this.addParam(this.paramMultiply = new NumberParam('multiply', 'mult',  true,  true, true,  1));
        this.addParam(this.paramAdd      = new NumberParam('add',      ' add',  true,  true, true, 10));
        this.addParam(this.paramEnd      = new NumberParam('end',      '] end',   true,  true, true, Number.NaN));

        this.paramMultiply.reverseMenu = true;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramStart   .genRequest(gen));
        request.push(...this.node.paramMultiply.genRequest(gen));
        request.push(...this.node.paramAdd     .genRequest(gen));
        request.push(...this.node.paramEnd     .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);
        
        return request;
    }



    updateParams()
    {
        this.paramStart   .enableControlText(true, this.paramStart   .isUnknown());
        this.paramMultiply.enableControlText(true, this.paramMultiply.isUnknown());
        this.paramAdd     .enableControlText(true, this.paramAdd     .isUnknown());
        this.paramEnd     .enableControlText(true, this.paramEnd     .isUnknown());

        this.updateParamControls();
    }
}