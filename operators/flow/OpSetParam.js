class   OpSetParam
extends ResizableBase
{
    paramName;

    length;

    _connected = false;



    constructor()
    {
        super(SET_PARAM, 'setParam', 'set param', iconSetParam);

        this.canDisable        = true;
        

        this.addInput (new Input ([ANY_VALUE]));
        this.addInput (new Input ([ANY_VALUE]));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.addParam(this.paramName = new TextParam('name', 'name', true, true, true));

        this.inputs[0].addEventListener('disconnect', () => OpSetParam_onDisconnectInput(this));

        this.paramName.divider = 0.35;
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        // const headerHeight = Math.max(defHeaderHeight, boundingRect(this.header).height / graph.currentPage.zoom);

        const height = (this.measureData.headerOffset ? this.measureData.headerOffset : this.offsetHeight) + (this.paramName ? defParamHeight : 0);


        this.height             = height;
        this.inner.style.height = height + 'px';

        //this.updateSizers();

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


        const input0 = this.node.inputs[0];
        const input1 = this.node.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);

        
        request.push(...this.node.paramName.genRequest(gen));

        
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



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.text = 
            isDark(colors.back) 
            ? [1, 1, 1, 1] 
            : [0, 0, 0, 1]; 

        const gray =
               this.active
            && this.outputs[0].types[0] == LIST_VALUE;

        colors.output  = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, !this.active), 0.5), 0.7);
        colors.outWire = rgbFromType(type, true);

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



function OpSetParam_onDisconnectInput(node)
{
    node._connected = false;
}
