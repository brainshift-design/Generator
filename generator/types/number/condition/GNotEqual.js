class GNotEqual
extends GConditionBase
{
    constructor(nodeId, options)
    {
        super(NUMBER_NOT_EQUAL, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNotEqual(this.nodeId, this.options);
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
            (a, b) => a != b, 
            parse);
        

        if (parse.isLastRepeat())
            genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }
}