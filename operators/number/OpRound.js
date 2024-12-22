class   OpRound
extends OperatorBase
{
    static { Operator.types[NUMBER_ROUND] = this; }



    paramType;
    paramDecimals;



    constructor()
    {
        super(NUMBER_ROUND, 'round', 'round', iconRound);


        this.canDisable = true;
        

        this.addInput (new Input ([NUMBER_VALUE, NUMBER_LIST_VALUE, TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramType     = new OptionParam('type',     'type',     false, true,  true, ['floor', 'round', 'ceiling'], 1));
        this.addParam(this.paramDecimals = new NumberParam('decimals', 'decimals', true,  true,  true, 0, 0, 10));


        this.paramType.reverseMenu = true;

        this.paramDecimals.divider = 0.61;
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

        
        request.push(...this.node.paramType    .genRequest(gen));
        request.push(...this.node.paramDecimals.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == '_type')];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramType    .enableControlText(true, this.paramType    .isUnknown());
        this.paramDecimals.enableControlText(true, this.paramDecimals.isUnknown());

        this.updateParamControls();
    }



    toJavascript(gen)
    {
        const conn = this.inputs[0].connected;


        gen.nTab++;
        const defs = this.toJsDefs(gen);
        gen.nTab--;


        let js = gen.NL + 'function ' + this.name + '(';

        if (   conn 
            && defs == NULL)
            js += 'input';

        js += ')';


        js += gen.NL + '{';
        gen.nTab++;


        js += defs;
        
        
        if (this.inputs[0].connected)
        {
            js += gen.NL + 'const input = ' + this.inputs[0].connectedOutput.toJsCode(gen) + ';';
            js += '\n';
            js += gen.NL + 'switch (' + this.paramType.toJsCode(gen) + ')';
            js += gen.NL + '{ ';
            js += gen.NL + CTAB + 'case 0: return Math.floor(input);';
            js += gen.NL + CTAB + 'case 1: return Math.round(input);';
            js += gen.NL + CTAB + 'case 2: return Math.ceil (input);';
            js += gen.NL + '}';
        }
        else
            js += gen.NL + 'return Number.NaN;';


        gen.nTab--;
        js += gen.NL + '}';

        
        return js;
    }



    toJsDefs(gen)
    {
        if (  !this.inputs[0].connected
            || gen.connectedOut(this))
            return '';

        
        let js = '';


        js += gen.NL + 'const input    = ';
        js += this.inputs[0].connectedOutput.toJsCode(gen);
        js += ';';

        js += this.paramType    .input.toJsDef(gen);
        js += this.paramDecimals.input.toJsDef(gen);


        return js;
    }



    toJsCode(gen)
    {
        let js = '';


        if (this.inputs[0].connected)
        {
            js += '() => { ';

            js += 'const input = ' + this.inputs[0].connectedOutput.toJsCode(gen) + ';';
            js += ' ';

            js += 'switch (' + this.paramType.toJsCode(gen) + ')';
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
}