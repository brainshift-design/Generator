// class   OpColorStroke
// extends OpShapeBase
// {
//     paramColor;
//     paramOpacity;

//     paramStrokeWeight;
//     paramStrokeFit;
//     paramStrokeJoin;
//     paramStrokeMiter;

    
//     constructor()
//     {
//         super(COLOR_STROKE, 'stroke', 90);


//         this.addInput(new Input(SHAPE_TYPES));
//         this.addOutput(new Output(COLOR_STROKE, this.output_genRequest));

//         this.addParam(this.paramColor        = new ColorParam ('color',        '',        false, true, true));
//         this.addParam(this.paramOpacity      = new NumberParam('opacity',      'opacity', true,  true, true, 100, 0, 100));

//         this.addParam(this.paramStrokeWeight = new NumberParam('strokeWeight', 'weight', true,  true, true, 1, 0));
//         this.addParam(this.paramStrokeFit    = new SelectParam('strokeFit',    'fit',    true,  true, true, ['inside', 'center', 'outside'], 0));
//         this.addParam(this.paramStrokeJoin   = new SelectParam('strokeJoin',   'join',   true,  true, true, ['miter', 'bevel', 'round'], 0));
//         this.addParam(this.paramStrokeMiter  = new NumberParam('strokeMiter',  'miter',  false, true, true, 28.96, 0, 180, 2));

//         this.paramColor.setValue(ColorValue.create(1, 0, 0, 0), false, true, false);
        
//         this.paramOpacity    .control.setSuffix('%', true);
//         this.paramStrokeMiter.control.setSuffix('°', true);
//     }
    
    
    
//     output_genRequest(gen)
//     {
//         // 'this' is the output

//         if (!isEmpty(this.cache))
//             return this.cache;


//         gen.scope.push({
//             nodeId:  this.node.id, 
//             paramId: '' });

//         const [request, ignore] = this.node.genRequestStart(gen);
//         if (ignore) return request;

        
//         const input = this.node.inputs[0];

//         if (input.connected)
//             request.push(...pushInputOrParam(input, gen));

//         request.push(...this.node.paramColor       .genRequest(gen));
//         request.push(...this.node.paramOpacity     .genRequest(gen));
//         request.push(...this.node.paramStrokeWeight.genRequest(gen));
//         request.push(...this.node.paramStrokeFit   .genRequest(gen));
//         request.push(...this.node.paramStrokeJoin  .genRequest(gen));
//         request.push(...this.node.paramStrokeMiter .genRequest(gen));


//         gen.scope.pop();
//         pushUnique(gen.passedNodes, this.node);

//         return request;
//     }
// }