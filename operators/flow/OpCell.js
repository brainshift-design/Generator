class   OpCell
extends OperatorBase
{
    paramColumn;
    paramRow;

    columns;
    rows;



    constructor()
    {
        super(CELL, 'cell', 'cell', iconCell);

        //this.cached           = false;
        this.alwaysSaveParams  = true;
        this.iconOffsetY       = 1;
        this.showHeaderTooltip = true;


        this.addInput(new Input(LIST_VALUES, getNodeInputValuesForUndo));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.addParam(this.paramColumn = new NumberParam('column', 'column', true, true, false, 0, 0));
        this.addParam(this.paramRow    = new NumberParam('row',    'row',    true, true, false, 0, 0));

        this.paramColumn.controls[0].allowEditDecimals = false;
        this.paramRow   .controls[0].allowEditDecimals = false;
        
        this.paramColumn.divider                       = 0.55;
        this.paramRow   .divider                       = 0.55;


        this.columns = new NumberValue(0);
        this.rows    = new NumberValue(0);
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

        request.push(...this.paramColumn.genRequest(gen));
        request.push(...this.paramRow   .genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        
        const type   = values[paramIds.findIndex(id => id == 'type'   )];
        this.columns = values[paramIds.findIndex(id => id == 'columns')];
        this.rows    = values[paramIds.findIndex(id => id == 'rows'   )];

        if (type)
            this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        // super.updateParams();
        
        this.paramColumn.enableControlText(true);
        this.paramColumn.controls[0].setMax(Math.max(0, this.columns.value-1));

        this.paramRow.enableControlText(true);
        this.paramRow.controls[0].setMax(Math.max(0, this.rows.value-1));

        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.text   = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const gray =
                this.active
            && !this.inputs[0].connected;

        // colors.input  = gray ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
        // colors.output = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire   = gray ? rgbFromType(ANY_VALUE, true) : rgbFromType(type, true);

        return colors;
    }
}