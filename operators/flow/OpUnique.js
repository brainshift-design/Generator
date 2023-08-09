class   OpUnique
extends OperatorBase
{
    paramCounts;

    preview = null;
    length;



    constructor()
    {
        super(UNIQUE, 'unique', 'unique', iconUnique);

        this.canDisable  = true;
        // this.iconOffsetY = 1;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramCounts = new ListParam('counts', 'counts', false, false, true));

        this.paramCounts.itemName  = '';


        createListTooltip(this);
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



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        this.preview = values[paramIds.findIndex(id => id == 'preview')];
        const length = values[paramIds.findIndex(id => id == 'length')];

        this.length = length.value;

        const sep = settings.showNodeId ? ' ' : '  ';
        this.paramCounts.setName('counts' + sep + '[ ' + this.length + ' ]');
    }



    updateParams()
    {
        this.paramCounts.enableControlText(false);

        this.updateParamControls();
    }
}