class   OpCodeToCharacter
extends OperatorBase
{
    constructor()
    {
        super(TEXT_CHAR, 'codeToChar', 'code to char', iconCodeToCharacter, defNodeWidth, false, false);

        this.valueType         = NUMBER_VALUE;
        this.showHeaderTooltip = true;


        this.addInput (new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));
       
        createHeaderTooltip(this, ttAscii);
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

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type) 
            this.headerOutputs[0].types = [type.value];
        
        if (this.hasConditionOutputs())
            this.headerInputs[0].types = [ANY_VALUE];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}