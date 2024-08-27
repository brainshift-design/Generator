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
    

    
    reset()
    {
        super.reset();
        
        this. fills  = null;
        this._fills  = null; // actual fills that might need to be converted to a list, in case it's a color or a fill
        this. weight = null;
        this. fit    = null;
        this. join   = null;
        this. miter  = null;
        this. cap    = null;
        this. dashes = null;
    }



    copy()
    {
        const copy = new GStroke(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.fills ) copy. fills  = this.fills .copy();
        if (this._fills) copy._fills  = this._fills.copy();
        if (this.weight) copy. weight = this.weight.copy();
        if (this.fit   ) copy. fit    = this.fit   .copy();
        if (this.join  ) copy. join   = this.join  .copy();
        if (this.miter ) copy. miter  = this.miter .copy();
        if (this.cap   ) copy. cap    = this.cap   .copy();
        if (this.dashes) copy. dashes = this.dashes.copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'fills ':  return this.input ? this.value.fills  : this.fills;
            case 'weight':  return this.input ? this.value.weight : this.weight;
            case 'fit':     return this.input ? this.value.fit    : this.fit;
            case 'join':    return this.input ? this.value.join   : this.join;
            case 'miter':   return this.input ? this.value.miter  : this.miter;
            case 'cap':     return this.input ? this.value.cap    : this.cap;
            case 'dashes':  return this.input ? this.value.dashes : this.dashes;
        }

        return null;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        const input = await evalStrokeValue(this. input, parse);
        let   fills = await evalListValue  (this._fills, parse);

        fills = this.validateFills(fills);

        if (    this._fills
            && !isListValueType(this._fills.type))
            this.fills = fills;


        const weight = await evalNumberValue(this.weight, parse);
        const fit    = await evalNumberValue(this.fit,    parse);
        const join   = await evalNumberValue(this.join,   parse);
        const miter  = await evalNumberValue(this.miter,  parse);
        const cap    = await evalNumberValue(this.cap,    parse);
        const dashes = await evalTextValue  (this.dashes, parse);


        if (input)
        {
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

            for (let i = 0; i < fills.items.length; i++)
            {
                if (fills.items[i].type == COLOR_VALUE)
                    fills.items[i] = new FillValue(fills.items[i]);
            }

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
    
    

    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this._fills) this._fills.invalidateInputs(parse, from, force);
        if (this.weight) this.weight.invalidateInputs(parse, from, force);
        if (this.fit   ) this.fit   .invalidateInputs(parse, from, force);
        if (this.join  ) this.join  .invalidateInputs(parse, from, force);
        if (this.miter ) this.miter .invalidateInputs(parse, from, force);
        if (this.cap   ) this.cap   .invalidateInputs(parse, from, force);
        if (this.dashes) this.dashes.invalidateInputs(parse, from, force);
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