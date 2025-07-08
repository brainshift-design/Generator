class OpLayerTexture
extends OperatorBase
{
    static { Operator.types[LAYER_TEXTURE] = this; }



    paramSize;
    paramRadius;
    paramClipToShape;

    menuClipToShape;


    
    constructor()
    {
        super(LAYER_TEXTURE, 'layerTexture', 'layer texture', iconLayerTexture);

        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.addInput (new Input([LAYER_TEXTURE_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([LAYER_TEXTURE_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramSize        = new NumberParam('size',        'size',          true, true, true, 4, 0, 100));
        this.addParam(this.paramRadius      = new NumberParam('radius',      'radius',        true, true, true, 4, 0, 100));
        this.addParam(this.paramClipToShape = new NumberParam('clipToShape', 'clip to shape', true, true, true, 0, 0, 1));

        this.paramClipToShape.controls[0].allowEditDecimals = false;

        this.menuClipToShape = createBoolMenu(this.paramClipToShape);


        this.paramSize       .divider = 0.53;
        this.paramRadius     .divider = 0.53;
        this.paramClipToShape.divider = 0.68;
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new LayerTextureValue(
            this.node.paramSize       .value,
            this.node.paramRadius     .value,
            this.node.paramClipToShape.value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == LAYER_TEXTURE_VALUE, 'expected LAYER_TEXTURE_VALUE in backInit()');

        this.node.paramSize       .setValue(value.size,        false, true, false);
        this.node.paramRadius     .setValue(value.radius,      false, true, false);
        this.node.paramClipToShape.setValue(value.clipToShape, false, true, false);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs = 
               this.node.paramSize       .input.connected
            || this.node.paramRadius     .input.connected
            || this.node.paramClipToShape.input.connected;

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
        this.paramSize       .enableControlText(true, this.paramSize  .isUnknown());
        this.paramRadius     .enableControlText(true, this.paramRadius.isUnknown());
        this.paramClipToShape.enableControlText(true);

        updateParamConditionText(this.paramClipToShape, this.paramClipToShape.isUnknown(), false, 1);

        this.updateParamControls();
    }
}