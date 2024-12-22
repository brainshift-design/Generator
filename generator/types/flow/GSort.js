class GSort
extends GOperator1
{
    static { GNode.types[SORT] = this; }



    condition     = null;
    reverse       = null;
    indices       = null;

    firstSortNode = null;


    //cachedValue   = null;


    
    constructor(nodeId, options)
    {
        super(SORT, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.condition = null;
        this.reverse   = null;
        this.indices   = null;
    }



    copy()
    {
        const copy = new GSort(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.condition) copy.condition = this.condition.copy();
        if (this.reverse  ) copy.reverse   = this.reverse  .copy();
        if (this.indices  ) copy.indices   = this.indices  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input   = await evalListValue  (this.input,   parse);
        const reverse = await evalNumberValue(this.reverse, parse);


        this.value         = new ListValue();
        this.value.objects = [];


        let maxColumns = 0;

        this.indices = new ListValue();


        if (   input
            && reverse)
        {
            if (this.options.enabled)
            {
                if (  !this.condition
                    || this.condition.getConditionNode)
                {
                    if (this.condition)
                        await this.condition.eval(parse);

                    const conditionNode = 
                        this.condition
                        ? this.condition.getConditionNode(parse)
                        : null;


                    if (  !this.condition
                        || conditionNode)
                    {
                        const reverseMultiplier = reverse.value > 0 ? -1 : 1;
                        const unsorted          = [...input.items];


                        [ input       .items, 
                          this.indices.items ] = await asyncSort(
                            parse, 
                            unsorted, 
                            this.condition 
                            ? conditionNode // specified sort
                            : null,         // default sort
                            this,
                            this.condition, 
                            reverseMultiplier);


                        input.items.forEach(i => maxColumns = Math.max(maxColumns, isListValueType(i.type) ? i.items.length : 1));
                        

                        for (let i = 0; i < input.items.length; i++)
                        {
                            const row       = input   .items[i];
                            const itemIndex = unsorted.indexOf(row);

                            this.value.items.push(row.copy());

                            if (   row.objects
                                && this.value.objects)
                            {
                                const objects = input.objects.filter(o => o.itemIndex == itemIndex).map(o => o.copy());
                                objects.forEach(o => o.itemIndex = i);

                                this.value.objects.push(...objects);
                            }
                        }
                    }
                }
                else
                {
                    this.value   = input;
                    this.indices = new ListValue(Array.from(Array(input.items.length).keys()).map(i => new NumberValue(i)));
                }
            }
            else
            {
                this.value   = input;
                this.indices = new ListValue(Array.from(Array(input.items.length).keys()).map(i => new NumberValue(i)));
            }
        }
        else
        {
            this.value   = new ListValue();
            this.indices = new ListValue();
        }

        
        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',    this.outputListType()                   ],
            ['length',  new NumberValue(this.value.items.length)],
            ['reverse', reverse                                 ],
            ['indices', this.indices                            ]
        ]);
        

        if (parse.settings.showListTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)))]
            ],
            true);
        }


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && (!this.condition || this.condition.isValid())
            && this.reverse && this.reverse.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.condition) this.condition.pushValueUpdates(parse);
        if (this.reverse  ) this.reverse  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.condition) this.condition.invalidateInputs(parse, from, force);
        if (this.reverse  ) this.reverse  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.condition) this.condition.iterateLoop(parse);
        if (this.reverse  ) this.reverse  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);


        const sort = new GSort(nodeId, options);
    

        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }

        
        if (parse.settings.logRequests) 
            logReq(sort, parse, ignore, nInputs);


        if (ignore) 
        {
            genParseNodeEnd(parse, sort);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }


        parse.nTab++;


        if (nInputs == 1)
            sort.input = genParse(parse);


        const nConditions = parseInt(parse.move());

        if (nConditions == 1)
            sort.condition = genParse(parse);

            
        sort.reverse = genParse(parse);

        
        parse.nTab--;


        genParseNodeEnd(parse, sort);
        return sort;
    }
}



async function asyncSort(parse, unsorted, conditionNode, node, condition, reverseMultiplier)
{
    const oldInput = conditionNode ? conditionNode.input : null;


    const sorted  = [];


    for (let i = 0; i < unsorted.length; i++)
    {
        const item = unsorted[i];

        const cond = await getSortCondition(parse, conditionNode, node, condition, item);

        if (!cond) 
        {
            return [unsorted, 
                    unsorted.keys().map(k => new NumberValue(k))];
        }
        
        const condValue = cond.toNewValue();
        //console.log('condValue =', condValue.value);

        if (   condValue.type != NUMBER_VALUE
            && condValue.type != TEXT_VALUE) 
        {
            return [ unsorted, 
                     unsorted.keys().map(k => new NumberValue(k))];
        }

        sorted.push({item, condition: condValue.value, index: i});
    }


    sorted.sort((a, b) =>
    {
        if (   typeof(a.condition) == 'number'
            && typeof(b.condition) == 'number')
        {
            if (a.condition < b.condition) return -1*reverseMultiplier;
            if (a.condition > b.condition) return  1*reverseMultiplier;
        }
        else if (typeof(a.condition) == 'string'
              && typeof(b.condition) == 'string')
        {
            if (a.condition.localeCompare(b.condition) < 0) return -1*reverseMultiplier;
            if (a.condition.localeCompare(b.condition) > 0) return  1*reverseMultiplier;
        }

        return 0;
    });


    if (conditionNode)
        conditionNode.input = oldInput;


    return [ sorted.map(item => item.item), 
             sorted.map(item => new NumberValue(item.index)) ];
}



async function getSortCondition(parse, conditionNode, node, condition, item)
{
    if (!conditionNode)
        return item;
    
    conditionNode.reset();

    conditionNode.input = item.copy();
    condition.invalidateInputs(parse, node, true); 

    return await condition.eval(parse);
}