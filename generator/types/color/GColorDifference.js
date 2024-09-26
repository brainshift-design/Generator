class GColorDifference
extends GOperator2
{
    deltaE = null;
    space  = null;
    param1 = null;
    param2 = null;
    param3 = null;



    constructor(nodeId, options)
    {
        super(COLOR_DIFFERENCE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.deltaE = null;
        this.space  = null;
        this.param1 = null;
        this.param2 = null;
        this.param3 = null;
    }



    copy()
    {
        const copy = new GColorDifference(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.deltaE) copy.deltaE = this.deltaE.copy();
        if (this.space ) copy.space  = this.space .copy();
        if (this.param1) copy.param1 = this.param1.copy();
        if (this.param2) copy.param2 = this.param2.copy();
        if (this.param3) copy.param3 = this.param3.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = await evalColorValue(this.input0, parse);
        const input1 = await evalColorValue(this.input1, parse);
        const deltaE = await evalColorValue(this.deltaE, parse);
        const space  = await evalColorValue(this.space , parse);
        const param1 = await evalColorValue(this.param1, parse);
        const param2 = await evalColorValue(this.param2, parse);
        const param3 = await evalColorValue(this.param3, parse);

        
        if (   input0 && input0.type == COLOR_VALUE 
            && input1 && input1.type == COLOR_VALUE)
        {
            if (   input0.isValid()
                && input1.isValid())
            {
                let _rgb2lab, dE;
                
                switch (space.value)
                {
                    case 0: _rgb2lab = rgb2oklab; break;
                    case 1: _rgb2lab = rgb2lab;   break;
                }

                switch (deltaE.value)
                {
                    case 0: 
                        dE = deltaE76(
                            input0.toRgb(), 
                            input1.toRgb(),
                            _rgb2lab);

                        break;
                        
                    case 1: 
                        dE = deltaE94(
                            input0.toRgb(), 
                            input1.toRgb(),
                            param1.value/100,
                            param2.value/100,
                            param3.value/100,
                            _rgb2lab);

                        break;

                    case 2: 
                        dE = deltaE00(
                            input0.toRgb(), 
                            input1.toRgb(),
                            param1.value/100,
                            param2.value/100,
                            param3.value/100,
                            _rgb2lab);

                        break;

                    case 3: 
                        dE = deltaECMC(
                            input0.toRgb(), 
                            input1.toRgb(),
                            param1.value/100,
                            param2.value/100,
                            _rgb2lab);

                        break;

                    case 4: 
                        dE = deltaEITU(
                            input0.toRgb(), 
                            input1.toRgb());

                        break;
                }

                this.value = new NumberValue(dE * 100, 1);
            }
            else
                this.value = NumberValue.NaN();
        }
        else
            this.value = NumberValue.NaN();
        

        this.setUpdateValues(parse,
        [
            ['type',   this.outputType()],
            ['value',  this.value       ],
            ['deltaE', deltaE           ],
            ['space',  space            ],
            ['param1', param1           ],
            ['param2', param2           ],
            ['param3', param3           ]
        ],
        true);


        this.validate();


        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.deltaE && this.deltaE.isValid()
            && this.space  && this.space .isValid()
            && this.param1 && this.param1.isValid()
            && this.param2 && this.param2.isValid()
            && this.param3 && this.param3.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.deltaE) this.deltaE.pushValueUpdates(parse);
        if (this.space ) this.space .pushValueUpdates(parse);
        if (this.param1) this.param1.pushValueUpdates(parse);
        if (this.param2) this.param2.pushValueUpdates(parse);
        if (this.param3) this.param3.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.deltaE) this.deltaE.invalidateInputs(parse, from, force);
        if (this.space ) this.space .invalidateInputs(parse, from, force);
        if (this.param1) this.param1.invalidateInputs(parse, from, force);
        if (this.param2) this.param2.invalidateInputs(parse, from, force);
        if (this.param3) this.param3.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.deltaE) this.deltaE.iterateLoop(parse);
        if (this.space ) this.space .iterateLoop(parse);
        if (this.param1) this.param1.iterateLoop(parse);
        if (this.param2) this.param2.iterateLoop(parse);
        if (this.param3) this.param3.iterateLoop(parse);
    }
}
