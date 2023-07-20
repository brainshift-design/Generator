class GCenter
extends GOperator1
{
    centerX    = null;
    centerY    = null;
    showCenter = null;



    constructor(nodeId, options)
    {
        super(CENTER, nodeId, options);
    }



    copy()
    {
        const copy = new GMove(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.centerX   ) copy.centerX    = this.centerX   .copy();
        if (this.centerY   ) copy.centerY    = this.centerY   .copy();
        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const centerX    = this.centerX    ? (await this.centerX   .eval(parse)).toValue() : null;
        const centerY    = this.centerY    ? (await this.centerY   .eval(parse)).toValue() : null;
        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;


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
                centerX:    centerX, 
                centerY:    centerY,
                showCenter: showCenter
            });


        this.updateValues =
        [
            //['value',       this.value],
            ['centerX',     centerX   ],
            ['centerY',     centerY   ],
            ['showCenter',  showCenter]
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

            
            const bounds       = getObjBounds(this.value.objects);


            const centerX      = options.centerX    .value;
            const centerY      = options.centerY    .value;
            const showCenter   = options.showCenter .value;


            const singlePoint = 
                   this.value.objects.length  == 1 
                && this.value.objects[0].type == POINT;


            let _cx = centerX;
            let _cy = centerY;

            if (!singlePoint)
            {
                _cx /= 100;
                _cy /= 100;
            }


            const cx = singlePoint ? this.value.objects[0].x + _cx : bounds.x + _cx * bounds.width;
            const cy = singlePoint ? this.value.objects[0].y + _cy : bounds.y + _cy * bounds.height;

                            
            const objects = [...this.value.objects]; // avoids infinite growth

            for (const obj of objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;


                if (this.options.enabled)
                {
                    const ds1 = subv(obj.sp1, obj.sp0);
                    const ds2 = subv(obj.sp2, obj.sp0);

                    obj.sp0.x = cx;
                    obj.sp0.y = cy;

                    obj.sp1 = addv(obj.sp0, ds1);
                    obj.sp2 = addv(obj.sp0, ds2);
                }

                
                if (showCenter > 0)
                    addObjectCenter(this, obj, parse.viewportZoom);
            }
        }
        
        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.centerX   .isValid()
            && this.centerY   .isValid()
            && this.showCenter.isValid();
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

        if (this.centerX   ) this.centerX   .pushValueUpdates(parse);
        if (this.centerY   ) this.centerY   .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



   invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.centerX   ) this.centerX   .invalidateInputs(from);
        if (this.centerY   ) this.centerY   .invalidateInputs(from);
        if (this.showCenter) this.showCenter.invalidateInputs(from);
    }
}