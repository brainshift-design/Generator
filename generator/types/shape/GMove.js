class GMove
extends GOperator1
{
    moveType    = null;
    x           = null;
    y           = null;
    affectSpace = null;
    showCenter  = null;
    
    _a          = 0;



    constructor(nodeId, options)
    {
        super(MOVE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.moveType    = null;
        this.x           = null;
        this.y           = null;
        this.affectSpace = null;
        this.showCenter  = null;

        this._a          = 0;
    }



    copy()
    {
        const copy = new GMove(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.moveType   ) copy.moveType    = this.moveType   .copy();
        if (this.x          ) copy.x           = this.x          .copy();
        if (this.y          ) copy.y           = this.y          .copy();
        if (this.affectSpace) copy.affectSpace = this.affectSpace.copy();
        if (this.showCenter ) copy.showCenter  = this.showCenter .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const input       = await evalValue      (this.input,       parse);
        const moveType    = await evalNumberValue(this.moveType,    parse);
        const x           = await evalNumberValue(this.x,           parse);
        const y           = await evalNumberValue(this.y,           parse);
        const affectSpace = await evalNumberValue(this.affectSpace, parse);
        const showCenter  = await evalNumberValue(this.showCenter,  parse);


        if (input)
        {
            this.value = input.copy();

            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = new NullValue();
        }


        await this.evalObjects(
            parse, 
            {
                moveType:    moveType,
                x:           x, 
                y:           y,
                showCenter:  showCenter,
                affectSpace: affectSpace
            });


        this.setUpdateValues(parse,
        [
            ['type',        this.outputType()],
            ['moveType',    moveType         ],
            ['x',           x                ],
            ['y',           y                ],
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
            && options.moveType
            && options.x
            && options.y
            && options.affectSpace
            && options.showCenter)
        {
            this.value.objects = getValidObjects(this.input.value);


            if (isListValueType(this.value.type))
            {
                for (let i = 0; i < this.value.items.length; i++)
                    this.value.items[i].objects = this.value.objects.filter(o => o.itemIndex == i);
            }
   
            
            const moveType    = options.moveType   .value;
            const x           = options.x          .value;
            const y           = options.y          .value;
            const affectSpace = options.affectSpace.value;
            const showCenter  = options.showCenter .value;


            let _a = y/360*Tau;

            while (_a <  0  ) _a += Tau;
            while (_a >= Tau) _a -= Tau;


            const _v = vector(_a, x);
            
            const _x = moveType == 0 ? x : _v.x;
            const _y = moveType == 0 ? y : _v.y;


            const xform = 
                moveType == 0
                ? createTransform(_x, _y)
                : mulm3m3(
                    createTransform(_x, _y),
                    createRotateTransform(-_a)); // for vector movement

                    
            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

                if (this.options.enabled)
                    obj.applyTransform(xform, affectSpace);
            }


            if (   this.value.type == VECTOR_PATH_VALUE
                && this.value.objects
                && this.value.objects.length > 0
                && this.value.points.objects)
            {
                for (let i = 0; i < this.value.objects[0].points.length; i++)
                {
                    const p = this.value.objects[0].points[i].toPoint();
    
                    this.value.points.objects[i].x = p.x;
                    this.value.points.objects[i].y = p.y;
                }
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
            && this.moveType    && this.moveType   .isValid()
            && this.x           && this.x          .isValid()
            && this.y           && this.y          .isValid()
            && this.affectSpace && this.affectSpace.isValid()
            && this.showCenter  && this.showCenter .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.moveType   ) this.moveType   .pushValueUpdates(parse);
        if (this.x          ) this.x          .pushValueUpdates(parse);
        if (this.y          ) this.y          .pushValueUpdates(parse);
        if (this.affectSpace) this.affectSpace.pushValueUpdates(parse);
        if (this.showCenter ) this.showCenter .pushValueUpdates(parse);
    }



   invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.moveType   ) this.moveType   .invalidateInputs(parse, from, force);
        if (this.x          ) this.x          .invalidateInputs(parse, from, force);
        if (this.y          ) this.y          .invalidateInputs(parse, from, force);
        if (this.affectSpace) this.affectSpace.invalidateInputs(parse, from, force);
        if (this.showCenter ) this.showCenter .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.moveType   ) this.moveType   .iterateLoop(parse);
        if (this.x          ) this.x          .iterateLoop(parse);
        if (this.y          ) this.y          .iterateLoop(parse);
        if (this.affectSpace) this.affectSpace.iterateLoop(parse);
        if (this.showCenter ) this.showCenter .iterateLoop(parse);
    }
}