// class   OpTextToColor
// extends OperatorBase
// {
//     paramValue;



//     constructor()
//     {
//         super(TEXT_TO_COLOR, 'textToColor', 'to color', iconTextToColor);


//         this.addInput(new Input([TEXT_VALUE]));

//         this.addParam(this.paramValue = new ColorParam('value', 'value', false, false, true));

//         this.paramValue.isNodeValue = true;
//     }



//     genRequest(gen)
//     {
//         // 'this' is the node

//         gen.scope.push({
//             nodeId:  this.id, 
//             paramId: NULL });

//         const [request, ignore] = this.genRequestStart(gen);
//         if (ignore) return request;

        
//         const input = this.inputs[0];


//         request.push(input.connected ? 1 : 0);
        
//         if (input.connected)
//             request.push(...pushInputOrParam(input, gen));

        
//         gen.scope.pop();
//         pushUnique(gen.passedNodes, this);

//         return request;
//     }



//     updateParams()
//     {
//         this.paramValue.enableControlText(false, this.isUnknown());

//         this.updateParamControls();
//     }
// }