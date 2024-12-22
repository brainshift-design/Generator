class GRotate
extends GAffine
{
    static { GNode.types[ROTATE] = this; }



    angle = null;



    constructor(nodeId, options)
    {
        super(ROTATE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.angle = null;
    }



    copy()
    {
        const copy = new GRotate(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.angle) copy.angle = this.angle.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalValue      (this.input, parse);
        const angle = await evalNumberValue(this.angle, parse);


        const [affectSpace] = await this.evalBaseParams(parse);


        if (input)
        {
            this.value = input.copy();
            
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
                angle:       angle, 
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
            ['angle',       angle            ],
            ['affectSpace', affectSpace      ],
            ['bounds',      bounds           ]
        ]);


        this.validate();

        return this;
    }



    async evalObjects(parse, options)
    {
        const a     = options.angle ? options.angle.value/360*Tau : 0;
        const xform = createRotateTransform(a);

        options.flipX = false;
        options.flipY = false;

        return await this.evalAffineObjects(
            parse,
            options, 
            1, 
            1,
            () => xform);
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
            && this.angle && this.angle.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.angle) this.angle.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.angle) this.angle.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.angle) this.angle.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const rotate = new GRotate(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(rotate, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, rotate);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            rotate.input = genParse(parse);
    
        rotate.angle       = genParse(parse);
        rotate.affectSpace = genParse(parse);
    
        
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, rotate);
        return rotate;
    }
}