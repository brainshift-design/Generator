class GRepeat
extends GOperator
{
    input = null;

    count;



    constructor(nodeId, options)
    {
        super(REPEAT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GRepeat(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();

        copy.count = this.count.copy();
        copy.value = this.value.copy();

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        let count = this.count.eval(parse).toValue();
        count = new NumberValue(Math.round(count.value));

       
        this.value = new ListValue();

        if (this.input)
        {
            for (let i = 0; i < count.value; i++)
            {
                const input = this.input.eval(parse).toValue();

                if (input)
                {
                    if (input.type == LIST_VALUE)
                    {
                        for (const item of input.items)
                            this.value.items.push(item);
                    }
                    else
                        this.value.items.push(input);
                }
            }
        }

        
        genPushUpdateValue(parse, this.nodeId, 'count', count);
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}
