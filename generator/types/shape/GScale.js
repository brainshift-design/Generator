class GScale
extends GAffine
{
    scaleX = null;
    scaleY = null;



    constructor(nodeId, options)
    {
        super(SCALE, nodeId, options);
    }



    copy()
    {
        const copy = new GScale(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.scaleX) copy.scaleX = this.scaleX.copy();
        if (this.scaleY) copy.scaleY = this.scaleY.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const scaleX = this.scaleX ? (await this.scaleX.eval(parse)).toValue() : null;
        const scaleY = this.scaleY ? (await this.scaleY.eval(parse)).toValue() : null;

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
                scaleX:      scaleX, 
                scaleY:      scaleY, 
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
            ['scaleX',      scaleX     ],
            ['scaleY',      scaleY     ],
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
        const sx    = options.scaleX.toNumber() / 100;
        const sy    = options.scaleY.toNumber() / 100;

        const scale = Math.min(sx, sy);


        return await this.evalAffineObjects(options, scale,
            () => [[sx, 0,  0],
                   [0,  sy, 0],
                   [0,  0,  1]]);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.scaleX) this.scaleX.pushValueUpdates(parse);
        if (this.scaleY) this.scaleY.pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.scaleX.isValid()
            && this.scaleY.isValid();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.scaleX) this.scaleX.invalidateInputs(from);
        if (this.scaleY) this.scaleY.invalidateInputs(from);
    }



    toValue()
    {
        return this.value.copy();
    }
}