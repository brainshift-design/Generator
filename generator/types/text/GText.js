class GText
extends GOperator1
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
            this.value = await evalTextValue(this.input, parse);
        else if (this.value)
            await this.value.eval(parse);
        else
            this.value = new TextValue();


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return   !this.input
               && this.value != NAN_CHAR 
            || this.input.isValid();
    }
}