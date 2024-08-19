class GColor
extends GOperator1
{
    space   = null;
    
   _c1      = null;
   _c2      = null;
   _c3      = null;
    
    c1      = null;
    c2      = null;
    c3      = null;

    convert = null;
    
    hasInputs;



    constructor(nodeId, options)
    {
        super(COLOR, nodeId, options);
    }

    
    
    reset()
    {
        super.reset();
        
        this.space   = null;
        
        this._c1     = null;
        this._c2     = null;
        this._c3     = null;
        
        this.c1      = null;
        this.c2      = null;
        this.c3      = null;
    
        this.convert = null;
    }



    copy()
    {
        const copy = new GColor(this.nodeId, this.options);

        copy.copyBase(this);

        copy.space = this.space.copy();

        if (this._c1) copy._c1 = this._c1.copy();
        if (this._c2) copy._c2 = this._c2.copy();
        if (this._c3) copy._c3 = this._c3.copy();

        if (this. c1) copy. c1 = this. c1.copy();
        if (this. c2) copy. c2 = this. c2.copy();
        if (this. c3) copy. c3 = this. c3.copy();

        if (this.convert) 
            copy.convert = this.convert.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalColorValue (this.input, parse);
        let   space = await evalNumberValue(this.space, parse); 
        let   c1    = await evalNumberValue(this._c1,   parse);
        let   c2    = await evalNumberValue(this._c2,   parse);
        let   c3    = await evalNumberValue(this._c3,   parse);

        if (space) space = space.toInteger();

        
        if (input)
        {
            if (input.isValid())
            {
                if (this.options.enabled)
                {
                    this.value = input.copy();
                    

                    const fromSpaceIndex = input.space.value;

                    const toSpaceIndex = Math.min(Math.max(
                        0,
                        Math.round(space.value)), // round because a value can come in with decimals
                        ColorSpaces.length-1);//colorSpaceCount(parse)-1);


                    if (toSpaceIndex != fromSpaceIndex)
                    {
                        this.convertColor(
                            this.value,
                            colorSpace(fromSpaceIndex), 
                            colorSpace(  toSpaceIndex));

                        this.value.space.value = toSpaceIndex;
                    }

                    
                    if (!c1) c1 = this.value.c1;
                    if (!c2) c2 = this.value.c2;
                    if (!c3) c3 = this.value.c3;
 
                    if (c1) { this.value.c1 = c1; this.c1 = c1; }
                    if (c2) { this.value.c2 = c2; this.c2 = c2; }
                    if (c3) { this.value.c3 = c3; this.c3 = c3; }
                }
                else
                    this.value = input.copy();
            }
            else
                this.value = ColorValue.NaN.copy();

                
            if (!this.convert)
                this.convert = NumberValue.NaN.copy();
        }
        else if (space
              && c1
              && c2
              && c3)
        {
            this.value = new ColorValue(space, c1, c2, c3);


            const toSpaceIndex = Math.min(Math.max(
                0,
                Math.round(this.value.space.value)), // round because a value can come in with decimals
                ColorSpaces.length-1);//colorSpaceCount(parse)-1);

            this.value.space.value = toSpaceIndex;


            if (    this.convert
                &&  this.convert.isValid()
                &&  this.convert.value > -1
                &&  this.value.isValid()
                && !this.hasInputs)
            {
                await this.convert.eval(parse);

                this.convertColor(
                    this.value,
                    colorSpace(this.convert.value), 
                    colorSpace(toSpaceIndex));
            }
        }
        else
            this.value = ColorValue.NaN.copy();


        if (!this.value.space.isValid())
            this.value = new ColorValue(
                this.space ? this.space.toValue() : NumberValue.NaN,
                NumberValue.NaN,
                NumberValue.NaN,
                NumberValue.NaN);


        this.setUpdateValues(parse,
        [
            ['convert', this.convert    ],
            ['space',   this.value.space],
            ['c1',      this.value.c1   ],
            ['c2',      this.value.c2   ],
            ['c3',      this.value.c3   ]
        ]);


        // if (!this.c1) this.c1 = this.value.c1.copy();
        // if (!this.c2) this.c2 = this.value.c2.copy();
        // if (!this.c3) this.c3 = this.value.c3.copy();


        this.validate();

        return this;
    }



    convertColor(color, fromSpace, toSpace)
    {
        let col = [
            fromSpace, 
            getNormalColorValue(color.c1.value, fromSpace, 0),
            getNormalColorValue(color.c2.value, fromSpace, 1),
            getNormalColorValue(color.c3.value, fromSpace, 2) ];

        col = getScaledDataColor(convertDataColorToSpace(col, toSpace));

        color.c1.value = col[1];
        color.c2.value = col[2];
        color.c3.value = col[3];
    }



    toValue()
    {
        return this.options.enabled
             ? this.value.copy()
             : ColorValue.NaN.copy();
    }



    isValid()
    {
        return (!this.input || this.input.isValid())
            && this.space && this.space.isValid()
            && this.c1    && this.c1   .isValid()
            && this.c2    && this.c2   .isValid()
            && this.c3    && this.c3   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.space) this.space.pushValueUpdates(parse);
        if (this._c1  ) this._c1  .pushValueUpdates(parse);
        if (this._c2  ) this._c2  .pushValueUpdates(parse);
        if (this._c3  ) this._c3  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.space) this.space.invalidateInputs(parse, from, force);
        if (this._c1  ) this._c1  .invalidateInputs(parse, from, force);
        if (this._c2  ) this._c2  .invalidateInputs(parse, from, force);
        if (this._c3  ) this._c3  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.space) this.space.iterateLoop(parse);
        if (this._c1  ) this._c1  .iterateLoop(parse);
        if (this._c2  ) this._c2  .iterateLoop(parse);
        if (this._c3  ) this._c3  .iterateLoop(parse);
    }
}