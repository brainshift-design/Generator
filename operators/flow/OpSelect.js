class   OpSelect
extends OperatorBase
{
    paramIndex;

    length;



    constructor()
    {
        super(SELECT, 'select', 'select', iconSelect);

        this.alwaysSaveParams = true;


        this.addInput(new Input(LIST_VALUES, getNodeInputValuesForUndo));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.addParam(this.paramIndex = new NumberParam('index', 'index', true, true, false, 0, 0));
        this.paramIndex.controls[0].allowEditDecimals = false;


        this.length = new NumberValue(0);
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        return this.node.genRequest(gen);
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

        request.push(...this.paramIndex.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        
        const value = values[paramIds.findIndex(id => id == 'value')];
        this.length = values[paramIds.findIndex(id => id == 'length')];

        this.outputs[0].types = [value.type];
    }



    updateParams()
    {
        // super.updateParams();
        
        this.paramIndex.controls[0].setMax(Math.max(0, this.length.value - 1));

        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        const inputTypes = this.connectedHeaderInputs.map(i => i.connectedOutput.types[0]);

        const type = 
            this.inputs[0].connected 
            ? finalListTypeFromTypes(inputTypes)
            : this.type;

            
        colors.back = rgb_a(rgbFromType(type, this.active), 0.95);


        colors.text   = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        colors.input  = this.active ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
        colors.output = this.active ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire   = rgbFromType(type, true);

        return colors;
    }
}