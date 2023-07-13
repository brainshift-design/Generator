class   OpShape
extends OpShapeBase
{
    paramProperties;


    constructor(type, id, name, icon, defWidth = defNodeWidth)
    {
        super(type, id, name, icon, defWidth);
    }



    addBaseParams()
    {
        this.addParam(this.paramProperties = new ListParam('props', 'styles', false, true, true));

        this.paramProperties.controls[0].valueText = 'style';
        
        this.paramProperties.itemName  = 'style';
        this.paramProperties.showZero  = false;
        this.paramProperties.listTypes = [...STYLE_VALUES];
        this.paramProperties.input.types.push(...this.paramProperties.listTypes);
    }
}
