class   OpTextJson
extends OperatorBase
{
    paramValue;

    length;



    constructor()
    {
        super(TEXT_JSON, 'json', 'json', iconTextJson);

        this.subscription      = true;
        this.iconOffsetY       = 1;
        this.showHeaderTooltip = true;


        this.addInput(new Input([TEXT_VALUE]));

        this.addParam(this.paramValue = new ListParam('value', 'values', false, false, true));

        this.paramValue.itemName = '';
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
}