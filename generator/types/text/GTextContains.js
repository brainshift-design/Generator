class GTextContains
extends GOperatorBase2
{
    first;
    last;
    all;



    constructor(nodeId, options)
    {
        super(TEXT_CONTAINS, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextContains(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = this.input0 ? (await this.input0.eval(parse)).toValue() : null;
        const input1 = this.input1 ? (await this.input1.eval(parse)).toValue() : null;
    

        if (   input0 && input0.isValid() 
            && input1 && input1.isValid())
        {
            const indices = [];
            let   index   = 0;

            if (input1.value != '')
            {
                while (index != -1) 
                {
                    index = input0.value.indexOf(input1.value, index);

                    if (index != -1) 
                    {
                        indices.push(index);
                        index += 1;
                    }
                }

                
                this.value = new NumberValue(indices.length > 0 ? 1 : 0);

                this.first = indices.length > 0 ? new NumberValue(indices.at( 0)) : NumberValue.NaN;
                this.last  = indices.length > 0 ? new NumberValue(indices.at(-1)) : NumberValue.NaN;

                this.all   = new ListValue();

                for (const index of indices)
                    this.all.items.push(new NumberValue(index));
            }
            else
            {
                this.value = new NumberValue(1);

                this.first = NumberValue.NaN;
                this.last  = NumberValue.NaN;
                this.all   =   ListValue.NaN;
            }
        }
        else                  
        {
            this.value = NumberValue.NaN;
            this.first = NumberValue.NaN;
            this.last  = NumberValue.NaN;
            this.all   =   ListValue.NaN;
        }
    

        this.updateValues = 
        [
            ['value', this.value],
            ['first', this.first],
            ['last',  this.last ],
            ['all',   this.all  ]
        ];


        this.validate();

        return this;
    }
}