class   OpExtract
extends OperatorBase
{
    paramIndices;


    length;

    _connected = false;



    constructor()
    {
        super(EXTRACT, 'extract', 'extract', iconExtract);

        this.outputValueType   = LIST_VALUE;
        this.canDisable        = true;
        this.showHeaderTooltip = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramIndices = new ListParam('indices', 'indices', false, true, true));

        this.paramIndices.listTypes   = [NUMBER_LIST_VALUE, LIST_VALUE, TEXT_VALUE];
        this.paramIndices.outputTypes = [NUMBER_LIST_VALUE];
        this.paramIndices.itemName    = ['index', 'indices'];

        this.inputs[0].addEventListener('disconnect', () => OpExtract_onDisconnectInput(this));
    }



    // isOrPrecededByUncached()
    // {
    //     return false;
    // }



    // isOrPrecededByMultiplier()
    // {
    //     return false;
    // }



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

        request.push(...this.node.paramIndices.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        //const fullLength = values[paramIds.findIndex(id => id == 'fullLength')];
        const length     = values[paramIds.findIndex(id => id == 'length')];

        this.length = length.value;

        
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramIndices.enableControlText(false);

        this.updateParamControls();
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
