class   OpList
extends OperatorBase
{
    constructor()
    {
        super(LIST, 'list', 'list', iconList);

        this.canDisable     = true;
        this.variableInputs = true;


        this.addNewInput();
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input(ALL_VALUES);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { onVariableListConnectInput(e.detail.input); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => onVariableListDisconnectInput(e.detail.input));

        this.addInput(newInput);

        return newInput;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.node.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type = values[paramIds.findIndex(id => id == 'type')];
        consoleAssert(LIST_VALUES.includes(type.value));


        this.outputs[0].types = [type.value];
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        
        const type = this.outputs[0].types[0];


        // const back = rgb_a(rgbFromType(type, this.active), 0.95);

        // colors.back = back;


        colors.text   = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        colors.input  = this.active ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
        colors.output = this.active ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire   = rgbFromType(type, true);

        return colors;
    }
}
