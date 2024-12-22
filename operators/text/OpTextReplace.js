class   OpTextReplace
extends ResizableBase
{
    static { Operator.types[TEXT_REPLACE] = this; }



    paramWhat;
    paramWith;
    paramRegex;

    
    menuRegex;



    constructor()
    {
        super(TEXT_REPLACE, 'replace', 'replace', iconTextReplace);

        this.canDisable       = true;
        this.iconOffsetY      = -2;
        
        this.alwaysLoadParams = true;
        this.alwaysSaveParams = true;
        

        this.addInput (new Input ([TEXT_VALUE, TEXT_LIST_VALUE, NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramWhat  = new   TextParam('what',  'what',  false, true, true));
        this.addParam(this.paramWith  = new   TextParam('with',  'with',  false, true, true));
        this.addParam(this.paramRegex = new NumberParam('regex', 'regex', true,  true, true, 0, 0, 1));

        this.paramWhat.controls[0].textbox.defPlaceholder = 'what';
        this.paramWith.controls[0].textbox.defPlaceholder = 'with';

        this.paramRegex.divider = 0.56;

        this.menuRegex = createBoolMenu(this.paramRegex);


        setControlFont(this.paramWhat .controls[0].textbox, 'Roboto Mono', 10, 'center');
        setControlFont(this.paramWith .controls[0].textbox, 'Roboto Mono', 10, 'center');
     }



    setRect(x, y, w, h, updateTransform = true)
    {
        const headerHeight = defHeaderHeight;//boundingRect(this.header).height / graph.currentPage.zoom;
        const paramHeight  = 3 * defParamHeight;

        const height = headerHeight + paramHeight;

        ResizableBase.prototype.setRect.call(this,
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

        request.push(...this.node.paramWhat .genRequest(gen));
        request.push(...this.node.paramWith .genRequest(gen));
        request.push(...this.node.paramRegex.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);
        

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type  = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramWhat .enableControlText(true, this.paramWhat.isUnknown());
        this.paramWith .enableControlText(true, this.paramWith.isUnknown());

        updateParamConditionText(this.paramRegex, this.paramRegex.isUnknown(), false, 1);

        this.updateParamControls();
   }
}