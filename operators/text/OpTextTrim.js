class   OpTextTrim
extends ResizableBase
{
    static { Operator.types[TEXT_TRIM] = this; }



    paramStart;
    paramEnd;



    constructor()
    {
        super(TEXT_TRIM, 'trim', 'trim', iconTextTrim);

        this.canDisable = true;
        

        this.addInput (new Input ([TEXT_VALUE, TEXT_LIST_VALUE, NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramStart = new TextParam('start', 'start', true, true, true, ' '));
        this.addParam(this.paramEnd   = new TextParam('end',   'end',   true, true, true, ' '));


        setControlFont(this.paramStart.controls[0].textbox, 'Roboto Mono', 10, 'center');
        setControlFont(this.paramEnd  .controls[0].textbox, 'Roboto Mono', 10, 'center');

        this.paramStart.controls[0].textbox.defPlaceholder = 'start';
        this.paramEnd  .controls[0].textbox.defPlaceholder = 'end';
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        const height = defHeaderHeight + defParamHeight*2;

        this.height             = height;
        this.inner.style.height = height + 'px';

        super.setRect(
            x, 
            y, 
            w, 
            height, 
            updateTransform);
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

        request.push(...this.node.paramStart.genRequest(gen));
        request.push(...this.node.paramEnd  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type' )];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramStart.enableControlText(true);
        this.paramEnd  .enableControlText(true);

        this.updateParamControls();
    }
}