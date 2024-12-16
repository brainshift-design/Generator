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


        let   input = await evalColorValue (this. input, parse);
        let   order = await evalNumberValue(this._order, parse);
        let   c1    = await evalNumberValue(this._c1,    parse);
        let   c2    = await evalNumberValue(this._c2,    parse);
        let   c3    = await evalNumberValue(this._c3,    parse);


        if (order) 
        {
            order       = order.toInteger();
            order.value = Math.min(Math.max(0, order.value), 5);
        }


        if (order && !order.isValid()) order = null;
        if (c1    && !c1   .isValid()) c1    = null;
        if (c2    && !c2   .isValid()) c2    = null;
        if (c3    && !c3   .isValid()) c3    = null;


        if (input)
        {
                 if (input.type == FILL_VALUE      ) input = input.color;
            else if (input.type == COLOR_STOP_VALUE) input = input.fill.color;
            else if (input.type == GRADIENT_VALUE  ) input = ColorValue.fromRgb(input.toRgba());


            if (this.options.enabled)
            {
                const inputColor = input.toDataColor();

                if (!dataColorIsOk(inputColor))
                    genInitNodeProgress(this.nodeId);


                const
              [ closestOrder,
                closest1,
                closest2,
                closest3 ] = await findCorrection(
                    parse,
                    this.nodeId,
                    inputColor, 
                    order, c1, c2, c3, 
                    order != null,
                    c1    != null, 
                    c2    != null, 
                    c3    != null); 

                   
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
                        this.order = NumberValue.NaN();
                        this.c1    = NumberValue.NaN();
                        this.c2    = NumberValue.NaN();
                        this.c3    = NumberValue.NaN();
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
                    this.order = NumberValue.NaN();
                    this.c1    = NumberValue.NaN();
                    this.c2    = NumberValue.NaN();
                    this.c3    = NumberValue.NaN();
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
                this.order = NumberValue.NaN();
                this.c1    = NumberValue.NaN();
                this.c2    = NumberValue.NaN();
                this.c3    = NumberValue.NaN();
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
            this.order = NumberValue.NaN();
            this.c1    = NumberValue.NaN();
            this.c2    = NumberValue.NaN();
            this.c3    = NumberValue.NaN();
            this.value = ColorValue .NaN();

            this.setUpdateValues(parse,
            [
                ['order', NumberValue.NaN()],
                ['c1',    NumberValue.NaN()],
                ['c2',    NumberValue.NaN()],
                ['c3',    NumberValue.NaN()],
                ['value', ColorValue .NaN()]
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const corr = new GCorrectColor(nodeId, options);
    
        corr.hasInputs = options.hasInputs;
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(corr, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, corr);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        let paramIds;
    
        if (nInputs == 1)
            corr.input = genParse(parse);
    
    
        paramIds = parse.move().split(',');
    
        parse.inParam = false;
        
        for (const id of paramIds)
        {
            switch (id)
            {
            case 'order':  corr._order = corr.order = genParse(parse);  break;
            case 'c1':     corr._c1    = corr.c1    = genParse(parse);  break;
            case 'c2':     corr._c2    = corr.c2    = genParse(parse);  break;
            case 'c3':     corr._c3    = corr.c3    = genParse(parse);  break;
            case 'value':  corr.value               = genParse(parse);  break;
            }
        }
                    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, corr);
        return corr;
    }
}
