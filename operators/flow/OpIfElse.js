class   OpIfElse
extends OpFlowBase
{
    paramCondition;

    menuCondition;



    constructor()
    {
        super(IF_ELSE, 'ifElse', 'if/else', iconIfElse);

        this.outputValueType   = ANY_VALUE;
        this.iconOffsetY = -1;


        this.addInput (new Input ([ANY_VALUE]));
        this.addInput (new Input ([ANY_VALUE]));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.headerOutputs[0].forceOutputColor = true;


        this.addParam(this.paramCondition = new NumberParam('condition', 'condition', true, true, true, 1, 0, 1));

        this.paramCondition.divider = 0.62;
        this.paramCondition.controls[0].allowEditDecimals = false;

        this.menuCondition = createBoolMenu(this.paramCondition);


        this.getDescription = () => `passes one of the inputs depending on the condition`;

        this.paramCondition.getDescription = () => `determines which input is passed &mdash; first if false, second if true`;
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



    updateParams()
    {
        this.paramCondition.enableControlText(true);

        updateParamConditionText(this.paramCondition, this.paramCondition.isUnknown(), true, 1);

        this.updateParamControls();
    }
}