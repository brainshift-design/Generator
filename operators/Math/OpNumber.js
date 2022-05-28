class   OpNumber
extends OperatorBase
{
    #paramValue;



    constructor()
    {
        super(NUMBER, 'num', 70);

        this.addInput (new Input ([NUMBER], this.input_getValuesForUndo));
        this.addOutput(new Output(NUMBER, this.output_genRequest));

        this.addParam(this.#paramValue = new NumberParam('value', '', false, false, false));
        
        this.alwaysLoadParams = true;
    }



    input_getValuesForUndo()
    {
        return [[
            this.node.#paramValue.index, 
            this.node.#paramValue.value]];
    }



    output_genRequest()
    {
        // 'this' is the output

        if (!isEmpty(this.cache))
            return this.cache;


        const req = [
            this.node.type, 
            this.node.id];

        if (this.node.active) req.push(ACTIVE);

                
        const input = this.node.inputs[0];

        req.push(...(
            input.connected
            ? input.connectedOutput.genRequest()
            : this.node.#paramValue.genRequest()));
                
        return req;
    }



    updateParamValue(index, value)
    {
        super.updateParamValue(index, value);

        if (index == 0)
            this.outputs[0].cache = [NUMBER_VALUE, value.toString()];
    }



    updateNode()
    {
        this.#paramValue.control.readOnly = this.inputs[0].connected;
        enableElementText(this.#paramValue.control, !this.inputs[0].connected);

        super.updateNode();
    }



    paramIsConsideredDefault(param)
    {
        return param.isDefault()
            && !this.inputs[0].connected;
    }
}