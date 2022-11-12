class GOperator
extends GValue
{
    nodeId;



    constructor(type, nodeId, options)
    {
        super(type, options);

        this.nodeId = nodeId;
    }



    copyBase(src)
    {
        super.copyBase(src);
        
        this.nodeId = src.nodeId;
    }



    getParamFromId(paramId)
    {
        return this[paramId];
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