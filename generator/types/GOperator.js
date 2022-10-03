class GOperator
extends GValue
{
    nodeId;
    options;



    constructor(type, nodeId, options)
    {
        super(type);

        this.nodeId  = nodeId;
        this.options = options;
    }



    toValue()
    {
        return null;
    }
}



// function evalValue(value)
// {
//     return value instanceof GOperator 
//            ? value.value 
//            : value;
// }