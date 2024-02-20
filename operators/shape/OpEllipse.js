class   OpEllipse
extends OpShape
{
    paramPosition;
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramRound;
    paramStart;
    paramSweep;
    paramInner;

    innerAbsolute;
    sweepInDegrees;

    menuInner;
    menuSweep;
    
    
    constructor()
    {
        super(ELLIPSE, 'ellipse', 'ellipse', iconEllipse);

        this.canDisable  = true;
        this.iconOffsetY = -1;
        

        this.innerAbsolute  = false;
        this.sweepInDegrees = false;


        this.addInput (this.createInputForObjects([ELLIPSE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([ELLIPSE_VALUE], this.output_genRequest));


        this.addParam(this.paramPosition = new SelectParam('position', 'position', false, true, true, ['top-left', 'center'], 0));
        this.addParam(this.paramX        = new NumberParam('x',        'X',        true,  true, true,   0));
        this.addParam(this.paramY        = new NumberParam('y',        'Y',        true,  true, true,   0));
        this.addParam(this.paramWidth    = new NumberParam('width',    'width',    true,  true, true, 100));
        this.addParam(this.paramHeight   = new NumberParam('height',   'height',   true,  true, true, 100));
        this.addParam(this.paramRound    = new NumberParam('round',    'round',    true,  true, true,   0, 0));
        this.addParam(this.paramInner    = new NumberParam('inner',    'inner',    true,  true, true,   0, 0, 100));
        this.addParam(this.paramStart    = new NumberParam('start',    'start',    true,  true, true,   0));
        this.addParam(this.paramSweep    = new NumberParam('sweep',    'sweep',    true,  true, true, 100, 0, 100));
        

        this.paramPosition.divider = 0.4;

        this.paramStart.controls[0].setSuffix('°', true);
        this.paramStart.controls[0].wrapValue     = true;
        this.paramStart.controls[0].suffixOffsetY = -4;


        this.addBaseParams();


        this.menuInner = createEllipseParamMenu(this.paramInner, 'innerAbsolute' );
        this.menuSweep = createEllipseParamMenu(this.paramSweep, 'sweepInDegrees');
    }



    genRequestInherited(gen, request)
    {
        request.push(this.innerAbsolute  ? 1 : 0);
        request.push(this.sweepInDegrees ? 1 : 0);
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const pos    = values[paramIds.findIndex(id => id == 'position')];
        const x      = values[paramIds.findIndex(id => id == 'x'       )];
        const y      = values[paramIds.findIndex(id => id == 'y'       )];
        const width  = values[paramIds.findIndex(id => id == 'width'   )];
        const height = values[paramIds.findIndex(id => id == 'height'  )];
        const round  = values[paramIds.findIndex(id => id == 'round'   )];
        const start  = values[paramIds.findIndex(id => id == 'start'   )];
        const sweep  = values[paramIds.findIndex(id => id == 'sweep'   )];
        const inner  = values[paramIds.findIndex(id => id == 'inner'   )];

        this.paramPosition.setValue(pos,    false, true, false);
        this.paramX       .setValue(x,      false, true, false);
        this.paramY       .setValue(y,      false, true, false);
        this.paramWidth   .setValue(width,  false, true, false);
        this.paramHeight  .setValue(height, false, true, false);
        this.paramRound   .setValue(round,  false, true, false);
        this.paramStart   .setValue(start,  false, true, false);
        this.paramSweep   .setValue(sweep,  false, true, false);
        this.paramInner   .setValue(inner,  false, true, false);
    }



    updateParams()
    {
        const center = this.paramPosition.value.value == 1;
        
        this.paramWidth .setName(center ? 'radius W' : 'width' );
        this.paramHeight.setName(center ? 'radius H' : 'height');

        
        if (this.innerAbsolute)
        {
            this.paramInner.controls[0].setSuffix('', true);
            this.paramInner.controls[0].setMin(0);
            this.paramInner.controls[0].setMax(Number.MAX_SAFE_INTEGER);
            this.paramInner.controls[0].resetRanges();
        }
        else
        {
            this.paramInner.controls[0].setSuffix('%', true);
            this.paramInner.controls[0].setMin(  0);
            this.paramInner.controls[0].setMax(100);
        }


        if (this.sweepInDegrees)
        {
            this.paramSweep.controls[0].setSuffix('°', true);
            this.paramSweep.controls[0].setMin(  0);
            this.paramSweep.controls[0].setMax(360);
            this.paramSweep.controls[0].suffixOffsetY = -4;
        }
        else
        {
            this.paramSweep.controls[0].setSuffix('%', true);
            this.paramSweep.controls[0].setMin(  0);
            this.paramSweep.controls[0].setMax(100);
            this.paramSweep.controls[0].suffixOffsetY = 0;
        }


        // this.params.forEach(p => p.isNodeValue = this.headerInputs[0].connected);
        
        super.updateParams();

        //this.updateParamControls();
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        let json = super.toJsonBase(nTab);

        json += 
              ',\n' + pos + tab + '"innerAbsolute": "'  + this.innerAbsolute  + '"'
            + ',\n' + pos + tab + '"sweepInDegrees": "' + this.sweepInDegrees + '"';

        return json;
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);

        if (   _node.innerAbsolute
            && _node.sweepInDegrees)
        {
            this.innerAbsolute  = parseBool(_node.innerAbsolute);
            this.sweepInDegrees = parseBool(_node.sweepInDegrees);
        }
    }
}



function createEllipseParamMenu(param, valueId)
{
    const menu = new Menu('Position', false, true);

    menu.minWidth = 130;
    
    menu.addItems([
        new MenuItem('relative', null, {checkCallback: () => !param.node[valueId], callback: () => { hideAllMenus(); actionManager.do(new SetNodeParamAction(param.node.nodeId, valueId, false)); }}),
        new MenuItem('absolute', null, {checkCallback: () =>  param.node[valueId], callback: () => { hideAllMenus(); actionManager.do(new SetNodeParamAction(param.node.nodeId, valueId, true )); }})]);

    param.div.addEventListener('pointerdown', e => param.node.showParamMenu(e, param, menu));

    return menu;
}
