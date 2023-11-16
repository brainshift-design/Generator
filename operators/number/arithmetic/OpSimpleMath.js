class   OpSimpleMath
extends OperatorBase
{
    paramOperation;
    paramOperand;
    paramInvert;

    menuInvert;



    constructor()
    {
        super(NUMBER_SIMPLE_MATH, 'math', 'math', '');

        this.iconOffsetY      = -1;
        this.alwaysLoadParams = true;
        

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramOperation = new SelectParam('operation', '',        false, true, true, MATH_OPS.map(s => s[1]), 1));
        this.addParam(this.paramOperand   = new NumberParam('operand',   'operand', false, true, true, 0));
        this.addParam(this.paramInvert    = new NumberParam('invert',    'invert',  true,  true, true, 0, 0, 1));


        this.paramOperation.reverseMenu = true;
    
        this.paramInvert.divider = 0.55;

        this.menuInvert = createBoolMenu(this.paramInvert);
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


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        
        request.push(...this.node.paramOperation.genRequest(gen));
        request.push(...this.node.paramOperand  .genRequest(gen));
        request.push(...this.node.paramInvert   .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.outputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramOperation.enableControlText(true, this.paramOperation.isUnknown());
        this.paramOperand  .enableControlText(true, this.paramOperand  .isUnknown());

        this.paramInvert   .enableControlText(true);

        updateParamConditionText(this.paramInvert, this.paramInvert.isUnknown(), false, 1);

        
        switch (this.paramOperation.value.value)
        {
            case 0: this.icon = iconSubtract; this.iconOffsetY = -2; break;
            case 1: this.icon = iconAdd;      this.iconOffsetY =  1; break;
            case 2: this.icon = iconModulo;   this.iconOffsetY =  1; break;
            case 3: this.icon = iconDivide;   this.iconOffsetY =  0; break;
            case 4: this.icon = iconMultiply; this.iconOffsetY =  2; break;
            case 5: this.icon = iconExponent; this.iconOffsetY = -2; break;
        }

        this.updateIcon();


        this.updateParamControls();
    }
}