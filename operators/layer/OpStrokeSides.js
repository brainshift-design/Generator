class OpStrokeSides
extends OperatorBase
{
    static { Operator.types[STROKE_SIDES] = this; }



    paramTop;
    paramLeft;
    paramRight;
    paramBottom;


    
    constructor()
    {
        super(STROKE_SIDES, 'strokeSides', 'stroke sides', iconStrokeSides);

        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.addInput (new Input ([STROKE_SIDES_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([STROKE_SIDES_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));


        this.addParam(this.paramTop    = new NumberParam('top',    'top',    true,  true, true, 1, 0));
        this.addParam(this.paramLeft   = new NumberParam('left',   'left',   true,  true, true, 1, 0));
        this.addParam(this.paramRight  = new NumberParam('right',  'right',  true,  true, true, 1, 0));
        this.addParam(this.paramBottom = new NumberParam('bottom', 'bottom', true,  true, true, 1, 0));


        this.setAllParamDividers(0.55);
    }
    
    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return new StrokeSidesValue(
            node.paramTop   .value,
            node.paramLeft  .value,
            node.paramRight .value,
            node.paramBottom.value);
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == STROKE_SIDES_VALUE, 'expected STROKE_SIDES_VALUE in backInit()');

        this.node.paramTop   .setValue(value.top,    false, true, false);
        this.node.paramLeft  .setValue(value.left,   false, true, false);
        this.node.paramRight .setValue(value.right,  false, true, false);
        this.node.paramBottom.setValue(value.bottom, false, true, false);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs =
               this.node.paramTop   .input.connected
            || this.node.paramLeft  .input.connected
            || this.node.paramRight .input.connected
            || this.node.paramBottom.input.connected;

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
        this.paramTop   .enableControlText(true, this.paramTop   .isUnknown());
        this.paramLeft  .enableControlText(true, this.paramLeft  .isUnknown());
        this.paramRight .enableControlText(true, this.paramRight .isUnknown());
        this.paramBottom.enableControlText(true, this.paramBottom.isUnknown());

        this.updateParamControls();
    }
}
