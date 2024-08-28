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

    diagAspect;

    menuAspect;


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


        this.diagAspect     = false;


        this.colorBack      = createDiv('colorBack');
        this.checkersHolder = createDiv('nodeHeaderCheckersHolder');
        this.checkers       = createDiv('nodeHeaderCheckers');

        this.inner.appendChild(this.colorBack);
        this.inner.insertBefore(this.checkersHolder, this.header);

        this.checkersHolder.appendChild(this.checkers);


        this.addNewInput();
        this.addOutput(new Output([GRADIENT_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));
        

        this.addParam(this.paramType     = new SelectParam('gradType', '',         false, true, true, ['linear', 'radial', 'angular', 'diamond'], 0));
        this.addParam(this.paramPosition = new SelectParam('position', 'position', false, true, true, ['proportional', 'relative W', 'relative H', 'absolute', 'canvas'], 1));
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


        this.menuAspect = createGradientParamMenu(this.paramAspect, 'diagAspect');
    }
    
    
    
    addNewInput()
    {
        const input = new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE, GRADIENT_VALUE, LIST_VALUE]);
        input.isNew = true;


        input.addEventListener('connect', e => 
        { 
            onVariableConnectInput(e.detail.input); 
            input.isNew = false; 
        });
        

        input.addEventListener('disconnect', e => 
        {
            onVariableDisconnectInput(e.detail.input);
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


        const inputIsGradient =
               connectedInputs.length == 1
            && connectedInputs[0].connected
            && connectedInputs[0].connectedOutput.types.includes(GRADIENT_VALUE);

            
        const paramIds = [];

        if (inputIsGradient)
        {
            for (const param of this.node.params)
                if (   param.input 
                    && (   param.input.connected
                        || param.alwaysRequest)
                    && param.canShow())
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


        // request.push(...this.node.paramType    .genRequest(gen));
        // request.push(...this.node.paramPosition.genRequest(gen));
        // request.push(...this.node.paramX       .genRequest(gen));
        // request.push(...this.node.paramY       .genRequest(gen));
        // request.push(...this.node.paramSize    .genRequest(gen));
        // request.push(...this.node.paramAngle   .genRequest(gen));
        // request.push(...this.node.paramAspect  .genRequest(gen));
        // request.push(...this.node.paramSkew    .genRequest(gen));
        // request.push(...this.node.paramBlend   .genRequest(gen));


        request.push(this.node.diagAspect ? 1 : 0);

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        this.value = values[paramIds.findIndex(id => id == 'value')];

        const gradType = values[paramIds.findIndex(id => id == 'gradType')];
        const position = values[paramIds.findIndex(id => id == 'position')];
        const x        = values[paramIds.findIndex(id => id == 'x'       )];
        const y        = values[paramIds.findIndex(id => id == 'y'       )];
        const size     = values[paramIds.findIndex(id => id == 'size'    )];
        const angle    = values[paramIds.findIndex(id => id == 'angle'   )];
        const aspect   = values[paramIds.findIndex(id => id == 'aspect'  )];
        const skew     = values[paramIds.findIndex(id => id == 'skew'    )];
        const blend    = values[paramIds.findIndex(id => id == 'blend'   )];

        this.paramType    .setValue(gradType, false, true, false);
        this.paramPosition.setValue(position, false, true, false);
        this.paramX       .setValue(x,        false, true, false);
        this.paramY       .setValue(y,        false, true, false);
        this.paramSize    .setValue(size,     false, true, false);
        this.paramAngle   .setValue(angle,    false, true, false);
        this.paramAspect  .setValue(aspect,   false, true, false);
        this.paramSkew    .setValue(skew,     false, true, false);
        this.paramBlend   .setValue(blend,    false, true, false);

        this.rgbaBack = this.value.toRgba();
        //console.log('this.rgbaBack =', this.rgbaBack);
    }



    updateParams()
    {
        super.updateParams();


        const inputIsGradient =
               this.headerInputs.length == 2
            && this.headerInputs.at(-1).isNew
            && this.headerInputs[0].connected
            && this.headerInputs[0].connectedOutput.types.includes(GRADIENT_VALUE);

        this.paramType    .enableControlText(!inputIsGradient, this.paramType    .isUnknown());
        this.paramPosition.enableControlText(!inputIsGradient, this.paramPosition.isUnknown());
        this.paramX       .enableControlText(!inputIsGradient, this.paramX       .isUnknown());
        this.paramY       .enableControlText(!inputIsGradient, this.paramY       .isUnknown());
        this.paramSize    .enableControlText(!inputIsGradient, this.paramSize    .isUnknown());
        this.paramAngle   .enableControlText(!inputIsGradient, this.paramAngle   .isUnknown());
        this.paramAspect  .enableControlText(!inputIsGradient, this.paramAspect  .isUnknown());
        this.paramSkew    .enableControlText(!inputIsGradient, this.paramSkew    .isUnknown());
        this.paramBlend   .enableControlText(!inputIsGradient, this.paramBlend   .isUnknown());


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


        const pre = 
            this.paramType.value.value == 3
            ?   '<span style="font-size: 6px; position: relative; top: -1px;">' 
              + (this.diagAspect ? '□' : '◇') 
              + '</span> '
            : '';

        this.paramAspect.setName(pre + 'aspect', true);


        this.updateParamControls();
    }



    updateHeader()
    {
        super.updateHeader();


        const colors = this.getHeaderColors();
        const stops  = [...this.value.stops.items];


        if (   this.isUnknown()
            || stops.length == 0)
        {
            updateFillHeader(this, colors, false);

            this._warningOverlay.style.height  = this.measureData.headerOffset.height;
            this._warningOverlay.style.display = 'block';

            return;
        }
        else
            this._warningOverlay.style.display = 'none';

        
        if (    this.isUnknown()
            || !this.value.stops.items.some(value => value.isValid()))
            this.checkers.style.display = 'none';

        else
            updateHeaderCheckers(this, colors, true);


        const outlineColor = darkMode ? '#000' : '#fff';


        // single-stop gradient

        if (stops.length == 1)
            this.header.style.background = rgba2style(stops[0].fill.toRgba());


        // multi-stop gradient

        else if (stops.length > 1)
        {
            if (this.value.gradType.value == 3) this.createDiamondGradient(stops.map(s => s.copy()), this.value.gradType.value);
            else                                this.createNormalGradient(stops.map(s => s.copy()));
        }


        this.header.style.backgroundColor =
            stops.length > 0 
            ?  rgba2style(stops.at(-1).fill.toRgba())
            : 'transparent';


        this.divIcon  .style.filter = 'drop-shadow(0 0 1px ' + outlineColor + ')';
        this.labelText.style.filter = 'drop-shadow(0 0 1px ' + outlineColor + ')';
    }



    getHeaderColors(options = {})
    {
        const colors  = super.getHeaderColors(options);
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
        }

        return colors;
    }



    createNormalGradient(stops)
    {
        let gradient = '';


        switch (this.value.gradType.value)
        {
            case 0: gradient += 'linear-gradient';  break;
            case 1: gradient += 'radial-gradient';  break;
            case 2: gradient += 'conic-gradient';   break;
         // case 3: gradient += 'diamond-gradient'; break;
        }


        gradient += '(';


        const aspect = this.measureData.headerOffset.width / nozero(this.measureData.headerOffset.height);

        switch (this.value.gradType.value)
        {
            case 0: 
                gradient += (this.value.angle.value + 90) + 'deg'; 
                break;

            case 1: 
                gradient += 'circle ' + (aspect >= 1 ? 'closest' : 'farthest') + '-side at center';
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


        this.antialiasGradientStops(stops);


        for (let i = 0; i < stops.length; i++)
        {
            const stop = stops[i];
            gradient += ', ' + rgba2style(stop.fill.toRgba()) + ' ' + (stop.position.value) + '%';
        }


        gradient += ')';


        this.header.style.background = gradient;

        this.header
            .querySelectorAll('.gradient-part')
            .forEach(e => this.header.removeChild(e));


        if (this.value.gradType.value == 1)
        {
            const ha = 
                this.measureData.headerOffset.width 
                / this.measureData.headerOffset.height;


            this.header.style.backgroundPosition = '50% 50%';
            this.header.style.backgroundRepeat   = 'no-repeat';

            if (this.value.gradType.value > 0)
                this.header.style.backgroundSize = Math.max(50, 70*ha)+'% ' + Math.max(50, 70*ha)+'%';
            else
                this.header.style.backgroundSize = '100% 100%';
        }
    }



    createDiamondGradient(stops, type)
    {
        this.antialiasGradientStops(stops);

        
        const strStops = this.getGradientStops(stops, type);

        const ha = 
              this.measureData.headerOffset.width 
            / this.measureData.headerOffset.height;


        let angle = trimAngle(this.value.angle.value);

        const parts = 
        [
            { direction: 'to top left',     clip: 'polygon(50% 0%, 0% 50%, 50% 50%)',     rotation: trimAngle(angle, 0, 360)},
            { direction: 'to top right',    clip: 'polygon(50% 0%, 50% 50%, 100% 50%)',   rotation: trimAngle(angle, 0, 360)},
            { direction: 'to bottom left',  clip: 'polygon(0% 50%, 50% 100%, 50% 50%)',   rotation: trimAngle(angle, 0, 360)},
            { direction: 'to bottom right', clip: 'polygon(50% 50%, 50% 100%, 100% 50%)', rotation: trimAngle(angle, 0, 360)}
        ];

        
        parts.forEach(part =>
        {
            const div = createDiv();
            
            div.className = 'gradient-part';

            div.style.top        = (-100*(ha-1)/2) + '%';
            div.style.height     = (100*ha) + '%';
            div.style.background = `linear-gradient(${part.direction} ${strStops})`;
            div.style.clipPath   =  part.clip;
            div.style.transform  = `rotate(${part.rotation}deg)`;

            this.header.insertBefore(div, this.labelWrapper);
        });
    }



    getGradientExtremes(stops)
    {
        let minPos = Number.MAX_SAFE_INTEGER;
        let maxPos = Number.MIN_SAFE_INTEGER;

        for (const stop of stops)
        {
            minPos = Math.min(minPos, stop.position.value);
            maxPos = Math.max(maxPos, stop.position.value);
        }

        return {minPos, maxPos};
    }



    getGradientStops(stops, type)
    {
        let gradient = '';

        
        const {minPos, maxPos} = this.getGradientExtremes(stops);

        for (const stop of stops)
            stop.position.value = (stop.position.value - minPos) / nozero(maxPos - minPos) * 100;


        const _stops = stops.slice();

        if (type == 3)
        {
            _stops.forEach(s => s.position.value = 100 - (100 - s.position.value) / 2);
            _stops.forEach(s => s.position.value =  50 + (s.position.value - 50) / 2 * (Math.sqrt(2)/2));
        }


        for (let i = 0; i < _stops.length; i++)
        {
            const stop = _stops[i];

            gradient += 
                  ', ' + rgba2style(stop.fill.toRgba()) 
                + ' '  + (stop.position.value) + '%';
        }


        return gradient;
    }



    antialiasGradientStops(stops)
    {
        const th = 1;// / graph.currentPage.zoom;
        const c  = Math.floor(stops.length/2);

        
        for (let i = c; i > 0; i--)
        {
            const di = stops[i].position.value - stops[i-1].position.value;

            if (di < th)
            {
                for (let k = i; k <= c; k++)
                    stops[k].position.value += th;
            }
        }


        for (let i = c-1; i < stops.length-1; i++)
        {
            const dj = stops[i+1].position.value - stops[i].position.value;

            if (dj < th)
            {
                for (let k = i; k >= c; k--)
                    stops[k].position.value -= th;
            }
        }
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        let json = super.toJsonBase(nTab);

        json += 
              ',\n' + pos + tab + '"diagAspect": "'  + this.diagAspect  + '"';

        return json;
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);

        if (_node.diagAspect)
            this.diagAspect  = parseBool(_node.diagAspect);
    }
}



function createGradientParamMenu(param, valueId)
{
    const menu = new Menu('Aspect', false, true);

    menu.minWidth = 130;
    
    menu.addItems([
        new MenuItem('◆ diamond',  null, false, {checkCallback: () => !param.node[valueId], callback: () => { hideAllMenus(); actionManager.do(new SetNodeParamAction(param.node.nodeId, valueId, false)); }}),
        new MenuItem('■ rectangle', null, false, {checkCallback: () =>  param.node[valueId], callback: () => { hideAllMenus(); actionManager.do(new SetNodeParamAction(param.node.nodeId, valueId, true )); }})]);

    param.div.addEventListener('pointerdown', e => { if (param.node.paramType.value.value == 3) param.node.showParamMenu(e, param, menu); });

    return menu;
}
