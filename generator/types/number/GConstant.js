class GConstant
extends GOperator
{
    constant;



    constructor(nodeId, options)
    {
        super(NUMBER_CONSTANT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GConstant(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.constant) copy.constant = this.constant.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        // input not used for evaluation


        const constant = (await this.constant.eval(parse)).toValue();
    
        let value;

        switch (Math.min(Math.max(0, constant.toNumber()), 5))
        {
            case 0: value = 1.4142135623; break; // √̅2
            case 1: value = 2.7182818284; break; // e
            case 2: value = 0.6180339887; break; // phi
            case 3: value = 1.6180339887; break; // PHI
            case 4: value = 3.1415926536; break; // pi
            case 5: value = 6.2831853072; break; // tau
        }


        this.value = new NumberValue(value, 10);

        
        this.setUpdateValues(parse,
        [
            ['value',   this.value],
            ['constant', constant ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return this.constant && this.constant.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.constant) this.constant.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.constant) this.constant.invalidateInputs(from);
    }
}
