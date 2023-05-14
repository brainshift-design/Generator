class   OpSkew
extends OperatorBase
{
    paramX;
    paramY;
    paramCenterX;
    paramCenterY;



    constructor()
    {
        super(SKEW, 'skew', 'skew');

        this.canDisable = true;

        
        this.addInput (new Input (SHAPE_VALUES));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramX       = new NumberParam('x',       'x',        true, true, true));
        this.addParam(this.paramY       = new NumberParam('y',       'y',        true, true, true));
        this.addParam(this.paramCenterX = new NumberParam('centerX', 'center x', true, true, true, 0));
        this.addParam(this.paramCenterY = new NumberParam('centerY', 'center y', true, true, true, 0));


        this.inputs[0].addEventListener('connect',    e => this.outputs[0].types = [...this.inputs[0].connectedOutput.types]);
        this.inputs[0].addEventListener('disconnect', e => this.outputs[0].types = [SHAPE_VALUE]);
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

        request.push(...this.node.paramX      .genRequest(gen));
        request.push(...this.node.paramY      .genRequest(gen));
        request.push(...this.node.paramCenterX.genRequest(gen));
        request.push(...this.node.paramCenterY.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }
}
