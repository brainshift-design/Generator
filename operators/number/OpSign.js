class   OpSign
extends OperatorWithValue
{
    constructor()
    {
        super(NUMBER_SIGN, 'sign', 'sign', iconSign);

        this.iconOffsetY = 1;

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
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

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false, this.isUnknown());

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
        
        
        js += gen.NL + 'return ';
        js += conn ? 'Math.sign(input)' : this.toJsCode();
        js += ';'


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


        js += gen.NL + 'const input = ';
        js += this.inputs[0].connectedOutput.toJsCode(gen);
        js += ';';


        return js;
    }



    toJsCode(gen)
    {
        return this.inputs[0].connected
            ? 'Math.sign(' + this.inputs[0].connectedOutput.toJsCode(gen) + ')'
            : 'Number.NaN';
    }
}