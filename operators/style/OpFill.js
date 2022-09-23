class OpFill
extends OpColorBase
{
    paramColor;
    paramOpacity;

    checkers;
    colorBack;



    get inputIsShape() 
    {
        return this.inputs[0].connected
            && SHAPE_TYPES.includes(this.inputs[0].connectedOutput.type);
    }
    
    
    
    constructor()
    {
        super(FILL, 'solid');


        this.colorBack = createDiv('colorBack');
        this.checkers  = createDiv('nodeHeaderCheckers');

        //this.inner.appendChild(this.colorBack);
        this.inner.insertBefore(this.checkers, this.header);


        this.addInput (new Input([FILL, FILL_VALUE, ...SHAPE_TYPES], this.input_getValuesForUndo));
        this.addOutput(new Output(FILL, this.output_genRequest));


        this.inputs[0].addEventListener('connect',    () =>   this.outputs[0]._type = this.inputs[0].connectedOutput.type);
        this.inputs[0].addEventListener('disconnect', () => { this.outputs[0]._type = FILL; uiDeleteObjects([this.id]); });


        this.initContentInput(
            this.inputs[0],
            0, 
            () =>  this.inputs[0].connected
                && this.inputs[0].connectedOutput.type == FILL);


        this.addParam(this.paramColor   = new ColorParam ('color',   '',        false, true, true, ColorValue.fromRgb(rgbDefaultFill)));
        this.addParam(this.paramOpacity = new NumberParam('opacity', 'opacity', true,  true, true, 100, 0, 100));

        this.paramOpacity.control.suffix = '%';
    }
    
    
    
    input_getValuesForUndo()
    {
        return [ 
            [this.node.paramColor  .id, 
             this.node.paramColor  .value],

            [this.node.paramOpacity.id, 
             this.node.paramOpacity.value] ];
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


        const paramIds = [];


        const input = this.node.inputs[0];

        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));

            for (const param of this.node.params)
                if (      param.input 
                       && param.input.connected
                       && param.show()
                    || SHAPE_TYPES.includes(input.connectedOutput.type)) 
                    paramIds.push(param.id);
        }
        else
        {
            for (const param of this.node.params)
                if (param.show())
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
        const color   = values[paramIds.findIndex(id => id == 'color'  )];
        const opacity = values[paramIds.findIndex(id => id == 'opacity')];


        this.paramColor  .setValue(color,   false, true, false);
        this.paramOpacity.setValue(opacity, false, true, false);


        this._color = 
            color.isValid()
            ? color.toDataColor()
            : dataColor_NaN;


        super.updateValues(updateParamId, paramIds, values);
    }



    updateColorControl()
    {
        if (this.paramOpacity.value.isValid())
            this.paramColor.checkers.style.opacity = 
                this.inputIsShape 
                ? (100 - this.paramOpacity.value.toNumber()) + '%'
                : 0;


        const colors = this.getHeaderColors({color: true});

        colors.text   = getTextColorFromBackColor(colors.back, this.inputIsShape ? colors.back[3] : 1);
        colors.input  = rgb_a(colors.text, 0.2);
        colors.output = rgb_a(colors.text, 0.2);


        this.paramColor.control. backStyleLight = 
        this.paramColor.control. backStyleDark  = 
        this.paramColor.control.valueStyleLight = 
        this.paramColor.control.valueStyleDark  = rgba2style(rgb_a(colors.back, 1));

        this.paramColor.control.textStyleLight  = 
        this.paramColor.control.textStyleDark   = rgba2style(colors.text);

        this.paramColor. input.colorLight       =
        this.paramColor. input.colorDark        = colors.input;
        
        this.paramColor.output.colorLight       =
        this.paramColor.output.colorDark        = colors.output;
        
        this.paramColor. input.wireColor        = rgb_a(colors.wire, 1);
        this.paramColor.output.wireColor        = rgb_a(colors.wire, 1);
    }



    updateNode()
    {
        this.updateColorControl();

        super.updateNode();
    }



    updateHeader()
    {
        //console.log(this.id + '.OpFill.updateHeader()');
        
        Operator.prototype.updateHeader.call(this);


        const colors =
              this.inputIsShape
            ? OperatorBase.prototype.getHeaderColors.call(this)
            : this.getHeaderColors();


        this.header.style.background = 
            !rgbIsNaN(colors.back)
            ? rgba2style(colors.back) 
            : 'transparent';

        this.colorBack.style.background = 
            !rgbIsNaN(colors.back)
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
                        

        this.inputs[0] .colorLight = 
        this.inputs[0] .colorDark  = colors.input;
        this.inputs[0] .wireColor  = colors.wire;

        this.outputs[0].colorLight =
        this.outputs[0].colorDark  = colors.output;
        this.outputs[0].wireColor  = colors.wire;


        this.updateWarningOverlay();
        this.updateWarningOverlayStyle(colors.back, this.inputIsShape ? -1 : 45);
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();
        

        const colors                = this.getHeaderColors();

        this.label.style.color      = rgba2style(colors.text);
        this.label.style.fontWeight = this.active ? 'bold' : 'normal';
    }



    getHeaderColors(options = {})
    {
        if (    this.inputIsShape
            && !options.color)
            return Operator.prototype.getHeaderColors.call(this);

            
        const colors  = super.getHeaderColors();

        colors.back   = rgb_a(colors.back, this.paramOpacity.value.value/100);
        colors.text   = getTextColorFromBackColor(colors.back, colors.back[3]);
        colors.input  = rgb_a(colors.text, 0.2);
        colors.output = rgb_a(colors.text, 0.2);
        colors.wire   = colors.back;
        
        return colors;
    }
}