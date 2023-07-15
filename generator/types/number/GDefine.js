class GDefine
extends GOperator
{
    values;


    loopId = NULL;



    constructor(nodeId, options)
    {
        super(NUMBER_DEFINE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GDefine(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.values) copy.values = this.values.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const values = (await this.values.eval(parse)).toValue();
    

        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : this.iteration;

        
        const  list   = values.value.split(',').map(s => s.trim());
        const _values = [];

        for (const item of list)
        {
            if (item.indexOf('-') > 0)
            {
                const limits = item.split('-').map(s => s.trim());

                const start  = NumberValue.fromString(limits[0]);
                const end    = NumberValue.fromString(limits[1]);

                const maxDec = Math.max(start.decimals, end.decimals);
                const d      = getDecimalFactor(maxDec);

                for (let i = start.value; i <= end.value; i += d)
                    _values.push(new NumberValue(i, maxDec));
            }
            else
                _values.push(NumberValue.fromString(item));
        }


        this.value = _values[iteration % _values.length];


        this.updateValues = [['values', values]];
        

        this.validate();

        return this;
    }



    pushUpdateValues(parse)
    {
        super.pushUpdateValues(parse);

        if (this.values) this.values.pushUpdateValues(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.values) this.values.invalidateInputs(from);
    }
}
