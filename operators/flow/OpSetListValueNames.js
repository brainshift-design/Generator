class   OpSetListValueNames
extends OperatorBase
{
    constructor()
    {
        super(SET_LIST_VALUE_NAMES, 'setValueNames', 'set value names', iconSetListValueNames);

        this.outputValueType = LIST_VALUE;


        this.subscription = true;
        this.canDisable   = true;
        this.iconOffsetY  = -1;


        this.addInput(new Input([
                       LIST_VALUE, 
                NUMBER_LIST_VALUE, 
                  TEXT_LIST_VALUE, 
                 COLOR_LIST_VALUE, 
                  FILL_LIST_VALUE, 
            COLOR_STOP_LIST_VALUE, 
                 SHAPE_LIST_VALUE]));

        this.addInput(new Input([TEXT_LIST_VALUE]));

        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));
    }



    canAutoConnectFrom(output)
    {
        return true;
    }

    

    output_genRequest(gen)
    {
        // 'this' is the output

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
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}



// function OpValueName_onConnectInput(node)
// {
//     node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
// }



// function OpValueName_onDisconnectInput(node)
// {
//     node.outputs[0].types = [ANY_VALUE];
// }