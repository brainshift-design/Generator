class   OpGradient
extends OpColorBase
{
    paramType;
    paramPosition;
    paramX;
    paramY;
    paramSize;
    paramAngle;
    paramAspect;
    paramSkew;
    paramBlend;


    checkersHolder;
    checkers;
    colorBack;

    value = new GradientValue();



    constructor()
    {
        super(GRADIENT, 'grad', 'gradient', iconGradient);

        this.iconOffsetY    = 1;
        this.canDisable     = true;
        this.variableInputs = true;


        this.colorBack      = createDiv('colorBack');
        this.checkersHolder = createDiv('nodeHeaderCheckersHolder');
        this.checkers       = createDiv('nodeHeaderCheckers');

        this.inner.appendChild(this.colorBack);
        this.inner.insertBefore(this.checkersHolder, this.header);

        this.checkersHolder.appendChild(this.checkers);


        this.addNewInput();
        this.addOutput(new Output([GRADIENT_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));
        

        this.addParam(this.paramType     = new SelectParam('gradType', '',         false, true, true, ['linear', 'radial', 'angular', 'diamond'], 0));
        this.addParam(this.paramPosition = new SelectParam('position', 'position', false, true, true, ['proportional', 'relative W', 'relative H', 'absolute'], 1));
        this.addParam(this.paramX        = new NumberParam('x',        'x',        true,  true, true,   0));
        this.addParam(this.paramY        = new NumberParam('y',        'y',        true,  true, true,  50));
        this.addParam(this.paramSize     = new NumberParam('size',     'size',     true,  true, true, 100));
        this.addParam(this.paramAngle    = new NumberParam('angle',    'angle',    true,  true, true,   0));
        this.addParam(this.paramAspect   = new NumberParam('aspect',   'aspect',   true,  true, true, 100));
        this.addParam(this.paramSkew     = new NumberParam('skew',     'skew',     true,  true, true,   0));
        this.addParam(this.paramBlend    = new SelectParam('blend',    'blend',    false, true, true, BlendModes.map(bm => bm[1]), 0));


        this.paramX     .controls[0].suffix        = '%';
        this.paramY     .controls[0].suffix        = '%';
        this.paramSize  .controls[0].suffix        = '%';
        this.paramAngle .controls[0].suffix        = '°';
        this.paramAngle .controls[0].suffixOffsetY = -4;
        this.paramAspect.controls[0].suffix        = '%';
        this.paramSkew  .controls[0].suffix        = '%';
    }
    
    
    
    addNewInput()
    {
        const input = new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE, GRADIENT_VALUE, LIST_VALUE]);
        input.isNew = true;


        input.addEventListener('connect', e => 
        { 
            onVariableListConnectInput(e.detail.input); 
            input.isNew = false; 
        });
        

        input.addEventListener('disconnect', e => 
        {
            onVariableListDisconnectInput(e.detail.input);
        });


        this.addInput(input);

        
        return input;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.node.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

        
        request.push(...this.node.paramType    .genRequest(gen));
        request.push(...this.node.paramPosition.genRequest(gen));
        request.push(...this.node.paramX       .genRequest(gen));
        request.push(...this.node.paramY       .genRequest(gen));
        request.push(...this.node.paramSize    .genRequest(gen));
        request.push(...this.node.paramAngle   .genRequest(gen));
        request.push(...this.node.paramAspect  .genRequest(gen));
        request.push(...this.node.paramSkew    .genRequest(gen));
        request.push(...this.node.paramBlend   .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        this.value     = values[paramIds.findIndex(id => id == 'value'   )];

        // const gradType = values[paramIds.findIndex(id => id == 'gradType')];
        // const position = values[paramIds.findIndex(id => id == 'position')];
        // const x        = values[paramIds.findIndex(id => id == 'x'       )];
        // const y        = values[paramIds.findIndex(id => id == 'y'       )];
        // const size     = values[paramIds.findIndex(id => id == 'size'    )];
        // const angle    = values[paramIds.findIndex(id => id == 'angle'   )];
        // const aspect   = values[paramIds.findIndex(id => id == 'aspect'  )];
        // const skew     = values[paramIds.findIndex(id => id == 'skew'    )];
        // const blend    = values[paramIds.findIndex(id => id == 'blend'   )];

        this.paramType    .setValue(this.value.gradType, false, true, false);
        this.paramPosition.setValue(this.value.position, false, true, false);
        this.paramX       .setValue(this.value.x,        false, true, false);
        this.paramY       .setValue(this.value.y,        false, true, false);
        this.paramSize    .setValue(this.value.size,     false, true, false);
        this.paramAngle   .setValue(this.value.angle,    false, true, false);
        this.paramAspect  .setValue(this.value.aspect,   false, true, false);
        this.paramSkew    .setValue(this.value.skew,     false, true, false);
        this.paramBlend   .setValue(this.value.blend,    false, true, false);
    }



    updateParams()
    {
        super.updateParams();

        this.paramX   .controls[0].resetRanges();
        this.paramY   .controls[0].resetRanges();
        this.paramSize.controls[0].resetRanges();
        this.paramSkew.controls[0].resetRanges();


        const pos = this.paramPosition.value.value;

        this.paramX   .controls[0].suffix = pos < 3 ? '%' : '';
        this.paramY   .controls[0].suffix = pos < 3 ? '%' : '';
        this.paramSize.controls[0].suffix = pos < 3 ? '%' : '';
        this.paramSkew.controls[0].suffix = pos < 3 ? '%' : '';

        this.paramX   .controls[0].displayMin = pos < 3 ?   0 : Number.MIN_SAFE_INTEGER;
        this.paramX   .controls[0].displayMax = pos < 3 ? 100 : Number.MAX_SAFE_INTEGER;

        this.paramY   .controls[0].displayMin = pos < 3 ?   0 : Number.MIN_SAFE_INTEGER;
        this.paramY   .controls[0].displayMax = pos < 3 ? 100 : Number.MAX_SAFE_INTEGER;


        this.updateParamControls();
    }



    updateHeader()
    {
        super.updateHeader();


        const colors = this.getHeaderColors();

        if (this.isUnknown())
        {
            updateFillHeader(this, colors);
            return;
        }

        
        if (    this.isUnknown()
            || !this.value.stops.items.some(value => value.isValid()))
            this.checkers.style.display = 'none';

        else
            updateHeaderCheckers(this, colors);


        let gradient = '';


        const stops = [...this.value.stops.items];


        // single-stop gradient

        if (stops.length == 1)
            this.header.style.background = rgba2style(stops[0].fill.toRgba());


        // multi-stop gradient

        else if (stops.length > 1)
        {
            switch (this.value.gradType.value)
            {
                case 0: gradient += 'linear-gradient'; break;
                case 1: gradient += 'radial-gradient'; break;
                case 2: gradient += 'conic-gradient';  break;
                case 3: gradient += 'radial-gradient'; break;
            }


            gradient += '(';


            const aspect = this.measureData.headerOffset.width / nozero(this.measureData.headerOffset.height);

            switch (this.value.gradType.value)
            {
                case 0: 
                    gradient += (this.value.angle.value + 90) + 'deg'; 
                    break;

                case 1: 
                case 3:
                    gradient += 'circle ' + (aspect >= 1 ? 'closest' : 'farthest') + '-side at center';
                    // switch (this.value.position.value)
                    // {
                    //     case 0: gradient += 'ellipse closest-side at center '; break;
                    //     case 1: gradient += 'circle ' + (aspect >= 1 ? 'farthest' : 'closest') + '-side at center';  break;
                    //     case 2: gradient += 'circle ' + (aspect >= 1 ? 'closest' : 'farthest') + '-side at center';   break;
                    //     case 3: gradient += 'circle closest-side at center';   break;
                    // }
                    break;

                case 2: 
                    gradient += 'from ' + (this.value.angle.value + 90) + 'deg';
                    break;
            }


            let minPos = Number.MAX_SAFE_INTEGER;
            let maxPos = Number.MIN_SAFE_INTEGER;

            for (const stop of stops)
            {
                minPos = Math.min(minPos, stop.position.value);
                maxPos = Math.max(maxPos, stop.position.value);
            }

            for (const stop of stops)
                stop.position.value = (stop.position.value - minPos) / nozero(maxPos - minPos) * 100;


            for (let i = 0; i < stops.length; i++)
            {
                const stop = stops[i];
                gradient += ', ' + rgba2style(stop.fill.toRgba()) + ' ' + (stop.position.value) + '%';
            }


            gradient += ')';


            this.header.style.background         = gradient;
            this.header.style.backgroundPosition = '50% 50%';
    
            if (this.value.gradType.value > 0)
                this.header.style.backgroundSize = '150% 150%';
            else
                this.header.style.backgroundSize = '100% 100%';
        }
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);


        const unknown = this.inputs.some(i => i.isUncached());


        if (!unknown)
        {
            let rgbaBack = rgba_NaN;

            for (const stop of this.value.stops.items)
            {
                rgbaBack = 
                    rgbaIsNaN(rgbaBack)
                    ? stop.fill.toRgba()
                    : rgbaMuls(rgbaAdd(rgbaBack, stop.fill.toRgba()), 0.5);
            }

            const gray = this.value.stops.items.length == 0;

            colors.text = 
                gray
                ? (darkMode ? [1, 1, 1, 1] : [0, 0, 0, 1]) 
                : getTextColorFromBackColor(getStripeBackColor(rgbaBack));

            if (gray)
            {
                colors.input   = rgb_a(colors.text, 0.35);
                colors.inWire  = rgbFromType(ANY_VALUE, true);
                colors.output  = rgb_a(colors.text, 0.35);
                colors.outWire = rgbFromType(ANY_VALUE, true);
            }
            else
            {
                colors.input   = rgb_a(colors.text, 0.35);
                colors.inWire  = rgbFromType(ANY_VALUE, true);
                colors.output  = rgb_a(colors.text, 0.35);
            }
        }


        return colors;
    }
}
