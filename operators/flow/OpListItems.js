class   OpListItems
extends OperatorBase
{
    paramValue;



    constructor()
    {
        super(LIST_ITEMS, 'items', 100);

        this.addInput (new Input (LIST_TYPES, this.input_getValuesForUndo));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.alwaysLoadParams = true;
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });
        
        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];

        // if (input.connected) request.push(...pushInputOrParam(input, gen));
        // else                 request.push(...this.node.paramValue.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}