class   OpSelect
extends OperatorBase
{
    paramNumber;
    paramColor;

    paramIndex;



    constructor()
    {
        super(SELECT, 'select', 100);

        this.inert = true;


        this.addInput(new Input(LIST_TYPES, this.input_getValuesForUndo));

        this.addParam(this.paramIndex = new NumberParam('index', 'index', true, true, false, 0, 0));

        this.paramIndex.control.allowEditDecimals = false;


        this.paramNumber = new NumberParam('value', '', false, false, false);
        this.paramColor  = new  ColorParam('value', '', false, false, false);
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



    updateValues(actionId, updateParamId, paramIds, values)
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
            paramValue = this.addParamByType(val.type, 'value', false, false, true);

        this.paramIndex.control.setMax(
               length
            && length.value > 0
            ? length.value-1
            : Number.MAX_SAFE_INTEGER);
  
        
        super.updateValues(actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        //const paramValue = this.params.find(p => p.id == 'value');

        this.paramIndex.enableControlText(true);


        // if (paramValue)
        // {
        //     paramValue.enableControlText(true);
        //     paramValue.control.valueText = this.paramIndex.value < 0 ? UNKNOWN_DISPLAY : '';
        // }


        this.updateParamControls();
    }
}