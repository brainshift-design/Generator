class GStroke
extends GOperator1
{
    static { GNode.types[STROKE] = this; }



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


        let weight = await evalNumberValue(this.weight, parse);
        let fit    = await evalNumberValue(this.fit,    parse);
        let join   = await evalNumberValue(this.join,   parse);
        let miter  = await evalNumberValue(this.miter,  parse);
        let cap    = await evalNumberValue(this.cap,    parse);
        let dashes = await evalTextValue  (this.dashes, parse);


        if (input)
        {
            this.value        = input.toNewValue();
            this.value.nodeId = this.nodeId;

            this.value.copyCustomParams(input);

            if (fills )  this.value.fills  = fills;   else  fills  = this.value.fills;
            if (weight)  this.value.weight = weight;  else  weight = this.value.weight;
            if (fit   )  this.value.fit    = fit;     else  fit    = this.value.fit;
            if (join  )  this.value.join   = join;    else  join   = this.value.join;
            if (miter )  this.value.miter  = miter;   else  miter  = this.value.miter;
            if (cap   )  this.value.cap    = cap;     else  cap    = this.value.cap;
            if (dashes)  this.value.dashes = dashes;  else  dashes = this.value.dashes;
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



    toNewValue()
    {
        return new StrokeValue(
            this.options.enabled
            ? this.validateFills(this.fills ? this.fills.toNewValue() : this.input.fills.toNewValue())
            : new ListValue(),
            this.weight ? this.weight.toNewValue() : this.input.weight.toNewValue(),
            this.fit    ? this.fit   .toNewValue() : this.input.fit   .toNewValue(),
            this.join   ? this.join  .toNewValue() : this.input.join  .toNewValue(),
            this.miter  ? this.miter .toNewValue() : this.input.miter .toNewValue(),
            this.cap    ? this.cap   .toNewValue() : this.input.cap   .toNewValue(),
            this.dashes ? this.dashes.toNewValue() : this.input.dashes.toNewValue());
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const stroke = new GStroke(nodeId, options);
    
        stroke.hasInputs = options.hasInputs;
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(stroke, parse, ignore, nInputs);
    
    
        if (ignore)
        {
            genParseNodeEnd(parse, stroke);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        let paramIds;
    
        if (nInputs == 1)
        {
            stroke.input = genParse(parse);
            paramIds = parse.move().split(',');
        }
        else
            paramIds = ['fill', 'weight', 'fit', 'join', 'miter', 'cap', 'dashes'];
    
    
        parse.inParam = false;
    
        for (const id of paramIds)
        {
            switch (id)
            {
            case 'fill':   stroke._fills = genParse(parse); stroke.fills = stroke._fills; break;
            case 'weight': stroke.weight = genParse(parse); break;
            case 'fit':    stroke.fit    = genParse(parse); break;
            case 'join':   stroke.join   = genParse(parse); break;
            case 'miter':  stroke.miter  = genParse(parse); break;
            case 'cap':    stroke.cap    = genParse(parse); break;
            case 'dashes': stroke.dashes = genParse(parse); break;
            }
        }
        
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, stroke);
        return stroke;
    }
}