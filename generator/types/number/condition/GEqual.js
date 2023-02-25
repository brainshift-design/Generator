class GEqual
extends GConditionBase
{
    constructor(nodeId, options)
    {
        super(NUMBER_EQUAL, nodeId, options);
    }


    
    copy()
    {
        const copy = new GEqual(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalConditionInputs(
            this.input0, 
            this.input1, 
            (a, b) => a == b, 
            parse);
            
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}
