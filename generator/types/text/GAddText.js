class GAddText
extends GOperator1
{
    text;
    prefix;



    constructor(nodeId, options)
    {
        super(TEXT_ADD, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.text   = null;
        this.prefix = null;
    }



    copy()
    {
        const copy = new GAddText(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.text  ) copy.text   = this.text  .copy();
        if (this.prefix) copy.prefix = this.prefix.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);


        const input  = await evalTextValue  (this.input,  parse);
        const text   = await evalTextValue  (this.text,   parse);
        const prefix = await evalNumberValue(this.prefix, parse);


        if (input)
        {
            if (this.options.enabled)
            {
                if (isListValueType(input.type))
                {
                    this.value = new ListValue();

                    for (let i = 0; i < input.items.length; i++)
                    {
                        const item = input.items[i];

                        this.value.items.push(new TextValue(
                            prefix.value > 0
                            ? text.value + item.value
                            : item.value + text.value));
                    }
                }
                else
                {
                    this.value = new TextValue(
                        prefix.value > 0
                        ? text .value + input.value
                        : input.value + text .value);
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new TextValue();//TextValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type',   this.outputType()],
            ['text',   text             ],
            ['prefix', prefix           ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.text   && this.text  .isValid()
            && this.prefix && this.prefix.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.text  ) this.text  .pushValueUpdates(parse);
        if (this.prefix) this.prefix.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.text  ) this.text  .invalidateInputs(parse, from, force);
        if (this.prefix) this.prefix.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.text  ) this.text  .iterateLoop(parse);
        if (this.prefix) this.prefix.iterateLoop(parse);
    }
}
