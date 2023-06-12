class GTextCase
extends GTextType
{
    input = null;

    case;


    
    constructor(nodeId, options)
    {
        super(TEXT_CASE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextCase(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

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
            
            console.assert(
                this.value.type == TEXT_VALUE, 
                'this.value.type must be TEXT_VALUE');
                
                
            if (this.options.enabled)
            {
                     if (_case.value == 0) this.value.value = this.value.value.toLowerCase();
                else if (_case.value == 1) this.value.value = this.value.value.toUpperCase();
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

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.case ) this.case .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
        if (this.case ) this.case .invalidateInputs(from);
    }
}
