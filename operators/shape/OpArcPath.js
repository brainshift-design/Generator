class   OpArcPath
extends OpShape
{
    paramPosition;
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramStart;
    paramSweep;

    startInDegrees;
    sweepInDegrees;

    menuStart;
    menuSweep;
    

    
    constructor()
    {
        super(ARC_PATH, 'arc', 'arc', iconArcPath);

        this.canDisable  = true;
        this.iconOffsetY = -1;
        

        this.startInDegrees = true;
        this.sweepInDegrees = false;


        this.addInput (this.createInputForObjects([ARC_PATH_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([ARC_PATH_VALUE], this.output_genRequest));


        this.addParam(this.paramPosition = new OptionParam('position', 'position', false, true, true, ['top-left', 'center'], 0));
        this.addParam(this.paramX        = new NumberParam('x',        'X',        true,  true, true,   0));
        this.addParam(this.paramY        = new NumberParam('y',        'Y',        true,  true, true,   0));
        this.addParam(this.paramWidth    = new NumberParam('width',    'width',    true,  true, true, 100));
        this.addParam(this.paramHeight   = new NumberParam('height',   'height',   true,  true, true, 100));
        this.addParam(this.paramStart    = new NumberParam('start',    'start',    true,  true, true,   0));
        this.addParam(this.paramSweep    = new NumberParam('sweep',    'sweep',    true,  true, true, 100, 0, 100));
        

        this.paramPosition.divider = 0.4;

        this.paramStart.controls[0].setSuffix('°', true);
        this.paramStart.controls[0].wrapValue     = true;
        this.paramStart.controls[0].suffixOffsetY = -4;


        this.addBaseParamsAfter();


        this.menuStart = createArcPathParamMenu(this.paramStart, 'startInDegrees');
        this.menuSweep = createArcPathParamMenu(this.paramSweep, 'sweepInDegrees');
    }



    genRequestInherited(gen, request)
    {
        request.push(this.startInDegrees ? 1 : 0);
        request.push(this.sweepInDegrees ? 1 : 0);
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const pos    = values[paramIds.findIndex(id => id == 'position')];
        const x      = values[paramIds.findIndex(id => id == 'x'       )];
        const y      = values[paramIds.findIndex(id => id == 'y'       )];
        const width  = values[paramIds.findIndex(id => id == 'width'   )];
        const height = values[paramIds.findIndex(id => id == 'height'  )];
        const start  = values[paramIds.findIndex(id => id == 'start'   )];
        const sweep  = values[paramIds.findIndex(id => id == 'sweep'   )];

        this.paramPosition.setValue(pos,    false, true, false);
        this.paramX       .setValue(x,      false, true, false);
        this.paramY       .setValue(y,      false, true, false);
        this.paramWidth   .setValue(width,  false, true, false);
        this.paramHeight  .setValue(height, false, true, false);
        this.paramStart   .setValue(start,  false, true, false);
        this.paramSweep   .setValue(sweep,  false, true, false);
    }



    updateParams()
    {
        const center = this.paramPosition.value.value == 1;
        
        this.paramWidth .setName(center ? 'radius W' : 'width' );
        this.paramHeight.setName(center ? 'radius H' : 'height');

        
        setAngleParam(this.paramStart, this.startInDegrees);
        setAngleParam(this.paramSweep, this.sweepInDegrees);


        super.updateParams();
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        let json = super.toJsonBase(nTab);

        json += ',\n' + pos + tab + '"startInDegrees": "' + this.startInDegrees + '"';
        json += ',\n' + pos + tab + '"sweepInDegrees": "' + this.sweepInDegrees + '"';

        return json;
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);

        if (   _node.startInDegrees
            && _node.sweepInDegrees)
        {
            this.startInDegrees = parseBool(_node.startInDegrees);
            this.sweepInDegrees = parseBool(_node.sweepInDegrees);
        }
    }
}



function createArcPathParamMenu(param, valueId)
{
    const menu = new Menu('Position', false, true);

    menu.minWidth = 130;
    
    menu.addItems([
        new MenuItem('relative', null, false, {checkCallback: () => !param.node[valueId], callback: () => { hideAllMenus(); actionManager.do(new SetNodeParamAction(param.node.nodeId, valueId, false)); }}),
        new MenuItem('absolute', null, false, {checkCallback: () =>  param.node[valueId], callback: () => { hideAllMenus(); actionManager.do(new SetNodeParamAction(param.node.nodeId, valueId, true )); }})]);

    param.div.addEventListener('pointerdown', e => param.node.showParamMenu(e, param, menu));

    return menu;
}
