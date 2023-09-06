class   OpUnique
extends OperatorBase
{
    paramCounts;
    paramIndices;

    length;



    constructor()
    {
        super(UNIQUE, 'unique', 'unique', iconUnique);

        this.canDisable        = true;
        this.showHeaderTooltip = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramCounts  = new ListParam('counts',  'counts',  false, false, true));
        //this.addParam(this.paramIndices = new ListParam('indices', 'indices', false, false, true));
        this.paramIndices = new ListParam('indices', 'indices', false, false, true);

        this.paramCounts .itemName  = '';
        this.paramIndices.itemName  = '';
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

        const length = values[paramIds.findIndex(id => id == 'length')];

        this.length = length.value;

        const sep = settings.showNodeId ? ' ' : '  ';

        this.paramCounts .setName('counts'  + sep + '[ ' + this.length + ' ]');
        this.paramIndices.setName('indices' + sep + '[ ' + this.length + ' ]');


        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.outputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramCounts .enableControlText(false, this.isUnknown());
        this.paramIndices.enableControlText(false, this.isUnknown());

        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.text  = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const gray =
               this.active
            && this.outputs[0].types[0] == LIST_VALUE;

        colors.input  = this.active ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
        colors.output = gray        ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire   = rgbFromType(type, true);

        return colors;
    }
}