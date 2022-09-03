class OpStroke
extends OpColorBase
{
    paramFill;
    paramWeight;
    paramFit;
    paramJoin;
    paramMiter;

    checkers;
    colorBack;


    constructor()
    {
        super(STROKE, 'stroke');


        this.colorBack = createDiv('colorBack');
        this.inner.appendChild(this.colorBack);

        this.addInput (new Input(STROKE_TYPES, this.input_getValuesForUndo));
        this.addOutput(new Output(STROKE, this.output_genRequest));

        this.initContentInput(this.inputs[0], 0);


        this.addParam(this.paramFill   = new FillParam  ('fill',   'fill',   false, true, true, FillValue.create(0, 0, 0, 100)));
        this.addParam(this.paramWeight = new NumberParam('weight', 'weight', true,  true, true, 1, 0));
        this.addParam(this.paramFit    = new SelectParam('fit',    'fit',    true,  true, true, ['inside', 'edge', 'outside'], 0));
        this.addParam(this.paramJoin   = new SelectParam('join',   'join',   true,  true, true, ['miter', 'bevel', 'round'], 0));
        this.addParam(this.paramMiter  = new NumberParam('miter',  'miter',  true,  true, true, 28.96, 0, 180, 2));

        this.paramMiter.control.setSuffix('°', true);
        this.paramMiter.show = () => this.paramJoin.value == 0;


        this.checkers = createDiv('nodeHeaderCheckers');
        this.inner.insertBefore(this.checkers, this.header);
    }
    
    
    
    input_getValuesForUndo()
    {
        return [ 
            [this.node.paramFill  .id, 
             this.node.paramFill  .value],
            [this.node.paramWeight.id, 
             this.node.paramWeight.value],
            [this.node.paramFit   .id, 
             this.node.paramFit   .value],
            [this.node.paramJoin  .id, 
             this.node.paramJoin  .value],
            [this.node.paramMiter .id, 
             this.node.paramMiter .value]];
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        if (!isEmpty(this.cache))
            return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];

        const paramIds = [];

        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));

            for (const param of this.node.params)
                if (   param.input 
                    && param.input.connected) 
                    paramIds.push(param.id);

            request.push(paramIds.join(','));

            for (const param of this.node.params)
                if (   param.input 
                    && param.input.connected) 
                    request.push(...param.genRequest(gen))
        }
        else
        {
            for (const param of this.node.params)
                request.push(...param.genRequest(gen))
        }


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const stroke = values[paramIds.findIndex(id => id == 'value')];

        const fill   = values[paramIds.findIndex(id => id == 'fill'  )];
        const weight = values[paramIds.findIndex(id => id == 'weight')];
        const fit    = values[paramIds.findIndex(id => id == 'fit'   )];
        const join   = values[paramIds.findIndex(id => id == 'join'  )];
        const miter  = values[paramIds.findIndex(id => id == 'miter' )];


        if (stroke.isValid())
        {
            this.paramFill  .setValue(stroke.fill,   false, true, false);
            this.paramWeight.setValue(stroke.weight, false, true, false);
            this.paramFit   .setValue(stroke.fit,    false, true, false);
            this.paramJoin  .setValue(stroke.join,   false, true, false);
            this.paramMiter .setValue(stroke.miter,  false, true, false);

            this._color = stroke.fill.color.toDataColor();
        }
        else
        {
            this.paramFill  .setValue(fill,   false, true, false);
            this.paramWeight.setValue(weight, false, true, false);
            this.paramFit   .setValue(fit,    false, true, false);
            this.paramJoin  .setValue(join,   false, true, false);
            this.paramMiter .setValue(miter,  false, true, false);
            
            this._color = dataColor_NaN;
        }


        super.updateValues(updateParamId, paramIds, values);
    }



    updateHeader()
    {
        //console.log(this.id + '.OpStroke.updateHeader()');


        const colors = this.getHeaderColors();

        this.colorBack.style.background = 
            rgbIsOk(colors.back)
            ? rgb2style(colors.back)
            : rgba2style(rgb_a(rgbDocumentBody, 0.95));

              
        this.checkers.style.height = this.header.offsetHeight;

        this.checkers.style.background =
            isDarkMode()
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

        this.checkers.style.display            = !rgbIsNaN(colors.back) ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor    = isDarkMode() ? '#444' : '#fff';

        this.checkers.style.backgroundSize     = '26px 26px';
        this.checkers.style.backgroundPosition = '0 0, 13px 13px';
                        

        this.header.style.background = 
            !rgbIsNaN(colors.back)
            ? rgba2style(colors.back) 
            : 'transparent';


        const noColor = [0.7, 0.7, 0.7];

        this.inputs[0] .wireColor  = rgbIsOk(colors.back) ? colors.back : noColor;
        this.inputs[0] .colorLight = 
        this.inputs[0] .colorDark  = rgb_a(colors.input, 0.2);

        this.outputs[0].wireColor  = rgbIsOk(colors.back) ? colors.back : noColor;
        this.outputs[0].colorLight =
        this.outputs[0].colorDark  = rgb_a(colors.output, 0.2);


        this.updateWarningOverlay();
        this.updateWarningOverlayStyle(colors.back);//, 45);


        Operator.prototype.updateHeader.call(this);
    }
}