class GOperator
extends GNode
{
    nodeId;

    valid; // has been evaluated
    topLevel;

    
    
    constructor(type, nodeId, options)
    {
        super(type, options);

        this.nodeId   = nodeId;

        this.valid    = false;
        this.topLevel = false;
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



    eval(parse)
    {
        // calculate and add value update here

        return this;
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