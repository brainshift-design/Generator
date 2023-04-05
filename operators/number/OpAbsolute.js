class   OpAbsolute
extends OperatorWithValue
{
    constructor()
    {
        super(NUMBER_ABSOLUTE, 'abs');

        this.canDisable = true;
        

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
        this.paramValue.enableControlText(false);

        this.updateParamControls();
    }



    toJsCode()
    {
        return this.inputs[0].connected
             ? 'Math.abs(' + this.inputs[0].connectedOutput.toJsCode() + ')'
             : 'Number.NaN';
    }



    toJsFunction(nTab = 0)
    {
        let pos = TAB.repeat(nTab);


        let js = 'function ' + this.name + '()';

        js += '\n' + pos + '{';

        
        js += '\n' + pos + TAB + 'return ';
        
        js += 
            this.inputs[0].connected
            ? 'Math.abs(' + this.inputs[0].connectedOutput.toJsCode() + ')'
            : 'Number.NaN';

        js += ';'


        js += '\n' + pos + '}';

        return js;
    }
}