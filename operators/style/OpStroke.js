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


    
    get inputIsShape() 
    {
        return this.inputs[0].connected
            && SHAPE_TYPES.includes(this.inputs[0].connectedOutput.type);
    }



    constructor()
    {
        super(STROKE, 'stroke');


        this.colorBack = createDiv('colorBack');
        this.inner.appendChild(this.colorBack);

        this.addInput (new Input([...STROKE_TYPES, ...SHAPE_TYPES], this.input_getValuesForUndo));
        this.addOutput(new Output(STROKE, this.output_genRequest));

        this.inputs[0].addEventListener('connect',    () =>   this.outputs[0]._type = this.inputs[0].connectedOutput.type);
        this.inputs[0].addEventListener('disconnect', () => { this.outputs[0]._type = FILL; uiDeleteObjects([this.id]); });


        this.addParam(this.paramFill   = new FillParam  ('fill',   'fill',   false, true, true, FillValue.create(0, 0, 0, 100)));
        this.addParam(this.paramWeight = new NumberParam('weight', 'weight', true,  true, true, 1, 0));
        this.addParam(this.paramFit    = new SelectParam('fit',    'fit',    true,  true, true, ['inside', 'edge', 'outside'], 0));
        this.addParam(this.paramJoin   = new SelectParam('join',   'join',   true,  true, true, ['miter', 'bevel', 'round'], 0));
        this.addParam(this.paramMiter  = new NumberParam('miter',  'miter',  true,  true, true, 28.96, 0, 180, 2));

        this.paramMiter.control.setSuffix('°', true);
        this.paramMiter.canShow = () => this.paramJoin.value == 0;


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

        // if (!isEmpty(this.cache))
        //     return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const paramIds = [];

        
        const input = this.node.inputs[0];

        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));

            for (const param of this.node.params)
                if (      param.input 
                       && param.input.connected
                       && param.canShow() 
                    || SHAPE_TYPES.includes(input.connectedOutput.type)) 
                    paramIds.push(param.id);
        }
        else
        {
            for (const param of this.node.params)
                if (param.canShow())
                    paramIds.push(param.id);
        }


        request.push(paramIds.length);

        for (const paramId of paramIds)
            request.push(paramId, ...this.node.params.find(p => p.id == paramId).genRequest(gen));            


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const fill = values[paramIds.findIndex(id => id == 'fill')];
        
        this._color = 
            fill.isValid()
            ? fill.color.toDataColor()
            : dataColor_NaN;

        super.updateValues(updateParamId, paramIds, values);
    }



    updateHeader()
    {
        //console.log(this.id + '.OpStroke.updateHeader()');


        const colors =
              this.inputIsShape
            ? OperatorBase.prototype.getHeaderColors.call(this)
            : this.getHeaderColors();


        this.header.style.background = 
            !rgbIsNaN(colors.back)
            ? rgba2style(colors.back) 
            : 'transparent';

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


        this.inputs[0] .colorLight = 
        this.inputs[0] .colorDark  = colors.input;
        this.inputs[0] .wireColor  = colors.wire;

        this.outputs[0].colorLight =
        this.outputs[0].colorDark  = colors.output;
        this.outputs[0].wireColor  = colors.wire;


        this.updateWarningOverlay();
        this.updateWarningOverlayStyle(colors.back, this.inputIsShape ? -1 : 45);


        Operator.prototype.updateHeader.call(this);
    }



    updateParams()
    {
        const enableFill = !this.paramFill.input.connected;
 
        const enable = 
               !this.inputs[0].connected
            || !SHAPE_TYPES.includes(this.inputs[0].connectedOutput.type);

        this.paramFill  .enableControlText(enableFill);
        this.paramWeight.enableControlText(enable);
        this.paramFit   .enableControlText(enable);
        this.paramJoin  .enableControlText(enable);
        this.paramMiter .enableControlText(enable);

        super.updateParams();
    }

    

    getHeaderColors(options = {})
    {
        if (    this.inputIsShape
            && !options.color)
            return Operator.prototype.getHeaderColors.call(this);
 

        const colors  = super.getHeaderColors();

        colors.back = rgb_a(colors.back, this.paramFill.value.opacity.value/100);
        colors.text = getTextColorFromBackColor(colors.back, this.paramFill.value.opacity.value/100);

        return colors;
    }
}