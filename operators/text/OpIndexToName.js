class   OpIndexToName
extends OperatorBase
{
    paramName;
    paramIndex;



    constructor()
    {
        super(INDEX_TO_NAME, 'index', 'index', iconIndexToName);


        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramName  = new SelectParam('name',  'name',  false, true, true, ['day of week', 'month', 'font name'], 0));
        this.addParam(this.paramIndex = new NumberParam('index', 'index', true,  true, true, 1, 1));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(0);
        

        request.push(...this.node.paramName .genRequest(gen));
        request.push(...this.node.paramIndex.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramName .enableControlText(true, this.paramName .isUnknown());
        this.paramIndex.enableControlText(true, this.paramIndex.isUnknown());


        switch (this.paramName.value.value)
        {
            case 0: // days of week
                this.paramIndex.controls[0].setMin(1);
                this.paramIndex.controls[0].setMax(7); 
                break;

            case 1: // months
                this.paramIndex.controls[0].setMin(1);
                this.paramIndex.controls[0].setMax(12); 
                break;

            case 2: // font names
                this.paramIndex.controls[0].setMin(0); 
                this.paramIndex.controls[0].setMax(figUniqueFontNames.length-1); 
                break;

        }


        this.updateParamControls();
    }
}