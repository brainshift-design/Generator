class GParam
extends GOperator
{
    paramId;
    
    node;
    param;
    


    constructor(nodeId, paramId)
    {
        super(PARAM, nodeId, false);

        this.paramId = paramId;
    }



    copy()
    {
        const copy = new GParam(this.nodeId, this.paramId);

        copy.copyBase(this);

        copy.node = this.node;
    
        return copy;
    }



    async eval(parse)
    {
        this.node = parse.parsedNodes.find(v => v.nodeId == this.nodeId);
        console.assert(this.node, 'can\'t find parameter node \'' + this.nodeId + '\'');


        //this.param.feedbackValue = this.feedbackValue;

        this.node.feedbackValue = this.feedbackValue;
        await this.node.eval(parse);
        this.node.feedbackValue = null;

        this.param = this.node.getParamFromId(this.paramId);


        if (isValid(this.param)) // could have been deleted from OpRepeat for example
        {
            // if (   this.feedbackValue)
            //     //&& this.param.type == NUMBER_VALUE)
            //     this.param = this.feedbackValue();

            const result = (await this.param.eval(parse)).toValue();
            
            //this.param.feedbackValue = null;
            return result;
        }
        else
        {
            //this.param.feedbackValue = null;
            return NullValue;
        }
    }


    
    isCached()
    {
        return super.isCached();
//            && this.node.isCached();
    }
}