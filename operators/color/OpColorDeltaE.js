class   OpColorDeltaE
extends OperatorBase
{
    paramValue;



    constructor()
    {
        super(COLOR_DELTA_E, 'deltaE', 'delta E', iconColorDeltaE);

        this.outputValueType = ANY_VALUE;


        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));
        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));


        this.addParam(this.paramValue = new NumberParam('value', 'value', false, false, false, 0));

        this.paramValue.controls[0].setMin(0, 0);
        this.paramValue.controls[0].setMax(100);
        
        this.paramValue.controls[0].suffix    = '%';
        this.paramValue.controls[0].thinMinus = true;
    }



    output_genRequest(gen)
    {
        // 'this' is the output


        if (gen.passedNodes.includes(this.node))
        {
            return [
                this.node.type, 
                this.node.id, 
                this.node.name];
        }


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input0 = this.node.inputs[0];
        const input1 = this.node.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, 0, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, 1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        const type  = values[paramIds.findIndex(id => id == 'type' )];
        const value = values[paramIds.findIndex(id => id == 'value')];
        
        this.paramValue.setValue(value, false, false, false);


        if (type)
            this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramValue.enableControlText(false, this.isUnknown());

        this.updateParamControls();
    
            this.paramValue.div.style.display = 
              !this.headerOutputs[0].isCondition() 
            || this.notCondition
            ? 'inline-block'
            : 'none';
    }
}