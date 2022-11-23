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
        const rep = new GRepeat(this.nodeId, this.options);

        rep.copyBase(this);

        if (this.input) rep.input = this.input.copy();

        rep.count = this.count.copy();
        rep.value = this.value.copy();

        return rep;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        this.count = this.count.eval(parse).copy();
        const count = this.count.toValue();        

       
        this.value = new ListValue();

        if (this.input)
        {
            this.input = this.input.eval(parse).copy();
            const input = this.input.toValue();

            for (let i = 0; i < count.value; i++)
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

        
        genPushUpdateValue(parse, this.nodeId, 'count', count);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}
