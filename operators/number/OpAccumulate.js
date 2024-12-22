class   OpAccumulate
extends OperatorBase
{
    static { Operator.types[NUMBER_ACCUMULATE] = this; }



    paramWhen;



    constructor()
    {
        super(NUMBER_ACCUMULATE, 'accum', 'accumulate', iconAccumulate);

        this.cached      = false;
        this.iconOffsetY = 1;
        

        this.addInput (new Input ([NUMBER_VALUE, TEXT_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramWhen = new OptionParam('when', 'when', false, true, true, ['use before', 'use after'], 0));


        this.paramWhen.controls[0].textValues =
        [
            [0, 'use before', 'before'],
            [1, 'use after',  'after' ]
        ]
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

        request.push(...this.node.paramWhen.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}