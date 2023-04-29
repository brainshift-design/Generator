class GRepeat
extends GOperator
{
    input = null;

    count;
    repeatId;



    constructor(nodeId, options)
    {
        super(REPEAT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GRepeat(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();

        copy.value    = this.value   .copy();
        copy.count    = this.count   .copy();
        copy.repeatId = this.repeatId.copy();

        return copy;
    }



    isCached()
    {
        return this.valid;//
            //|| this.repeatId;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        let count = (await this.count.eval(parse)).toValue();
        //const repeatId = (await this.repeatId.eval(parse)).toValue();


        count = new NumberValue(Math.round(count.value));


        if (this.repeatId.type != NUMBER_VALUE)
        {
            console.assert(
                   this.repeatId.type == NUMBER_SEQUENCE
                || this.repeatId.type == NUMBER_RANDOM,
                'only volatile types can be repeated');

            this.repeatId.repeatCount = count.value;
        }


        this.value = new ListValue();

        this.objects = [];


        let repeat =             
        {
            nodeId:    this.nodeId,
            iteration: 0,
            total:     0
        };


        if (this.repeatId.type != NUMBER_VALUE)
            parse.repeats.push(repeat);


        if (this.input)
        {
            const nItems = 
                this.options.enabled 
                ? count.value 
                : 1;


            for (let i = 0, o = 0; i < nItems; i++)
            {
                if (this.repeatId.type != NUMBER_VALUE)
                {
                    this.repeatId.valid        = false;
                    this.repeatId.repeatNodeId = this.nodeId;

                    repeat.iteration = i;
                    repeat.total     = nItems;
                }
                
                
                this.input.invalidate();
                await this.input.eval(parse);

                
                for (let j = 0; j < this.input.objects.length; j++, o++)
                {
                    const obj = copyFigmaObject(this.input.objects[j]);
                    
                    obj.nodeId    = this.nodeId;

                    if (obj.objectId != NULL) obj.objectId += ' ';
                    obj.objectId += (o+1).toString();

                    obj.listId = i;
    
                    this.objects.push(obj);
                }
    

                const input = this.input.toValue();

                if (input)
                    this.value.items.push(input.copy());
            }


            if (this.repeatId)
                this.repeatId.init = false;
        }

        
        genPushUpdateValue(parse, this.nodeId, 'value',    this.value);
        genPushUpdateValue(parse, this.nodeId, 'count',    count);
        genPushUpdateValue(parse, this.nodeId, 'repeatId', NumberValue.NaN);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
        if (this.count) this.count.invalidate();
    }
}
