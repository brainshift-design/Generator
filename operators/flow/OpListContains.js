class   OpListContains
extends OperatorBase
{
    paramValue;
    paramFirst;
    paramLast;
    paramAll;



    constructor()
    {
        super(LIST_CONTAINS, 'contains', 'contains', iconListContains);

        this.canDisable  = true;
        this.iconOffsetY = 0;
        

        this.addInput(new Input(LIST_VALUES));
        this.addInput(new Input([ANY_VALUE]));

        this.addParam(this.paramValue = new NumberParam('value', '',            false, false, true));
        this.addParam(this.paramFirst = new NumberParam('first', 'first index', true,  false, true));
        this.addParam(this.paramLast  = new NumberParam('last',  'last index',  true,  false, true));
        this.addParam(this.paramAll   = new   ListParam('all',   'all',         false, false, true));

        this.paramValue.isNodeValue = true;
        this.paramFirst.isNodeValue = true;
        this.paramLast .isNodeValue = true;
        this.paramAll  .isNodeValue = true;

        this.paramAll.itemName = [];

        this.paramFirst.divider = 0.62;
        this.paramLast .divider = 0.62;
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;

        
        const input0 = this.inputs[0];
        const input1 = this.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramAll.showCount = value.isValid();
    }



    updateParams()
    {
        // const inputsUnknown = 
        //        (!this.headerInputs[0].connected || this.headerInputs[0].node.isUnknown())
        //     || (!this.headerInputs[1].connected || this.headerInputs[1].node.isUnknown());

        // this.paramValue.enableControlText(false, this.isUnknown());
        this.paramFirst.enableControlText(false, /*inputsUnknown ||*/ this.isUnknown());
        this.paramLast .enableControlText(false, /*inputsUnknown ||*/ this.isUnknown());
        this.paramAll  .enableControlText(false, /*inputsUnknown ||*/ this.isUnknown());

        updateParamConditionText(this.paramValue, this.isUnknown() || this.hasConditionOutputs(), true);

        this.updateParamControls();
    }
}