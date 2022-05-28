class   OpInterpolate
extends OperatorBase
{
    paramValue;
    paramAmount;



    constructor()
    {
        super(NUMBER_INTERPOLATE, 'inter', 70);

        this.addInput(new Input([NUMBER]));
        this.addInput(new Input([NUMBER]));

        this.addOutput(new Output(NUMBER, this.output_genRequest));

        this.addParam(this.paramValue  = new NumberParam('value',  '', false, false, false, 0));
        this.addParam(this.paramAmount = new NumberParam('amount', '', true,  true,  true, 50, 0, 100, 0));

        enableSliderText(this.paramValue.control, false);
        
        this.paramAmount.control.min        = Number.MIN_SAFE_INTEGER; // allow
        this.paramAmount.control.max        = Number.MAX_SAFE_INTEGER; // extrapolation
        this.paramAmount.control.displayDec = 0;
        
        this.paramAmount.control.setSuffix('%', true);
    }



    output_genRequest()
    {
        // 'this' is the output

        if (!isEmpty(this.cache))
            return this.cache;


        const req = [
            this.node.type, 
            this.node.id];
                

        const input0 = this.node.inputs[0];
        const input1 = this.node.inputs[1];


        if (   input0.connected
            && input1.connected)   req.push(2,
                                       ...input0.connectedOutput.genRequest(),
                                       ...input1.connectedOutput.genRequest());

        else if (input0.connected) req.push(1, ...input0.connectedOutput.genRequest());
        else if (input1.connected) req.push(1, ...input1.connectedOutput.genRequest());
            
        else                       req.push(0);


        req.push(...this.node.paramAmount.genRequest());

        return req;
    }



    updateParamValue(index, value)
    {
        super.updateParamValue(index, value);

        if (index == 0)
            this.outputs[0].cache = [NUMBER_VALUE, value.toString()];
    }
}