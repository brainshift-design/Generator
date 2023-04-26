class   OpTextCSV
extends OperatorBase
{
    paramValue;
    paramSeparator;



    constructor()
    {
        super(TEXT_CSV, 'csv', 'csv');


        this.addInput(new Input([TEXT_VALUE]));

        this.addParam(this.paramValue     = new ListParam('value',     '',          false, false, true));
        this.addParam(this.paramSeparator = new TextParam('separator', 'separator',        true, true, ','));


        this.paramSeparator.controls[0].textbox.style.textAlign = 'center';
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
        this.paramValue    .enableControlText(false);
        this.paramSeparator.enableControlText(true);

        this.updateParamControls();
    }
}