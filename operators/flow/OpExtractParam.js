class   OpExtractParam
extends OperatorBase
{
    paramParam;

    length;

    _connected = false;



    constructor()
    {
        super(EXTRACT_PARAM, 'extractValue', 'extract value', iconExtractParam);

        this.canDisable        = true;
        this.showHeaderTooltip = true;
        

        this.addInput (new Input (ALL_VALUES));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.addParam(this.paramParam = new TextParam('name', 'name', false, true, true));

        this.inputs[0].addEventListener('disconnect', () => OpExtract_onDisconnectInput(this));
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

        request.push(...this.node.paramParam.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        //const fullLength = values[paramIds.findIndex(id => id == 'fullLength')];
        //const length     = values[paramIds.findIndex(id => id == 'length')];

        //this.length = length.value;

        
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.outputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    // updateParams()
    // {
    //     this.paramParam.enableControlText(false);

    //     this.updateParamControls();
    // }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.text  = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const gray =
               this.active
            && this.outputs[0].types[0] == LIST_VALUE;

        colors.input  = this.active ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
        colors.output = gray        ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire   = rgbFromType(type, true);

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



function OpExtract_onDisconnectInput(node)
{
    node._connected = false;
}
