class   OpColorFill
extends OpGeometryBase
{
    paramColor;
    paramOpacity;

    
    constructor()
    {
        super(COLOR_FILL, 'fill', 90);


        this.addInput(new Input(GEOMETRY_TYPES));
        this.addOutput(new Output(COLOR_FILL, this.output_genRequest));

        this.addParam(this.paramColor   = new ColorParam('color', '', false, true, true));
        this.addParam(this.paramOpacity = new NumberParam('opacity', '', false, true, true, 0, 0, 100));
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