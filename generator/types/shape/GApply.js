class GApply
extends GOperator1//Shape
{
    props   = null;
    replace = null;



    constructor(nodeId, options)
    {
        super(SHAPE_APPLY, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.props   = null;
        this.replace = null;
    }



    copy()
    {
        const copy = new GApply(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.props  ) copy.props   = this.props  .copy();
        if (this.replace) copy.replace = this.replace.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const input   = this.input   ? (await this.input  .eval(parse)).toValue() : null;
        const props   = this.props   ? (await this.props  .eval(parse)).toValue() : null;
        const replace = this.replace ? (await this.replace.eval(parse)).toValue() : null;



        if (input)
        {
            this.value         = input;
            this.value.props   = props;
            this.value.replace = replace;
        }
        else
        {
            this.value = NullValue.copy();
        }

       
        await this.evalObjects(parse);


        this.setUpdateValues(parse, 
        [
            ['type',    this.outputType()],
            ['value',   this.value       ],
            ['props',   props            ],
            ['replace', replace          ]
        ]);


        this.validate();

        return this;
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


        if (this.value.objects)
        {
            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
            }

            this.applyProps(this.value.objects, this.value.props, this.value.replace.value);
        }

        
        await super.evalObjects(parse);
    }



    applyProps(objects, props, replace)
    {
        for (const obj of objects)
        {
            if (this.options.enabled)
            {
                // if (obj.type == SHAPE_GROUP)
                //     this.applyProps(obj.children, props, replace);

                // else

                // apply doesn't work on groups because there's no clear way
                // to determine how deep it should go in case of nested groups
                
                //if (!obj.type == SHAPE_GROUP)
                {
                    if (replace == 1)
                    {
                        obj.fills    = [];
                        obj.strokes  = [];
                        obj.effects  = [];
                        obj.maskType = 0;
                    }


                    if (isListType(props.type))
                    {               
                        for (let i = props.items.length-1; i >= 0; i--)
                            addProp(obj, props.items[i]);
                    }
                    else
                        addProp(obj, props);
                }
            }
        }
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }


    
    isValid()
    {
        return super.isValid()
            && this.props   && this.props  .isValid()
            && this.replace && this.replace.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.props  ) this.props  .pushValueUpdates(parse);
        if (this.replace) this.replace.pushValueUpdates(parse);
    }



   invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.props  ) this.props  .invalidateInputs(parse, from, force);
        if (this.replace) this.replace.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.props  ) this.props  .iterateLoop(parse);
        if (this.replace) this.replace.iterateLoop(parse);
    }
}