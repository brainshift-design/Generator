class   OpConvertAngle
extends OperatorBase
{
    paramFrom;



    constructor()
    {
        super(CONVERT_ANGLE, 'convert', 'convert', iconConvertAngle);

        this.canDisable  = true;
        this.iconOffsetY = -2;
        

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramFrom = new SelectParam('from', '', false, true,  true, ['deg ⟶ rad', 'rad ⟶ deg'], 0));
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

        
        request.push(...this.node.paramFrom.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramFrom.enableControlText(true, this.paramFrom.isUnknown());

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
            js += gen.NL + 'switch (' + this.paramFrom.toJsCode(gen) + ')';
            js += gen.NL + '{ ';
            js += gen.NL + TAB + 'case 0: return Math.floor(input);';
            js += gen.NL + TAB + 'case 1: return Math.round(input);';
            js += gen.NL + TAB + 'case 2: return Math.ceil (input);';
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

        js += this.paramFrom    .input.toJsDef(gen);
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

            js += 'switch (' + this.paramFrom.toJsCode(gen) + ')';
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