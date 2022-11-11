class GList
extends GOperator
{
    inputs = [];

    value;



    constructor(nodeId, options)
    {
        super(LIST, nodeId, options);
    }


    
    copy()
    {
        const list = new GList(this.nodeId, this.options);

        list.copyBase(this);

        list.inputs = this.inputs.map(i => i.copy());
        list.value  = this.value.copy();

        return list;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        this.value = new ListValue();

        for (let i = 0; i < this.inputs.length; i++)
        {
            this.inputs[i] = this.inputs[i].eval(parse).copy();
            this.value.items.push(this.inputs[i].toValue());
        }
    

        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.valid = true;

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}
