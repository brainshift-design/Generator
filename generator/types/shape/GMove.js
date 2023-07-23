class GMove
extends GOperator1
{
    x           = null;
    y           = null;
    moveType    = null;
    showCenter  = null;
    affectSpace = null;



    constructor(nodeId, options)
    {
        super(MOVE, nodeId, options);
    }



    copy()
    {
        const copy = new GMove(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.x          ) copy.x           = this.x          .copy();
        if (this.y          ) copy.y           = this.y          .copy();
        if (this.moveType   ) copy.moveType    = this.moveType   .copy();
        if (this.showCenter ) copy.showCenter  = this.showCenter .copy();
        if (this.affectSpace) copy.affectSpace = this.affectSpace.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const x           = this.x           ? (await this.x          .eval(parse)).toValue() : null;
        const y           = this.y           ? (await this.y          .eval(parse)).toValue() : null;
        const moveType    = this.moveType    ? (await this.moveType   .eval(parse)).toValue() : null;
        const showCenter  = this.showCenter  ? (await this.showCenter .eval(parse)).toValue() : null;
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
                showCenter:  showCenter,
                affectSpace: affectSpace
            });


        this.updateValues =
        [
            //['value',       this.value],
            ['x',           x          ],
            ['y',           y          ],
            ['moveType',    moveType   ],
            ['showCenter',  showCenter ],
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
            this.value.objects = getValidObjects(this.input);

            
            const bounds = getObjBounds(this.value.objects);


            const x           = options.x          .value;
            const y           = options.y          .value;
            const moveType    = options.moveType   .value;
            const showCenter  = options.showCenter .value;
            const affectSpace = options.affectSpace.value;


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


            const objects = [...this.value.objects]; // avoids infinite growth

            for (const obj of objects)
            {
                if (showCenter > 0)
                    addObjectCenter(this, obj, parse.viewportZoom);
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
            && this.showCenter .isValid()
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
        if (this.showCenter ) this.showCenter .pushValueUpdates(parse);
        if (this.affectSpace) this.affectSpace.pushValueUpdates(parse);
    }



   invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.x          ) this.x          .invalidateInputs(from);
        if (this.y          ) this.y          .invalidateInputs(from);
        if (this.moveType   ) this.moveType   .invalidateInputs(from);
        if (this.showCenter ) this.showCenter .invalidateInputs(from);
        if (this.affectSpace) this.affectSpace.invalidateInputs(from);
    }
}