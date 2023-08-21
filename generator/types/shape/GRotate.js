class GRotate
extends GAffine
{
    angle = null;



    constructor(nodeId, options)
    {
        super(ROTATE, nodeId, options);
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


        const angle = this.angle ? (await this.angle.eval(parse)).toValue() : null;

        const [showCenter, affectSpace] = await this.evalBaseParams(parse);


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = NullValue.copy();
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
            ['angle',       angle      ],
            ['showCenter',  showCenter ],
            ['affectSpace', affectSpace],
            ['bounds',      bounds     ]
        ]);


        this.validate();

        return this;
    }



    async evalObjects(parse, options)
    {
        const a = options.angle.value/360*Tau;

        return await this.evalAffineObjects(
            parse,
            options, 
            1, 
            1,
            () => createRotateTransform(a));
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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from)

        if (this.angle) this.angle.invalidateInputs(parse, from);
    }
}