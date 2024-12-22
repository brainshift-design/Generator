class GExport
extends GShapeBase
{
    static { GNode.types[EXPORT] = this; }



    inputs = [];

    scale;
    format;
 // contents;
 // crop;
    suffix;
 // profile;



    constructor(nodeId, options)
    {
        super(EXPORT, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs = [];
        
        this.scale    = null;
        this.format   = null;
     // this.contents = null;
     // this.crop     = null;
        this.suffix   = null;
     // this.profile  = null;
    }



    copy()
    {
        const copy = new GExport(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.scale   ) copy.scale    = this.scale   .copy();
        if (this.format  ) copy.format   = this.format  .copy();
     // if (this.contents) copy.contents = this.contents.copy();
     // if (this.crop    ) copy.crop     = this.crop    .copy();
        if (this.suffix  ) copy.suffix   = this.suffix  .copy();
     // if (this.profile ) copy.profile  = this.profile .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const scale      = await evalNumberValue(this.scale,    parse);
        const format     = await evalNumberValue(this.format,   parse);
     // const contents   = await evalNumberValue(this.contents, parse);
     // const crop       = await evalNumberValue(this.crop,     parse);
        const suffix     = await evalTextValue  (this.suffix,   parse);
     // const profile    = await evalNumberValue(this.profile,  parse);


        this.value = new ListValue();

        this.value.objects = [];


        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            await this.inputs[i].eval(parse);

            const objects = getValidObjects(this.inputs[i].value);
        
            
            for (let j = 0; j < objects.length; j++, o++)
            {
                let obj = objects[j];

                //obj = copyFigmaObject(obj);

                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                obj.listId   = -1;

                this.value.objects.push(obj);
            }
        }


        this.setUpdateValues(parse, 
        [
            ['objectIds', new ListValue(this.value.objects.map(o => new TextValue(o.objectId)))]
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
            && !this.inputs.find(i => !i.isValid())
            && this.scale    && this.scale   .isValid()
            && this.format   && this.format  .isValid()
         // && this.contents && this.contents.isValid()
         // && this.crop     && this.crop    .isValid()
            && this.suffix   && this.suffix  .isValid();
         // && this.profile  && this.profile .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.scale   ) this.scale   .pushValueUpdates(parse);
        if (this.format  ) this.format  .pushValueUpdates(parse);
     // if (this.contents) this.contents.pushValueUpdates(parse);
     // if (this.crop    ) this.crop    .pushValueUpdates(parse);
        if (this.suffix  ) this.suffix  .pushValueUpdates(parse);
     // if (this.profile ) this.profile .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));

        if (this.scale   ) this.scale   .invalidateInputs(parse, from, force);
        if (this.format  ) this.format  .invalidateInputs(parse, from, force);
     // if (this.contents) this.contents.invalidateInputs(parse, from, force);
     // if (this.crop    ) this.crop    .invalidateInputs(parse, from, force);
        if (this.suffix  ) this.suffix  .invalidateInputs(parse, from, force);
     // if (this.profile ) this.profile .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.scale   ) this.scale   .iterateLoop(parse);
        if (this.format  ) this.format  .iterateLoop(parse);
     // if (this.contents) this.contents.iterateLoop(parse);
     // if (this.crop    ) this.crop    .iterateLoop(parse);
        if (this.suffix  ) this.suffix  .iterateLoop(parse);
     // if (this.profile ) this.profile .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const _export = new GExport(nodeId, options);
    
    
        let nInputs = 0;
        
        if (!ignore)
            nInputs = parseInt(parse.move());
    
    
        if (parse.settings.logRequests) 
            logReq(_export, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, _export);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        for (let i = 0; i < nInputs; i++)
            _export.inputs.push(genParse(parse));
    
        _export.scale    = genParse(parse);
        _export.format   = genParse(parse);
     // _export.contents = genParse(parse);
     // _export.crop     = genParse(parse);
        _export.suffix   = genParse(parse);
        _export.profile  = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, _export);
        return _export;
    }
}