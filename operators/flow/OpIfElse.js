class   OpIfElse
extends OperatorBase
{
    paramCondition;



    constructor()
    {
        super(IF_ELSE, 'if/else');


        this.addInput (new Input(ALL_TYPES));
        this.addInput (new Input(ALL_TYPES));
        this.addOutput(new Output([], this.output_genRequest));


        this.addParam(this.paramCondition = new NumberParam('condition', 'condition', true, true, false, 1, 0, 1));


        this.inputs[0].addEventListener('connect',    () => OpIfElse_onConnectInput(this, 0));
        this.inputs[0].addEventListener('disconnect', () => OpIfElse_onDisconnectInput(this, 0));

        this.inputs[1].addEventListener('connect',    () => OpIfElse_onConnectInput(this, 1));
        this.inputs[1].addEventListener('disconnect', () => OpIfElse_onDisconnectInput(this, 1));


        //this.paramCondition.controls[0].showBar = false;
        //this.paramCondition.controls[0].barTop  = 0.8;        
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

        
        request.push(...this.node.paramCondition.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramCondition.enableControlText(true);

        updateParamConditionText(this.paramCondition, this.isUnknown(), 1);

        if (   this.paramCondition.value.value == 0
            && this.outputs[0].supportsTypes([COLOR_VALUE]))
            this.outputs[0].wireColor = this.inputs[this.paramCondition.value.value > 0 ? 1 : 0].wireColor;

        this.updateParamControls();
    }



    getHeaderColors()
    {
        const colors = super.getHeaderColors();

        const type =
            this.inputs[0].connected
            ? this.inputs[0].types[0]
            : this.inputs[1].connected
              ? this.inputs[1].types[0]
              : ANY_TYPE;


        let colorActive  = rgbFromType(type, true);
        let colorPassive = rgbFromType(type, false);


        if (NUMBER_TYPES.includes(type))
        {
            colors.input  = this.active ? rgb_a(colorPassive, 0.6) : rgb_a(colorActive, 0.75);
            colors.output = this.active ? rgb_a(colorPassive, 0.55) : rgb_a(colorActive, 0.65);
        }
        else if (TEXT_TYPES.includes(type))
        {
            colors.input  = this.active ? rgb_a(colorActive, 0.55) : rgb_a(colorActive, 0.55);
            colors.output = this.active ? rgb_a(colorActive, 0.45) : rgb_a(colorActive, 0.45);
        }
        else if (SHAPE_TYPES.includes(type))
        {
            colors.input  = this.active ? rgb_a(colorPassive, 0.65) : rgb_a(colorActive, 0.7);
            colors.output = this.active ? rgb_a(colorPassive, 0.65) : rgb_a(colorActive, 0.6);
        }
        else if (COLOR_TYPES.includes(type))
        {
            // leave default color
        }

        return colors;
    }
}



function OpIfElse_onConnectInput(node, inputIndex)
{
    const otherIndex = inputIndex == 0 ? 1 : 0;

    const inputOut   = node.inputs[inputIndex].connectedOutput;
    const inputTypes = inputOut.types;
    
    
    node.inputs[inputIndex].types = [...inputTypes];
  
    if (!node.inputs[otherIndex].connected)
    {
        node.inputs[otherIndex].types = [...inputTypes];
        node.inputs
        node.outputs[0]        .types = [...inputTypes];
    }

    
    // if there is an outgoing connection from the node of a different type than
    // the incoming connection, delete the outgoing connection

    if (    node.outputs[0].connected
        && !node.outputs[0].connectedInputs[0].canConnectFrom(inputOut))
        node.outputs[0].connectedInputs.forEach(i => uiDisconnect(i));
}



function OpIfElse_onDisconnectInput(node, inputIndex)
{
    const otherIndex = inputIndex == 0 ? 1 : 0;

    const otherInput = node.inputs[otherIndex];
    const otherOut   = otherInput.connectedOutput;
    const otherTypes = otherOut ? otherOut.types : [];


    if (!node.inputs[otherIndex].connected)
        node.inputs[inputIndex].types = [...ALL_TYPES];

    node.inputs[otherIndex].types = 
        otherInput.connected 
        ? [...otherTypes]
        : [...ALL_TYPES];


    node.outputs[0].types = 
        otherInput.connected
        ? [...otherTypes]
        : [];
}