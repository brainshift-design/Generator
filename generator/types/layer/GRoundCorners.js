class GRoundCorners
extends GOperator1
{
    tl = null;
    tr = null;
    bl = null;
    br = null;
    
    

    constructor(nodeId, options)
    {
        super(ROUND_CORNERS, nodeId, options);
    }

    
    
    reset()
    {
        super.reset();
        
        this.tl = null;
        this.tr = null;
        this.bl = null;
        this.br = null;
    }



    copy()
    {
        const copy = new GRoundCorners(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.tl) copy.tl = this.tl.copy();
        if (this.tr) copy.tr = this.tr.copy();
        if (this.bl) copy.bl = this.bl.copy();
        if (this.br) copy.br = this.br.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalRoundedCornersValue(this.input, parse);
        const tl    = await evalNumberValue        (this.tl,    parse);
        const tr    = await evalNumberValue        (this.tr,    parse);
        const bl    = await evalNumberValue        (this.bl,    parse);
        const br    = await evalNumberValue        (this.br,    parse);


        if (input)
        {
            this.value = new RoundCornersValue(
                tl ?? input.tl,
                tr ?? input.tr,
                bl ?? input.bl,
                br ?? input.br,
                this.options.enabled);
        }
        else
        {
            this.value = new RoundCornersValue(
                tl, 
                tr, 
                bl, 
                br,
                this.options.enabled);
        }


        this.setUpdateValues(parse,
        [
            ['tl', this.value.tl],
            ['tr', this.value.tr],
            ['bl', this.value.bl],
            ['br', this.value.br]
        ]);
        

        if (!this.tl) this.tl = this.value.tl.copy();
        if (!this.tr) this.tr = this.value.tr.copy();
        if (!this.bl) this.bl = this.value.bl.copy();
        if (!this.br) this.br = this.value.br.copy();


        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return super.isValid()
            && this.tl && this.tl.isValid()
            && this.tr && this.tr.isValid()
            && this.bl && this.bl.isValid()
            && this.br && this.br.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.tl) this.tl.pushValueUpdates(parse);
        if (this.tr) this.tr.pushValueUpdates(parse);
        if (this.bl) this.bl.pushValueUpdates(parse);
        if (this.br) this.br.pushValueUpdates(parse);
    }
    
    
    
   invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.tl) this.tl.invalidateInputs(parse, from, force);
        if (this.tr) this.tr.invalidateInputs(parse, from, force);
        if (this.bl) this.bl.invalidateInputs(parse, from, force);
        if (this.br) this.br.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.tl) this.tl.iterateLoop(parse);
        if (this.tr) this.tr.iterateLoop(parse);
        if (this.bl) this.bl.iterateLoop(parse);
        if (this.br) this.br.iterateLoop(parse);
    }
}