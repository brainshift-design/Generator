class OpDropShadow
extends OperatorBase
{
    paramX;
    paramY;
    paramBlur;
    paramSpread;
    paramFill;
    paramBlend;
    paramBehind;


    
    constructor()
    {
        super(DROP_SHADOW, 'dropShadow', 'drop shadow', iconDropShadow);

        this.canDisable = true;
        

        this.addInput (new Input([DROP_SHADOW_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([DROP_SHADOW_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramX      = new NumberParam('x',      'X',           true,  true, true, 0));
        this.addParam(this.paramY      = new NumberParam('y',      'Y',           true,  true, true, 4));
        this.addParam(this.paramBlur   = new NumberParam('blur',   'blur',        true,  true, true, 4, 0));
        this.addParam(this.paramSpread = new NumberParam('spread', 'spread',      true,  true, true, 0));
        this.addParam(this.paramFill   = new FillParam  ('fill',   'fill',        false, true, true, new FillValue(ColorValue.fromRgb([0, 0, 0]), new NumberValue(25))));
        this.addParam(this.paramBlend  = new SelectParam('blend',  'blend',       false, true, true, BlendModes.map(bm => bm[1]), 0));
        this.addParam(this.paramBehind = new NumberParam('behind', 'show behind', true,  true, true, 0, 0, 1));


        this.setAllParamDividers(0.55);
        this.paramBehind.divider = 0.71;
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new DropShadowValue(
            node.paramX     .value,
            node.paramY     .value,
            node.paramBlur  .value,
            node.paramSpread.value,
            node.paramFill  .value,
            node.paramBlend .value,
            node.paramBehind.value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == DROP_SHADOW_VALUE, 'expected DROP_SHADOW_VALUE in backInit()');

        this.node.paramX     .setValue(value.x,      false, true, false);
        this.node.paramY     .setValue(value.y,      false, true, false);
        this.node.paramBlur  .setValue(value.blur,   false, true, false);
        this.node.paramSpread.setValue(value.spread, false, true, false);
        this.node.paramFill  .setValue(value.fill,   false, true, false);
        this.node.paramBlend .setValue(value.blend,  false, true, false);
        this.node.paramBehind.setValue(value.behind, false, true, false);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs =
               this.node.paramX     .input.connected
            || this.node.paramY     .input.connected
            || this.node.paramBlur  .input.connected
            || this.node.paramSpread.input.connected
            || this.node.paramFill  .input.connected
            || this.node.paramBlend .input.connected
            || this.node.paramBehind.input.connected;

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
        this.paramBehind.enableControlText(true);

        updateParamConditionText(this.paramBehind, this.isUnknown(), false, 1);

        this.updateParamControls();
    }
}
