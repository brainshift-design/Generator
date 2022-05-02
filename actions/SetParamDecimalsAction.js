// class SetParamDecimalsAction
// extends Action
// {
//     nodeId;
//     paramIndex;

//     get param() { return nodeFromId(this.nodeId).params[this.paramIndex]; } 


//     newDecimals;
//     oldDecimals;

//     newDisplayDecimals;
//     oldDisplayDecimals;



//     constructor(param, dec, oldDec, dspDec, oldDspDec)
//     {
//         super('SET PARAM DECIMALS ' + param.node.id + ' to ' + dspDec);

//         this.nodeId             = param.node.id;
//         this.paramIndex         = param.index;
       
//         this.newDecimals        = dec;
//         this.oldDecimals        = oldDec;

//         this.newDisplayDecimals = dspDec;
//         this.oldDisplayDecimals = oldDspDec;
//     }



//     do()
//     {
//         this.param.setDecimals(
//             this.newDecimals, 
//             this.newDisplayDecimals);

//         uiSaveNodes([this.nodeId]);
//     }



//     undo()
//     {
//         this.param.setDecimals(
//             this.oldDecimals, 
//             this.oldDisplayDecimals);

//         uiSaveNodes([this.nodeId]);
//     }
// }