class GSetObjectName
extends GOperator1
{
    name = null;



    constructor(nodeId, options)
    {
        super(SET_OBJECT_NAME, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.name = null;
    }



    copy()
    {
        const copy = new GSetObjectName(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.name ) copy.name  = this.name .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalValue    (this.input, parse, () => RectangleValue.NaN());
        const name  = await evalTextValue(this.name,  parse);


        if (input)
        {
            this.value = input;

            if (   this.options.enabled
                && this.value.isValid()
                && this.value.objects)
            {
                for (const obj of this.value.objects)
                {
                    obj.nodeId     = this.nodeId;
                    obj.objectName = name.value;
                }
            }
        }
        else
            this.value = new NullValue();


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',  this.outputType()],
            ['value', this.value       ],
            ['name',  name             ]
        ]);


        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return super.isValid()
            && this.name && this.name.isValid()
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.name) this.name.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.name) this.name.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.name) this.name.iterateLoop(parse);
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        if (this.name) this.name.resetLoop(parse, nodeId);
    }
}
