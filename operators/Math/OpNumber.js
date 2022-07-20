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
        
        const [req, ignore] = this.node.genRequestStart(gen);
        if (ignore) return req;

        
        const input = this.node.inputs[0];

        req.push(...(
            input.connected
            ? input.connectedOutput.genRequest(gen)
            : this.node.paramValue.genRequest(gen)));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);
        
        return req;
    }



    updateValues(updateParamId, paramIds, values)
    {
        super.updateValues(updateParamId, paramIds, values);

        if (paramIds.includes('value'))
            this.outputs[0].cache = [NUMBER_VALUE, values[0].toString()];
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