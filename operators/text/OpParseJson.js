class   OpParseJson
extends OperatorBase
{
    static { Operator.types[PARSE_JSON] = this; }



    paramValue;

    length;



    constructor()
    {
        super(PARSE_JSON, 'json', 'json', iconParseJson);

        this.iconOffsetY       = 1;
        this.showHeaderTooltip = true;


        this.addInput(new Input([TEXT_VALUE]));

        this.addParam(this.paramValue = new ListParam('value', 'values', false, false, true));

        this.paramValue.itemName = [];
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.inputs[0];


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const length = values[paramIds.findIndex(id => id == 'length')];

        this.paramValue.setName('values [ ' + length.value + ' ]');
    }



    updateParams()
    {
        this.paramValue.enableControlText(false);

        this.updateParamControls();
    }



    getHeaderColors()
    {
        const colors = super.getHeaderColors();

        
        colors.input  =
            this.active 
            ? rgb_a(rgbFromType(this.inputs[0].types[0], false), 0.4) 
            : rgb_a(rgbLightenHsv(rgbSaturateHsv(rgbFromType(this.inputs[0].types[0], true), 0.5), 0.9), 1);
        
        colors.inWire = rgbFromType(this.inputs[0].types[0], true);
        
        
        return colors;
    }
}