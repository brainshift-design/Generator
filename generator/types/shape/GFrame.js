class GFrame
extends GShape
{
    round    = null;
    children = null;



    constructor(nodeId, options)
    {
        super(FRAME, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.round    = null;
        this.children = null;
    }



    copy()
    {
        const copy = new GFrame(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.round   ) copy.round    = this.round   .copy();
        if (this.children) copy.children = this.children.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const [x, y, width, height] = await this.evalBaseParams(parse);

        const round    = this.round    ? (await this.round   .eval(parse)).toValue() : null;
        let   children = this.children ? (await this.children.eval(parse)).toValue() : null;

        if (   children
            && SHAPE_VALUES.includes(children.type)
            && children.type != SHAPE_LIST_VALUE)
        {
            const objects    = children.objects;
            children         = new ListValue([children]);
            children.objects = objects;
        }


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new FrameValue(
                this.nodeId,
                x        ?? input.x,
                y        ?? input.y,
                width    ?? input.width,
                height   ?? input.height,
                round    ?? input.round,
                children ?? input.children);
        }
        else
        {
            this.value = new FrameValue(
                this.nodeId, 
                x, 
                y, 
                width,
                height, 
                round, 
                children);
        }


        this.setUpdateValues(parse, 
        [
            ['value', this.value]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.x       ) this.x        = this.value.x       .copy();
        if (!this.y       ) this.y        = this.value.y       .copy();
        if (!this.width   ) this.width    = this.value.width   .copy();
        if (!this.height  ) this.height   = this.value.height  .copy();
        if (!this.round   ) this.round    = this.value.round   .copy();
        if (!this.children) this.children = this.value.children.copy();


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        if (   this.value.x
            && this.value.y
            && this.value.width
            && this.value.height
            && this.value.round)
        {
            let   x = this.value.x     .value;
            let   y = this.value.y     .value;
            let   w = this.value.width .value;
            let   h = this.value.height.value;
            const r = Math.max(0, this.value.round.value);


            const frame = new FigmaFrame(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                x, y, w, h, r);


            for (let i = 0; i < this.value.objects.length; i++)
                this.addChildObject(frame.children, this.value.objects[i]);


            frame.createDefaultTransform(x, y);
            frame.createDefaultTransformPoints(x, y, w, h);
        
            this.value.objects = [frame];

            
            this.setUpdateValues(parse, 
            [
                ['nChildren', new NumberValue(frame.children.length)]
            ], 
            true);
        }


        await super.evalObjects(parse);
    }



    addChildObject(objects, _obj)
    {
        const obj = copyFigmaObject(_obj);
                    
        obj.nodeId   = this.nodeId;
        obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
        obj.listId   = -1;
        
        objects.push(obj);
    }



    toValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.round    && this.round   .isValid()
            && this.children && this.children.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.round   ) this.round   .pushValueUpdates(parse);
        if (this.children) this.children.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.round   ) this.round   .invalidateInputs(parse, from, force);
        if (this.children) this.children.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.round   ) this.round   .iterateLoop(parse);
        if (this.children) this.children.iterateLoop(parse);
    }
}