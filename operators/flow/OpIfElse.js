class   OpIfElse
extends OperatorBase
{
    paramCondition;



    constructor()
    {
        super(IF_ELSE, 'ifElse', 'if/else');


        this.addInput (new Input(ALL_TYPES));
        this.addInput (new Input(ALL_TYPES));
        this.addOutput(new Output([ANY_TYPE], this.output_genRequest));


        this.addParam(this.paramCondition = new NumberParam('condition', 'condition', true, true, true, 1, 0, 1));


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
              && input1.connected) request.push(2,
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



    // updateHeader()
    // {
    //     super.updateHeader();


    //     const colors = super.getHeaderColors();

    //     const type =
    //         this.inputs[0].connected
    //         ? this.inputs[0].types[0]
    //         : this.inputs[1].connected
    //           ? this.inputs[1].types[0]
    //           : ANY_TYPE;


    //     if (COLOR_TYPES.includes(type))
    //     {
    //         colors.output =
    //             this.inputs[0].connected
    //             ? this.inputs[0].connectedOutput.wireColor
    //             : this.inputs[1].connected
    //               ? this.inputs[1].connectedOutput.wireColor
    //               : rgbFromType(IF_ELSE, true);

    //         colors.wire = colors.output;
    //     }
    // }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

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
            colors.input  = this.active ? rgb_a(colorPassive, 0.55) : rgb_a(colorActive, darkMode ? 0.65 : 0.5);
            colors.output = this.active ? rgb_a(colorPassive, 0.5 ) : rgb_a(colorActive, darkMode ? 0.6  : 0.4);
            colors.wire   = colorActive;
        }
        else if (TEXT_TYPES.includes(type))
        {
            colors.input  = this.active ? rgb_a(colorActive, 0.55) : rgb_a(darkMode ? colorActive : colorPassive, darkMode ? 0.55 : 1);
            colors.output = this.active ? rgb_a(colorActive, 0.45) : rgb_a(darkMode ? colorActive : colorPassive, darkMode ? 0.45 : 0.9);
            colors.wire   = colorActive;
        }
        else if (SHAPE_TYPES.includes(type))
        {
            colors.input  = this.active ? rgb_a(colorPassive, 0.65) : rgb_a(colorActive, darkMode ? 0.6 : 0.5 );
            colors.output = this.active ? rgb_a(colorPassive, 0.65) : rgb_a(colorActive, darkMode ? 0.5 : 0.45);
            colors.wire   = colorActive;
        }
        else if (COLOR_TYPES.includes(type))
        {
            //const typeColor = rgbFromType(this.type, true);


            if (   this.inputs[0].connected
                && this.inputs[1].connected)
            {
                colors.output = 
                    this.paramCondition.value.value > 0
                    ? this.inputs[0].connectedOutput.wireColor
                    : this.inputs[1].connectedOutput.wireColor;
            }

            else if (this.inputs[0].connected
                  && this.paramCondition.value.value > 0)
                colors.output = this.inputs[0].connectedOutput.wireColor;

            else if (this.inputs[1].connected
                  && this.paramCondition.value.value == 0)
                colors.output = this.inputs[1].connectedOutput.wireColor;


            colors.wire = colors.output;
        }

        
        
        return colors;
    }
}



function OpIfElse_onConnectInput(node, inputIndex)
{
    const otherIndex = inputIndex == 0 ? 1 : 0;

    const firstInput = node.inputs[inputIndex];
    const otherInput = node.inputs[otherIndex];

    const firstOut   = firstInput.connectedOutput;
    const firstTypes = firstOut.types;
    

    firstInput.types     = [...firstTypes];
    firstInput.wireColor = firstOut.wireColor;

    
    if (!node.inputs[otherIndex].connected)
    {
        otherInput.types      = [...firstTypes];
        otherInput.wireColor  = firstOut.wireColor;

        node.outputs[0].types = [...firstTypes];
    }

    
    // if there is an outgoing connection from the node of a different type than
    // the incoming connection, delete the outgoing connection

    if (    node.outputs[0].connected
        && !node.outputs[0].connectedInputs[0].canConnectFrom(firstOut))
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