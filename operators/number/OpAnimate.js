// class   OpAnimate
// extends OperatorBase
// {
//     paramFrom;
//     paramTo
//     paramDuration;
//     paramType;



//     constructor()
//     {
//         super(NUMBER_ANIMATE, 'anim', 'animate');

//         this.cached = false;
        
//         this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

//         this.addParam(this.paramFrom = new NumberParam('from', 'from', true, true, true,   0));
//         this.addParam(this.paramTo   = new NumberParam('to',   'to',   true, true, true, 255));

//         this.paramSeed.controls[0].allowEditDecimals = false;
//         this.paramSeed.isDefault = () => false;
//     }



//     output_genRequest(gen)
//     {
//         // 'this' is the output

//         gen.scope.push({
//             nodeId:  this.node.id, 
//             paramId: NULL });

//         const [request, ignore] = this.node.genRequestStart(gen);
//         if (ignore) return request;

        
//         request.push(...this.node.paramSeed.genRequest(gen));
//         request.push(...this.node.paramMin .genRequest(gen));
//         request.push(...this.node.paramMax .genRequest(gen));


//         gen.scope.pop();
//         pushUnique(gen.passedNodes, this.node);

//         return request;
//     }
// }