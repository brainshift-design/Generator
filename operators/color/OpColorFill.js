class OpColorFill
extends OpColorBase
{
    paramColor;
    paramOpacity;

    checkers;


    
    constructor()
    {
        super(COLOR_FILL, 'fill');


        this.addInput (new Input([COLOR_FILL, COLOR_FILL_VALUE]));
        this.addOutput(new Output(COLOR_FILL, this.output_genRequest));

        this.addParam(this.paramColor   = new ColorParam ('color',   '',        false, true, true));
        this.addParam(this.paramOpacity = new NumberParam('opacity', 'opacity', true,  true, true, 100, 0, 100));

        //this.paramFill.setValue([GColorFill.default], false, true, false);
        
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

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramColor  .genRequest(gen));
        request.push(...this.node.paramOpacity.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const fill = values[paramIds.findIndex(id => id == 'value')];


        if (fill.isValid())
        {
            this.paramColor  .setValue(fill.color,    false, true, false);
            this.paramOpacity.setValue(fill.opacity,  false, true, false);

            this._color = fill.color.toDataColor();
        }
        else
        {
            this.paramColor  .setValue(GColorValue .NaN, false, true, false);
            this.paramOpacity.setValue(GNumberValue.NaN, false, true, false);
            
            this._color = dataColor_NaN;
        }


        super.updateValues(updateParamId, paramIds, values);
    }



    updateHeader()
    {
        //console.log(this.id + '.OpColorFill.updateHeader()');


        if (dataColorIsNaN(this._color))
            return;


        const colors = this.getHeaderColors();

        
        this.checkers.style.height = this.header.offsetHeight;

        this.checkers.style.background =
            isDarkMode()
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';
              
        this.checkers.style.backgroundColor = isDarkMode() ? '#444' : '#fff';

        this.checkers.style.backgroundSize     = '26px 26px';
        this.checkers.style.backgroundPosition = '0 0, 13px 13px';
                        
        const op = this.paramOpacity.value/100;

        this.header.style.background = 
            this.canShowColor()
            ? colorStyleRgb_a(colors.back, op)
            : isDarkMode()
            ? '#888088ee'
            : '#ead8eaee';


        const noColor = [0.7, 0.7, 0.7];

        for (const input of this.inputs.filter(i => i.index <= 1))
        {
            input.wireColor  = this.canShowColor() ? colors.back : noColor;
            input.colorLight = 
            input.colorDark  = rgb_a(colors.input, 0.12);
        }


        for (const output of this.outputs.filter(i => i.index <= 1))
        {
            output.wireColor  = this.canShowColor() ? colors.back : noColor;
            output.colorLight
            output.colorDark  = rgb_a(colors.output, 0.12);
        }


        this.updateWarningOverlay();


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
            ? (   darkText 
               && this.paramOpacity.value >= 50
               ? [0, 0, 0, 0.6] 
               : [1, 1, 1, 0.7 ])
            : (isDarkMode()
               ? [1, 1, 1, 0.7 ]
               : [0, 0, 0, 0.6]);

        const textStyle = colorStyleRgba(colText);

        
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