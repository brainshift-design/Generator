class GSelect
extends GOperator
{
    input = null;
    
    index;



    constructor(nodeId, options)
    {
        super(SELECT, nodeId, options);
    }



    copy()
    {
        const sel = new GSelect(this.nodeId, this.options);
        
        sel.copyBase(this);

        if (this.input) 
            sel.input = this.input.copy();
        
        sel.index = this.index.copy();

        return sel;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        let index = this.index.eval(parse).toValue();
        index = new NumberValue(Math.round(index.value));


        let length = 0;


        if (this.input)
        {
            if (!this.input.value)
                this.input.eval(parse);

            const input = this.input.toValue();
            length = input.items.length;

            index.value = Math.min(index.value, input.items.length-1);

            this.value = input.items[index.value];
        }
        else
        {
            this.value = null;
        }


        if (this.value)
            genPushUpdateValue(parse, this.nodeId, 'value', this.value);
            

        genPushUpdateValue(parse, this.nodeId, 'index',  index);
        genPushUpdateValue(parse, this.nodeId, 'length', new NumberValue(length));


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}