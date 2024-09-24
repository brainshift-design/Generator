class   OpSolve
extends OperatorBase
{
    paramCurrent;
    paramTarget;



    constructor()
    {
        super(NUMBER_SOLVE, 'solve', 'solve', iconSolve, defNodeWidth, true);

        this.subscription = true;
        this.canDisable   = true;
        

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.inputs[0].feedback = true;


        this.addParam(this.paramCurrent = new NumberParam('current', 'current', true,  true,  true, Number.NaN));
        this.addParam(this.paramTarget  = new NumberParam('target',  'target',  true,  true,  true));


        this.paramCurrent.divider = 0.5;
        this.paramTarget .divider = 0.5;
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


        if (this.node.headerInputs[0].connected)
        {
            const terminals = getTerminalsAfterNode(
                this.node.headerInputs[0].connectedOutput.node, 
                [this.id]);

            removeFromArrayWhere(terminals, item => item.id == this.id);

            console.log('terminals =', terminals);

            request.push(terminals.length);
            terminals.forEach(t => request.push(t.id));
        }
        else
        {
            request.push(0);
        }


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramCurrent.genRequest(gen));
        request.push(...this.node.paramTarget .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        this.endProgress();
    }



    updateParams()
    {
        if (!this.paramCurrent.input.connected)
            this.paramCurrent.setValue(NumberValue.NaN, null, true, false);

        this.paramCurrent.enableControlText(false, this.paramCurrent.isUnknown());
        this.paramTarget .enableControlText(true);


        const maxDec = Math.max(
            this.paramCurrent.value.decimals,
            this.paramTarget .value.decimals);
        
        const decFactor = 1 / Math.pow(10, maxDec);


        if (    this.paramCurrent.value.isValid()
            && !equal(this.paramCurrent.value.value, this.paramTarget.value.value, decFactor))
        {
            this.paramCurrent.controls[0].showExtRanges = true;
            this.paramCurrent.controls[0].ranges = [new NumberControlRange(0, 1, getWarningRangeStyle(), 0.8)];
        }
        else
        {
            this.paramCurrent.controls[0].showExtRanges = false;
            this.paramCurrent.controls[0].ranges = [];
            this.paramCurrent.controls[0].resetRanges();
        }

        this.updateParamControls();
    }



    toJsCode(gen)
    {
        return '';//this.inputs[0].connected
            //  ? 'Math.min(Math.max(' 
            //         + this.paramCurrent.toJsCode(gen) + ', ' + this.inputs[0].connectedOutput.toJsCode(gen) + '), ' 
            //         + this.paramTarget.toJsCode(gen) + ')'
            //  : 'Number.NaN';
    }
}