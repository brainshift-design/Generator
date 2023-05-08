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


        const [x, y, width, height, angle] = await this.evalBaseParams(parse);

        const round    = this.round    ? (await this.round   .eval(parse)).toValue() : null;
        const children = this.children ? (await this.children.eval(parse)).toValue() : null;


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
                angle    ?? input.angle,
                round    ?? input.round,
                children ?? input.children);
        }
        else
        {
            this.value = new FrameValue(this.nodeId, x, y, width, height, angle, round, children);
        }


        this.updateValues =
        [
            ['value',    this.value         ],
            ['round',    this.value.round   ],
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
            

        if (   this.value.x
            && this.value.y
            && this.value.width
            && this.value.height
            && this.value.angle
            && this.value.round)
        {
            const frame = new FigmaFrame(
                this.nodeId,
                NULL,
                this.value.x     .value,
                this.value.y     .value,
                this.value.width .value,
                this.value.height.value,
                this.value.angle .value,
                this.value.round .value);

            if (this.children.objects)
            {
                for (let i = 0; i < this.children.objects.length; i++)
                {
                    const obj = this.children.objects[i].copy();

                    //obj.nodeId = this.nodeId;
                    obj.listId = -1;

                    // if (obj.objectId != NULL) obj.objectId += ' ';
                    // obj.objectId += (i + 1).toString();

                    frame.children.push(obj);
                }
            }

            this.objects = [frame];
        }
        else
            this.objects = [];

        
        await super.evalObjects(parse);
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
        const frame = new FrameValue(
            this.nodeId,
            this.x       .toValue(),
            this.y       .toValue(),
            this.width   .toValue(),
            this.height  .toValue(),
            this.angle   .toValue(),
            this.round   .toValue(),
            this.children.toValue());

        frame.props = this.props.toValue();

        return frame;
    }



    isValid()
    {
        return super.isValid()
            && this.round   .isValid()
            && this.children.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input   ) this.input   .invalidate();
        if (this.round   ) this.round   .invalidate();
        if (this.children) this.children.invalidate();
    }
}