class   OpTextCSV
extends OperatorBase
{
    paramSeparator;



    constructor()
    {
        super(TEXT_CSV, 'csv');


        this.addInput (new Input (TEXT_TYPES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramSeparator = new TextParam('separator', 'separator', true,  true));
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

        request.push(...this.node.paramSeparator.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramSeparator.enableControlText(true);

        this.updateParamControls();
    }
}