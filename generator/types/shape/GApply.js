class GApply
extends GShape
{
    replace;



    constructor(nodeId, options)
    {
        super(SHAPE_APPLY, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.replace = null;
    }



    copy()
    {
        const copy = new GApply(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.replace) copy.replace = this.replace.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const [, , , ] = await this.evalBaseParams(parse);
        
        const props    = this.props   ? (await this.props  .eval(parse)).toValue() : null;
        const replace  = this.replace ? (await this.replace.eval(parse)).toValue() : null;



        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = input;//.copy();

            if (this.options.enabled)
            {
                console.log('this.value =', this.value.copy());
                if (isListType(this.value.type))
                    this.value.items.forEach(item => this.applyProps(item, props, replace));
                else
                    this.applyProps(this.value, props, replace);
            }

            await this.evalObjects(parse);
        }
        else
        {
            this.value = NullValue.copy();
        }
        

        //await this.evalShapeBase(parse);
       

        this.setUpdateValues(parse, 
        [
            ['value', this.value       ],
            ['type',  this.outputType()]
        ]);


        this.validate();

        return this;
    }



    applyProps(item, props, replace)
    {
        if (replace.value == 0)
        {
            if (!isListType(item.props.type))
                item.props = new ListValue([item.props]);
    
            if (props)
            {
                if (isListType(props.type))
                    item.props.items.push(...props.items);
                else
                    item.props.items.push(props);
            }
        }
        else
            item.props = props;
    }
    

    
    async evalObjects(parse, options = {})
    {
        if (this.value.isValid())
        {
            this.value.objects = 
                   this.input 
                && this.input.value
                ? this.input.value.objects.map(o => o.copy()) 
                : [];
        }

            
        for (const obj of this.value.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

            if (this.options.enabled)
            {
                obj.fills    = [];
                obj.strokes  = [];
                obj.effects  = [];

                obj.maskType = 0;
            }
        }

        
        await super.evalObjects(parse);
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }
}