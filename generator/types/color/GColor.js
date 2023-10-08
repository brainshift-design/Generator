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


        const space = this.space ? (await this.space.eval(parse)).toValue().toInteger() : null; 
        let   c1    = this._c1   ? (await this._c1  .eval(parse)).toValue()             : null;
        let   c2    = this._c2   ? (await this._c2  .eval(parse)).toValue()             : null;
        let   c3    = this._c3   ? (await this._c3  .eval(parse)).toValue()             : null;

        
        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            
            if (   input.isValid())
                // && this.input.type != START)
            {
                if (this.options.enabled)
                {
                    this.value = input.copy();
                    

                    const fromSpaceIndex = input.space.value;

                    const toSpaceIndex = Math.min(Math.max(
                        0,
                        Math.round(space.value)), // round because a value can come in with decimals (TODO fix this)
                        colorSpaceCount(parse)-1);


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
                    this.value = input;
            }
            else
                this.value = ColorValue.NaN.copy();

                
            if (!this.convert)
                this.convert = NumberValue.NaN.copy();
        }
        else
        {
            this.value = new ColorValue(space, c1, c2, c3);


            const toSpaceIndex = Math.min(Math.max(
                0,
                Math.round(this.value.space.value)), // round because a value can come in with decimals (TODO fix this)
                colorSpaceCount(parse)-1);

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


        if (!this.value.space.isValid())
            this.value = new ColorValue(
                this.space.toValue(),
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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.space) this.space.invalidateInputs(parse, from);
        if (this._c1  ) this._c1  .invalidateInputs(parse, from);
        if (this._c2  ) this._c2  .invalidateInputs(parse, from);
        if (this._c3  ) this._c3  .invalidateInputs(parse, from);
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