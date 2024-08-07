class   OpTextCompare
extends OperatorBase
{
    paramValue;
    paramOperation;



    constructor()
    {
        super(TEXT_COMPARE, 'compare', 'compare', iconTextCompare);

        this.canDisable  = true;
        this.iconOffsetY = 0;
        

        this.addInput (new Input([TEXT_VALUE, NUMBER_VALUE]));
        this.addInput (new Input([TEXT_VALUE, NUMBER_VALUE]));

        this.addParam(this.paramValue     = new NumberParam('value',     '', false, false, true));
        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true,  true, CONDITION_OPS.map(s => s[1]), 3));

        this.paramValue    .isNodeValue = true;
        this.paramOperation.reverseMenu = true;
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;

        
        const input0 = this.inputs[0];
        const input1 = this.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        request.push(...this.paramOperation.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        // switch (this.paramOperation.value.value)
        // {
        //     case 0: this.icon = iconLess;           this.iconOffsetY = 1; break;
        //     case 1: this.icon = iconLessOrEqual;    this.iconOffsetY = 0; break;
        //     case 2: this.icon = iconNotEqual;       this.iconOffsetY = 2; break;
        //     case 3: this.icon = iconEqual;          this.iconOffsetY = 0; break;
        //     case 4: this.icon = iconGreaterOrEqual; this.iconOffsetY = 0; break;
        //     case 5: this.icon = iconGreater;        this.iconOffsetY = 1; break;
        // }

        // this.updateIcon();


        this.paramValue   .enableControlText(false);
        this.paramOperation.enableControlText(true );

        updateParamConditionText(this.paramValue, this.isUnknown() || this.hasConditionOutputs(), true);

        
        if (this.hasConditionOutputs())
        {
            this.headerInputs[0].types = [ANY_VALUE];
            this.headerInputs[1].types = [ANY_VALUE];
        }


        this.updateParamControls();
    }
}