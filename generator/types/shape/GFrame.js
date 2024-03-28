class GFrame
extends GShape
{
    children = null;
    position = null;
    round    = null;



    constructor(nodeId, options)
    {
        super(FRAME, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.children = null;
        this.position = null;
        this.round    = null;
    }



    copy()
    {
        const copy = new GFrame(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.children) copy.children = this.children.copy();
        if (this.position) copy.position = this.position.copy();
        if (this.round   ) copy.round    = this.round   .copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'children': return this.input ? this.value.children : this.children;
            case 'position': return this.input ? this.value.position : this.position;
            case 'x':        return this.input ? this.value.x        : this.x;
            case 'y':        return this.input ? this.value.y        : this.y;
            case 'width':    return this.input ? this.value.width    : this.width;
            case 'height':   return this.input ? this.value.height   : this.height;
            case 'round':    return this.input ? this.value.round    : this.round;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const [x, y, width, height] = await this.evalBaseParams(parse);

        let children = await evalListValue  (this.children, parse);
        let position = await evalNumberValue(this.position, parse);
        let round    = await evalNumberValue(this.round,    parse);


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
            input = await evalFrameValue(this.input, parse);

            this.value = new FrameValue(
                this.nodeId,
                children ?? input.children,
                position ?? input.position,
                x        ?? input.x,
                y        ?? input.y,
                width    ?? input.width,
                height   ?? input.height,
                round    ?? input.round);
        }
        else
        {
            this.value = new FrameValue(
                this.nodeId, 
                children,
                position,
                x, 
                y, 
                width,
                height, 
                round);
        }


        const childType = new TextValue(finalListTypeFromItems(children.items));

        this.setUpdateValues(parse, 
        [
            ['childType', childType],
            ['position',  position ],
            ['x',         x        ],
            ['y',         y        ],
            ['width',     width    ],
            ['height',    height   ],
            ['round',     round    ]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.children) this.children = this.value.children.copy();
        if (!this.position) this.position = this.value.position.copy();
        if (!this.x       ) this.x        = this.value.x       .copy();
        if (!this.y       ) this.y        = this.value.y       .copy();
        if (!this.width   ) this.width    = this.value.width   .copy();
        if (!this.height  ) this.height   = this.value.height  .copy();
        if (!this.round   ) this.round    = this.value.round   .copy();


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        if (   this.value.position
            && this.value.x
            && this.value.y
            && this.value.width
            && this.value.height
            && this.value.round)
        {
            let   pos = this.value.position.value;
            let   x   = this.value.x       .value;
            let   y   = this.value.y       .value;
            let   w   = this.value.width   .value;
            let   h   = this.value.height  .value;
            const r   = Math.max(0, this.value.round.value);


            const frame = new FigmaFrame(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                x, y, w, h, r);


            const bounds = getObjBounds(this.value.objects);

            const singlePoint =
                   this.value.objects.length  == 1 
                && this.value.objects[0].type == POINT;

                
            const xoff = createTransform(-x, -y);

            for (let i = 0; i < this.value.objects.length; i++)
            {
                const obj = this.value.objects[i];

                obj.createDefaultSpace();
                obj.resetSpace(bounds, singlePoint);

                if (pos > 0)
                    obj.applyTransform(xoff);

                this.addChildObject(frame.children, obj);
            }


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
            && this.children && this.children.isValid()
            && this.position && this.position.isValid()
            && this.round    && this.round   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.children) this.children.pushValueUpdates(parse);
        if (this.position) this.position.pushValueUpdates(parse);
        if (this.round   ) this.round   .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.children) this.children.invalidateInputs(parse, from, force);
        if (this.position) this.position.invalidateInputs(parse, from, force);
        if (this.round   ) this.round   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.children) this.children.iterateLoop(parse);
        if (this.position) this.position.iterateLoop(parse);
        if (this.round   ) this.round   .iterateLoop(parse);
    }
}