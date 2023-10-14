class GSort
extends GOperator1
{
    //order   = null;
    column  = null;
    reverse = null;

    firstSortNode = null;


    
    constructor(nodeId, options)
    {
        super(SORT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSort(this.nodeId, this.options);

        copy.copyBase(this);

        //if (this.order  ) copy.order   = this.order  .copy();
        if (this.column ) copy.column  = this.column .copy();
        if (this.reverse) copy.reverse = this.reverse.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        //const order   = this.order   ? (await this.order  .eval(parse)).toValue() : null;
        const reverse = this.reverse ? (await this.reverse.eval(parse)).toValue() : null;


        this.value = new ListValue();

        let maxColumns = 0;

        
        if (   this.input
            && this.column
            && reverse)
        {
            const input = (await this.input .eval(parse)).toValue();


            if (   input 
                && this.column
                && this.column.getOrderNode)
            {
                const column    = (await this.column.eval(parse)).toValue(); // must be done for getOrderNode() to work
                const orderNode = this.column.getOrderNode(parse);


                if (orderNode)
                {
                    const reverseMultiplier = reverse.value > 0 ? -1 : 1;

                    input.items.sort(async (a, b) => 
                    {
                        // console.log('a =', a);
                        // console.log('b =', b);

                        orderNode.input = a; this.column.invalidateInputs(parse, this); 
                        const ca = (await this.column.eval(parse)).toValue().value;//0;//a ? (isListType(a.type) ? a.items[column.value].value : a.value) : 0;
                        
                        orderNode.input = b; this.column.invalidateInputs(parse, this); 
                        const cb = (await this.column.eval(parse)).toValue().value;//0;//b ? (isListType(b.type) ? b.items[column.value].value : b.value) : 0;

                        console.log('ca =', ca);
                        console.log('cb =', cb);
                        console.log('');

                        if (ca < cb) return -1 * reverseMultiplier;
                        if (ca > cb) return  1 * reverseMultiplier;

                        return 0;
                    });


                    input.items.forEach(i => maxColumns = Math.max(maxColumns, isListType(i.type) ? i.items.length : 1));

                    for (let i = 0; i < input.items.length; i++)
                    {
                        const row = input.items[i];
                        this.value.items.push(row.copy());

                        if (   row.objects
                            && this.value.objects)
                        {
                            row.objects.forEach(o => o.itemIndex = i);
                            this.value.objects.push(...row.objects);
                        }
                    }
                }
            }
        }


        const preview = new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)));


        this.setUpdateValues(parse,
        [
            ['preview', preview                                 ],
            ['type',    this.outputListType()                   ],
            //['length',  new NumberValue(this.value.items.length)],
            //['columns', new NumberValue(maxColumns)             ],
            //['column',  column                                  ],
            ['reverse', reverse                                 ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            //&& this.order   && this.order  .isValid()
            && this.column  && this.column .isValid()
            && this.reverse && this.reverse.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        //if (this.order  ) this.order  .pushValueUpdates(parse);
        if (this.column ) this.column .pushValueUpdates(parse);
        if (this.reverse) this.reverse.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        //if (this.order  ) this.order  .invalidateInputs(parse, from);
        if (this.column ) this.column .invalidateInputs(parse, from);
        if (this.reverse) this.reverse.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        //if (this.order  ) this.order  .iterateLoop(parse);
        if (this.column ) this.column .iterateLoop(parse);
        if (this.reverse) this.reverse.iterateLoop(parse);
    }
}