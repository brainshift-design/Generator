class   OpGetParam
extends ResizableBase
{
    paramName;

    value;

    _connected = false;



    constructor()
    {
        super(GET_PARAM, 'getParam', 'get param', iconGetParam);

        this.valueType  = ANY_VALUE;
        this.canDisable = true;
        

        this.addInput (new Input ([ANY_VALUE]));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.addParam(this.paramName = new TextParam('name', 'name', true, true, true));

        this.inputs[0].addEventListener('disconnect', () => OpGetParam_onDisconnectInput(this));

        this.paramName.divider = 0.35;
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        const height = defHeaderHeight + (this.paramName ? defParamHeight : 0);

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

        request.push(...this.node.paramName.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        this.value = values[paramIds.findIndex(id => id == 'value')];
        const type = values[paramIds.findIndex(id => id == 'type' )];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        colors.text = 
            isDark(colors.back) 
            ? [1, 1, 1, 1] 
            : [0, 0, 0, 1]; 

        return colors;
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        let json = super.toJsonBase(nTab);

        json += 
              ',\n' + pos + tab + '"_connected": "'  + this._connected + '"';

        return json;
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);

        if (_node._connected)
            this._connected = parseBool(_node._connected);
    }
}



function OpGetParam_onDisconnectInput(node)
{
    node._connected = false;
}
