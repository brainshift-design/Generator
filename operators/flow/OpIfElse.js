class   OpIfElse
extends OperatorBase
{
    paramCondition;

    menuCondition;



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
        this.paramCondition.controls[0].allowEditDecimals = false;

        this.menuCondition = createBoolMenu(this.paramCondition);
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

        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];


        colors.text = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 


        if (   this.outputs[0].supportsTypes([COLOR_VALUE])
            || this.outputs[0].supportsTypes([FILL_VALUE]))
        {
            const noColor = rgbFromType(ANY_VALUE, true);
                // darkMode
                // ? rgbNoColorDark
                // : rgbNoColorLight;

            const unknown =
                      this.inputs[0].connected
                   && this.inputs[0].connectedOutput.node.isUnknown()
                ||    this.inputs[1].connected
                   && this.inputs[1].connectedOutput.node.isUnknown()
                ||    this.paramCondition.input.connected
                   && this.paramCondition.input.connectedOutput.node.isUnknown();


            if (   this.inputs[0].connected
                && this.paramCondition.value.value > 0)
                colors.output  = unknown ? noColor : this.inputs[0].connectedOutput.wireColor;
                //colors.outWire = 
            else if (this.inputs[1].connected
                  && this.paramCondition.value.value == 0)
                colors.output = unknown ? noColor : this.inputs[1].connectedOutput.wireColor;
                //colors.outWire = unknown ? noColor : this.inputs[1].connectedOutput.wireColor;
        }
        else
        {
            const gray =
                    this.active
                && !this.inputs[0].connected
                && !this.inputs[1].connected;

            colors.output  = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
            colors.outWire = gray ? rgbFromType(ANY_VALUE, true) : rgbFromType(type, true);
        }      
        
        return colors;
    }
}