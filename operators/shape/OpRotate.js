class   OpRotate
extends OperatorBase
{
    paramAngle;
    
    paramCenterX;
    paramCenterY;



    constructor()
    {
        super(ROTATE, 'rotate', 'rotate');

        this.canDisable = true;

        
        this.addInput (new Input ([...SHAPE_VALUES, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramAngle   = new NumberParam('angle',   'angle',    true, true, true, 0));
        this.addParam(this.paramCenterX = new NumberParam('centerX', 'center x', true, true, true, 0));
        this.addParam(this.paramCenterY = new NumberParam('centerY', 'center y', true, true, true, 0));


        this.paramAngle.controls[0].suffix      = '°';
        this.paramAngle.controls[0].dragReverse = true;


        // this.inputs[0].addEventListener('connect',    e => OpRotate_onConnectInput(this));
        // this.inputs[0].addEventListener('disconnect', e => OpRotate_onDisconnectInput(this));
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

        request.push(...this.node.paramAngle  .genRequest(gen));
        request.push(...this.node.paramCenterX.genRequest(gen));
        request.push(...this.node.paramCenterY.genRequest(gen));

        
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


        const bounds = values[paramIds.findIndex(id => id == 'bounds')];

        this.paramCenterX.controls[0].displayMin = -bounds.width.value/2;
        this.paramCenterX.controls[0].displayMax =  bounds.width.value/2;

        this.paramCenterY.controls[0].displayMin = -bounds.height.value/2;
        this.paramCenterY.controls[0].displayMax =  bounds.height.value/2;
    }
}



// function OpRotate_onConnectInput(node)
// {
//     node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
// }



// function OpRotate_onDisconnectInput(node)
// {
//     node.outputs[0].types = [SHAPE_VALUE];
// }