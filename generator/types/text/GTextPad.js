class GTextPad
extends GTextType1
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


        this.updateValues =
        [
            ['value',      this.value             ],
            ['length',     new NumberValue(length)], // used to set start and end maxima
            ['startPad',   startPad               ],
            ['startCount', startCount             ],
            ['endPad',     endPad                 ],
            ['endCount',   endCount               ]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.startPad  ) this.startPad  .pushValueUpdates(parse);
        if (this.startCount) this.startCount.pushValueUpdates(parse);
        if (this.endPad    ) this.endPad    .pushValueUpdates(parse);
        if (this.endCount  ) this.endCount  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.startPad  ) this.startPad  .invalidateInputs(from);
        if (this.startCount) this.startCount.invalidateInputs(from);
        if (this.endPad    ) this.endPad    .invalidateInputs(from);
        if (this.endCount  ) this.endCount  .invalidateInputs(from);
    }
}
