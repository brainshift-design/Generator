class GStrokeSides
extends GOperator1
{
    top    = null;
    left   = null;
    right  = null;
    bottom = null;
    
    

    constructor(nodeId, options)
    {
        super(STROKE_SIDES, nodeId, options);
    }

    
    
    reset()
    {
        super.reset();
        
        this.top    = null;
        this.left   = null;
        this.right  = null;
        this.bottom = null;
    }



    copy()
    {
        const copy = new GStrokeSides(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.top   ) copy.top    = this.top   .copy();
        if (this.left  ) copy.left   = this.left  .copy();
        if (this.right ) copy.right  = this.right .copy();
        if (this.bottom) copy.bottom = this.bottom.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input  = await evalStrokeSidesValue(this.input,  parse);
        const top    = await evalNumberValue     (this.top,    parse);
        const left   = await evalNumberValue     (this.left,   parse);
        const right  = await evalNumberValue     (this.right,  parse);
        const bottom = await evalNumberValue     (this.bottom, parse);


        if (input)
        {
            this.value = new StrokeSidesValue(
                top    ?? input.top,
                left   ?? input.left,
                right  ?? input.right,
                bottom ?? input.bottom,
                this.options.enabled);
        }
        else
        {
            this.value = new StrokeSidesValue(
                top, 
                left, 
                right, 
                bottom,
                this.options.enabled);
        }


        this.setUpdateValues(parse,
        [
            ['top',    this.value.top   ],
            ['left',   this.value.left  ],
            ['right',  this.value.right ],
            ['bottom', this.value.bottom]
        ]);
        

        if (!this.top   ) this.top    = this.value.top   .copy();
        if (!this.left  ) this.left   = this.value.left  .copy();
        if (!this.right ) this.right  = this.value.right .copy();
        if (!this.bottom) this.bottom = this.value.bottom.copy();


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return super.isValid()
            && this.top    && this.top   .isValid()
            && this.left   && this.left  .isValid()
            && this.right  && this.right .isValid()
            && this.bottom && this.bottom.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.top   ) this.top   .pushValueUpdates(parse);
        if (this.left  ) this.left  .pushValueUpdates(parse);
        if (this.right ) this.right .pushValueUpdates(parse);
        if (this.bottom) this.bottom.pushValueUpdates(parse);
    }
    
    
    
   invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.top   ) this.top   .invalidateInputs(parse, from, force);
        if (this.left  ) this.left  .invalidateInputs(parse, from, force);
        if (this.right ) this.right .invalidateInputs(parse, from, force);
        if (this.bottom) this.bottom.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.top   ) this.top   .iterateLoop(parse);
        if (this.left  ) this.left  .iterateLoop(parse);
        if (this.right ) this.right .iterateLoop(parse);
        if (this.bottom) this.bottom.iterateLoop(parse);
    }
}