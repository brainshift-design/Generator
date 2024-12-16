class OpExport
extends OpShapeBase
{
    static { operatorTypes[EXPORT] = this; }



    paramScale;
    paramFormat;
 // paramContents;
 // paramCrop;
    paramSuffix;
 // paramProfile;

    btnExport;

    objectIds;



    constructor()
    {
        super(EXPORT, 'export', 'export', '');

        this.subscription   = true;
        this.variableInputs = true;
        // this.iconOffsetY    = -1;


        this.addNewInput();

 
        this.addParam(this.paramScale    = new NumberParam('scale',   'scale',         true, true, true, 1, 0.01));
        this.addParam(this.paramFormat   = new OptionParam('format',  'format',        true, true, true, ['PNG', 'JPG', 'SVG', 'PDF'], 0));
     // this.addParam(this.paramContents = new NumberParam('contents','contents only', true, true, true, 1, 0, 1));
     // this.addParam(this.paramCrop     = new NumberParam('crop',    'crop',          true, true, true, 1, 0, 1));
        this.addParam(this.paramSuffix   = new   TextParam('suffix',  'suffix',        true, true, true));
     // this.addParam(this.paramProfile  = new OptionParam('profile', 'colors',        true, true, true, ['current', 'sRGB', 'P3'], 0));


        this.setAllParamDividers(0.47);
     // this.paramContents.divider = 0.7;
     // this.paramCrop    .divider = 0.7;


        this.addBaseParamsAfter();


        this.btnExport      = createDiv('btnExport');
        this.btnExport.over = false;
        this.btnExport.down = false;


        this.btnExport.addEventListener('pointerenter', e =>
        { 
            this.btnExport.over = true;  
            this.updateHeader(); 
        });


        this.btnExport.addEventListener('pointerleave', e =>
        { 
            this.btnExport.over = false; 
            this.updateHeader(); 
        });


        this.btnExport.addEventListener('pointerdown',  e =>
        { 
            this.btnExport.down = true; 
            this.updateHeader(); 


            e.stopPropagation();


            uiPostMessageToFigma(
            {
                cmd:      'figExport',
                objectIds: this.objectIds,
                scale:     this.paramScale .value.toNumber(),
                format:    this.paramFormat.value.toNumber(),
                suffix:    this.paramSuffix.value.value
            });


            // uiMakeNodeActive(this, true);


            // pushUpdate(null, [this]);


            setTimeout(() => 
            {
                this.btnExport.down = false;
                this.updateHeader(); 
            },
            200);


            // if (this.enabled)
            // {

            // }
        });


        // this.divIcon.addEventListener('pointerup',  e => 
        // { 
        //     console.log('up');
        //     e.stopPropagation();
        // });


        this.label.insertBefore(this.btnExport, this.labelText);
    }



    addNewInput()
    {
        const newInput = new Input([...SHAPE_VALUES, SHAPE_LIST_VALUE]);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { onVariableConnectInput(e.detail.input); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => onVariableDisconnectInput(e.detail.input));

        this.addInput(newInput);

        return newInput;
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.paramScale   .genRequest(gen));
        request.push(...this.paramFormat  .genRequest(gen));
     // request.push(...this.paramContents.genRequest(gen));
     // request.push(...this.paramCrop    .genRequest(gen));
        request.push(...this.paramSuffix  .genRequest(gen));
     // request.push(...this.paramProfile .genRequest(gen));
                                                    
        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateHeader()
    {
        super.updateHeader();

        this.updateExportIcon();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const objectIds = values[paramIds.findIndex(id => id == 'objectIds')].items.map(i => i.value);

        this.objectIds = objectIds;

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramScale   .enableControlText(true, this.paramScale   .isUnknown());
        this.paramFormat  .enableControlText(true, this.paramFormat  .isUnknown());
     // this.paramContents.enableControlText(true);
     // this.paramCrop    .enableControlText(true);
        this.paramSuffix  .enableControlText(true, this.paramSuffix  .isUnknown());
     // this.paramProfile .enableControlText(true, this.paramProfile .isUnknown());

     // updateParamConditionText(this.paramContents, this.paramContents.isUnknown(), false, 1);
     // updateParamConditionText(this.paramCrop,     this.paramCrop    .isUnknown(), false, 1);

        this.updateParamControls();
    }



    updateExportIcon()
    {
        const colors     = this.getHeaderColors();

        const headerStyle = rgba2style(
            rgb_a(
                colors.text, 
                this.btnExport.down 
                ? 1 
                : this.btnExport.over
                  ? 1 
                  : 0.5));

        this.btnExport.style.position           = 'relative';
        this.btnExport.style.top                = '-1px';
        this.btnExport.style.display            = 'inline-block';
        this.btnExport.style.background         =  this.btnExport.down
                                                  ? 'url(\'data:image/svg+xml;utf8,' + iconExport    .replaceAll('white', headerStyle) + '\')'
                                                  : 'url(\'data:image/svg+xml;utf8,' + iconExportDown.replaceAll('white', headerStyle) + '\')';

        this.btnExport.style.backgroundPosition = '50% 50%';
        this.btnExport.style.backgroundRepeat   = 'no-repeat';
    }
}