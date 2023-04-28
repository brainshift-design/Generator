class   OpRotate
extends OperatorBase
{
    paramAngle;
    
    paramOriginX;
    paramOriginY;



    constructor()
    {
        super(ROTATE, 'rotate', 'rotate');

        this.canDisable = true;

        
        this.addInput (new Input (SHAPE_VALUES));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramAngle   = new NumberParam('angle',   'angle',    true, true, true,  0));
        this.addParam(this.paramOriginX = new NumberParam('originX', 'center x', true, true, true, 50));
        this.addParam(this.paramOriginY = new NumberParam('originY', 'center y', true, true, true, 50));


        this.paramAngle  .controls[0].suffix      = '°';
        this.paramAngle  .controls[0].dragReverse = true;

        this.paramOriginX.controls[0].suffix      = '%';
        this.paramOriginY.controls[0].suffix      = '%';

        this.paramOriginX.controls[0].displayMin  = 0;
        this.paramOriginX.controls[0].displayMax  = 100;

        this.paramOriginY.controls[0].displayMin  = 0;
        this.paramOriginY.controls[0].displayMax  = 100;


        this.inputs[0].addEventListener('connect',    e => OpRotate_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', e => OpRotate_onDisconnectInput(this));
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
        request.push(...this.node.paramOriginX.genRequest(gen));
        request.push(...this.node.paramOriginY.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }
}



function OpRotate_onConnectInput(node)
{
    node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
}



function OpRotate_onDisconnectInput(node)
{
    node.outputs[0].types = [SHAPE_VALUE];
}