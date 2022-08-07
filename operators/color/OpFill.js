class OpFill
extends OpColorBase
{
    paramFill;
    paramOpacity;

    
    constructor()
    {
        super(FILL, 'fill', 90);


        this.addInput(new Input(FILL_VALUES));
        this.addOutput(new Output(FILL, this.output_genRequest));

        this.addParam(this.paramFill    = new FillParam  ('fill',    '',        false, true, true));
        this.addParam(this.paramOpacity = new NumberParam('opacity', 'opacity', true,  true, true, 100, 0, 100));

        this.paramFill.setValue(GColorValue.create(1, 217, 217, 217), false, true, false);
        
        this.paramOpacity.control.suffix = '%';
    }
    
    
    
    output_genRequest(gen)
    {
        // 'this' is the output

        if (!isEmpty(this.cache))
            return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramColor  .genRequest(gen));
        request.push(...this.node.paramOpacity.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}