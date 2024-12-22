class   OpMath
extends OperatorBase
{
    static { Operator.types[NUMBER_MATH] = this; }



    paramOperation;



    constructor()
    {
        super(NUMBER_MATH, 'math', 'math', iconMath);

        this.iconOffsetY      = -1;

        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramOperation = new OptionParam('operation', '', false, true, true, MATH_OPS.map(s => s[1]), 3));

        this.paramOperation.controls[0].allowEditDecimals = false;
        this.paramOperation.reverseMenu = true;
    
        this.paramOperation.controls[0].textValues =
        [
            [0, '%', 'mod'],
            [1, '/'       ],
            [2, '-'       ],
            [3, '+'       ],
            [4, '*'       ],
            [5, '^'       ] 
        ];
        
    
        this.getDescription = () => `performs arithmetic on all inputs in their order`;

        this.paramOperation.getDescription       = () => `the operation to perform`;
        this.paramOperation.getDescriptionPrompt = () => `the operation to perform (${this.paramOperation.options.map((o, i) => `${i}:${o}`).join(', ')})`;
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]);
        newInput.isNew = true;


        newInput.addEventListener('connect', e => 
        {
            onVariableConnectInput(e.detail.input); 
            e.detail.input.isNew = false; 
        });
        
        
        newInput.addEventListener('disconnect', e => 
        {
            onVariableDisconnectInput(e.detail.input);
        });


        this.addInput(newInput);


        return newInput;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.node.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

        
        request.push(...this.node.paramOperation.genRequest(gen));

        
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
        this.paramOperation.enableControlText(true);

        
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


        this.updateParamControls();
    }
}
