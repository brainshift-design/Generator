class   OpSimpleMath
extends OperatorBase
{
    static { Operator.types[NUMBER_SIMPLE_MATH] = this; }



    paramOperation;
    paramOperand;
    paramInvert;

    menuInvert;



    constructor()
    {
        super(NUMBER_SIMPLE_MATH, 'math', 'math', iconMath);

        this.iconOffsetY      = -1;
        this.alwaysLoadParams = true;
        this.canDisable       = true;
        

        this.addInput (new Input ([NUMBER_VALUE, NUMBER_LIST_VALUE, TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramOperation = new OptionParam('operation', '',        false, true, true, MATH_OPS.map(s => s[1]), 3));
        this.addParam(this.paramOperand   = new NumberParam('operand',   'operand', false, true, true, 0));
        this.addParam(this.paramInvert    = new NumberParam('invert',    'invert',  true,  true, true, 0, 0, 1));


        this.paramOperation.reverseMenu = true;

        this.paramOperation.controls[0].textValues =
        [
            // [0, '%', 'mod'],
            [0, '%'],
            [1, '/'],
            [2, '-'],
            [3, '+'],
            [4, '*'],
            [5, '^'] 
        ];
   
        this.paramInvert.divider = 0.55;

        this.menuInvert = createBoolMenu(this.paramInvert);


        this.promptName = 'simple math';
        
        this.getDescription = () => `performs arithmetic on input and operand`;

        this.paramOperation.getDescription = () => `the operation to perform (${this.paramOperation.options.map((o, i) => `${i}:${o}`).join(', ')})`;
        this.paramOperand  .getDescription = () => `second value`;
        this.paramInvert   .getDescription = () => `inverts param order in UI for cases like 1/input`;
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
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramOperation.enableControlText(true, this.paramOperation.isUnknown());
        this.paramOperand  .enableControlText(true, this.paramOperand  .isUnknown());

        this.paramInvert   .enableControlText(true);

        updateParamConditionText(this.paramInvert, this.paramInvert.isUnknown(), false, 1);

        
        // switch (this.paramOperation.value.value)
        // {
        //     case 0: this.icon = iconModulo;   this.iconOffsetY =  1; break;
        //     case 1: this.icon = iconDivide;   this.iconOffsetY =  0; break;
        //     case 2: this.icon = iconSubtract; this.iconOffsetY = -2; break;
        //     case 3: this.icon = iconAdd;      this.iconOffsetY =  1; break;
        //     case 4: this.icon = iconMultiply; this.iconOffsetY =  2; break;
        //     case 5: this.icon = iconExponent; this.iconOffsetY = -2; break;
        // }

        // this.updateIcon();


        if (   (    this.paramInvert.value.value == 0
                || !settings.allowInvertParams)
            && this.params.indexOf(this.paramOperation) != 0)
        {
            this.params = 
            [
                this.paramOperation, 
                this.paramOperand, 
                this.paramInvert
            ];

            clearChildren(this.paramHolder);

            this.paramHolder.appendChild(this.paramOperation.div); 
            this.paramHolder.appendChild(this.paramOperand  .div); 
            this.paramHolder.appendChild(this.paramInvert   .div);
        }
        else if (this.paramInvert.value.value == 1
              && this.params.indexOf(this.paramOperation) != 1)
        {
            this.params = 
            [
                this.paramOperand, 
                this.paramOperation, 
                this.paramInvert
            ];

            clearChildren(this.paramHolder);

            this.paramHolder.appendChild(this.paramOperand  .div); 
            this.paramHolder.appendChild(this.paramOperation.div); 
            this.paramHolder.appendChild(this.paramInvert   .div);
        }


        this.updateParamControls();
    }
}