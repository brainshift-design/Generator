class   OpUnique
extends OperatorBase
{
    paramCounts;



    constructor()
    {
        super(UNIQUE, 'unique', 'unique', iconUnique);

        this.canDisable  = true;
        // this.iconOffsetY = 1;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramCounts = new ListParam('counts', 'counts', false, false, true));

        this.paramCounts.itemName = '';
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

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramCounts.enableControlText(false);

        this.updateParamControls();
    }
}