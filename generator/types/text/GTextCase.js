class GTextCase
extends GTextType1
{
    case;


    
    constructor(nodeId, options)
    {
        super(TEXT_CASE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextCase(this.nodeId, this.options);

        copy.copyBase(this);

        copy.case = this.case.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const _case = (await this.case.eval(parse)).toValue();


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();
            
            consoleAssert(this.value.type == TEXT_VALUE, 'this.value.type must be TEXT_VALUE');
                
                
            if (this.options.enabled)
            {
                const val = this.value.value;

                if (_case.value == 0) 
                     this.value.value = val.toLowerCase();

                else if (_case.value == 1)
                {
                    this.value.value = '';

                    if (val.length > 0) this.value.value += val.substring(0, 1).toUpperCase();
                    if (val.length > 1) this.value.value += val.substring(1)   .toLowerCase();
                }

                else if (_case.value == 2) 
                    this.value.value = val.toUpperCase();
            }
        }
        else
            this.value = new TextValue();//TextValue.NaN;


        this.updateValues =
        [
            ['value', this.value],
            ['case',  _case     ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.case ) this.case .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.case ) this.case .invalidateInputs(from);
    }
}
