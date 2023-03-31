class   OpTextReplace
extends OperatorBase
{
    paramWhat;
    paramWith;



    constructor()
    {
        super(TEXT_REPLACE, 'replace');

        this.canDisable = true;
        

        this.addInput (new Input (TEXT_TYPES));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramWhat = new TextParam('what', '', true,  true));
        this.addParam(this.paramWith = new TextParam('with', '', true,  true));
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

        request.push(...this.node.paramWhat.genRequest(gen));
        request.push(...this.node.paramWith.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        this.value = values[paramIds.findIndex(id => id == 'value')];
    }



    updateParams()
    {
        this.paramWhat.enableControlText(true);
        this.paramWith.enableControlText(true);

        this.updateParamControls();
    }
}