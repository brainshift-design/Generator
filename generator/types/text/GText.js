class GText
extends GTextType1
{
    constructor(nodeId, options)
    {
        super(TEXT, nodeId, options);
    }



    copy()
    {
        const copy = new GText(this.nodeId, this.options);
        
        copy.copyBase(this);

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


        this.updateValues = [['value', this.value]];

        
        this.validate();

        return this;
    }



    isValid()
    {
        return this.value != NAN_CHAR;
    }
}