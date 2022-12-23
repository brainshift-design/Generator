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
        //logString('GRepeat.eval()', 'black', 'yellow');

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
