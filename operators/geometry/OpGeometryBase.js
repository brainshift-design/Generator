class   OpGeometryBase
extends OperatorBase
{
    paramFill;
    paramStroke;

    paramStrokeWeight;
    paramStrokeFit;
    paramStrokeJoin;
    paramStrokeMiter;


    btnProportional;

    refWidth  = Number.NaN;
    refHeight = Number.NaN;


    
    constructor(type, shortName, defWidth = 80)
    {
        super(type, shortName, defWidth);
    }



    addBaseParams()
    {
        this.addParam(this.paramFill         = new FillParam  ('fill',         'f',      true, true, true, GColorFillValue.default));
        this.addParam(this.paramStroke       = new FillParam  ('stroke',       's',      true, true, true));

        this.addParam(this.paramStrokeWeight = new NumberParam('strokeWeight', 'weight', true, true, true, 1, 0));
        this.addParam(this.paramStrokeFit    = new SelectParam('strokeFit',    'fit',    true, true, true, ['inside', 'center', 'outside'], 0));
        this.addParam(this.paramStrokeJoin   = new SelectParam('strokeJoin',   'join',   true, true, true, ['miter', 'bevel', 'round'], 0));
        this.addParam(this.paramStrokeMiter  = new NumberParam('strokeMiter',  'miter',  true, true, true, 28.96, 0, 180, 2));

        this.paramStrokeMiter.control.setSuffix('°', true);


        this.paramFill.setValue(GColorFillValue.default);


        const cond = () => 
                  this.paramStroke.value.isValid()
               && isValidRgb(dataColorToRgb(this.paramStroke.value.color.toDataColor()))
            || this.paramStroke.connected;

        this.paramStrokeWeight.show = () => cond();
        this.paramStrokeFit   .show = () => cond();
        this.paramStrokeJoin  .show = () => cond();
        this.paramStrokeMiter .show = () => cond() && this.paramStrokeJoin.value == 0;
    } 



//     genGeometryBaseParamIds()
//     {
//         const paramIds = [];

//         for (const param of this.params)
//             if (   param.input 
//                 && param.input.connected) 
//                 paramIds.push(param.id);

//         return paramIds;
//     }



//     genGeometryBaseRequest(gen, inputConnected)
//     {
//         // 'this' is the node

//         const request = [];

//         if (inputConnected)
//         {
//             if (this.paramFill       .input.connected) request.push(...this.paramFill       .genRequest(gen));
//             if (this.paramStroke     .input.connected) request.push(...this.paramStroke     .genRequest(gen));
//             // if (this.paramStrokeWidth.input.connected) request.push(...this.paramStrokeWidth.genRequest(gen));
//             // if (this.paramStrokeFit  .input.connected) request.push(...this.paramStrokeFit  .genRequest(gen));
//             // if (this.paramStrokeJoin .input.connected) request.push(...this.paramStrokeJoin .genRequest(gen));
//             // if (this.paramStrokeMiter.input.connected) request.push(...this.paramStrokeMiter.genRequest(gen));
//         }
//         else
//         {
//             request.push(
//                 ...this.paramFill       .genRequest(gen),
//                 ...this.paramStroke     .genRequest(gen));//,
//                 // ...this.paramStrokeWidth.genRequest(gen),
//                 // ...this.paramStrokeFit  .genRequest(gen),
//                 // ...this.paramStrokeJoin .genRequest(gen),
//                 // ...this.paramStrokeMiter.genRequest(gen));
//         }

//         return request;
//     }
}