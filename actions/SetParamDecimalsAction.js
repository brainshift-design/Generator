class SetParamDecimalsAction
extends Action
{
    nodeId;
    paramIndex;

    get param() { return nodeFromId(this.nodeId).params[this.paramIndex]; } 


    newDecimals;
    oldDecimals;

    newDisplayDecimals;
    oldDisplayDecimals;



    constructor(param, dec, oldDec, dspDec, oldDspDec)
    {
        super('set param settings');

        this.nodeId             = param.op.id;
        this.paramIndex         = param.op.params.indexOf(param);
       
        this.newDecimals        = dec;
        this.oldDecimals        = oldDec;

        this.newDisplayDecimals = dspDec;
        this.oldDisplayDecimals = oldDspDec;
    }



    do()
    {
        this.param.setDecimals(
            this.newDecimals, 
            this.newDisplayDecimals);

        uiSaveNodesAndConns([this.nodeId]);
    }



    undo()
    {
        this.param.setDecimals(
            this.oldDecimals, 
            this.oldDisplayDecimals);

        uiSaveNodesAndConns([this.nodeId]);
    }
}