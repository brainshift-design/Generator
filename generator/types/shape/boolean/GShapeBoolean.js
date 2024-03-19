class GShapeBoolean
extends GShapeBase
{
    input     = null;

    operation = null;
    children  = null;



    constructor(nodeId, options)
    {
        super(BOOLEAN, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.input     = null;
        this.operation = null;
        this.children  = null;
    }



    copy()
    {
        const copy = new GShapeBoolean(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.operation) copy.operation = this.operation.copy();
        if (this.children ) copy.children  = this.children .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        await this.evalBaseParams(parse);

        let   children  = await evalListValue  (this.children,  parse);
        const operation = await evalNumberValue(this.operation, parse);


        if (   children
            && SHAPE_VALUES.includes(children.type)
            && children.type != SHAPE_LIST_VALUE)
            children = new ListValue([children]);


        let input = null;

        if (this.input)
        {
            input = await evalValue(this.input, parse);

            this.value = new ShapeBooleanValue(
                this.nodeId,
                operation ?? input.operation,
                children  ?? input.children);
        }
        else
        {
            this.value = new ShapeBooleanValue(
                this.nodeId, 
                operation,
                children);
        }


        this.setUpdateValues(parse,
        [
            //['value',     this.value          ],
            ['operation', this.value.operation],
            ['children',  this.value.children ]
        ]);


        await this.evalShapeBase(parse);

        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        if (this.value.children)
        {
            const bool = new FigmaBoolean(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                this.operation);


            if (this.children.objects)
            {
                for (let i = 0; i < this.children.objects.length; i++)
                {
                    const obj    = this.children.objects[i].copy();
                    obj.nodeId   = this.nodeId;
                    obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                    obj.listId   = -1;
                    bool.children.push(obj);
                }
            }


            this.value.objects = [bool];

            this.updateValues.push(['nObjects', new NumberValue(
                this.children.objects 
                ? this.children.objects.length
                : 0)]);
        }
        else
        {
            this.value.objects = [];
            this.updateValues.push(['nObjects', new NumberValue(0)]);
        }

        
        await super.evalObjects(parse);
    }



    toValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.children.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input   ) this.input   .pushValueUpdates(parse);
        if (this.children) this.children.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input   ) this.input   .invalidateInputs(parse, from, force);
        if (this.children) this.children.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input   ) this.input   .iterateLoop(parse);
        if (this.children) this.children.iterateLoop(parse);
    }
}