class GPointAngle
extends GOperator1
{
    static { GNode.types[POINT_ANGLE] = this; }



    constructor(nodeId, options)
    {
        super(POINT_ANGLE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GPointAngle(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalPointValue(this.input, parse);


        if (input)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];
                    const obj  = input.objects[i];

                    this.value.items.push(
                        item.type == POINT_VALUE
                        ? new NumberValue(anglev2(obj.sp0, obj.sp1) / Tau * 360)
                        : NumberValue.NaN());   
                }
            }
            else
            {
                if (input.objects)
                {
                    const obj = input.objects[0];
                    this.value = new NumberValue(anglev2(obj.sp0, obj.sp1) / Tau * 360);
                }
            }
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            //['value', this.value       ],
            ['type',  this.outputType()]
        ]);


        this.validate();

        return this;
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const angle = new GPointAngle(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(angle, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, angle);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            angle.input = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, angle);
        return angle;
    }
}



// function getCharacterToCodeValue(input)
// {
//     return input.value.length > 0
//          ? new NumberValue(input.value.charCodeAt(0))
//          : NumberValue.NaN();
// }