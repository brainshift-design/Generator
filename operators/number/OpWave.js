class   OpWave
extends OperatorBase
{
    paramShape;
    paramBase;
    paramAmplitude;
    paramFrequency;
    paramOffset;
    paramBias;


    useWavelength;
    offsetAbsolute;
 
    menuWavelength;
    menuOffset;



    constructor()
    {
        super(NUMBER_WAVE, 'wave', 'wave', iconWave);

        this.cached      = false;
        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));


        this.addParam(this.paramShape     = new SelectParam('shape',     'shape',     false, true, true, ['square', 'saw', 'back saw', 'triangle', 'sine'], 4));
        this.addParam(this.paramBase      = new NumberParam('base',      'base',      true,  true, true, 0));
        this.addParam(this.paramAmplitude = new NumberParam('amplitude', 'amplitude', true,  true, true, 100));
        this.addParam(this.paramFrequency = new NumberParam('frequency', 'frequency', true,  true, true, 1, 0));
        this.addParam(this.paramOffset    = new NumberParam('offset',    'offset',    true,  true, true, 0));
        this.addParam(this.paramBias      = new NumberParam('bias',      'bias',      true,  true, true, 0, -100, 100));


        // this.paramFrequency.controls[0].setDecimals(1);

        this.paramBias.controls[0].suffix = '%';

        this.setAllParamDividers(0.56);


        this.menuWavelength = createWavelengthParamMenu(this.paramFrequency, 'useWavelength');
        this.menuOffset     = createOffsetParamMenu    (this.paramOffset,    'offsetAbsolute');
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramShape    .genRequest(gen));
        request.push(...this.node.paramBase     .genRequest(gen));
        request.push(...this.node.paramAmplitude.genRequest(gen));
        request.push(...this.node.paramFrequency.genRequest(gen));
        request.push(...this.node.paramOffset   .genRequest(gen));
        request.push(...this.node.paramBias     .genRequest(gen));


        request.push(this.node.useWavelength  ? 1 : 0);
        request.push(this.node.offsetAbsolute ? 1 : 0);


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramFrequency.setName(this.useWavelength ? 'wavelength' : 'frequency' );
        this.paramFrequency.divider = this.useWavelength ? 0.6 : 0.56;

        this.paramOffset.controls[0].setSuffix(this.offsetAbsolute ? '' : '%', true);

        super.updateParams();
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        let json = super.toJsonBase(nTab);

        json += 
              ',\n' + pos + tab + '"useWavelength": "'  + this.useWavelength  + '"'
            + ',\n' + pos + tab + '"offsetAbsolute": "' + this.offsetAbsolute + '"';

        return json;
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);

        this.useWavelength  = _node.useWavelength  ? parseBool(_node.useWavelength ) : true;
        this.offsetAbsolute = _node.offsetAbsolute ? parseBool(_node.offsetAbsolute) : false;
    }
}



function createWavelengthParamMenu(param, valueId)
{
    const menu = new Menu('Wavelength', false, true);

    menu.minWidth = 130;
    
    menu.addItems([
        new MenuItem('frequency',  null, {checkCallback: () => !param.node[valueId], callback: () => { hideAllMenus(); actionManager.do(new SetNodeParamAction(param.node.nodeId, valueId, false)); }}),
        new MenuItem('wavelength', null, {checkCallback: () =>  param.node[valueId], callback: () => { hideAllMenus(); actionManager.do(new SetNodeParamAction(param.node.nodeId, valueId, true )); }})]);

    param.div.addEventListener('pointerdown', e => param.node.showParamMenu(e, param, menu));

    return menu;
}



function createOffsetParamMenu(param, valueId)
{
    const menu = new Menu('Offset', false, true);

    menu.minWidth = 130;
    
    menu.addItems([
        new MenuItem('relative', null, {checkCallback: () => !param.node[valueId], callback: () => { hideAllMenus(); actionManager.do(new SetNodeParamAction(param.node.nodeId, valueId, false)); }}),
        new MenuItem('absolute', null, {checkCallback: () =>  param.node[valueId], callback: () => { hideAllMenus(); actionManager.do(new SetNodeParamAction(param.node.nodeId, valueId, true )); }})]);

    param.div.addEventListener('pointerdown', e => param.node.showParamMenu(e, param, menu));

    return menu;
}
