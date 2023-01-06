class   OpConditionBase
extends OperatorWithSymbol
{
    paramValue;


    constructor(type, shortName, symbol)
    {
        super(type, shortName, symbol);


        this.addInput(new Input(NUMBER_TYPES));
        this.addInput(new Input(NUMBER_TYPES));

        this.addParam(this.paramValue = new NumberParam('value', '', false, false, false));
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: '' });

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


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false);
        this.paramValue.control.text.style.fontStyle = settings.showBoolValues ? 'normal' : 'italic';
        

        const v = Math.round(this.paramValue.value.value);

             if (this.isUnknown())        this.paramValue.control.valueText = UNKNOWN_DISPLAY;
        else if (settings.showBoolValues) this.paramValue.control.valueText = v != 0 ? TRUE_DISPLAY : FALSE_DISPLAY;
        else                              this.paramValue.control.valueText = '';

        //this.paramValue.control.text.style.letterSpacing = settings.showBoolValues ? '0.1em' : 0;
        
        this.paramValue.control.showBar = !this.isUnknown();


        for (const param of this.params)
            param.updateControls();
    }



    paramsToJson(nTab = 0)
    {
        return '';
    }
}