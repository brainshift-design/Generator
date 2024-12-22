class   OpTextFind
extends OperatorBase
{
    static { Operator.types[TEXT_FIND] = this; }



    paramValue;
    paramFirst;
    paramLast;
    paramAll;



    constructor()
    {
        super(TEXT_FIND, 'textFind', 'find in text', iconTextFind);

        this.iconOffsetY = -1;
        

        this.addInput(new Input([TEXT_VALUE, NUMBER_VALUE]));
        this.addInput(new Input([TEXT_VALUE, NUMBER_VALUE]));

        this.addParam(this.paramValue = new NumberParam('value', '',            false, false, true));
        this.addParam(this.paramFirst = new NumberParam('first', 'first index', true,  false, true));
        this.addParam(this.paramLast  = new NumberParam('last',  'last index',  true,  false, true));
        this.addParam(this.paramAll   = new   ListParam('all',   'indices',     false, false, true));

        this.paramValue.isNodeValue = true;

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
        // this.paramValue.enableControlText(false);
        this.paramFirst.enableControlText(false, this.isUnknown());
        this.paramLast .enableControlText(false, this.isUnknown());
        this.paramAll  .enableControlText(false, this.isUnknown());

        updateParamConditionText(this.paramValue, this.isUnknown() || this.hasConditionOutputs(), true);

        this.updateParamControls();
    }
}
