class   OpNumberMap
extends OperatorBase
{
    paramFrom;
    paramTo;



    constructor()
    {
        super(NUMBER_MAP, 'map', 'map', iconNumberMap);

        
        this.canDisable  = true;


        this.addInput (new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramFrom = new ListParam('from', 'from', true, true, true));
        this.addParam(this.paramTo   = new ListParam('to',   'to',   true, true, true));

        this.paramFrom.showValue = false;
        this.paramTo  .showValue = false;

        this.paramFrom.input.types = [NUMBER_LIST_VALUE];
        this.paramTo  .input.types = [NUMBER_LIST_VALUE];

        this.paramFrom.output.types = [NUMBER_LIST_VALUE];
        this.paramTo  .output.types = [NUMBER_LIST_VALUE];
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

        request.push(...this.node.paramFrom.genRequest(gen));
        request.push(...this.node.paramTo  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramFrom.enableControlText(true, this.paramFrom.isUnknown());
        this.paramTo  .enableControlText(true, this.paramTo  .isUnknown());

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

        colors.output  = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.outWire = rgbFromType(type, true);

        return colors;
    }
}