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
        const copy = new GSelect(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.index) copy.index = this.index.copy();
        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let index = (await this.index.eval(parse)).toValue();
        index = new NumberValue(Math.round(index.value));


        let length = 0;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();


            length = input.items.length;

            index.value = Math.min(index.value, input.items.length-1);

            this.value = input.items[index.value];
        }
        else
        {
            this.value = NullValue;
        }


        genPushUpdateValue(parse, this.nodeId, 'value',  this.value);
        genPushUpdateValue(parse, this.nodeId, 'length', new NumberValue(length));
        genPushUpdateValue(parse, this.nodeId, 'index',  index);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}