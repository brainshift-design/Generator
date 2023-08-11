class   OpSublist
extends OperatorBase
{
    paramStart;
    paramEnd;

    length;



    constructor()
    {
        super(SUBLIST, 'sublist', 'sublist', iconSublist);

        this.canDisable        = true;
        this.showHeaderTooltip = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramStart = new NumberParam('start', '[ start', true, true, true, 0, 0));
        this.addParam(this.paramEnd   = new NumberParam('end',   '] end',   true, true, true, 0, 0));


        this.paramStart.controls[0].allowEditDecimals = false;
        this.paramEnd  .controls[0].allowEditDecimals = false;
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

        request.push(...this.node.paramStart.genRequest(gen));
        request.push(...this.node.paramEnd  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const length = values[paramIds.findIndex(id => id == 'length')];

        if (length.value > 0)
        {
            this.paramStart.controls[0].setMax(length.value);
            this.paramEnd  .controls[0].setMax(length.value);
        }
        else
        {
            this.paramStart.controls[0].setMax();
            this.paramEnd  .controls[0].setMax();
        }

        this.length = length.value;

        
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.outputs[0].types = [type.value];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramStart.enableControlText(true);
        this.paramEnd  .enableControlText(true);

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