class   OpTextSubstring
extends OperatorBase
{
    paramStart;
    paramEnd;



    constructor()
    {
        super(TEXT_SUBSTRING, 'substring', 'substring', iconTextSubstring);

        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.addInput (new Input ([TEXT_VALUE, TEXT_LIST_VALUE, NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramStart = new NumberParam('start', '[ start', true, true, true, 0));
        this.addParam(this.paramEnd   = new NumberParam('end',   '] end',   true, true, true, Number.NaN));


        this.paramStart.controls[0].allowEditDecimals = false;
        this.paramEnd  .controls[0].allowEditDecimals = false;
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

        request.push(...this.node.paramStart.genRequest(gen));
        request.push(...this.node.paramEnd  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const fullLength = values[paramIds.findIndex(id => id == 'fullLength')];
        const end        = values[paramIds.findIndex(id => id == 'end'       )];
        
        if (fullLength.value > 0)
        {
            this.paramStart.controls[0].setMax(fullLength.value);

            const max = fullLength.value > 0 ? Math.max(0,  fullLength.value) : Number.MAX_SAFE_INTEGER;

            this.paramStart.controls[0].setMin(0, 0);
            this.paramStart.controls[0].setMax(max, max);
            
            const reverse = end.value < 0;

            const _min = reverse ? -max : 0;
            const _max = reverse ? 0 : max;
            
            this.paramEnd.controls[0].setMin(_min);
            this.paramEnd.controls[0].setMax(_max, max);
        }
        else
        {
            this.paramStart.controls[0].setMin(0, 0);
            this.paramStart.controls[0].setMax();

            this.paramEnd  .controls[0].setMin();
            this.paramEnd  .controls[0].setMax();
        }


        const length = values[paramIds.findIndex(id => id == 'length')];

        this.length = length.value;
        
        
        const type = values[paramIds.findIndex(id => id == 'type' )];

        if (type)
            this.headerOutputs[0].types = [type.value];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramStart.enableControlText(true, this.paramStart.isUnknown());
        this.paramEnd  .enableControlText(true, this.paramEnd  .isUnknown());

        this.updateParamControls();
    }
}