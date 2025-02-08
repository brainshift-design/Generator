class   OpIndexToName
extends OperatorBase
{
    static { Operator.types[INDEX_TO_NAME] = this; }



    paramCategory;
    paramIndex;



    constructor()
    {
        super(INDEX_TO_NAME, 'indexToName', 'index → name', iconIndexToName);


        this.iconOffsetY = 1;


        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramCategory = new OptionParam('category', 'category', false, true, true, ['day of week', 'month', 'font name'], 0));
        this.addParam(this.paramIndex    = new NumberParam('index',    'index',    true,  true, true, 1, 1));
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
        

        request.push(...this.node.paramCategory.genRequest(gen));
        request.push(...this.node.paramIndex   .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramCategory.enableControlText(true, this.paramCategory.isUnknown());
        this.paramIndex   .enableControlText(true, this.paramIndex   .isUnknown());


        switch (this.paramCategory.value.value)
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