class GMove
extends GOperator1
{
    x           = null;
    y           = null;
    moveType    = null;
    affectSpace = null;

    coords;



    constructor(nodeId, options)
    {
        super(MOVE, nodeId, options);

        this.coords = clone(identity);
    }



    copy()
    {
        const copy = new GMove(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.x          ) copy.x           = this.x          .copy();
        if (this.y          ) copy.y           = this.y          .copy();
        if (this.moveType   ) copy.moveType    = this.moveType   .copy();
        if (this.affectSpace) copy.affectSpace = this.affectSpace.copy();

        copy.coords = clone(this.coords);

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


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = NullValue;
        }

        
        await this.evalObjects(
            parse, 
            {
                x:           x, 
                y:           y,
                moveType:    moveType,
                affectSpace: affectSpace
            });


        this.updateValues =
        [
            ['value',       this.value ],
            ['x',           x          ],
            ['y',           y          ],
            ['moveType',    moveType   ],
            ['affectSpace', affectSpace]
        ];


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (   this.value
            && this.value.isValid())
        {
            this.value.objects = 
                   this.input 
                && this.input.value
                ? this.input.value.objects.map(o => o.copy()) 
                : [];

            
            const bounds = getObjBounds(this.value.objects);

            if (!this.options.enabled)
                return bounds;
                

            const x           = options.x          .value;
            const y           = options.y          .value;
            const moveType    = options.moveType   .value;
            const affectSpace = options.affectSpace.value;


            const _a = y/360*Tau;
            const _v = vector(_a, x);
            
            const _x = moveType == 0 ? x : _v.x;
            const _y = moveType == 0 ? y : _v.y;


            const singlePoint = 
                this.value.objects.length == 1 
                && this.value.objects[0].type == POINT;


            let _cx = 50;
            let _cy = 50;

            if (!singlePoint)
            {
                _cx /= 100;
                _cy /= 100;
            }


            const cx = singlePoint ? this.value.objects[0].x + _cx : bounds.x + bounds.width  * _cx;
            const cy = singlePoint ? this.value.objects[0].y + _cy : bounds.y + bounds.height * _cy;

            const xform = 
                moveType == 0
                ? createTransform(_x, _y)
                : mulm3m3(
                    createTransform(cx, cy),
                    createTransform(_x, _y),
                    createRotateTransform(-_a),
                    createTransform(-cx, -cy));

                
            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

                if (obj.type == VECTOR_PATH)
                    obj.updatePoints(xform, this.coords);

                obj.applyTransform(xform, affectSpace > 0);

                this.coords = mulm3m3(this.coords, xform);
            }
        }
        
        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.x          .isValid()
            && this.y          .isValid()
            && this.moveType   .isValid()
            && this.affectSpace.isValid();
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x          ) this.x          .pushValueUpdates(parse);
        if (this.y          ) this.y          .pushValueUpdates(parse);
        if (this.moveType   ) this.moveType   .pushValueUpdates(parse);
        if (this.affectSpace) this.affectSpace.pushValueUpdates(parse);
    }



   invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.x          ) this.x          .invalidateInputs(from);
        if (this.y          ) this.y          .invalidateInputs(from);
        if (this.moveType   ) this.moveType   .invalidateInputs(from);
        if (this.affectSpace) this.affectSpace.invalidateInputs(from);
    }
}