class OpLayerBlurProgressive
extends OperatorBase
{
    static { Operator.types[LAYER_PRBLUR] = this; }



    paramStartX;
    paramStartY;
    paramStartRadius;

    paramEndX;
    paramEndY;
    paramEndRadius;


    
    constructor()
    {
        super(LAYER_PRBLUR, 'layerBlur', 'layer blur', iconLayerBlurProgressive);

        this.canDisable = true;
        

        this.addInput (new Input([LAYER_PRBLUR_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([LAYER_PRBLUR_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramStartX      = new NumberParam('startX',      'start X',      true, true, true, 0));
        this.addParam(this.paramStartY      = new NumberParam('startY',      'start Y',      true, true, true, 0));
        this.addParam(this.paramStartRadius = new NumberParam('startRadius', 'start radius', true, true, true, 0, 0));

        this.addParam(this.paramEndX        = new NumberParam('endX',        'end X',        true, true, true, 100));
        this.addParam(this.paramEndY        = new NumberParam('endY',        'end Y',        true, true, true, 100));
        this.addParam(this.paramEndRadius   = new NumberParam('endRadius',   'end radius',   true, true, true, 10, 0));

        this.paramStartX.controls[0].suffix = '%';
        this.paramStartY.controls[0].suffix = '%';

        this.paramEndX  .controls[0].suffix = '%';
        this.paramEndY  .controls[0].suffix = '%';

        this.setAllParamDividers(0.58);
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new LayerBlurProgressiveValue(
            this.node.paramStartX     .value,
            this.node.paramStartY     .value,
            this.node.paramStartRadius.value,

            this.node.paramEndX       .value,
            this.node.paramEndY       .value,
            this.node.paramEndRadius  .value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == LAYER_PRBLUR_VALUE, 'expected LAYER_PRBLUR_VALUE in backInit()');

        this.node.paramStartX      .setValue(value.startX,      false, true, false);
        this.node.paramStartY      .setValue(value.startY,      false, true, false);
        this.node.paramStartRadius .setValue(value.startRadius, false, true, false);

        this.node.paramEndX        .setValue(value.endX,        false, true, false);
        this.node.paramEndY        .setValue(value.endY,        false, true, false);
        this.node.paramEndRadius   .setValue(value.endRadius,   false, true, false);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs = 
               this.node.paramStartX     .input.connected
            || this.node.paramStartY     .input.connected
            || this.node.paramStartRadius.input.connected
            || this.node.paramEndX       .input.connected
            || this.node.paramEndY       .input.connected
            || this.node.paramEndRadius  .input.connected;

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
}