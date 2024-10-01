class GToJson
extends GOperator1
{
    quoteValues;



    constructor(nodeId, options)
    {
        super(TO_JSON, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.quoteValues = null;
    }



    copy()
    {
        const copy = new GToJson(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.quoteValues) copy.quoteValues = this.quoteValues.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input       = await evalValue      (this.input,       parse);
        const quoteValues = await evalNumberValue(this.quoteValues, parse);


        if (input)
        {
            let json = '';
            
            json += input.toJsonText(
            {
                tab:         0,
                named:       false,
                quoteValues: quoteValues.value > 0
            });

            this.value = new TextValue(json);
        }
        else
            this.value = new TextValue('{}');


        this.setUpdateValues(parse,
        [
            ['type',        this.outputType()],
            ['quoteValues', quoteValues      ]
        ]);


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
        return this.quoteValues && this.quoteValues.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.quoteValues) this.quoteValues.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.quoteValues) this.quoteValues.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.quoteValues) this.quoteValues.iterateLoop(parse);
    }
}
