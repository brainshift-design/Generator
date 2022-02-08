class SetParamDecimalsAction
extends Action
{
    nodeId;
    paramIndex;

    get param() { return graph.nodes.find(n => n.id == this.nodeId).params[this.paramIndex]; } 


    newDecimals;
    oldDecimals;



    constructor(param, dec, oldDec)
    {
        super('set param settings');

        this.nodeId      = param.op.id;
        this.paramIndex  = param.op.params.indexOf(param);

        this.newDecimals = dec;
        this.oldDecimals = oldDec;
    }



    do()
    {
        this.param.setDecimals(this.newDecimals);
    }



    undo()
    {
        this.param.setDecimals(this.oldDecimals);
    }
}