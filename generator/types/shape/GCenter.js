class GCenter
extends GOperator1
{
    centerX    = null;
    centerY    = null;
    units      = null;
    showCenter = null;



    constructor(nodeId, options)
    {
        super(CENTER, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.centerX    = null;
        this.centerY    = null;
        this.units      = null;
        this.showCenter = null;
    }



    copy()
    {
        const copy = new GCenter(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.centerX   ) copy.centerX    = this.centerX   .copy();
        if (this.centerY   ) copy.centerY    = this.centerY   .copy();
        if (this.units     ) copy.units      = this.units     .copy();
        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const centerX    = this.centerX    ? (await this.centerX   .eval(parse)).toValue() : null;
        const centerY    = this.centerY    ? (await this.centerY   .eval(parse)).toValue() : null;
        const units      = this.units      ? (await this.units     .eval(parse)).toValue() : null;
        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

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
                centerX:    centerX, 
                centerY:    centerY,
                units:      units,
                showCenter: showCenter
            });


        this.setUpdateValues(parse,
        [
            ['centerX',    centerX   ],
            ['centerY',    centerY   ],
            ['units',      units     ],
            ['showCenter', showCenter]
        ]);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (   this.value
            && this.value.isValid())
        {
            this.value.objects = getValidObjects(this.input.value);

            
            const centerX     = options.centerX   .value;
            const centerY     = options.centerY   .value;
            const units       = options.units     .value;
            const showCenter  = options.showCenter.value;
     
            const cx          = units == 0 ? centerX/100 : centerX;
            const cy          = units == 0 ? centerY/100 : centerY;


            const bounds      = getObjBounds(this.value.objects);

            const singlePoint =  
                   this.value.objects.length  == 1 
                && this.value.objects[0].type == POINT;


            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

                if (this.options.enabled)
                    obj.resetSpace(bounds, singlePoint, cx, cy, units);
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
            && this.centerX    && this.centerX   .isValid()
            && this.centerY    && this.centerY   .isValid()
            && this.units      && this.units     .isValid()
            && this.showCenter && this.showCenter.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.centerX   ) this.centerX   .pushValueUpdates(parse);
        if (this.centerY   ) this.centerY   .pushValueUpdates(parse);
        if (this.units     ) this.units     .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



   invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.centerX   ) this.centerX   .invalidateInputs(parse, from, force);
        if (this.centerY   ) this.centerY   .invalidateInputs(parse, from, force);
        if (this.units     ) this.units     .invalidateInputs(parse, from, force);
        if (this.showCenter) this.showCenter.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.centerX   ) this.centerX   .iterateLoop(parse);
        if (this.centerY   ) this.centerY   .iterateLoop(parse);
        if (this.units     ) this.units     .iterateLoop(parse);
        if (this.showCenter) this.showCenter.iterateLoop(parse);
    }
}