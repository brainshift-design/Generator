class GComment
extends GOperator
{
    constructor(nodeId, options)
    {
        super(COMMENT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GComment(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = NullValue;


        this.updateValues = [['value', this.value]];
        
        
        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }
}
