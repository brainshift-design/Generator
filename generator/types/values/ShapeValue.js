// This is getting closer to Figma now, so here the format changes,
// and objects hold stroke values directly, which incoming stroke values just set.

class ShapeValue
extends GValue
{
    nodeId;

    props = null;



    constructor(type, nodeId, valueId)
    {
        super(type, valueId);

        this.nodeId = nodeId; 

        this.objects = [];
    }



    copyBase(base)
    {
        super.copyBase(base);
        
        this.nodeId = base.nodeId;

        if (base.objects) this.objects = base.objects.map(o => o.copy());

        if (base.props  ) this.props   = base.props.copy();
    }



    hasInitValue()
    {
        return !this.props
            ||  this.props.hasInitValue();
    }



    isValid()
    {
        return !this.props
            ||  this.props.isValid();
    }



    toBaseJsonText(options = {})
    {
        for (const prop of this.props.items)
        {
            let valueId = '';

            switch (prop.type)
            {
                case COLOR_VALUE:         valueId = 'color';          break;
                case FILL_VALUE:          valueId = 'fill';           break;
                case STROKE_VALUE:        valueId = 'stroke';         break;
                case COLOR_STOP_VALUE:    valueId = 'colorStop';      break;
                case GRADIENT_VALUE:      valueId = 'gradient';       break;
                case ROUND_CORNERS_VALUE: valueId = 'roundCorners';   break;
                case LAYER_BLEND_VALUE:   valueId = 'layerBlend';     break;
                case DROP_SHADOW_VALUE:   valueId = 'dropShadow';     break;
                case INNER_SHADOW_VALUE:  valueId = 'innerShadow';    break;
                case LAYER_BLUR_VALUE:    valueId = 'layerBlur';      break;
                case BACK_BLUR_VALUE:     valueId = 'backgroundBlur'; break;
                case LAYER_MASK_VALUE:    valueId = 'layerMask';      break;
            }
        
            prop.valueId = valueId;
        }


        const oldForceBraces = options.forceBraces;
        const oldShowNames   = options.showNames;

        options.forceBraces = true;
        options.showNames   = true;


        let json = '';

        json += TAB(options.tab) + '"props": ' + this.props.toJsonText(options) + '\n';

        return json;


        options.forceBraces = oldForceBraces;
        options.showNames   = oldShowNames;
    }
}



function parseShapeBaseValue(str, i, obj)
{
    const props = parseListValue(str, i); i += props[1];

    obj.props = props[0];

    return i;
}