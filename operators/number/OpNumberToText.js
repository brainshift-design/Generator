class   OpNumberToText
extends OperatorBase
{
    paramBase;
    paramDecimals;
    paramThousands;



    constructor()
    {
        super(NUMBER_TO_TEXT, 'numToText', 'number to text', iconNumberToText);


        this.addInput (new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramBase      = new SelectParam('base',      'base',      true, true, true, ['10', '16']));
        this.addParam(this.paramDecimals  = new TextParam  ('decimals',  'decimals',  true, true, true, '.'));
        this.addParam(this.paramThousands = new TextParam  ('thousands', 'thousands', true, true, true, ''));


        this.paramBase     .divider = 0.53;
        this.paramDecimals .divider = 0.64;
        this.paramThousands.divider = 0.64;
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

        request.push(...this.node.paramBase     .genRequest(gen));
        request.push(...this.node.paramDecimals .genRequest(gen));
        request.push(...this.node.paramThousands.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const base = values[paramIds.findIndex(id => id == 'base')];
        const type = values[paramIds.findIndex(id => id == 'type')];


        if (base.value == 0)
        {
            this.paramThousands.setName('thousands');

            this.paramDecimals .divider = 0.64;
            this.paramThousands.divider = 0.64;
        }
        else
        {
            this.paramThousands.setName('bytes');

            this.paramDecimals .divider = 0.6;
            this.paramThousands.divider = 0.6;
        }


        if (type) 
            this.headerOutputs[0].types = [type.value];

        if (this.hasConditionOutputs())
            this.headerInputs[0].types = [ANY_VALUE];

            
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}