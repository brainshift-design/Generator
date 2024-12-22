class   OpRange
extends OperatorBase
{
    static { Operator.types[NUMBER_RANGE] = this; }



    paramFrom;
    paramStart;
    paramEnd;



    constructor()
    {
        super(NUMBER_RANGE, 'range', 'range', iconRange);

        this.cached      = false;
        // this.canDisable  = true;
        this.iconOffsetY = 2;
        

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));


        this.addParam(this.paramFrom  = new OptionParam('from',  'from',  true, true, true, ['start', 'middle', 'end'], 1));
        this.addParam(this.paramStart = new NumberParam('start', 'start', true, true, true, 0));
        this.addParam(this.paramEnd   = new NumberParam('end',   'end',   true, true, true, 100));


        this.getDescription = () => `generates a number range, MUST be plugged into a Repeat node's loop parameter`;

        this.paramFrom .getDescription = () => `defines how values in the range are distributed (whether the first or last step are missing, or none)`;
        this.paramStart.getDescription = () => `starting value`;
        this.paramEnd  .getDescription = () => `ending value`;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramFrom  .genRequest(gen));
        request.push(...this.node.paramStart .genRequest(gen));
        request.push(...this.node.paramEnd   .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}