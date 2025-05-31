class OpLayerNoiseMono
extends OperatorBase
{
    static { Operator.types[LAYER_NOISE_MONO] = this; }



    paramSize;
    paramDensity;
    paramFill;
    paramBlend;


    
    constructor()
    {
        super(LAYER_NOISE_MONO, 'layerNoiseMono', 'mono noise', iconLayerNoise);

        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.addInput (new Input([LAYER_NOISE_MONO_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([LAYER_NOISE_MONO_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramSize    = new NumberParam('size',    'size',    true,  true, true, 0.5, 0, 100, 1));
        this.addParam(this.paramDensity = new NumberParam('density', 'density', true,  true, true, 100, 0, 100));
        this.addParam(this.paramFill    = new FillParam  ('fill',    'fill',    false, true, true, new FillValue(ColorValue.fromRgb([0, 0, 0]), new NumberValue(25))));
        this.addParam(this.paramBlend   = new OptionParam('blend',   'blend',   false, true, true, BlendModes.map(bm => bm[1]), 0));

        
        this.paramDensity.controls[0].setSuffix('%');
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new LayerNoiseMonoValue(
            this.node.paramSize   .value,
            this.node.paramDensity.value,
            this.node.paramFill   .value,
            this.node.paramBlend  .value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == LAYER_NOISE_MONO_VALUE, 'expected LAYER_NOISE_MONO_VALUE in backInit()');

        this.node.paramSize   .setValue(value.size,    false, true, false);
        this.node.paramDensity.setValue(value.density, false, true, false);
        this.node.paramFill   .setValue(value.fill,    false, true, false);
        this.node.paramBlend  .setValue(value.blend,   false, true, false);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs = 
               this.node.paramSize   .input.connected
            || this.node.paramDensity.input.connected
            || this.node.paramFill   .input.connected
            || this.node.paramBlend  .input.connected;

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