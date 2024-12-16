class GReversePath
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(REVERSE_PATH, nodeId, options);
    }



    copy()
    {
        const copy = new GReversePath(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const input = await evalVectorPathValue(this.input, parse);


        if (   input
            && input.objects.length > 0
            && input.objects[0].pathPoints)
        {
            this.value        = input.copy();
            this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = new NullValue();
        }


        await this.evalObjects(parse);


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
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


            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

                if (   this.options.enabled
                    && PATH_TYPES.includes(obj.type))
                    obj.pathPoints.reverse();
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
    
    
        const reverse = new GReversePath(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(reverse, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, reverse);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            reverse.input = genParse(parse);
      
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, reverse);
        return reverse;
    }
}