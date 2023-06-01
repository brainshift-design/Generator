class GShapeBoolean
extends GShapeBase
{
    input     = null;

    operation = null
    children  = null;



    constructor(nodeId, options)
    {
        super(BOOLEAN, nodeId, options);
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

        const operation = this.operation ? (await this.operation.eval(parse)).toValue() : null;
        let   children  = this.children  ? (await this.children .eval(parse)).toValue() : null;


        if (   children
            && SHAPE_VALUES.includes(children.type)
            && children.type != SHAPE_LIST_VALUE)
            children = new ListValue([children]);


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

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


        this.updateValues =
        [
            ['value',     this.value          ],
            ['operation', this.value.operation],
            ['children',  this.value.children ]
        ];


        await this.evalShapeBase(parse, input);


        this.evalObjects(parse);


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


            this.objects = [bool];

            this.updateValues.push(['nObjects', new NumberValue(
                this.children.objects 
                ? this.children.objects.length
                : 0)]);
        }
        else
        {
            this.objects = [];
            this.updateValues.push(['nObjects', new NumberValue(0)]);
        }

        
        await super.evalObjects(parse);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input   ) this.input   .pushValueUpdates(parse);
        if (this.children) this.children.pushValueUpdates(parse);
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



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input   ) this.input   .invalidateInputs(from);
        if (this.children) this.children.invalidateInputs(from);
    }
}