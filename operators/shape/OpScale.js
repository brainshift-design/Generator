class   OpScale
extends OperatorBase
{
    paramX;
    paramY;
    
    paramOriginX;
    paramOriginY;



    constructor()
    {
        super(SCALE, 'scale', 'scale');

        this.canDisable = true;

        
        this.addInput (new Input ([...SHAPE_VALUES, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramX       = new NumberParam('x',       'width',    true, true, true, 100));
        this.addParam(this.paramY       = new NumberParam('y',       'height',   true, true, true, 100));
        this.addParam(this.paramOriginX = new NumberParam('originX', 'center x', true, true, true,  50));
        this.addParam(this.paramOriginY = new NumberParam('originY', 'center y', true, true, true,  50));


        this.paramX      .controls[0].suffix = '%';
        this.paramY      .controls[0].suffix = '%';
        this.paramOriginX.controls[0].suffix = '%';
        this.paramOriginY.controls[0].suffix = '%';

        this.paramX      .controls[0].setMin(0);
        this.paramY      .controls[0].setMin(0);

        this.paramOriginX.controls[0].displayMin = 0;
        this.paramOriginX.controls[0].displayMax = 100;

        this.paramOriginY.controls[0].displayMin = 0;
        this.paramOriginY.controls[0].displayMax = 100;


        // this.inputs[0].addEventListener('connect',    e => OpScale_onConnectInput   (this));
        // this.inputs[0].addEventListener('disconnect', e => OpScale_onDisconnectInput(this));
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
        request.push(...this.node.paramOriginX.genRequest(gen));
        request.push(...this.node.paramOriginY.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        this.outputs[0].types = 
            this.inputs[0].connected
            ? [...this.inputs[0].connectedOutput.types]
            : [ANY_VALUE];
    }
}



// function OpScale_onConnectInput(node)
// {
//     node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
// }



// function OpScale_onDisconnectInput(node, input)
// {
//     node.outputs[0].types = [SHAPE_VALUE];
// }