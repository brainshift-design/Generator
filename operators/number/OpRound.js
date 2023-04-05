class   OpRound
extends OperatorWithValue
{
    paramType;
    paramDec;



    constructor()
    {
        super(NUMBER_ROUND, 'round');

        this.canDisable = true;
        

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramType  = new SelectParam('type',     'type',     false, true,  true, ['floor', 'round', 'ceiling'], 1));
        this.addParam(this.paramDec   = new NumberParam('decimals', 'decimals', true,  true,  true, 0, 0, 10));
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

        request.push(...this.node.paramType.genRequest(gen));
        request.push(...this.node.paramDec .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramType.enableControlText(true);
        this.paramDec .enableControlText(true);

        this.updateParamControls();
    }



    toJsCode()
    {
        let js = '';


        if (this.inputs[0].connected)
        {
            js += '() => { ';

            js += 'const input = ' + this.inputs[0].connectedOutput.toJsCode() + ';';
            js += ' ';

            js += 'switch (' + this.paramType.toJsCode() + ')';
            js += ' {';
            js += ' case 0: return Math.floor(input);';
            js += ' case 1: return Math.round(input);';
            js += ' case 2: return Math.ceil(input);';
            js += ' }';


            js += ' }';
        }
        else
            js += 'Number.NaN';

      
        return js;
    }



    toJsFunction(nTab = 0)
    {
        let pos = TAB.repeat(nTab);


        let js = 'function ' + this.name + '()';

        js += '\n' + pos + '{';

        
        if (this.inputs[0].connected)
        {
            js += '\n' + pos + TAB + 'const input = ' + this.inputs[0].connectedOutput.toJsCode() + ';';
            js += '\n';
            js += '\n' + pos + TAB + 'switch (' + this.paramType.toJsCode() + ')';
            js += '\n' + pos + TAB + '{ ';
            js += '\n' + pos + TAB + TAB + 'case 0: return Math.floor(input);';
            js += '\n' + pos + TAB + TAB + 'case 1: return Math.round(input);';
            js += '\n' + pos + TAB + TAB + 'case 2: return Math.ceil (input);';
            js += '\n' + pos + TAB + '}';
        }
        else
            js += '\n' + pos + TAB + 'return Number.NaN;';


        js += '\n' + pos + '}';

        return js;
    }
}