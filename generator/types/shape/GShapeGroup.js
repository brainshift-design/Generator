class GShapeGroup
extends GShapeBase
{
    input    = null;

    children = null;



    constructor(nodeId, options)
    {
        super(SHAPE_GROUP, nodeId, options);
    }



    copy()
    {
        const copy = new GShapeGroup(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.children) copy.children = this.children.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        await this.evalBaseParams(parse);

        const children = this.children ? (await this.children.eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new ShapeGroupValue(
                this.nodeId,
                children ?? input.children);
        }
        else
        {
            this.value = new ShapeGroupValue(this.nodeId, children);
        }


        this.updateValues =
        [
            ['value',    this.value         ],
            ['children', this.value.children]
        ];


        await this.evalShapeBase(parse, input);


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
            const group = new FigmaShapeGroup(
                this.nodeId,
                this.nodeName,
                NULL);


            if (this.children.objects)
            {
                for (let i = 0; i < this.children.objects.length; i++)
                {
                    const obj = this.children.objects[i].copy();
                    obj.nodeId = this.nodeId;
                    obj.listId = -1;
                    group.children.push(obj);
                }
            }


            this.objects = [group];

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
        const group = new ShapeGroupValue(
            this.nodeId,
            this.children.toValue());

        return group;
    }



    isValid()
    {
        return super.isValid()
            && this.children.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input   ) this.input   .invalidate();
        if (this.children) this.children.invalidate();
    }
}