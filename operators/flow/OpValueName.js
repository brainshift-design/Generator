class   OpValueName
extends OperatorBase
{
    paramName;



    constructor()
    {
        super(VALUE_NAME, 'valueName', 'value name', iconValueName);


        this.subscription = true;
        this.canDisable   = true;
        this.iconOffsetY  = -1;


        this.addInput (new Input(ALL_VALUES));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.addParam(this.paramName = new TextParam('name', 'name', false, true, true));


        //this.inputs[0].addEventListener('connect',    () => OpValueName_onConnectInput(this));
        //this.inputs[0].addEventListener('disconnect', () => OpValueName_onDisconnectInput(this));
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


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramName.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];
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
                colors.output =
                colors.wire = this.inputs[0].connectedOutput.wireColor;
        }
        else
        {
            const gray = !this.inputs[0].connected;

            //colors.input  = gray ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, !this.active), 0.5), 0.8);
            colors.output = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, !this.active), 0.5), 0.7);
            colors.wire   = gray ? rgbFromType(ANY_VALUE, true) : rgbFromType(type, true);
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