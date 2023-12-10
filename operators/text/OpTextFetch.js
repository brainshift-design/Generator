class   OpTextFetch
extends ResizableBase
{
    paramRequest;

    cachedValue = '';



    constructor()
    {
        super(TEXT_FETCH, 'fetch', 'fetch', iconTextFetch, defNodeWidth, true);

        this.subscription      = true;
        this.canDisable        = true;
        this.iconOffsetY       = -1;
        this.alwaysLoadParams  = true;
        this.alwaysSaveParams  = true;
        this.showHeaderTooltip = true;


        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramRequest = new TextParam('request', 'request', false, true, true));

        setControlFont(this.paramRequest.controls[0].textbox, 'Roboto Mono', 10, 'center');

        this.paramRequest.controls[0].textbox.defPlaceholder = 'request';
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        const headerHeight = Math.max(defHeaderHeight, boundingRect(this.header).height / graph.currentPage.zoom);

        const height = headerHeight + defParamHeight;

        super.setRect(
            x, 
            y, 
            w, 
            height, 
            updateTransform);

        this.updateValueParam();
    }

    
    
    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramRequest.genRequest(gen));
        request.push(TEXT_VALUE, encodeURIComponent(this.node.cachedValue));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.cachedValue = value.value;
        
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        this.endProgress();
    }



    updateParams()
    {
        this.paramRequest.enableControlText(true);

        this.updateValueParam();

        this.updateParamControls();
    }



    updateValueParam()
    {
        const hRequest = defParamHeight;

        this.paramRequest.div.style.width  = this.div.offsetWidth;
        this.paramRequest.div.style.height = hRequest;    
    }



    invalidate()
    {
        this.cachedValue = '';

        super.invalidate();
    }
}