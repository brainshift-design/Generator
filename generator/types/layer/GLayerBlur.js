class GLayerBlur
extends GOperator1
{
    static { GNode.types[LAYER_BLUR] = this; }



    radius = null;



    constructor(nodeId, options)
    {
        super(LAYER_BLUR, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.radius = null;
    }



    copy()
    {
        const copy = new GLayerBlur(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.radius) copy.radius = this.radius.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input  = await evalLayerBlurValue(this.input,  parse);
        const radius = await evalNumberValue   (this.radius, parse);

        
        if (input)
        {
            this.value = new LayerBlurValue(
                radius ?? input.radius,
                this.options.enabled);
        }
        else
        {
            this.value = new LayerBlurValue(
                radius,
                this.options.enabled);
        }


        this.setUpdateValues(parse,
        [
            ['radius', this.value.radius]
        ]);
        

        if (!this.radius) this.radius = this.value.radius.copy();


        this.validate();

        return this;
    }



    toNewValue()
    {
        return new LayerBlurValue(
            this.radius ? this.radius.toNewValue() : this.input.radius.toNewValue(),
            this.options.enabled);
    }



    isValid()
    {
        return super.isValid()
            && this.radius && this.radius.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.radius) this.radius.pushValueUpdates(parse);
    }
    
    
    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.radius) this.radius.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.radius) this.radius.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const blur = new GLayerBlur(nodeId, options);
    
        blur.hasInputs = options.hasInputs;
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(blur, parse, ignore, nInputs);
    
    
        if (ignore)
        {
            genParseNodeEnd(parse, blur);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        let paramIds;
    
        if (nInputs == 1)
        {
            blur.input = genParse(parse);
            paramIds = parse.move().split(',');
        }
        else
            paramIds = ['radius'];
    
    
        parse.inParam = false;
    
        for (const id of paramIds)
        {
            switch (id)
            {
            case 'radius': blur.radius = genParse(parse); break;
            }
        }
        
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, blur);
        return blur;
    }
}