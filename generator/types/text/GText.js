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



    eval(parse)
    {
        if (this.isCached())
            return this;

        if (this.input)
            this.value = this.input.eval(parse).toValue();
        else if (this.value)
            this.value.eval(parse);
        else
            this.value = TextValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return this.value != NAN_CHAR;
    }
}