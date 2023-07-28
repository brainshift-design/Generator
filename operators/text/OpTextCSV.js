class   OpTextCSV
extends OperatorBase
{
    paramValue;
    paramRows;
    paramColumns;
    paramRowSeparator;
    paramColumnSeparator;



    constructor()
    {
        super(TEXT_CSV, 'csv', 'csv', iconTextCSV);

        this.iconOffsetY = 1;


        this.addInput(new Input([TEXT_VALUE]));

        this.addParam(this.paramValue           = new ListParam  ('value',           'table',     false, false, true));
        this.addParam(this.paramColumns         = new NumberParam('columns',         'columns',   true,  false, true, 0, 0));
        this.addParam(this.paramColumnSeparator = new TextParam  ('columnSeparator', 'separator', true , true,  true, ','));
        this.addParam(this.paramRows            = new NumberParam('rows',            'rows',      true,  false, true, 0, 0));
        this.addParam(this.paramRowSeparator    = new TextParam  ('rowSeparator',    'separator', true , true,  true, '\\n'));

        this.paramValue.itemName = '';

        this.paramRows           .divider = 0.5;
        this.paramRowSeparator   .divider = 0.62;
        this.paramColumns        .divider = 0.5;
        this.paramColumnSeparator.divider = 0.62;
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



    // updateValues(requestId, actionId, updateParamId, paramIds, values)
    // {
    //     super.updateValues(requestId, actionId, updateParamId, paramIds, values);


    //     const rows    = values[paramIds.findIndex(id => id == 'rows'   )];
    //     const columns = values[paramIds.findIndex(id => id == 'columns')];


    // }



    updateParams()
    {
        this.paramValue.enableControlText(false, this.isUnknown());
        
        this.paramRows           .enableControlText(false);
        this.paramColumns        .enableControlText(false);
        this.paramRowSeparator   .enableControlText(true );
        this.paramColumnSeparator.enableControlText(true );


        this.updateParamControls();
    }
}