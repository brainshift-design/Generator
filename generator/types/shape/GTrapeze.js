class GTrapeze
extends GShape
{
    round = null;
    bias  = null;



    constructor(nodeId, options)
    {
        super(TRAPEZE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.round = null;
        this.bias  = null;
    }



    copy()
    {
        const copy = new GTrapeze(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.round) copy.round = this.round.copy();
        if (this.bias ) copy.bias  = this.bias .copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'x':      return this.input ? this.value.x      : this.x;
            case 'y':      return this.input ? this.value.y      : this.y;
            case 'width':  return this.input ? this.value.width  : this.width;
            case 'height': return this.input ? this.value.height : this.height;
            case 'round':  return this.input ? this.value.round  : this.round;
            case 'bias':   return this.input ? this.value.bias   : this.bias;
        }

        return null;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;
        let   round = this.round ? (await this.round.eval(parse)).toValue() : null;
        let   bias  = this.bias  ? (await this.bias .eval(parse)).toValue() : null;
        
        let [x, y, width, height] = await this.evalBaseParams(parse);


        if (input)
        {
            this.value        = input.toValue();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);

            if (x     )  this.value.x      = x;       else  x      = this.value.x;      
            if (y     )  this.value.y      = y;       else  y      = this.value.y;      
            if (width )  this.value.width  = width;   else  width  = this.value.width;  
            if (height)  this.value.height = height;  else  height = this.value.height; 
            if (round )  this.value.round  = round;   else  round  = this.value.round;  
            if (bias  )  this.value.bias   = bias;    else  bias   = this.value.bias;  
        }
        else
        {
            this.value = new TrapezeValue(
                this.nodeId, 
                x, 
                y, 
                width, 
                height, 
                round,
                bias);
        }

       
        this.setUpdateValues(parse, 
        [
            ['x',      x     ],
            ['y',      y     ],
            ['width',  width ],
            ['height', height],
            ['round',  round ],
            ['bias',   bias  ]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.x     ) this.x      = this.value.x     .copy();
        if (!this.y     ) this.y      = this.value.y     .copy();
        if (!this.width ) this.width  = this.value.width .copy();
        if (!this.height) this.height = this.value.height.copy();
        if (!this.round ) this.round  = this.value.round .copy();
        if (!this.bias  ) this.bias   = this.value.bias  .copy();


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
     
        
        this.value.objects = [];


        if (   super.baseIsValid()   
            && this.value.x     .isValid()    
            && this.value.y     .isValid()    
            && this.value.width .isValid()
            && this.value.height.isValid()
            && this.value.round .isValid()
            && this.value.bias  .isValid())
        {
            let   x = this.value.x     .value;
            let   y = this.value.y     .value;
            let   w = this.value.width .value;
            let   h = this.value.height.value;
            const r = Math.max(0, this.value.round.value);
            let   b = this.value.bias  .value;


            [x, y, w, h, , ] = validateObjectRect(x, y, w, h);


            if (   w != 0 
                && h != 0)
            {
                const trapeze = new FigmaTrapeze(
                    this.nodeId, 
                    this.nodeId, 
                    this.nodeName, 
                    x, y, w, h, r, b);

                trapeze.createDefaultTransform(x, y);
                trapeze.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(trapeze);
            }
        }


        await super.evalObjects(parse);
    }



    toValue()
    {
        const trap = new TrapezeValue(
            this.nodeId,
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue(),
            this.height.toValue(),
            this.round .toValue(),
            this.bias  .toValue());

        trap.copyCustomParams(this.value);

        trap.props   = this.props.toValue();
        trap.objects = this.value.objects.map(o => o.copy());

        return trap;
    }



    isValid()
    {
        return super.isValid()
            && this.round && this.round.isValid()
            && this.bias  && this.bias .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.round) this.round.pushValueUpdates(parse);
        if (this.bias ) this.bias .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.round) this.round.invalidateInputs(parse, from, force);
        if (this.bias ) this.bias .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.round) this.round.iterateLoop(parse);
        if (this.bias ) this.bias .iterateLoop(parse);
    }
}