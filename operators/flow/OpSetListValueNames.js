class   OpSetListValueNames
extends OperatorBase
{
    constructor()
    {
        super(SET_LIST_VALUE_NAMES, 'setValueNames', 'set value names', iconSetListValueNames);


        this.subscription = true;
        this.canDisable   = true;
        this.iconOffsetY  = -1;


        this.addInput(new Input([LIST_VALUE, NUMBER_LIST_VALUE, TEXT_LIST_VALUE, SHAPE_LIST_VALUE]));
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



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.text  = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        if (   this.outputs[0].supportsTypes([COLOR_VALUE])
            || this.outputs[0].supportsTypes([FILL_VALUE]))
        {
            if (this.inputs[0].connected)
                colors.output  =
                colors.outWire = this.inputs[0].connectedOutput.wireColor;
        }
        else
        {
            const gray = !this.inputs[0].connected;

            colors.output  = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, !this.active), 0.5), 0.7);
            colors.outWire = gray ? rgbFromType(ANY_VALUE, true) : rgbFromType(type, true);
        }
        
        return colors;
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