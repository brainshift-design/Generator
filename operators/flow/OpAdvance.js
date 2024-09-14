// class   OpAdvance
// extends OperatorBase
// {
//     paramLoop;



//     constructor()
//     {
//         super(ADVANCE, 'advance', 'advance', iconAdvance, defNodeWidth, true);

//         this.outputValueType = LIST_VALUE;
//         this.canDisable      = true;

        
//         this.addInput (new Input([ANY_VALUE]));
//         this.addOutput(new Output([LIST_VALUE], this.output_genRequest));


//         this.addParam(this.paramLoop      = new NumberParam('loop',      '',          false, true, false));


//         this.paramLoop.input.types.push(ANY_VALUE);

//         this.paramLoop.forceInputColorType = ANY_VALUE;


//         this.paramLoop.getTooltip = () => 
//         {
//             if (currentTooltip) 
//                 hideTooltip(currentTooltip);

//             ttParam.innerHTML = 'Close loop';
//             return ttParam;
//         };


//         this.getDescription = () => ``;//`"advances" the input, creating a list of values/objects`;

//         this.paramLoop     .getDescription = () => `used to define closed loops`;
//     }
    
    

//     output_genRequest(gen)
//     {
//         // 'this' is the output

//         gen.scope.push({
//             nodeId:  this.node.id, 
//             paramId: NULL });

//         const [request, ignore] = this.node.genRequestStart(gen);
//         if (ignore) return request;


//         const input = this.node.inputs[0];


//         request.push(input.connected ? 1 : 0);

//         // request.push(this.node.headerOutputs.filter(o => o.connected).length > 0 ? 0 : 1); // there are active nodes after this one
//         // request.push(getActiveAfterNode(this.node, true) ? 1 : 0); // there are active nodes after this one
//         // request.push(getListAfterNode  (this.node, true) ? 1 : 0); // there is a list node after this one

//         if (input.connected)
//             request.push(...pushInputOrParam(input, gen));

//         request.push(...this.node.paramLoop.genRequest(gen));

        
//         gen.scope.pop();
//         pushUnique(gen.passedNodes, this.node);

//         return request;
//     }



//     updateValues(requestId, actionId, updateParamId, paramIds, values)
//     {
//         // super.updateValues(requestId, actionId, updateParamId, paramIds, values);

//         const type = values[paramIds.findIndex(id => id == 'type')];

//         this.outputs[0].types = 
//                type
//             && type.isValid()
//             ? [type.value]
//             : [LIST_VALUE];

//         this.endProgress();
//     }



//     updateParams()
//     {
//         const arrowStyle = darkMode ? 'white' : 'black';
        
//         this.paramLoop.enableControlText(false);
//         this.paramLoop.controls[0].valueText = '<svg width="25" height="12" viewBox="0 -1 25 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.991 0H24.991L24.991 2C24.991 4.76142 22.7524 7 19.991 7H14V6H19.991C22.2001 6 23.991 4.20914 23.991 2L23.991 0Z" fill="'+arrowStyle+'"/><rect width="4.97369" height="1" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.7036 7.224)" fill="'+arrowStyle+'"/><rect width="5" height="1" transform="matrix(0.707107 0.707107 0.707107 -0.707107 12.991 6.54858)" fill="'+arrowStyle+'"/><circle cx="0.5" cy="6.5" r="0.5" fill="'+arrowStyle+'"/><circle cx="4.5" cy="6.5" r="0.5" fill="'+arrowStyle+'"/><circle cx="8.5" cy="6.5" r="0.5" fill="'+arrowStyle+'"/></svg>';

//         this.updateParamControls();
//     }
// }