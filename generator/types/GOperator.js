class GOperator
extends GValue
{
    nodeId;



    constructor(type, nodeId, options)
    {
        super(type, options);

        this.nodeId  = nodeId;
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