class GFrame
extends GShape
{
    input    = null;

    round    = null;
    children = null;



    constructor(nodeId, options)
    {
        super(FRAME, nodeId, options);
    }



    copy()
    {
        const copy = new GFrame(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

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
            children = new ListValue([children]);


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
                //angle, 
                round, 
                children);
        }


        this.updateValues =
        [
            ['value',    this.value         ],
            ['round',    this.value.round   ],
            ['children', this.value.children]
        ];


        await this.evalShapeBase(parse, input);


        this.evalObjects(parse);


        this.validate();

        return this;
    }



    evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        const objects = [];
        
        
        if (   this.value.x
            && this.value.y
            && this.value.width
            && this.value.height
            && this.value.round)
        {
            let    x = this.value.x     .value;
            let    y = this.value.y     .value;
            let    w = this.value.width .value;
            let    h = this.value.height.value;
            let    a = 0;
            let   _a = a/360*Tau;
            const  r = Math.max(0, this.value.round.value);


            const frame = new FigmaFrame(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                x, y, w, h, a, r);


            if (LIST_VALUES.includes(this.value.type))
            {
                for (let i = 0; i < this.value.children.objects.length; i++)
                {
                    const obj    = this.value.children.objects[i].copy();

                    obj.nodeId   = this.nodeId;
                    obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                    obj.listId   = -1;
                    
                    frame.children.push(obj);
                }
            }
            else
            {
                for (let i = 0; i < this.value.objects.length; i++)
                {
                    const obj    = this.value.objects[i].copy();
                    
                    obj.nodeId   = this.nodeId;
                    obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                    obj.listId   = -1;
                    
                    frame.children.push(obj);
                }
            }


            frame.createDefaultTransform(
                this.value.x.value,
                this.value.y.value);

            frame.createDefaultTransform(x, y);

            objects.push(frame, ...frame.createTransformPoints(parse, x, y, w, h));
        }

        
        this      .objects = [...objects];
        this.value.objects = [...objects];

        this.updateValues.push(['nObjects', new NumberValue(objects.length)]);


        super.evalObjects(parse);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input   ) this.input   .pushValueUpdates(parse);
        if (this.round   ) this.round   .pushValueUpdates(parse);
        if (this.children) this.children.pushValueUpdates(parse);
    }



    toValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.round   .isValid()
            && this.children.isValid();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input   ) this.input   .invalidateInputs(from);
        if (this.round   ) this.round   .invalidateInputs(from);
        if (this.children) this.children.invalidateInputs(from);
    }
}