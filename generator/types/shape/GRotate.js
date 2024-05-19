class GRotate
extends GAffine
{
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


        const [showCenter, affectSpace] = await this.evalBaseParams(parse);


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
                showCenter:  showCenter,
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
            ['showCenter',  showCenter       ],
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



    toValue()
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
}