class OpColorFill
extends OpColorBase
{
    paramColor;
    paramOpacity;

    checkers;
    colorBack;


    constructor()
    {
        super(COLOR_FILL, 'fill');


        this.colorBack = createDiv('colorBack');
        this.inner.appendChild(this.colorBack);

        this.addInput (new Input(COLOR_FILL_TYPES));
        this.addOutput(new Output(COLOR_FILL, this.output_genRequest));

        this.initContentInput(this.inputs[0], 0);


        this.addParam(this.paramColor   = new ColorParam ('color',   '',        false, true, true));
        this.addParam(this.paramOpacity = new NumberParam('opacity', 'opacity', true,  true, true, 100, 0, 100));

        //this.paramFill.setValue([GColorFill.default], false, true);
        
        this.paramOpacity.control.suffix = '%';
    

        this.checkers = createDiv('nodeHeaderCheckers');
        this.inner.insertBefore(this.checkers, this.header);
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
                if (param.input && param.input.connected) 
                    paramIds.push(param.id);

            request.push(paramIds.join(','));

            if (this.node.paramColor  .input.connected) request.push(...this.node.paramColor  .genRequest(gen));
            if (this.node.paramOpacity.input.connected) request.push(...this.node.paramOpacity.genRequest(gen));
        }
        else
        {
            request.push(
                ...this.node.paramColor  .genRequest(gen),
                ...this.node.paramOpacity.genRequest(gen));
        }


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const fill    = values[paramIds.findIndex(id => id == 'value')];

        const color   = values[paramIds.findIndex(id => id == 'color')];
        const opacity = values[paramIds.findIndex(id => id == 'opacity')];


        if (fill.isValid())
        {
            this.paramColor  .setValue(fill.color,    false, true, false);
            this.paramOpacity.setValue(fill.opacity,  false, true, false);

            this._color = fill.color.toDataColor();
        }
        else
        {
            this.paramColor  .setValue(color,   false, true, false);
            this.paramOpacity.setValue(opacity, false, true, false);
            
            this._color = dataColor_NaN;
        }


        super.updateValues(updateParamId, paramIds, values);
    }



    updateHeader()
    {
        //console.log(this.id + '.OpColorFill.updateHeader()');


        // if (dataColorIsNaN(this._color))
        //     return;


        const colors = this.getHeaderColors();

        this.colorBack.style.background = 
            this.canShowColor()
            ? rgb2style(colors.back)
            : isDarkMode()
              ? '#888088ee'
              : '#ead8eaee';

              
        this.checkers.style.height = this.header.offsetHeight;

        this.checkers.style.background =
            isDarkMode()
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

        this.checkers.style.display            = this.canShowColor() ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor    = isDarkMode() ? '#444' : '#fff';

        this.checkers.style.backgroundSize     = '26px 26px';
        this.checkers.style.backgroundPosition = '0 0, 13px 13px';
                        
        const op = this.paramOpacity.value/100;

        this.header.style.background = //'transparent';
            this.canShowColor()
            ? colorStyleRgb_a(colors.back, op)
            : 'transparent';//isDarkMode()
            //? '#888088ee'
            //: '#ead8eaee';


        const noColor = [0.7, 0.7, 0.7];

        this.inputs[0] .wireColor  = this.canShowColor() ? colors.back : noColor;
        this.inputs[0] .colorLight = 
        this.inputs[0] .colorDark  = rgb_a(colors.input, 0.12);

        this.outputs[0].wireColor  = this.canShowColor() ? colors.back : noColor;
        this.outputs[0].colorLight =
        this.outputs[0].colorDark  = rgb_a(colors.output, 0.12);


        this.updateWarningOverlay();
        this.updateWarningOverlayStyle(colors.back, 45);


        Operator.prototype.updateHeader.call(this);
    }



    getHeaderColors()
    {
        const colBack = 
            dataColorIsNaN(this._color)
            ? rgb_NaN
            : dataColor2rgb(this._color);

        const darkText = 
              !this.canShowColor()
            || rgb2hclokl(colBack)[2] > 0.71;

            
        const colText = 
            this.canShowColor()
            ? (this.paramOpacity.value >= 50
               ? (darkText 
                  ? [0, 0, 0, 0.6] 
                  : [1, 1, 1, 0.7])
               : (isDarkMode()
                  ? [1, 1, 1, 0.7]
                  : [0, 0, 0, 0.6])) 
            : (isDarkMode()
               ? [1, 1, 1, 0.7]
               : [0, 0, 0, 0.6]);

        const textStyle = rgba2style(colText);

        
        const colInput  = colText;//this.canShowColor() ? colText : [0, 0, 0, 0.12];
        const colOutput = colText;//this.canShowColor() ? colText : [0, 0, 0, 0.1 ];


        return {
            back:      colBack, 
            text:      colText,
            darkText:  darkText,
            textStyle: textStyle,
            input:     colInput,
            output:    colOutput };
    }
}