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

        const [centerX, centerY, showCenter, affectSpace] = await this.evalBaseParams(parse);


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = NullValue;
        }

       
        const _bounds = await this.evalObjects(
            parse, 
            {
                angle:       angle, 
                centerX:     centerX, 
                centerY:     centerY,
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


        this.updateValues =
        [
            ['value',       this.value ],
            ['angle',       angle      ],
            ['centerX',     centerX    ],
            ['centerY',     centerY    ],
            ['showCenter',  showCenter ],
            ['affectSpace', affectSpace],
            ['bounds',      bounds     ]
        ];


        this.validate();

        return this;
    }



    async evalObjects(parse, options)
    {
        const a = options.angle.toNumber()/360*Tau;

        return await this.evalAffineObjects(options, 1,
            () => createRotateTransform(a));
    }



    isValid()
    {
        return super.isValid()
            && this.angle.isValid();
    }



    toValue()
    {
        return this.value.copy();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.angle) this.angle.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from)

        if (this.angle) this.angle.invalidateInputs(from);
    }
}