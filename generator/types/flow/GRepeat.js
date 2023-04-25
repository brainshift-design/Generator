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



    async eval(parse)
    {
        if (this.nodeId == 'graph/repeat2')                
            console.log('eval()');

        if (this.isCached())
            return this;
            

        let count = (await this.count.eval(parse)).toValue();
        count = new NumberValue(Math.round(count.value));

       
        this.value = new ListValue();

        this.objects = [];


        if (this.input)
        {
            const nItems = 
                this.options.enabled 
                ? count.value 
                : 1;


            for (let i = 0; i < nItems; i++)
            {
                this.input.valid = false;
                await this.input.eval(parse);


                for (let j = 0; j < this.input.objects.length; j++)
                {
                    const obj = this.input.objects[j].copy();
    
                    obj.nodeId   = this.nodeId;
                    obj.objectId = i;
    
                    this.objects.push(obj);
                }
    

                if (this.nodeId == 'graph/repeat2')
                    console.log('this.input =', this.input);                
                const input = this.input.toValue();
                if (this.nodeId == 'graph/repeat2')
                    console.log('input =', input);                

                if (input)
                    this.value.items.push(input.copy());
            }
        }

        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        genPushUpdateValue(parse, this.nodeId, 'count', count);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}
