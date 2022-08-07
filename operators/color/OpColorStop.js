class   OpColorStop
extends OperatorBase
{
    paramFill;
    paramPosition;

    
    constructor()
    {
        super(COLOR_STOP, 'fill', 90);


        this.addInput(new Input([COLOR_VALUE]));
        this.addOutput(new Output(GRADIENT_STOP, this.output_genRequest));

        this.addParam(this.paramColor    = new ColorParam ('color',    '',         false, true, true));
        this.addParam(this.paramOpacity  = new NumberParam('opacity',  'opacity',  true,  true, true, 100, 0, 100));
        this.addParam(this.paramPosition = new NumberParam('position', 'position', true,  true, true, 100, 0, 100));

        this.paramColor.setValue(GColorValue.create(1, 217, 217, 217), false, true, false);
        
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