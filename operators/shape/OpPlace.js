class   OpPlace
extends OperatorBase
{
    paramPoints;



    constructor()
    {
        super(PLACE, 'place', 'place', iconPlace);

        this.canDisable  = true;
        this.iconOffsetY = -2;

        
        this.addInput (new Input (SHAPE_VALUES));
        this.addOutput(new Output([SHAPE_LIST_VALUE], this.output_genRequest));


        this.addParam(this.paramPoints = new ListParam('points', 'points', false, true, true));


        this.paramPoints.itemName  = 'point';
        this.paramPoints.showZero  = false;
        this.paramPoints.listTypes = [POINT_VALUE, SHAPE_LIST_VALUE, LIST_VALUE];
        this.paramPoints.input.types.push(...this.paramPoints.listTypes);

        // this.inputs[0].addEventListener('connect',    e => this.outputs[0].types = [...this.inputs[0].connectedOutput.types]);
        // this.inputs[0].addEventListener('disconnect', e => this.outputs[0].types = [SHAPE_VALUE]);
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

        request.push(...this.node.paramPoints.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }
}
