class OpLayerGlass
extends OperatorBase
{
    static { Operator.types[LAYER_GLASS] = this; }



    paramIntensity;
    paramAngle;
    paramRefraction;
    paramDepth;
    paramDispersion;
    paramRadius;


    
    constructor()
    {
        super(LAYER_GLASS, 'layerGlass', 'layer glass', iconLayerGlass);

        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.addInput (new Input([LAYER_GLASS_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([LAYER_GLASS_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramIntensity  = new NumberParam('intensity',  'intensity',  true, true, true, 80, 0, 100));
        this.addParam(this.paramAngle      = new NumberParam('angle',      'angle',      true, true, true, -45));
        this.addParam(this.paramRefraction = new NumberParam('refraction', 'refraction', true, true, true, 80, 0, 100));
        this.addParam(this.paramDepth      = new NumberParam('depth',      'depth',      true, true, true, 20, 1, 100));
        this.addParam(this.paramDispersion = new NumberParam('dispersion', 'dispersion', true, true, true, 50, 0, 100));
        this.addParam(this.paramRadius     = new NumberParam('radius',     'frost',      true, true, true,  4, 0, 100));


        this.paramIntensity .controls[0].suffix        = '%';
        this.paramRefraction.controls[0].suffix        = '%';
        this.paramDispersion.controls[0].suffix        = '%';
        this.paramAngle     .controls[0].suffix        = '°';
        this.paramAngle     .controls[0].suffixOffsetY = degreeOffsetY;
        this.paramAngle     .controls[0].wrapValue     = true;
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new LayerGlassValue(
            this.node.paramIntensity .value,
            this.node.paramAngle     .value,
            this.node.paramRefraction.value,
            this.node.paramDepth     .value,
            this.node.paramDispersion.value,
            this.node.paramRadius    .value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == LAYER_GLASS_VALUE, 'expected LAYER_GLASS_VALUE in backInit()');

        this.node.paramIntensity .setValue(value.intensity,  false, true, false);
        this.node.paramAngle     .setValue(value.angle,      false, true, false);
        this.node.paramRefraction.setValue(value.refraction, false, true, false);
        this.node.paramDepth     .setValue(value.depth,      false, true, false);
        this.node.paramDispersion.setValue(value.dispersion, false, true, false);
        this.node.paramRadius    .setValue(value.radius,     false, true, false);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs = 
               this.node.paramIntensity .input.connected
            || this.node.paramAngle     .input.connected
            || this.node.paramRefraction.input.connected
            || this.node.paramDepth     .input.connected
            || this.node.paramDispersion.input.connected
            || this.node.paramRadius    .input.connected;

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