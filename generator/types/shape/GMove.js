class GMove
extends GOperator1
{
    x           = null;
    y           = null;
    moveType    = null;
    affectSpace = null;
    showCenter  = null;
    
    

    constructor(nodeId, options)
    {
        super(MOVE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.x           = null;
        this.y           = null;
        this.moveType    = null;
        this.affectSpace = null;
        this.showCenter  = null;
    }



    copy()
    {
        const copy = new GMove(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.x          ) copy.x           = this.x          .copy();
        if (this.y          ) copy.y           = this.y          .copy();
        if (this.moveType   ) copy.moveType    = this.moveType   .copy();
        if (this.affectSpace) copy.affectSpace = this.affectSpace.copy();
        if (this.showCenter ) copy.showCenter  = this.showCenter .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const x           = this.x           ? (await this.x          .eval(parse)).toValue() : null;
        const y           = this.y           ? (await this.y          .eval(parse)).toValue() : null;
        const moveType    = this.moveType    ? (await this.moveType   .eval(parse)).toValue() : null;
        const affectSpace = this.affectSpace ? (await this.affectSpace.eval(parse)).toValue() : null;
        const showCenter  = this.showCenter  ? (await this.showCenter .eval(parse)).toValue() : null;


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = NullValue;//.copy();
        }


        await this.evalObjects(
            parse, 
            {
                x:           x, 
                y:           y,
                moveType:    moveType,
                showCenter:  showCenter,
                affectSpace: affectSpace
            });


        this.setUpdateValues(parse,
        [
            ['type',        this.outputType()],
            ['x',           x                ],
            ['y',           y                ],
            ['moveType',    moveType         ],
            ['affectSpace', affectSpace      ],
            ['showCenter',  showCenter       ]
        ]);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (   this.value
            && this.value.isValid()
            && options.x
            && options.y
            && options.moveType
            && options.affectSpace
            && options.showCenter)
        {
            this.value.objects = getValidObjects(this.input.value);

            if (isListType(this.value.type))
            {
                for (let i = 0; i < this.value.items.length; i++)
                    this.value.items[i].objects = this.value.objects.filter(o => o.itemIndex == i);
            }
    
            
            const bounds = getObjBounds(this.value.objects);


            const x           = options.x          .value;
            const y           = options.y          .value;
            const moveType    = options.moveType   .value;
            const affectSpace = options.affectSpace.value;
            const showCenter  = options.showCenter .value;


            const _a = y/360*Tau;
            const _v = vector(_a, x);
            
            const _x = moveType == 0 ? x : _v.x;
            const _y = moveType == 0 ? y : _v.y;


            const singlePoint = 
                   this.value.objects.length  == 1 
                && this.value.objects[0].type == POINT;


            let _cx = 50;
            let _cy = 50;

            if (!singlePoint)
            {
                _cx /= 100;
                _cy /= 100;
            }


            const cx = singlePoint ? this.value.objects[0].x + _cx : bounds.x + _cx * bounds.width;
            const cy = singlePoint ? this.value.objects[0].y + _cy : bounds.y + _cy * bounds.height;

            const xform = 
                moveType == 0
                ? createTransform(_x, _y)
                : mulm3m3(
                    createTransform(cx, cy),
                    createTransform(_x, _y),
                    createRotateTransform(-_a), // for vector movement
                    createTransform(-cx, -cy));

                
            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

                if (this.options.enabled)
                    obj.applyTransform(xform, affectSpace > 0);
            }


            if (showCenter > 0)
            {
                const objects = [...this.value.objects]; // avoids infinite growth
                objects.forEach(o => addObjectCenter(this, o, parse.viewportZoom));
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
    
    
    
    isValid()
    {
        return super.isValid()
            && this.x           && this.x          .isValid()
            && this.y           && this.y          .isValid()
            && this.moveType    && this.moveType   .isValid()
            && this.affectSpace && this.affectSpace.isValid()
            && this.showCenter  && this.showCenter .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x          ) this.x          .pushValueUpdates(parse);
        if (this.y          ) this.y          .pushValueUpdates(parse);
        if (this.moveType   ) this.moveType   .pushValueUpdates(parse);
        if (this.affectSpace) this.affectSpace.pushValueUpdates(parse);
        if (this.showCenter ) this.showCenter .pushValueUpdates(parse);
    }



   invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.x          ) this.x          .invalidateInputs(parse, from, force);
        if (this.y          ) this.y          .invalidateInputs(parse, from, force);
        if (this.moveType   ) this.moveType   .invalidateInputs(parse, from, force);
        if (this.affectSpace) this.affectSpace.invalidateInputs(parse, from, force);
        if (this.showCenter ) this.showCenter .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.x          ) this.x          .iterateLoop(parse);
        if (this.y          ) this.y          .iterateLoop(parse);
        if (this.moveType   ) this.moveType   .iterateLoop(parse);
        if (this.affectSpace) this.affectSpace.iterateLoop(parse);
        if (this.showCenter ) this.showCenter .iterateLoop(parse);
    }
}