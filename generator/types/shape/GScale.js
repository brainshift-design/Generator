class GScale
extends GAffine
{
    scaleX        = null;
    scaleY        = null;
    affectCorners = null;
    affectStyle   = null;



    constructor(nodeId, options)
    {
        super(SCALE, nodeId, options);
    }



    copy()
    {
        const copy = new GScale(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.scaleX       ) copy.scaleX        = this.scaleX       .copy();
        if (this.scaleY       ) copy.scaleY        = this.scaleY       .copy();
        if (this.affectCorners) copy.affectCorners = this.affectCorners.copy();
        if (this.affectStyle  ) copy.affectStyle   = this.affectStyle  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const scaleX        = this.scaleX        ? (await this.scaleX       .eval(parse)).toValue() : null;
        const scaleY        = this.scaleY        ? (await this.scaleY       .eval(parse)).toValue() : null;
        const affectCorners = this.affectCorners ? (await this.affectCorners.eval(parse)).toValue() : null;
        const affectStyle   = this.affectStyle   ? (await this.affectStyle  .eval(parse)).toValue() : null;

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
                scaleX:        scaleX, 
                scaleY:        scaleY, 
                showCenter:    showCenter,
                affectSpace:   affectSpace,
                affectCorners: affectCorners,
                affectStyle:   affectStyle
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
            ['scaleX',        scaleX       ],
            ['scaleY',        scaleY       ],
            ['showCenter',    showCenter   ],
            ['affectSpace',   affectSpace  ],
            ['affectCorners', affectCorners],
            ['affectStyle',   affectStyle  ],
            ['bounds',        bounds       ]
        ]);
        

        this.validate();

        return this;
    }



    async evalObjects(parse, options)
    {
        const sx    = options.scaleX.value / 100;
        const sy    = options.scaleY.value / 100;

        const scale = Math.min(sx, sy);

        return await this.evalAffineObjects(
            parse,
            options, 
            this.affectCorners.value > 0 ? scale : 1,
            this.affectStyle  .value > 0 ? scale : 1,
            () => [[sx, 0,  0],
                   [0,  sy, 0],
                   [0,  0,  1]]);
    }



    isValid()
    {
        return super.isValid()
            && this.scaleX        && this.scaleX       .isValid()
            && this.scaleY        && this.scaleY       .isValid()
            && this.affectCorners && this.affectCorners.isValid()
            && this.affectStyle   && this.affectStyle  .isValid();
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.scaleX       ) this.scaleX       .pushValueUpdates(parse);
        if (this.scaleY       ) this.scaleY       .pushValueUpdates(parse);
        if (this.affectCorners) this.affectCorners.pushValueUpdates(parse);
        if (this.affectStyle  ) this.affectStyle  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.scaleX       ) this.scaleX       .invalidateInputs(from);
        if (this.scaleY       ) this.scaleY       .invalidateInputs(from);
        if (this.affectCorners) this.affectCorners.invalidateInputs(from);
        if (this.affectStyle  ) this.affectStyle  .invalidateInputs(from);
    }
}