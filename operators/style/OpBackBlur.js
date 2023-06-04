class OpBackBlur
extends OperatorBase
{
    paramRadius;


    
    constructor()
    {
        super(BACK_BLUR, 'backBlur', 'back blur', iconBackBlur);

        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.addInput (new Input([BACK_BLUR_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([BACK_BLUR_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramRadius = new NumberParam('radius', 'radius', true, true, true, 4, 0));


        this.paramRadius.divider = 0.58;
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new BackBlurValue(
            node.paramRadius.value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        console.assert(value.type == BACK_BLUR_VALUE, 'expected BACK_BLUR_VALUE in backInit()');

        this.node.paramRadius.setValue(value.radius, false, true, false);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs = this.node.paramRadius.input.connected;

        const options   = (hasInputs ? 1 : 0) << 20;
    
    
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
}