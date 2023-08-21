class GTextPad
extends GOperator1
{
    startPad;
    startCount;
    endPad;
    endCount;


    
    constructor(nodeId, options)
    {
        super(TEXT_PAD, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextPad(this.nodeId, this.options);

        copy.copyBase(this);

        copy.startPad   = this.startPad  .copy();
        copy.startCount = this.startCount.copy();
        copy.endPad     = this.endPad    .copy();
        copy.endCount   = this.endCount  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const startPad   = (await this.startPad  .eval(parse)).toValue();
        const startCount = (await this.startCount.eval(parse)).toValue();
        const endPad     = (await this.endPad    .eval(parse)).toValue();
        const endCount   = (await this.endCount  .eval(parse)).toValue();


        let length = 0;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            
            length = input.value.length;
            
            this.value = input.copy();
            
            consoleAssert(this.value.type == TEXT_VALUE, 'this.value.type must be TEXT_VALUE');
                
                
            if (this.options.enabled)
                this.value.value = this.value.value
                    .padStart(startCount.value, unescapeString(startPad.value))
                    .padEnd  (  endCount.value, unescapeString(  endPad.value));
        }
        else
            this.value = new TextValue();//TextValue.NaN;


        this.setUpdateValues(parse,
        [
            ['value',      this.value             ],
            ['length',     new NumberValue(length)], // used to set start and end maxima
            ['startPad',   startPad               ],
            ['startCount', startCount             ],
            ['endPad',     endPad                 ],
            ['endCount',   endCount               ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.startPad   && this.startPad  .isValid()
            && this.startCount && this.startCount.isValid()
            && this.endPad     && this.endPad    .isValid()
            && this.endCount   && this.endCount  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.startPad  ) this.startPad  .pushValueUpdates(parse);
        if (this.startCount) this.startCount.pushValueUpdates(parse);
        if (this.endPad    ) this.endPad    .pushValueUpdates(parse);
        if (this.endCount  ) this.endCount  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.startPad  ) this.startPad  .invalidateInputs(parse, from);
        if (this.startCount) this.startCount.invalidateInputs(parse, from);
        if (this.endPad    ) this.endPad    .invalidateInputs(parse, from);
        if (this.endCount  ) this.endCount  .invalidateInputs(parse, from);
    }
}
