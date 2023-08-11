class GGreater
extends GOperator2
{
    constructor(nodeId, options)
    {
        super(NUMBER_GREATER, nodeId, options);
    }


    
    copy()
    {
        const copy = new GGreater(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = await evalConditionInputs(
            this.input0, 
            this.input1, 
            (a, b) => a > b, 
            parse);
        

        this.setUpdateValues(parse, [['value', this.value]]);


        this.validate();

        return this;
    }
}