class GRetain
extends GShapeBase
{
    inputs  = [];

    retain = null;

    finalize;



    constructor(nodeId, options)
    {
        super(RETAIN, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs  = [];
        this.retain = null;
    }



    copy()
    {
        const copy = new GRetain(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        const retain  = await evalNumberValue(this.retain, parse);
        const finalize = this.finalize.value > 0;


        this.value = new ListValue();

        this.value.objects = [];


        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            await this.inputs[i].eval(parse);

            const objects = getValidObjects(this.inputs[i].value);
        
            
            if (   this.options.enabled
                && (   finalize
                    || retain.value == 1))
            {
                for (let j = 0; j < objects.length; j++, o++)
                {
                    let obj = objects[j];

                    //obj = copyFigmaObject(obj);

                    obj.nodeId   = this.nodeId;
                    obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                    obj.listId   = -1;

                    if (  (   !isEmpty(obj.fills  )
                           || !isEmpty(obj.strokes))
                        && !obj.isDeco)
                            obj.retain = finalize ? 2 : 1;
                            
                    this.value.objects.push(obj);
                }
            }
        }


        this.setUpdateValues(parse, [['', new NullValue()]]);


        this.validate();

        return this;
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
            && !this.inputs.find(i => !i.isValid())
            && this.retain && this.retain.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.retain) this.retain.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));

        if (this.retain) this.retain.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.retain) this.retain.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const retain = new GRetain(nodeId, options);
    
    
        let nInputs = 0;
        
        if (!ignore)
            nInputs = parseInt(parse.move());
    
    
        if (parse.settings.logRequests) 
            logReq(retain, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, retain);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        for (let i = 0; i < nInputs; i++)
            retain.inputs.push(genParse(parse));
    
        retain.retain  = genParse(parse);
        retain.finalize = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, retain);
        return retain;
    }
}