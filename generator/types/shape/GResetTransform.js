class GResetTransform
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(RESET_XFORM, nodeId, options);
    }



    copy()
    {
        const copy = new GResetTransform(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalValue(this.input, parse);


        if (input)
        {
            this.value = input;

            this.value.nodeId = this.nodeId;
        }
        else
            this.value = new NullValue();

        
        await this.evalObjects(parse);


        const type = this.outputType();

        this.setUpdateValues(parse,
        [
            ['type', type]
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


            const bounds = getObjBounds(this.value.objects);

            const singlePoint =
                   this.value.objects.length  == 1 
                && this.value.objects[0].type == POINT;


            for (const obj of this.value.objects)
            {
                obj.nodeId    = this.nodeId;
                obj.objectId += OBJECT_SEPARATOR + this.nodeId;

                if (this.options.enabled)
                {
                    obj.createDefaultSpace();
                    obj.resetSpace(bounds, singlePoint);
                }
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const reset = new GResetTransform(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(reset, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, reset);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            reset.input = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, reset);
        return reset;
    }
}