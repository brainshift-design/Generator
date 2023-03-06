class GNodeInputs
extends GOperator
{
    input = null;

    //item0
    //item1
    //item2
    //...



    constructor(nodeId, options)
    {
        super(ITEMS, nodeId, options);
    }



    copy()
    {
        const copy = new GNodeInputs(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();
        
        for (const key of this.keys())
        {
            if (   key.length > 4
                && key.substring(0, 4) == 'item')
                Object.assign(copy, {[key]: this[key]});
        }

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
        {
            if (!this.input.value)
                this.input.eval(parse);

            this.value = this.input.toValue();
        }
        else
            this.value = ListValue.NaN;


        if (    this.value.isValid()
            && !isEmpty(this.value.items))
        {
            for (let i = 0; i < this.value.items.length; i++)
            {
                const item = this.value.items[i];

                Object.assign(this, {['item' + i]: item});
                genPushUpdateValue(parse, this.nodeId, 'item' + i, item);
            }
        }
        else
            genPushUpdateValue(parse, this.nodeId, '', NullValue);


        this.validate();

        return this;
    }



    getParamFromId(paramId)
    {
        if (   paramId.length > 4
            && paramId.substring(0, 4) == 'item'
            && strIsNum(paramId.substring(4)))
            return this[paramId];

        return null;
    }



    toValue()
    {
        return this.value.copy();
    }
}