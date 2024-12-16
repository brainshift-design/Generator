class GSetObjectName
extends GOperator1
{
    static { nodeTypes[SET_OBJECT_NAME] = this; }



    name = null;



    constructor(nodeId, options)
    {
        super(SET_OBJECT_NAME, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.name = null;
    }



    copy()
    {
        const copy = new GSetObjectName(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.name ) copy.name  = this.name .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalValue    (this.input, parse, () => RectangleValue.NaN());
        const name  = await evalTextValue(this.name,  parse);


        if (input)
        {
            this.value = input;

            if (   this.options.enabled
                && this.value.isValid()
                && this.value.objects)
            {
                for (const obj of this.value.objects)
                {
                    obj.nodeId     = this.nodeId;
                    obj.objectName = name.value;
                }
            }
        }
        else
            this.value = new NullValue();


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',  this.outputType()],
            ['value', this.value       ],
            ['name',  name             ]
        ]);


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
            && this.name && this.name.isValid()
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.name) this.name.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.name) this.name.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.name) this.name.iterateLoop(parse);
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        if (this.name) this.name.resetLoop(parse, nodeId);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const name = new GSetObjectName(nodeId, options);
    
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(name, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, name);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            name.input = genParse(parse);
    
        name.name    = genParse(parse);
     // name.addLogo = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, name);
        return name;
    }
}
