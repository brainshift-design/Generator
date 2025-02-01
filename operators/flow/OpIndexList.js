class   OpIndexList
extends OperatorBase
{
    static { Operator.types[INDEX_LIST] = this; }



    paramCount;
    paramShuffle;
    paramSeed;

    menuShuffle;



    constructor()
    {
        super(INDEX_LIST, 'indexList', 'index list', iconIndexList);


        this.iconOffsetY = -2;
        this.outputValueType = NUMBER_VALUE;



        this.addOutput(new Output([NUMBER_LIST_VALUE], this.output_genRequest));


        this.addParam(this.paramCount   = new NumberParam('count',   'count',   true, true, true, 1, 0, Number.MAX_SAFE_INTEGER, 0));
        this.addParam(this.paramShuffle = new NumberParam('shuffle', 'shuffle', true, true, true, 0, 0, 1));
        this.addParam(this.paramSeed    = new NumberParam('seed',    'seed',    true, true, true, Math.floor(Math.random() * 10000), 0, 0x7fffffff));

        this.paramCount  .divider = 0.56;
        this.paramShuffle.divider = 0.58;
        this.paramSeed   .divider = 0.48;

        this.paramShuffle.controls[0].allowEditDecimals = false;

        this.menuShuffle = createBoolMenu(this.paramShuffle);


        this.getDescription = () => `creates a list of indices, optionally shuffled`;
        
        this.paramCount  .getDescription = () => `the number of indices`;
        this.paramShuffle.getDescription = () => `determines if the indices are shuffled`;
        this.paramSeed   .getDescription = () => `the seed for the shuffle`;
    }
    
    
    
    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        request.push(...this.node.paramCount  .genRequest(gen));
        request.push(...this.node.paramShuffle.genRequest(gen));
        request.push(...this.node.paramSeed   .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramCount  .enableControlText(true, this.paramCount.isUnknown());
        this.paramShuffle.enableControlText(true);
        this.paramSeed   .enableControlText(true, this.paramSeed.isUnknown());

        updateParamConditionText(this.paramShuffle, this.paramShuffle.isUnknown(), false, 1);

        this.updateParamControls();
    }
}

