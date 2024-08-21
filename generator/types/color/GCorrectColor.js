class GCorrectColor
extends GOperator1
{
    _order  = null;
    _c1     = null;
    _c2     = null;
    _c3     = null;
    
    order   = null;
    c1      = null;
    c2      = null;
    c3      = null;

    corrections = [];



    constructor(nodeId, options)
    {
        super(CORRECT_COLOR, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this._order  = null;
        this._c1     = null;
        this._c2     = null;
        this._c3     = null;
        
        this.order   = null;
        this.c1      = null;
        this.c2      = null;
        this.c3      = null;
    
        this.corrections = [];
    }



    copy()
    {
        const copy = new GCorrectColor(this.nodeId, this.options);

        copy.copyBase(this);
        
        if (this._order) copy._order = this.order .copy();
        if (this._c1   ) copy._c1    = this._c1   .copy();
        if (this._c2   ) copy._c2    = this._c2   .copy();
        if (this._c3   ) copy._c3    = this._c3   .copy();
        
        if (this. order) copy. order = this.order .copy();
        if (this. c1   ) copy. c1    = this. c1   .copy();
        if (this. c2   ) copy. c2    = this. c2   .copy();
        if (this. c3   ) copy. c3    = this. c3   .copy();
        
        if (this.value ) copy. value = this. value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalColorValue (this. input, parse);
        let   order = await evalNumberValue(this._order, parse);
        const c1    = await evalNumberValue(this._c1,    parse);
        const c2    = await evalNumberValue(this._c2,    parse);
        const c3    = await evalNumberValue(this._c3,    parse);

        if (order) 
        {
            order       = order.toInteger();
            order.value = Math.min(Math.max(0, order.value), 5);
        }


        if (input)
        {
            if (this.options.enabled)
            {
                const rgb = input.toRgb();
                
                if (!rgbIsOk(rgb))
                    genInitNodeProgress(this.nodeId);


                const inputColor = input.toDataColor();


                const
              [ closestOrder,
                closest1,
                closest2,
                closest3 ] = await findCorrection(
                    parse,
                    this.nodeId,
                    inputColor, 
                    order, c1, c2, c3, 
                    this.order != null,
                    this.c1    != null, 
                    this.c2    != null, 
                    this.c3    != null); 

                    
                if (   /*!parse.stop()
                    &&*/ !parse.stopGenerate)
                {
                    if (   closestOrder >= 0 
                        && closestOrder <  6)
                    {
                        this._color = correctColor(
                            inputColor,
                            closestOrder,
                            closest1,
                            closest2,
                            closest3);

                            
                        this.order = new NumberValue(closestOrder);
                        this.c1    = new NumberValue(closest1);
                        this.c2    = new NumberValue(closest2);
                        this.c3    = new NumberValue(closest3);
                        

                        this.value = ColorValue.fromDataColor(this._color);

                        this.value.c1.decimals = input.c1.decimals;
                        this.value.c2.decimals = input.c2.decimals;
                        this.value.c3.decimals = input.c3.decimals;


                        this.setUpdateValues(parse,
                        [
                            ['order', new NumberValue(closestOrder, 0)],
                            ['c1',    new NumberValue(closest1,     1)],
                            ['c2',    new NumberValue(closest2,     1)],
                            ['c3',    new NumberValue(closest3,     1)],
                            ['value', this.value                      ]
                        ]);
                    }
                    else
                    {
                        this.order = NumberValue.NaN.copy();
                        this.c1    = NumberValue.NaN.copy();
                        this.c2    = NumberValue.NaN.copy();
                        this.c3    = NumberValue.NaN.copy();
                        this.value = input.copy();
        
                        this.setUpdateValues(parse,
                        [
                            ['order', this.order],
                            ['c1',    this.c1   ],
                            ['c2',    this.c2   ],
                            ['c3',    this.c3   ],
                            ['value', this.value]
                        ]);
                    }
                }
                else
                {
                    this.order = NumberValue.NaN.copy();
                    this.c1    = NumberValue.NaN.copy();
                    this.c2    = NumberValue.NaN.copy();
                    this.c3    = NumberValue.NaN.copy();
                    this.value = input.copy();
    
                    this.setUpdateValues(parse,
                    [
                        ['order', this.order],
                        ['c1',    this.c1   ],
                        ['c2',    this.c2   ],
                        ['c3',    this.c3   ],
                        ['value', this.value]
                    ]);
                }
            }
            else
            {
                this.order = NumberValue.NaN.copy();
                this.c1    = NumberValue.NaN.copy();
                this.c2    = NumberValue.NaN.copy();
                this.c3    = NumberValue.NaN.copy();
                this.value = input.copy();

                this.setUpdateValues(parse,
                [
                    ['order', this.order],
                    ['c1',    this.c1   ],
                    ['c2',    this.c2   ],
                    ['c3',    this.c3   ],
                    ['value', this.value]
                ]);
            }
        }
        else
        {
            this.order = NumberValue.NaN.copy();
            this.c1    = NumberValue.NaN.copy();
            this.c2    = NumberValue.NaN.copy();
            this.c3    = NumberValue.NaN.copy();
            this.value = ColorValue .NaN.copy();

            this.setUpdateValues(parse,
            [
                ['order', NumberValue.NaN],
                ['c1',    NumberValue.NaN],
                ['c2',    NumberValue.NaN],
                ['c3',    NumberValue.NaN],
                ['value', ColorValue .NaN]
            ]);
        }


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.order && this.order.isValid()
            && this.c1    && this.c1   .isValid()
            && this.c2    && this.c2   .isValid()
            && this.c3    && this.c3   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this._order) this._order.pushValueUpdates(parse);
        if (this._c1   ) this._c1   .pushValueUpdates(parse);
        if (this._c2   ) this._c2   .pushValueUpdates(parse);
        if (this._c3   ) this._c3   .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this._order) this._order.invalidateInputs(parse, from, force);
        if (this._c1   ) this._c1   .invalidateInputs(parse, from, force);
        if (this._c2   ) this._c2   .invalidateInputs(parse, from, force);
        if (this._c3   ) this._c3   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this._order) this._order.iterateLoop(parse);
        if (this._c1   ) this._c1   .iterateLoop(parse);
        if (this._c2   ) this._c2   .iterateLoop(parse);
        if (this._c3   ) this._c3   .iterateLoop(parse);
    }
}
