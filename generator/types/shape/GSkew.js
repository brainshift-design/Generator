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
                skewX:       skewX, 
                skewY:       skewY, 
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
            ['skewX',       skewX      ],
            ['skewY',       skewY      ],
            ['showCenter',  showCenter ],
            ['affectSpace', affectSpace],
            ['bounds',      bounds     ]
        ]);


        this.validate();

        return this;
    }



    async evalObjects(parse, options)
    {
        const sx = -options.skewX.value / 100;
        const sy = -options.skewY.value / 100;

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



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);GVectorPath

        if (this.skewX) this.skewX.pushValueUpdates(parse);
        if (this.skewY) this.skewY.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.skewX) this.skewX.invalidateInputs(parse, from);
        if (this.skewY) this.skewY.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);GVectorPath

        if (this.skewX) this.skewX.iterateLoop(parse);
        if (this.skewY) this.skewY.iterateLoop(parse);
    }
}