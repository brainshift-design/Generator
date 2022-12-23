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


        const index = this.index.eval(parse).toValue();
        let length = 0;


        if (this.input)
        {
            if (!this.input.value)
                this.input.eval(parse);

            const input = this.input.toValue();

            this.value = input.items[index.value];
            length = input.items.length;
        }
        else
        {
            this.value = null;
            index = null;
        }


        this.items = [];


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