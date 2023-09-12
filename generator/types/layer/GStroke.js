class GStroke
extends GOperator1
{
    fills  = null;
   _fills  = null; // actual fills that might need to be converted to a list, in case it's a color or a fill
    weight = null;
    fit    = null;
    join   = null;
    miter  = null;
    cap    = null;
    dashes = null;



    constructor(nodeId, options)
    {
        super(STROKE, nodeId, options);
    }



    copy()
    {
        const copy = new GStroke(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.fills ) copy.fills  = this.fills .copy();
        if (this.weight) copy.weight = this.weight.copy();
        if (this.fit   ) copy.fit    = this.fit   .copy();
        if (this.join  ) copy.join   = this.join  .copy();
        if (this.miter ) copy.miter  = this.miter .copy();
        if (this.cap   ) copy.cap    = this.cap   .copy();
        if (this.dashes) copy.dashes = this.dashes.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        let fills = this._fills ? (await this._fills.eval(parse)).toValue() : null;

        fills = this.validateFills(fills);

        if (!LIST_VALUES.includes(this.fills.type))
            this.fills = fills;


        const weight = this.weight ? (await this.weight.eval(parse)).toValue() : null;
        const fit    = this.fit    ? (await this.fit   .eval(parse)).toValue() : null;
        const join   = this.join   ? (await this.join  .eval(parse)).toValue() : null;
        const miter  = this.miter  ? (await this.miter .eval(parse)).toValue() : null;
        const cap    = this.cap    ? (await this.cap   .eval(parse)).toValue() : null;
        const dashes = this.dashes ? (await this.dashes.eval(parse)).toValue() : null;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = new StrokeValue(
                fills  ?? input.fills,
                weight ?? input.weight,
                fit    ?? input.fit,
                join   ?? input.join,
                miter  ?? input.miter,
                cap    ?? input.cap,
                dashes ?? input.dashes);
        }
        else
        {
            this.value = new StrokeValue(
                fills, 
                weight, 
                fit, 
                join,
                miter,
                cap,
                dashes);
        }


        if (!this.fills ) this.fills  = this.value.fills .copy();
        if (!this.weight) this.weight = this.value.weight.copy();
        if (!this.fit   ) this.fit    = this.value.fit   .copy();
        if (!this.join  ) this.join   = this.value.join  .copy();
        if (!this.miter ) this.miter  = this.value.miter .copy();
        if (!this.cap   ) this.cap    = this.value.cap   .copy();
        if (!this.dashes) this.dashes = this.value.dashes.copy();


        // if (this.nodeId == 'stroke')
        //     console.log('this.value =', this.value);


        this.setUpdateValues(parse,
        [
            ['value',  this.value],
            ['fills',  fills     ],
            ['weight', weight    ],
            ['fit',    fit       ],
            ['join',   join      ],
            ['miter',  miter     ],
            ['cap',    cap       ],
            ['dashes', dashes    ]
        ]);


        this.validate();

        return this;
    }



    validateFills(fills)
    {
        if (!fills)
            return null;

            
        if (fills.type == COLOR_VALUE)
            return new ListValue([FillValue.fromRgb(scaleRgb(fills.toRgb()), 100)]);

        else if (fills.type ==     FILL_VALUE
              || fills.type == GRADIENT_VALUE)
            return new ListValue([fills]);
        else
        {
            consoleAssert(fills.type == LIST_VALUE, 'stroke.fills must be a LIST_VALUE');
            return fills;
        }
    }



    toValue()
    {
        return new StrokeValue(
            this.options.enabled
            ? this.validateFills(this.fills ? this.fills.toValue() : this.input.fills.toValue())
            : new ListValue(),
            this.weight ? this.weight.toValue() : this.input.weight.toValue(),
            this.fit    ? this.fit   .toValue() : this.input.fit   .toValue(),
            this.join   ? this.join  .toValue() : this.input.join  .toValue(),
            this.miter  ? this.miter .toValue() : this.input.miter .toValue(),
            this.cap    ? this.cap   .toValue() : this.input.cap   .toValue(),
            this.dashes ? this.dashes.toValue() : this.input.dashes.toValue());
    }                 



    isValid()
    {
        return (!this.input || this.input.isValid())
            && this.fills  && this.fills .isValid()
            && this.weight && this.weight.isValid()
            && this.fit    && this.fit   .isValid()
            && this.join   && this.join  .isValid()
            && this.miter  && this.miter .isValid()
            && this.cap    && this.cap   .isValid()
            && this.dashes && this.dashes.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this._fills) this._fills.pushValueUpdates(parse);
        if (this.weight) this.weight.pushValueUpdates(parse);
        if (this.fit   ) this.fit   .pushValueUpdates(parse);
        if (this.join  ) this.join  .pushValueUpdates(parse);
        if (this.miter ) this.miter .pushValueUpdates(parse);
        if (this.cap   ) this.cap   .pushValueUpdates(parse);
        if (this.dashes) this.dashes.pushValueUpdates(parse);
    }    
    
    

    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this._fills) this._fills.invalidateInputs(parse, from);
        if (this.weight) this.weight.invalidateInputs(parse, from);
        if (this.fit   ) this.fit   .invalidateInputs(parse, from);
        if (this.join  ) this.join  .invalidateInputs(parse, from);
        if (this.miter ) this.miter .invalidateInputs(parse, from);
        if (this.cap   ) this.cap   .invalidateInputs(parse, from);
        if (this.dashes) this.dashes.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this._fills) this._fills.iterateLoop(parse);
        if (this.weight) this.weight.iterateLoop(parse);
        if (this.fit   ) this.fit   .iterateLoop(parse);
        if (this.join  ) this.join  .iterateLoop(parse);
        if (this.miter ) this.miter .iterateLoop(parse);
        if (this.cap   ) this.cap   .iterateLoop(parse);
        if (this.dashes) this.dashes.iterateLoop(parse);
    }    
}