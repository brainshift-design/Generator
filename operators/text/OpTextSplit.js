class   OpTextSplit
extends OperatorBase
{
    paramParts;
    paramSeparator;

    length;



    constructor()
    {
        super(TEXT_SPLIT, 'split', 'split', iconTextSplit);


        this.addInput(new Input([TEXT_VALUE]));

        this.addParam(this.paramParts     = new ListParam('parts',     'parts',     false, false, true));
        this.addParam(this.paramSeparator = new TextParam('separator', 'separator', false, true,  true, ''));


        this.paramParts.isNodeValue  = true;
        this.paramParts.itemName     = [];
        // this.paramParts.output.types = [TEXT_LIST_VALUE];


        setControlFont(this.paramSeparator.controls[0].textbox, 'Roboto Mono', 10, 'center');
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



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const length = values[paramIds.findIndex(id => id == 'length')];

        this.length = length.value;


        const sep = settings.showNodeId ? ' ' : '  ';

        this.paramParts.setName('parts'  + sep + '[ ' + this.length + ' ]');
    }



    updateParams()
    {
        this.paramParts.enableControlText(false, this.isUnknown());
        this.paramSeparator.enableControlText(true);

        this.updateParamControls();
    }
}