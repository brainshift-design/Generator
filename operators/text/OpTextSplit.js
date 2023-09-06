class   OpTextSplit
extends OperatorBase
{
    paramValue;
    paramSeparator;



    constructor()
    {
        super(TEXT_SPLIT, 'split', 'split', iconTextSplit);


        this.addInput(new Input([TEXT_VALUE]));

        this.addParam(this.paramValue     = new ListParam('value',     '',          false, false, true));
        this.addParam(this.paramSeparator = new TextParam('separator', 'separator', false, true,  true, ''));


        this.paramValue.itemName    = ['value'];
        this.paramValue.isNodeValue =  true;

        setControlFont(this.paramSeparator.controls[0].textbox, 'Roboto Mono', 10, 'center');

        this.paramSeparator.controls[0].textbox.defPlaceholder = 'with';
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.inputs[0];


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.paramSeparator.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false, this.isUnknown());
        this.paramSeparator.enableControlText(true);

        this.updateParamControls();
    }
}