class GSetCenter
extends GOperator1
{
    centerX = null;
    centerY = null;
    units   = null;



    constructor(nodeId, options)
    {
        super(SET_CENTER, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.centerX = null;
        this.centerY = null;
        this.units   = null;
    }



    copy()
    {
        const copy = new GSetCenter(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.centerX) copy.centerX = this.centerX.copy();
        if (this.centerY) copy.centerY = this.centerY.copy();
        if (this.units  ) copy.units   = this.units  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const input   = await evalValue      (this.input,   parse);
        const centerX = await evalNumberValue(this.centerX, parse);
        const centerY = await evalNumberValue(this.centerY, parse);
        const units   = await evalNumberValue(this.units,   parse);


        if (this.input)
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
                centerX:    centerX, 
                centerY:    centerY,
                units:      units
            });


        const type = this.outputType();

        this.setUpdateValues(parse,
        [
            ['type',    type   ],
            ['centerX', centerX],
            ['centerY', centerY],
            ['units',   units  ]
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

            
            const centerX = options.centerX    ? options.centerX   .value : 0;
            const centerY = options.centerY    ? options.centerY   .value : 0;
            const units   = options.units      ? options.units     .value : 0;
     
            const cx      = units == 0 ? centerX/100 : centerX;
            const cy      = units == 0 ? centerY/100 : centerY;


            const bounds  = getObjBounds(this.value.objects);


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
        }
        
        
        await super.evalObjects(parse);
    }



    toNewValue()
    {
        return this.value
            ? this.value.copy()
            : null;
    }
    
    
    
    isValid()
    {
        return super.isValid()
            && this.centerX && this.centerX.isValid()
            && this.centerY && this.centerY.isValid()
            && this.units   && this.units  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.centerX) this.centerX.pushValueUpdates(parse);
        if (this.centerY) this.centerY.pushValueUpdates(parse);
        if (this.units  ) this.units  .pushValueUpdates(parse);
    }



   invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.centerX) this.centerX.invalidateInputs(parse, from, force);
        if (this.centerY) this.centerY.invalidateInputs(parse, from, force);
        if (this.units  ) this.units  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.centerX) this.centerX.iterateLoop(parse);
        if (this.centerY) this.centerY.iterateLoop(parse);
        if (this.units  ) this.units  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const center = new GSetCenter(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(center, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, center);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            center.input = genParse(parse);
    
        center.centerX    = genParse(parse);
        center.centerY    = genParse(parse);
        center.units      = genParse(parse);
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, center);
        return center;
    }
}