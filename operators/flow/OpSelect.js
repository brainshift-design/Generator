class   OpSelect
extends OperatorBase
{
    paramIndex;



    constructor()
    {
        super(SELECT, 'select', 'select');

        this.alwaysSaveParams = true;


        this.addInput(new Input(LIST_TYPES, getNodeInputValuesForUndo));

        this.addParam(this.paramIndex = new NumberParam('index', 'index', true, true, false, 0, 0));
        this.paramIndex.controls[0].allowEditDecimals = false;
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        return this.node.genRequest(gen);
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

        request.push(...this.paramIndex.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const val    = values[paramIds.findIndex(id => id == 'value' )];
        const length = values[paramIds.findIndex(id => id == 'length')];


        let paramValue = this.params.find(p => p.id == 'value');

        if (   paramValue
            && (  !val
                || paramValue.type != val.type))
            this.removeParam(paramValue);


        if (  !paramValue 
            && val) 
            paramValue = this.createAndInsertParamByType(0, val.type, 'value', false, false, false, true);

        
        this.paramIndex.controls[0].setMax(
               length
            && length.value > 0
            ? length.value-1
            : Number.MAX_SAFE_INTEGER);
  
        
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        //const paramValue = this.params.find(p => p.id == 'value');

        this.paramIndex.enableControlText(true);


        // if (paramValue)
        // {
        //     paramValue.enableControlText(true);
        //     paramValue.controls[0].valueText = this.paramIndex.value < 0 ? UNKNOWN_DISPLAY : '';
        // }


        this.updateParamControls();
    }



    loadParams(_node, pasting)
    {
        if (!_node.params)
            return;

        const _paramValue = _node.params.find(p => p[1] == 'value');
        const _paramIndex = _node.params.find(p => p[1] == 'index');

        this.createAndInsertParamByType(0, _paramValue[0], _paramValue[1], false, false, false, true);
        this.params[0].loadParam(_paramValue);
 
        this.paramIndex.loadParam(_paramIndex);
    }
}