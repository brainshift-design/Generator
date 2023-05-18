class   OpShape
extends OpShapeBase
{
    paramProperties;


    constructor(type, id, name, defWidth = defNodeWidth)
    {
        super(type, id, name, defWidth);
    }



    addBaseParams()
    {
        this.addParam(this.paramProperties = new ListParam('props', 'styles', true, true, true));

        this.paramProperties.itemName  = 'style';
        this.paramProperties.showZero  = false;
        this.paramProperties.listTypes = [...STYLE_VALUES];
        this.paramProperties.input.types.push(...this.paramProperties.listTypes);
    }
}
