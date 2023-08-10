class   OpTextCSV
extends OperatorBase
{
    paramValue;
    paramRowSeparator;
    paramColumnSeparator;



    constructor()
    {
        super(TEXT_CSV, 'csv', 'csv', iconTextCSV);

        this.iconOffsetY       = 1;
        this.showHeaderTooltip = true;


        this.addInput(new Input([TEXT_VALUE]));

        this.addParam(this.paramValue           = new ListParam  ('value',           'table',     false, false, true));
        this.addParam(this.paramRowSeparator    = new TextParam  ('rowSeparator',    'rows', true , true,  true, '\\n'));
        this.addParam(this.paramColumnSeparator = new TextParam  ('columnSeparator', 'columns', true , true,  true, ','));

        this.paramValue.itemName = '';

        this.paramRowSeparator   .divider = 0.6;
        this.paramColumnSeparator.divider = 0.6;
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

        request.push(...this.paramRowSeparator   .genRequest(gen));
        request.push(...this.paramColumnSeparator.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const rows    = values[paramIds.findIndex(id => id == 'rows'   )];
        const columns = values[paramIds.findIndex(id => id == 'columns')];

        this.paramValue.setName('[ ' + columns.value + ' × ' + rows.value + ' ]');
    }



    updateParams()
    {
        this.paramValue.enableControlText(false, this.isUnknown());
        
        this.paramRowSeparator   .enableControlText(true );
        this.paramColumnSeparator.enableControlText(true );

        this.updateParamControls();
    }
}