class GListItems
extends GOperator
{
    input = null;
    
    items = [];


    constructor(nodeId, options)
    {
        super(ITEMS, nodeId, options);
    }



    copy()
    {
        const items = new GListItems(this.nodeId, this.options);
        
        items.copyBase(this);

        if (this.input) 
            items.input = this.input.copy();
        
        for (const item of this.items)
            items.items.push(item.copy());

        return items;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        if (this.input) 
        { 
            this.input = this.input.eval(parse).copy();
            this.value = this.input.toValue();
        }
        else
        {
            this.value = ListValue.NaN;
            genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        } 


        this.items = [];


        if (this.value.isValid())
        {
            for (let i = 0; i < this.value.items.length; i++)
            {
                const item = this.value.items[i];

                this.items.push(item);
                genPushUpdateValue(parse, this.nodeId, 'item' + i, item);
            }
        }
        

        this.valid = true;

        return this;
    }



    getParamFromId(paramId)
    {
        if (   paramId.length > 4
            && paramId.substring(0, 4) == 'item'
            && strIsNum(paramId.substring(4)))
            return this.items[parseInt(paramId.substring(4))];

        return null;
    }



    toValue()
    {
        return this.value.copy();
    }
}