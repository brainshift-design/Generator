class   OpTextCSV
extends OperatorBase
{
    paramValue;
    // paramRows;
    // paramColumns;
    paramRowSeparator;
    paramColumnSeparator;

    preview = null;



    constructor()
    {
        super(TEXT_CSV, 'csv', 'csv', iconTextCSV);

        this.iconOffsetY = 1;


        this.addInput(new Input([TEXT_VALUE]));

        this.addParam(this.paramValue           = new ListParam  ('value',           'table',     false, false, true));
        // this.addParam(this.paramColumns         = new NumberParam('columns',         'columns',   true,  false, true, 0, 0));
        // this.addParam(this.paramRows            = new NumberParam('rows',            'rows',      true,  false, true, 0, 0));
        this.addParam(this.paramRowSeparator    = new TextParam  ('rowSeparator',    'rows', true , true,  true, '\\n'));
        this.addParam(this.paramColumnSeparator = new TextParam  ('columnSeparator', 'columns', true , true,  true, ','));

        this.paramValue.itemName = '';

        // this.paramRows           .divider = 0.5;
        // this.paramColumns        .divider = 0.5;
        this.paramRowSeparator   .divider = 0.6;
        this.paramColumnSeparator.divider = 0.6;


        createListTooltip(this);
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


        this.preview  = values[paramIds.findIndex(id => id == 'preview')];
        const rows    = values[paramIds.findIndex(id => id == 'rows'   )];
        const columns = values[paramIds.findIndex(id => id == 'columns')];

        this.paramValue.setName('[ ' + columns.value + ' × ' + rows.value + ' ]');
    }



    updateParams()
    {
        this.paramValue.enableControlText(false, this.isUnknown());
        
        // this.paramRows           .enableControlText(false);
        // this.paramColumns        .enableControlText(false);
        this.paramRowSeparator   .enableControlText(true );
        this.paramColumnSeparator.enableControlText(true );


        this.updateParamControls();
    }
}