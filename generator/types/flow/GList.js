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



    // canBeValid()
    // {
    //     let canBeValid = true;

    //     for (const input of this.inputs)
    //         canBeValid &= input.canBeValid();

    //     return canBeValid;
    // }



    eval(parse)
    {
        if (this.valid)
            return this;


        this.value = new ListValue();

        for (let i = 0; i < this.inputs.length; i++)
        {
            this.inputs[i] = this.inputs[i].eval(parse).copy();
            const input = this.inputs[i].toValue();

            if (input.type == LIST_VALUE)
            {
                for (const item of input.items)
                    this.value.items.push(item);   
            }
            else
                this.value.items.push(input);
        }
    

        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}
