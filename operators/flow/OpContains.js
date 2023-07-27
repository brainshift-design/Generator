class   OpContains
extends OperatorBase
{
    paramValue;
    paramFirst;
    paramLast;
    paramAll;



    constructor()
    {
        super(CONTAINS, 'contains', 'contains', iconContains);

        this.canDisable  = true;
        //this.iconOffsetY = -1;
        

        this.addInput (new Input(LIST_VALUES));
        this.addInput (new Input([ANY_VALUE]));

        this.addParam(this.paramValue = new NumberParam('value', '',      false, false, true));
        this.addParam(this.paramFirst = new NumberParam('first', 'first', true,  false, true));
        this.addParam(this.paramLast  = new NumberParam('last',  'last',  true,  false, true));
        this.addParam(this.paramAll   = new   ListParam('all',   'all',   false, false, true));

        this.paramValue.isNodeValue = true;

        this.paramAll.itemName = '';
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
        this.paramValue.enableControlText(false);
        this.paramFirst.enableControlText(false);
        this.paramLast .enableControlText(false);
        this.paramAll  .enableControlText(false);

        updateParamConditionText(this.paramValue, this.paramValue.isUnknown(), true);

        this.updateParamControls();
    }
}