class GSkew
extends GAffine
{
    skewX = null;
    skewY = null;



    constructor(nodeId, options)
    {
        super(SKEW, nodeId, options);
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

            
        const skewX = this.skewX ? (await this.skewX.eval(parse)).toValue() : null;
        const skewY = this.skewY ? (await this.skewY.eval(parse)).toValue() : null;

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
                skewX:       skewX, 
                skewY:       skewY, 
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
            ['skewX',       skewX      ],
            ['skewY',       skewY      ],
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
        const sx = -options.skewX.toNumber() / 100;
        const sy = -options.skewY.toNumber() / 100;

        return await this.evalAffineObjects(parse, options,
            () => [[1,  sx, 0],
                   [sy, 1,  0],
                   [0,  0,  1]]);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);GVectorPath

        if (this.skewX) this.skewX.pushValueUpdates(parse);
        if (this.skewY) this.skewY.pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.skewX.isValid()
            && this.skewY.isValid();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.skewX) this.skewX.invalidateInputs(from);
        if (this.skewY) this.skewY.invalidateInputs(from);
    }



    toValue()
    {
        return this.value.copy();
    }
}