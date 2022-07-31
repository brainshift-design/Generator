class   OpNumber
extends OperatorBase
{
    paramValue;



    constructor()
    {
        super(NUMBER, 'num', 70);

        this.addInput (new Input ([NUMBER], this.input_getValuesForUndo));
        this.addOutput(new Output(NUMBER, this.output_genRequest));

        this.addParam(this.paramValue = new NumberParam('value', '', false, false, false));
        
        this.alwaysLoadParams = true;
    }



    input_getValuesForUndo()
    {
        return [[
            this.node.paramValue.id, 
            this.node.paramValue.value]];
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        if (!isEmpty(this.cache))
            return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });
        
        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];

        if (input.connected) request.push(...pushInputOrParam(input, gen));
        else                 request.push(...this.node.paramValue.genRequest(gen));


            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);
        
        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        super.updateValues(updateParamId, paramIds, values);

        const index = paramIds.indexOf('value');
 
        if (index > -1) 
            this.outputs[0].cache = [NUMBER_VALUE, values[index].toString()];
    }



    updateNode()
    {
        this.paramValue.control.readOnly = this.inputs[0].connected;
        enableElementText(this.paramValue.control, !this.inputs[0].connected);

        super.updateNode();
    }



    paramIsConsideredDefault(param)
    {
        return param.isDefault()
            && !this.inputs[0].connected;
    }
}