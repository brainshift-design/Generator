class   OpSort
extends OperatorBase
{
    //paramOrder;
    paramColumn;
    paramReverse;

    tableLength;

    menuBoolReverse;



    constructor()
    {
        super(SORT, 'sort', 'sort', iconSort);

        this.showHeaderTooltip = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        //this.addParam(this.paramOrder   = new NumberParam('order',   '',        false, true, false));
        this.addParam(this.paramColumn  = new NumberParam('column',  'column',  false,  true, true, 0, 0));
        this.addParam(this.paramReverse = new NumberParam('reverse', 'reverse', true,  true, true, 0, 0, 1));

        this.paramColumn.controls[0].allowEditDecimals = false;
        
        this.paramColumn .divider = 0.59;
        this.paramReverse.divider = 0.59;

        //this.paramOrder.valueText = 'order';
        this.paramColumn.valueText   = 'column';

        this.menuBoolReverse = createBoolMenu(this.paramReverse);
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

        //request.push(...this.node.paramOrder .genRequest(gen));
        request.push(...this.node.paramColumn .genRequest(gen));
        request.push(...this.node.paramReverse.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        //const column  = values[paramIds.findIndex(id => id == 'column')];

        //const length  = values[paramIds.findIndex(id => id == 'length' )];
        //const columns = values[paramIds.findIndex(id => id == 'columns')];

        // this.tableLength = length.value;

        // if (columns.value > 0)
        //     this.paramColumn.controls[0].setMax(columns.value-1);
        // else
        //     this.paramColumn.controls[0].setMax();


        const type = values[paramIds.findIndex(id => id == 'type')];
        if (type) this.outputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramColumn .enableControlText(false);
        //this.paramOrder  .enableControlText(false);
        this.paramReverse.enableControlText(true);

        updateParamConditionText(this.paramReverse, this.paramReverse.isUnknown(), false, 1);

        this.updateParamControls();

        //this.paramOrder.valueText = 'order';
        this.paramColumn.valueText = 'column';
    }



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
}