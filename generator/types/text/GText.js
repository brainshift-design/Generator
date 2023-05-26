class GText
extends GTextType
{
    input = null;
    


    constructor(nodeId, options)
    {
        super(TEXT, nodeId, options);
    }



    copy()
    {
        const copy = new GText(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();
        
        copy.value = this.value;
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
            this.value = (await this.input.eval(parse)).toValue();
        else if (this.value)
            await this.value.eval(parse);
        else
            this.value = new TextValue();//TextValue.NaN;


        this.updateValues = [[returnValueId, this.value]];

        
        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    isValid()
    {
        return this.value != NAN_CHAR;
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input) this.input.invalidateInputs();
    }
}