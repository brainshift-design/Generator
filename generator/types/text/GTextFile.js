class GTextFile
extends GOperator
{
    //path;
    
    cachedValue = null;



    constructor(nodeId, options)
    {
        super(TEXT_FILE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.cachedValue = null;
    }



    copy()
    {
        const copy = new GTextFile(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.cachedValue) copy.cachedValue = this.cachedValue.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const cachedValue = await evalTextValue(this.cachedValue, parse);
      //const path        = await evalTextValue(this.path,        parse);

        
        genInitNodeProgress(this.nodeId);


        this.value = cachedValue ?? new TextValue();


        this.setUpdateValues(parse,
        [
            ['', new NullValue()]
            //['path',    path      ]
        ]);
        
        
        if (parse.settings.showTextTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', this.value]
            ],
            true);
        }


        this.validate();

        return this;
    }



    isValid()
    {
        return false;//return this.path && this.path.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.path) this.path.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.path) this.path.invalidateInputs(parse, from, force);

        //this.cachedValue = new TextValue();
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.path) this.path.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const file = new GTextFile(nodeId, options);
       
    
        if (parse.settings.logRequests) 
            logReq(file, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, file);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        file.cachedValue = genParse(parse);
        //file.path        = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, file);
        return file;
    }
}