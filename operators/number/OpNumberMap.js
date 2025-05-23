class   OpNumberMap
extends OperatorBase
{
    static { Operator.types[NUMBER_MAP] = this; }



    paramFrom;
    paramTo;



    constructor()
    {
        super(NUMBER_MAP, 'remap', 'remap', iconNumberMap);


        this.canDisable  = true;


        this.addInput (new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramFrom = new ListParam('from', 'from', true, true, true));
        this.addParam(this.paramTo   = new ListParam('to',   'to',   true, true, true));

        this.paramFrom.showValue = false;
        this.paramTo  .showValue = false;

        this.paramFrom.listTypes   = [NUMBER_LIST_VALUE];
        this.paramTo  .listTypes   = [NUMBER_LIST_VALUE];

        this.paramFrom.outputTypes = [NUMBER_LIST_VALUE];
        this.paramTo  .outputTypes = [NUMBER_LIST_VALUE];
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

        request.push(...this.node.paramFrom.genRequest(gen));
        request.push(...this.node.paramTo  .genRequest(gen));

        
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
        this.paramFrom.enableControlText(true, this.paramFrom.isUnknown());
        this.paramTo  .enableControlText(true, this.paramTo  .isUnknown());

        this.updateParamControls();
    }
}