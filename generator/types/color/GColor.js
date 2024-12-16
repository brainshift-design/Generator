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
            if (   input.isValid()
                && input.type == COLOR_VALUE)
            {
                if (this.options.enabled)
                {
                    this.value        = input.copy();
                    this.value.nodeId = this.nodeId;

                    this.value.copyCustomParams(input);
                            

                    const fromSpaceIndex = input.space.value;
                    const   toSpaceIndex = Math.min(Math.max(
                        0,
                        Math.round(space.value)), // round because a value can come in with decimals
                        ColorSpaces.length-1);


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
                this.value = ColorValue.NaN();

                
            if (!this.convert)
                this.convert = NumberValue.NaN();
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
                ColorSpaces.length-1);

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
            this.value = ColorValue.NaN();


        if (this.value.space.isValid())
        {
            if (   this.value.space.value ==  2
                || this.value.space.value ==  3
                || this.value.space.value ==  9
                || this.value.space.value == 10
                || this.value.space.value == 11)
            {
                while (this.value.c1.value <   0) this.value.c1.value += 360;
                while (this.value.c1.value > 360) this.value.c1.value -= 360;

                this.c1 = this.value.c1.copy();
            }
        }
        else
        {
            this.value = new ColorValue(
                this.space ? this.space.toNewValue() : NumberValue.NaN(),
                NumberValue.NaN(),
                NumberValue.NaN(),
                NumberValue.NaN());
        }

        
        if (this.convert) this.convert.parent = this;
        if (this.space  ) this.space  .parent = this;
        if (this.c1     ) this.c1     .parent = this;
        if (this.c2     ) this.c2     .parent = this;
        if (this.c3     ) this.c3     .parent = this;


        if (this.value.isValid())
            this.setValueDecorations();


        this.setUpdateValues(parse,
        [
            ['value',   this.value      ],
            ['convert', this.convert    ],
            ['space',   this.value.space],
            ['c1',      this.value.c1   ],
            ['c2',      this.value.c2   ],
            ['c3',      this.value.c3   ]
        ]);


        this.validate();

        return this;
    }



    setValueDecorations()
    {
        const meta1 = NumberValueMeta.default();
        const meta2 = NumberValueMeta.default();
        const meta3 = NumberValueMeta.default();

        
        const space = colorSpace(this.value.space.value);


        switch (space)
        {
        case 'hex':   
        case 'rgb':
        case 'lin':
        case 'p3':
        case 'a98':
        case 'pro':
        case 'r2020':
            meta1.minDisplay = 0;
            meta2.minDisplay = 0;
            meta3.minDisplay = 0;

            meta1.maxDisplay = 255;
            meta2.maxDisplay = 255;
            meta3.maxDisplay = 255;

            break;

        case 'hsv':
        case 'hsl':
            meta1.suffix     = '°';

            meta1.minDisplay = 0;
            meta2.minDisplay = 0;
            meta3.minDisplay = 0;

            meta1.maxDisplay = 360;
            meta2.maxDisplay = 100;
            meta3.maxDisplay = 100;

            break;

        case 'hclok':
            meta1.suffix     = '°';

            meta1.minDisplay = 0;
            meta2.minDisplay = 0;
            meta3.minDisplay = 0;

            meta1.maxDisplay = 360;
            meta2.maxDisplay =  50;
            meta3.maxDisplay = 100;

            break;

        case 'hclab':
            meta1.suffix     = '°';

            meta1.minDisplay = 0;
            meta2.minDisplay = 0;
            meta3.minDisplay = 0;

            meta1.maxDisplay = 360;
            meta2.maxDisplay = 400;
            meta3.maxDisplay = 100;

            break;

        case 'hcluv':
            meta1.suffix     = '°';

            meta1.minDisplay = 0;
            meta2.minDisplay = 0;
            meta3.minDisplay = 0;

            meta1.maxDisplay = 360;
            meta2.maxDisplay = 330;
            meta3.maxDisplay = 100;

            break;

        case 'oklab':
            meta1.minDisplay =   0;
            meta2.minDisplay = -30;
            meta3.minDisplay = -30;

            meta1.maxDisplay = 100;
            meta2.maxDisplay =  30;
            meta3.maxDisplay =  30;

            break;


        case 'lab':
            meta1.minDisplay =    0;
            meta2.minDisplay = -100;
            meta3.minDisplay = -100;

            meta1.maxDisplay =  100;
            meta2.maxDisplay =  100;
            meta3.maxDisplay =  100;

            break;


        case 'luv':
            meta1.minDisplay =    0;
            meta2.minDisplay = -150;
            meta3.minDisplay = -150;

            meta1.maxDisplay =  100;
            meta2.maxDisplay =  150;
            meta3.maxDisplay =  150;

            break;

            
        case 'xyz':
        case 'xyz50':
        case 'xyz65':
            meta1.minDisplay = 0;
            meta2.minDisplay = 0;
            meta3.minDisplay = 0;

            meta1.maxDisplay = 100;
            meta2.maxDisplay = 100;
            meta3.maxDisplay = 100;

            break;
        }


        this.value.c1.meta = meta1;
        this.value.c2.meta = meta2;
        this.value.c3.meta = meta3;
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



    updateValueFromParam(paramId, value)
    {
             if (paramId == 'c1') this._c1 = value;
        else if (paramId == 'c2') this._c2 = value;
        else if (paramId == 'c3') this._c3 = value;
        else 
            super.updateValueFromParam(paramId, value);
    }



    toNewValue()
    {
        return this.options.enabled
             ? this.value.copy()
             : ColorValue.NaN();
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);


        const col = new GColor(nodeId, options);

        col.hasInputs = options.hasInputs;
        
    
        let nInputs = -1;

        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }


        if (parse.settings.logRequests) 
            logReq(col, parse, ignore, nInputs);


        if (ignore) 
        {
            genParseNodeEnd(parse, col);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }


        parse.nTab++;

        
        let paramIds;

        if (nInputs == 1)
        {
            col.input = genParse(parse);
            paramIds = parse.move().split(',');
        }
        else
            paramIds = ['space', 'convert', 'c1', 'c2', 'c3'];


        parse.inParam = false;
        
        for (const id of paramIds)
        {
            switch (id)
            {
            case 'space':   col.space        = genParse(parse);  break;
            case 'convert': col.convert      = genParse(parse);  break;
            case 'c1':      col._c1 = col.c1 = genParse(parse);  break;
            case 'c2':      col._c2 = col.c2 = genParse(parse);  break;
            case 'c3':      col._c3 = col.c3 = genParse(parse);  break;
            }
        }
        

        parse.nTab--;


        genParseNodeEnd(parse, col);
        return col;
    }
}