class GSelectFromList
extends GOperator1
{
    static { GNode.types[SELECT_FROM_LIST] = this; }



    index = null;



    constructor(nodeId, options)
    {
        super(SELECT_FROM_LIST, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.index = null;
    }



    copy()
    {
        const copy = new GSelectFromList(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.index) copy.index = this.index.copy();
        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const input = await evalListValue  (this.input, parse);
        let   index = await evalNumberValue(this.index, parse);
        
        let  length = 0;
        
        
        if (   input
            && input.isValid()
            && isListValueType(input.type)
            && input.items
            && input.items.length > 0)
        {
            length = input.items.length;


            index = 
                   index.isValid()
                && index.value >= -length
                && index.value <   length
                ? new NumberValue(Math.round(index.value))
                : new NumberValue(0);
            

            if (   index.isValid()
                && index.value >= -length
                && index.value <   length)
            {
                this.value = input.items.at(index.value);
                
                if (   input.objects
                    && input.objects.at(index.value))
                    this.value.objects = [input.objects.at(index.value)];


                if (this.value.objects)
                {
                    for (let i = 0; i < this.value.objects.length; i++)
                    {
                        const obj = this.value.objects[i];

                        obj.nodeId = this.nodeId;
                        obj.listId = -1;

                        obj.objectId = this.nodeId;
                        
                        if (obj.objectId != NULL)
                            obj.objectId += '/';

                        obj.objectId += index.value.toString();
                    }
                }
            }
            else
            {
                this.value = new NullValue();
            }
        }
        else 
        {
            this.value = new NullValue();
        }


        const type = this.outputType();

        
        this.setUpdateValues(parse,
        [
            ['value',      type == COLOR_VALUE 
                        || type == FILL_VALUE 
                        ? this.value 
                        : new NullValue()],
            ['type',    type                   ],
            ['length',  new NumberValue(length)],
            ['index',   index                  ]
        ]);


        if (type.value == TEXT_VALUE && parse.settings.showTextTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', this.value]
            ],
            true);
        }
        else if (isListValueType(type.value) && parse.settings.showListTooltips)
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
            && this.index && this.index.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.index) this.index.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.index) this.index.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.index) this.index.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const sel = new GSelectFromList(nodeId, options);
        
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(sel, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, sel);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            sel.input = genParse(parse);
    
        sel.index = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, sel);
        return sel;
    }
}