class GTextCSV
extends GOperator
{
    inputs = [];

    value;
    separator;



    constructor(nodeId, options)
    {
        super(TEXT_CSV, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextCSV(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs    = this.inputs.map(i => i.copy());

        copy.value     = this.value    .copy();
        copy.separator = this.separator.copy();

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new ListValue();

        // for (let i = 0; i < this.inputs.length; i++)
        // {
        //     const input = this.inputs[i].eval(parse).toValue();

        //     if (input.type == LIST_VALUE)
        //     {
        //         for (const item of input.items)
        //             this.value.items.push(item);   
        //     }
        //     else
        //         this.value.items.push(input);
        // }
    

        genPushUpdateValue(parse, this.nodeId, 'value',     this.value    );
        genPushUpdateValue(parse, this.nodeId, 'separator', this.separator);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}
