class GCommentArrow
extends GOperator
{
    constructor(nodeId, options)
    {
        super(COMMENT_ARROW, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCommentArrow(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = NullValue.copy();


        this.setUpdateValues(parse, [['', NullValue]]);
        
        
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
