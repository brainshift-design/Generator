class OpLayerBlur
extends OperatorBase
{
    paramRadius;


    
    constructor()
    {
        super(LAYER_BLUR, 'layerBlur', 'layer blur', iconLayerBlur);

        this.canDisable = true;
        

        this.addInput (new Input([LAYER_BLUR_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([LAYER_BLUR_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramRadius = new NumberParam('radius', 'radius', true, true, true, 4, 0));


        this.paramRadius.controls[0].divider = 0.58;
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new LayerBlurValue(
            node.paramRadius.value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        console.assert(value.type == LAYER_BLUR_VALUE, 'expected LAYER_BLUR_VALUE in backInit()');

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