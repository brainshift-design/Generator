class LayerMaskValue
extends GValue
{
    visible;
    maskType;



    constructor(maskType, visible = true)
    {
        super(LAYER_MASK_VALUE, 'layerMask');

        this.visible  = visible;
        this.maskType = maskType.copy();
    }


    
    copy()
    {
        const copy = new LayerMaskValue(this.maskType, this.visible);

        copy.copyBase(this);

        return copy;
    }



    equals(mask)
    {
        return this.visible === mask.visible
            && this.maskType.equals(mask.maskType);
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return 'mask';
    }



    toPreviewString()
    {
        return 'mask';
    }



    toDisplayString()
    {
        return 'mask';
    }



    isValid()
    {
        return this.maskType.isValid();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        let json = '';

        
        const SL  = s => options.singleLine ? ''  : s;
        const SL_ = s => options.singleLine ? ' ' : s;


        if (options.named)
            json += SL('\n' + TAB(options.tab));


        json += '{' + SL('\n');
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += SL_(TAB(options.tab)) + '"type": "' + LayerMaskTypes[this.maskType.value] + '"' + SL('\n');


        options.named = oldNamed;

        options.tab--;
        json += SL_(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



    static NaN()
    {
        return new LayerMaskValue(
            NumberValue.NaN(),
            false);
    }
}



function parseLayerMaskValue(str)
{
    const mask = 
        str == NAN_DISPLAY
        ? LayerMaskValue.NaN()
        : new LayerMaskValue(new NumberValue(parseInt(str)), true);

    return [mask, 1];
}
