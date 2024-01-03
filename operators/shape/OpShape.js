class   OpShape
extends OpShapeBase
{
    paramProps;


    constructor(type, id, name, icon, defWidth = defNodeWidth)
    {
        super(type, id, name, icon, defWidth);
    }



    addBaseParams()
    {
        this.addParam(this.paramProps = new ListParam('props', 'styles', false, true, true));

        this.paramProps.controls[0].valueText = 'style';
        
        this.paramProps.itemName  = ['style'];
        this.paramProps.showZero  = false;
        this.paramProps.listTypes = [...STYLE_VALUES];
        this.paramProps.input.types.push(...this.paramProps.listTypes, SHAPE_LIST_VALUE);
    }



    updateParams()
    {
        this.params.forEach(p => p.isNodeValue = this.headerInputs[0].connected);

        super.updateParams();
    }
}
