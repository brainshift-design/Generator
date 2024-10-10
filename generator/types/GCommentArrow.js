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


        this.value = new NullValue();


        this.setUpdateValues(parse, [['', new NullValue()]]);
        
        
        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }
}
