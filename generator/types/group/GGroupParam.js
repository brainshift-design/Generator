class GGroupParam
extends GOperator
{
    input = null;
    
    dataType = NULL;



    constructor(nodeId, options)
    {
        super(GROUP_PARAM, nodeId, options);
    }



    copy()
    {
        const copy = new GGroupParam(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();
        
        copy.dataType = this.dataType;
      
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
        {
            if (!this.input.value)
                await this.input.eval(parse);

            this.value = this.input.toValue();
        }

        else if (this.dataType != NULL)
            this.value = nullFromType(this.dataType);
        
        else
            this.value = NullValue;


        if (parse.isLastRepeat())
            genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
    }
}