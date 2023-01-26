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
            && this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES);
    }



    constructor()
    {
        super(STROKE, 'stroke');


        this.colorBack = createDiv('colorBack');
        this.inner.appendChild(this.colorBack);

        this.addInput (this.createInputForObjects([...STROKE_TYPES, ...SHAPE_TYPES], this.input_getValuesForUndo));
        this.addOutput(new Output([STROKE], this.output_genRequest));


        this.addParam(this.paramFill   = new FillParam  ('fill',   'fill',   false, true, false, FillValue.create(0, 0, 0, 100)));
        this.addParam(this.paramWeight = new NumberParam('weight', 'weight', true,  true, false, 1, 0));
        this.addParam(this.paramFit    = new SelectParam('fit',    'align',  true,  true, false, ['inside', 'center', 'outside'], 0));
        this.addParam(this.paramJoin   = new SelectParam('join',   'join',   true,  true, false, ['miter', 'bevel', 'round'], 0));
        this.addParam(this.paramMiter  = new NumberParam('miter',  'miter',  true,  true, false, 28.96, 0, 180, 2));

        this.paramMiter.control.setSuffix('°', true);
        this.paramMiter.canShow = () => this.paramJoin.value == 0;


        this.checkers = createDiv('nodeHeaderCheckers');
        this.inner.insertBefore(this.checkers, this.header);
    }
    
    
    
    canAutoConnectFrom(output)
    {
        return output.supportsTypes(OBJECT_TYPES)
            || output.supportsTypes( COLOR_TYPES);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

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
                if (      (      param.input 
                              && param.input.connected
                              && param.canShow()
                           || input.connectedOutput.supportsTypes(OBJECT_TYPES)
                       && !input.connectedOutput.supportsTypes(STROKE_TYPES))
                    || param.id == 'fill')
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



    updateValues(actionId, updateParamId, paramIds, values)
    {
        const fill = values[paramIds.findIndex(id => id == 'fill')];

        this._color = 
               fill
            && fill.isValid()
            ? fill.color.toDataColor()
            : dataColor_NaN;

            
        this.outputs[0].types =
               this.inputs[0].connected
            && this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES)
            ? [...this.inputs[0].connectedOutput.types, STROKE]
            : [STROKE];

        // if (!this.inputs[0].connected
        //     && 
        // input.addEventListener('disconnect', () => uiDeleteObjectsAndStyles([this.id]));

        super.updateValues(actionId, updateParamId, paramIds, values);
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
            rgbIsOk(colors.back) //!rgbIsNaN(colors.back)
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
        //this.inputs[0] .wireColor  = colors.wire;

        this.outputs[0].colorLight =
        this.outputs[0].colorDark  = colors.output;
        //this.outputs[0].wireColor  = colors.wire;


        this.updateWarningOverlay();
        this.updateWarningOverlayStyle(colors.back, this.inputIsShape ? -1 : 45);


        Operator.prototype.updateHeader.call(this);
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();
        
        const colors = this.getHeaderColors();
        this.label.style.color = rgba2style(colors.text);
    }



    updateParams()
    {
        const enableFill = !this.paramFill.input.connected;
 
        const enable = 
               !this.inputs[0].connected
            //|| !this.inputs[0].connectedOutput.supportsTypes(SHAPE_TYPES)
            || !this.inputs[0].connectedOutput.supportsTypes(STROKE_TYPES);

        this.paramFill  .enableControlText(enableFill);
        this.paramWeight.enableControlText(enable);
        this.paramFit   .enableControlText(enable);
        this.paramJoin  .enableControlText(enable);
        this.paramMiter .enableControlText(enable);

        this.updateParamControls();
    }

    

    getHeaderColors(options = {})
    {
        if (    this.inputIsShape
            && !options.color)
            return Operator.prototype.getHeaderColors.call(this);
 

        const colors = super.getHeaderColors();

        colors.back = rgb_a(colors.back, this.paramFill.value.opacity.value/100);
        colors.text = getTextColorFromBackColor(colors.back, this.paramFill.value.opacity.value/100);

        return colors;
    }



    connectToSelected(selected)
    {
        console.assert(selected.length > 0);

        const node   = selected[0];
        const inputs = this.inputs.filter(i => i.types.includes(node.type));
    
        if (   node
            && node.outputs.length > 0
            && inputs.length > 0)
            actionManager.do(new ConnectAction(node.outputs[0], inputs[0]), true);
    }
}