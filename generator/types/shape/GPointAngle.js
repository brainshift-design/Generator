class GPointAngle
extends GOperator1
{
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
                        : NumberValue.NaN.copy());   
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
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            //['value', this.value       ],
            ['type',  this.outputType()]
        ]);


        this.validate();

        return this;
    }
}



// function getCharacterToCodeValue(input)
// {
//     return input.value.length > 0
//          ? new NumberValue(input.value.charCodeAt(0))
//          : NumberValue.NaN.copy();
// }