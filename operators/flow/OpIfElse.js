class   OpIfElse
extends OperatorBase
{
    paramCondition;


    menuBool;



    constructor()
    {
        super(IF_ELSE, 'ifElse', 'if/else', iconIfElse);

        this.iconOffsetY = -1;
        //this.cached = false;


        this.addInput (new Input ([ANY_VALUE]));
        this.addInput (new Input ([ANY_VALUE]));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));


        this.addParam(this.paramCondition = new NumberParam('condition', 'condition', true, true, true, 1, 0, 1));

        this.paramCondition.divider = 0.62;


        // this.inputs[0].addEventListener('connect',    () => OpIfElse_onConnectInput(this, 0));
        // this.inputs[0].addEventListener('disconnect', () => OpIfElse_onDisconnectInput(this, 0));

        // this.inputs[1].addEventListener('connect',    () => OpIfElse_onConnectInput(this, 1));
        // this.inputs[1].addEventListener('disconnect', () => OpIfElse_onDisconnectInput(this, 1));


        this.menuBool = createBoolMenu(this.paramCondition);
    }
    
    

    canAutoConnectFrom(output)
    {
        return true; //!getTerminalsAfterNode(this.node).find(n => n.inputs.canConnectFrom(output));
    }

    

    isOrPrecededByUncached()
    {
        if (this.paramCondition.input.isUncached()) return true;
        
        if (this.inputs[0].connected && this.paramCondition.value.value == 1) return this.inputs[0].connectedOutput.node.isOrPrecededByUncached();
        if (this.inputs[1].connected && this.paramCondition.value.value == 0) return this.inputs[1].connectedOutput.node.isOrPrecededByUncached();

        return false;//super.isOrPrecededByUncached();
    }



    isOrPrecededByMultiplier()
    {
        if (this.inputs[0].connected && this.paramCondition.value.value == 1) return this.inputs[0].connectedOutput.node.isOrPrecededByMultiplier();
        if (this.inputs[1].connected && this.paramCondition.value.value == 0) return this.inputs[1].connectedOutput.node.isOrPrecededByMultiplier();

        return false;//super.isOrPrecededByMultiplier();
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



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type = values[paramIds.findIndex(id => id == 'type')];

        this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramCondition.enableControlText(true);

        updateParamConditionText(this.paramCondition, this.paramCondition.isUnknown(), true, 1);


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
        }
        
        else
            this.outputs[0].wireColor = rgbFromType(this.outputs[0].types[0], true);


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
        const type   = this.outputs[0].types[0];


        colors.text  = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const gray =
                this.active
            && !this.inputs[0].connected
            && !this.inputs[1].connected;

        colors.input  = rgb_a(colors.text, 0.4);
        colors.output = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire   = gray ? rgbFromType(ANY_VALUE, true) : rgbFromType(type, true);
      
        
        return colors;
    }
}