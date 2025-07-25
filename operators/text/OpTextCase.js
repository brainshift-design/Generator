class   OpTextCase
extends OperatorBase
{
    static { Operator.types[TEXT_CASE] = this; }



    paramCase;



    constructor()
    {
        super(TEXT_CASE, 'case', 'case', iconTextCase);

        this.canDisable = true;
        

        this.addInput (new Input ([TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramCase = new OptionParam('case', 'case', false, true, true, ['lower case', 'Sentence case', 'Capital Case', 'UPPER CASE', 'camelCase', 'snake_case', 'kebab-case', 'dot . case'], 0));    
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

        request.push(...this.node.paramCase.genRequest(gen));

        
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
        this.paramCase.enableControlText(true, this.paramCase.isUnknown());

        this.updateParamControls();
    }
}