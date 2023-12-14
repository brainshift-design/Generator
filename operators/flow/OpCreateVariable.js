// class   OpCreateVariable
// extends OperatorBase
// {
//     paramName;
//     paramType;
//     paramValue;



//     constructor()
//     {
//         super(CREATE_VARIABLE, 'createVar', 'create', iconCreateVariable);

//         //this.cached = false;


//         this.addInput (new Input(ALL_VALUES));
//         this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

//         this.addParam(this.paramName = new TextParam('name', 'name', false, true, true));
//         this.addParam(this.paramName = new TextParam('name', 'name', false, true, true));
//         this.addParam(this.paramName = new TextParam('name', 'name', false, true, true));


//         this.inputs[0].addEventListener('connect',    () => OpNull_onConnectInput(this));
//         this.inputs[0].addEventListener('disconnect', () => OpNull_onDisconnectInput(this));
//     }



//     canAutoConnectFrom(output)
//     {
//         return true;
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

//         if (input.connected)
//             request.push(...pushInputOrParam(input, gen));

//         request.push(...this.node.paramName.genRequest(gen));

        
//         gen.scope.pop();
//         pushUnique(gen.passedNodes, this.node);

//         return request;
//     }



//     updateValues(requestId, actionId, updateParamId, paramIds, values)
//     {
//         super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
//         const type = values[paramIds.findIndex(id => id == 'type')];

//         if (type)
//             this.headerOutputs[0].types = [type.value];
//     }



//     getHeaderColors(options = {})
//     {
//         const colors = super.getHeaderColors(options);
//         const type   = this.outputs[0].types[0];

//         colors.text   = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

//         const gray =
//                 this.active
//             && !this.inputs[0].connected;

//         colors.input  = gray ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
//         colors.output = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
//         colors.wire   = gray ? rgbFromType(ANY_VALUE, true) : rgbFromType(type, true);

//         return colors;
//     }
// }



// function OpNull_onConnectInput(node)
// {
//     node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
// }



// function OpNull_onDisconnectInput(node)
// {
//     node.outputs[0].types = [ANY_VALUE];
// }