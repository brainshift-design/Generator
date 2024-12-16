class GSkew
extends GAffine
{
    skewX = null;
    skewY = null;



    constructor(nodeId, options)
    {
        super(SKEW, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.skewX = null;
        this.skewY = null;
    }



    copy()
    {
        const copy = new GSkew(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.skewX) copy.skewX = this.skewX.copy();
        if (this.skewY) copy.skewY = this.skewY.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const input = await evalValue      (this.input, parse);
        let   skewX = await evalNumberValue(this.skewX, parse);
        let   skewY = await evalNumberValue(this.skewY, parse);


        const [affectSpace] = await this.evalBaseParams(parse);


        if (input)
        {
            this.value = input;

            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = new NullValue();
        }

        
        const _bounds = await this.evalObjects(
            parse, 
            {
                skewX:       skewX, 
                skewY:       skewY, 
                affectSpace: affectSpace
            });


        const bounds = new RectangleValue(
            this.nodeId,
            new NumberValue(_bounds.x     ), 
            new NumberValue(_bounds.y     ), 
            new NumberValue(_bounds.width ),
            new NumberValue(_bounds.height),
            new NumberValue(0));


        this.setUpdateValues(parse,
        [
            ['type',        this.outputType()],
            ['skewX',       skewX            ],
            ['skewY',       skewY            ],
            ['affectSpace', affectSpace      ],
            ['bounds',      bounds           ]
        ]);


        this.validate();

        return this;
    }



    async evalObjects(parse, options)
    {
        const sx = -options.skewX.value / 100;
        const sy = -options.skewY.value / 100;

        options.flipX = false;
        options.flipY = false;

        return await this.evalAffineObjects(
            parse,
            options, 
            1, 1,
            () => [[1,  sx, 0],
                   [sy, 1,  0],
                   [0,  0,  1]]);
    }



    isValid()
    {
        return super.isValid()
            && this.skewX && this.skewX.isValid()
            && this.skewY && this.skewY.isValid();
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.skewX) this.skewX.pushValueUpdates(parse);
        if (this.skewY) this.skewY.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.skewX) this.skewX.invalidateInputs(parse, from, force);
        if (this.skewY) this.skewY.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.skewX) this.skewX.iterateLoop(parse);
        if (this.skewY) this.skewY.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const skew = new GSkew(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(skew, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, skew);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            skew.input = genParse(parse);
    
        skew.skewX       = genParse(parse);
        skew.skewY       = genParse(parse);
        skew.affectSpace = genParse(parse);
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, skew);
        return skew;
    }
}