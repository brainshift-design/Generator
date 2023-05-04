class   OpIfElse
extends OperatorBase
{
    paramCondition;


    menuBool;



    constructor()
    {
        super(IF_ELSE, 'ifElse', 'if/else');


        this.addInput (new Input ([ANY_VALUE]));
        this.addInput (new Input ([ANY_VALUE]));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));


        this.addParam(this.paramCondition = new NumberParam('condition', 'condition', true, true, true, 1, 0, 1));


        this.inputs[0].addEventListener('connect',    () => OpIfElse_onConnectInput(this, 0));
        this.inputs[0].addEventListener('disconnect', () => OpIfElse_onDisconnectInput(this, 0));

        this.inputs[1].addEventListener('connect',    () => OpIfElse_onConnectInput(this, 1));
        this.inputs[1].addEventListener('disconnect', () => OpIfElse_onDisconnectInput(this, 1));


        let menuItemTrue;
        let menuItemFalse;

        this.menuBool = new Menu('L', true, false);
        this.menuBool.minWidth = 130;
        this.menuBool.addItems([
            menuItemTrue  = new MenuItem('true',  {icon:  TRUE_DISPLAY_MENU, callback: () => { hideAllMenus(); this.paramCondition.setValue(new NumberValue(1), true); }}),
            menuItemFalse = new MenuItem('false', {icon: FALSE_DISPLAY_MENU, callback: () => { hideAllMenus(); this.paramCondition.setValue(new NumberValue(0), true); }})]);

        this.paramCondition.controls[0].div.addEventListener('pointerdown', e => this.showParamMenu(e, this.paramCondition, this.menuBool));
    }
    
    

    showParamMenu(e, param, menu)
    {
        if (e.button == 2)
        {
            e.preventDefault();
            e.stopPropagation();

            param.controls[0].buttonDown2 = true;

            menu.showAt(e.clientX, e.clientY, false);
        }
    }



    canAutoConnectFrom(output)
    {
        return true; //!getTerminalsAfterNode(this.node).find(n => n.inputs.canConnectFrom(output));
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


        if (this.outputs[0].supportsTypes([COLOR_VALUE]))
        {
            if (   this.inputs[0].connected
                && this.paramCondition.value.value > 0)
                this.outputs[0].wireColor = this.inputs[0].wireColor;
            else if (this.inputs[1].connected
                  && this.paramCondition.value.value == 0)
                this.outputs[0].wireColor = this.inputs[1].wireColor;
            else
                this.outputs[0].wireColor = rgbFromType(ANY_VALUE, true);

            // console.log('this.inputs[0] =', this.inputs[0]);
            // console.log('this.outputs[0] =', this.outputs[0]);
        }

        else if (this.outputs[0].supportsTypes([FILL_VALUE]))
        {
            const colors = this.getHeaderColors();

            if (   this.inputs[0].connected
                && this.paramCondition.value.value > 0)
                this.outputs[0].wireColor = colors.outputWire;
            else if (this.inputs[1].connected
                  && this.paramCondition.value.value == 0)
                this.outputs[0].wireColor = colors.outputWire;
            else
                this.outputs[0].wireColor = rgbFromType(ANY_VALUE, true);

            // console.log('this.inputs[0] =', this.inputs[0]);
            // console.log('this.outputs[0] =', this.outputs[0]);
        }
        
        else
            this.outputs[0].wireColor = rgbFromType(ANY_VALUE, true);


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
    //           : ANY_VALUE;


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
              : ANY_VALUE;


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
        else if (FILL_TYPES.includes(type))
        {
            if (   this.inputs[0].connected
                && this.inputs[1].connected)
            {
                const wireColor =
                    this.paramCondition.value.value > 0
                    ? this.inputs[0].connectedOutput.wireColor
                    : this.inputs[1].connectedOutput.wireColor;

                colors.outputWire = wireColor;
                colors.output = rgbaLerp(
                    rgb_a(getTextColorFromBackColor(rgbFromType(ANY_VALUE, true)), 0.3),
                    wireColor,
                    wireColor[3]);
            }

            else if (this.inputs[0].connected
                  && this.paramCondition.value.value > 0)
            {
                const wireColor = this.inputs[0].connectedOutput.wireColor;

                colors.outputWire = wireColor;
                colors.output = rgbaLerp(
                    rgb_a(getTextColorFromBackColor(rgbFromType(ANY_VALUE, true)), 0.3),
                    wireColor,
                    wireColor[3]);
            }
            else if (this.inputs[1].connected
                  && this.paramCondition.value.value == 0)
            {
                const wireColor = this.inputs[1].connectedOutput.wireColor;

                colors.outputWire = wireColor;
                colors.output = rgbaLerp(
                    rgb_a(getTextColorFromBackColor(rgbFromType(ANY_VALUE, true)), 0.3),
                    wireColor,
                    wireColor[3]);
            }


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
    const firstTypes = [...firstOut.types];
    

    firstInput.types     = [...firstTypes];
    firstInput.wireColor = [...firstOut.wireColor];

    
    if (!node.inputs[otherIndex].connected)
    {
        otherInput.types      = [...firstTypes];
        otherInput.wireColor  = [...firstOut.wireColor];

        node.outputs[0].types = 
            firstTypes.includes(ANY_VALUE)
            ? [ANY_VALUE]
            : [...firstTypes];
    }

    
    for (const output of node.outputs)
        for (const input of output.connectedInputs)
            if (input.node.type == IF_ELSE)
                OpIfElse_onConnectInput(input.node, input.index);


    // if there is an outgoing connection from the node of a different type than
    // the incoming connection, delete the outgoing connection

    if (    node.outputs[0].connected
        && !node.outputs[0].connectedInputs[0].canConnectFrom(firstOut))
        node.outputs[0].connectedInputs.forEach(i => uiDisconnect(i));
}



function OpIfElse_onDisconnectInput(node, inputIndex)
{
    const otherIndex = inputIndex == 0 ? 1 : 0;
    
    const firstInput = node.inputs[inputIndex];
    //const firstOut   = firstInput.connectedOutput;

    const otherInput = node.inputs[otherIndex];
    const otherOut   = otherInput.connectedOutput;
    const otherTypes = otherOut ? otherOut.types : [];


    if (!node.inputs[otherIndex].connected)
        node.inputs[inputIndex].types = [ANY_VALUE];

    node.inputs[otherIndex].types = 
        otherInput.connected 
        ? [...otherTypes]
        : [ANY_VALUE];

    node.outputs[0].types = 
        otherInput.connected
        ? [...otherTypes]
        : [ANY_VALUE];


    // const connectedInputs = node.headerInputs.filter(i => i.connected);

    // if (connectedInputs.length == 1)
    // {
    //     const input = connectedInputs[0];

    //     uiDisconnect(input);

    //     // if (input.node.type == IF_ELSE)
    //     //     OpIfElse_onDisconnectInput(input.node, input.index);
    // }
    {
        for (const output of node.outputs)
            for (const input of output.connectedInputs)
                if (input.node.type == IF_ELSE)
                    OpIfElse_onConnectInput(input.node, input.index);
    }
}