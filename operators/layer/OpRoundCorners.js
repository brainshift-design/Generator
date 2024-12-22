class OpRoundCorners
extends OperatorBase
{
    static { Operator.types[ROUND_CORNERS] = this; }



    paramTL;
    paramTR;
    paramBL;
    paramBR;


    
    constructor()
    {
        super(ROUND_CORNERS, 'roundCorners', 'round corners', iconRoundCorners);

        this.canDisable = true;
        

        this.addInput (new Input([ROUND_CORNERS_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([ROUND_CORNERS_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramTL = new NumberParam('tl', 'top left',     true,  true, true, 0, 0));
        this.addParam(this.paramTR = new NumberParam('tr', 'top right',    true,  true, true, 0, 0));
        this.addParam(this.paramBL = new NumberParam('bl', 'bottom left',  true,  true, true, 0, 0));
        this.addParam(this.paramBR = new NumberParam('br', 'bottom right', true,  true, true, 0, 0));


        this.setAllParamDividers(0.67);
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new RoundCornersValue(
            node.paramTL.value,
            node.paramTR.value,
            node.paramBL.value,
            node.paramBR.value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == ROUND_CORNERS_VALUE, 'expected ROUND_CORNERS_VALUE in backInit()');

        this.node.paramTL.setValue(value.tl, false, true, false);
        this.node.paramTR.setValue(value.tr, false, true, false);
        this.node.paramBL.setValue(value.bl, false, true, false);
        this.node.paramBR.setValue(value.br, false, true, false);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs =
               this.node.paramTL.input.connected
            || this.node.paramTR.input.connected
            || this.node.paramBL.input.connected
            || this.node.paramBR.input.connected;

        const options = (hasInputs ? 1 : 0) << 20;
    
    
        const [request, ignore] = this.node.genRequestStart(gen, options);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);


        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));


            const paramIds = [];

            for (const param of this.node.params)
                if (   param.input 
                    && param.input.connected)
                    paramIds.push(param.id);

            request.push(paramIds.join(','));


            for (const param of this.node.params)
                if (param.input.connected) request.push(...param.genRequest(gen));            
        }
        else
        {
            for (const param of this.node.params)
                request.push(...param.genRequest(gen));            
        }

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramTL.enableControlText(true, this.paramTL.isUnknown());
        this.paramTR.enableControlText(true, this.paramTR.isUnknown());
        this.paramBL.enableControlText(true, this.paramBL.isUnknown());
        this.paramBR.enableControlText(true, this.paramBR.isUnknown());

        this.updateParamControls();
    }
}
