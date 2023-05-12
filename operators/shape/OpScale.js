class   OpScale
extends OperatorBase
{
    paramX;
    paramY;
    
    paramCenterX;
    paramCenterY;



    constructor()
    {
        super(SCALE, 'scale', 'scale');

        this.canDisable = true;

        
        this.addInput (new Input ([...SHAPE_VALUES, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramX       = new NumberParam('x',       'width',    true, true, true, 100));
        this.addParam(this.paramY       = new NumberParam('y',       'height',   true, true, true, 100));
        this.addParam(this.paramCenterX = new NumberParam('centerX', 'center x', true, true, true,   0));
        this.addParam(this.paramCenterY = new NumberParam('centerY', 'center y', true, true, true,   0));


        this.paramX.controls[0].suffix = '%';
        this.paramY.controls[0].suffix = '%';

        this.paramX.controls[0].setMin(0);
        this.paramY.controls[0].setMin(0);


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



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const bounds = values[paramIds.findIndex(id => id == 'bounds')];

        
        if (bounds.width.value > 0)
        {
            this.paramCenterX.controls[0].displayMin = -bounds.width.value/2;
            this.paramCenterX.controls[0].displayMax =  bounds.width.value/2;
        }
        else
        {
            this.paramCenterX.controls[0].displayMin = this.paramCenterX.controls[0].min;
            this.paramCenterX.controls[0].displayMax = this.paramCenterX.controls[0].max;
        }


        if (bounds.height.value > 0)
        {
            this.paramCenterY.controls[0].displayMin = -bounds.height.value/2;
            this.paramCenterY.controls[0].displayMax =  bounds.height.value/2;
        }
        else
        {
            this.paramCenterY.controls[0].displayMin = this.paramCenterY.controls[0].min;
            this.paramCenterY.controls[0].displayMax = this.paramCenterY.controls[0].max;
        }
    }
}
