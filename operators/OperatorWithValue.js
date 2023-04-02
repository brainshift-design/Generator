class   OperatorWithValue
extends OperatorBase
{
    paramValue;
    


    constructor(type, shortName, defWidth = defNodeWidth, progressBar = false)
    {
        super(type, shortName, defWidth, progressBar);

        this.paramValue = createValueParamFromType(type);
        this.paramValue.isResult = true;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramValue.setValue(value, false, true, false);

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    // updateValueParam()
    // {
    //     // const colors = this.getHeaderColors();

    //     // const colSpaceBar = 
    //     //       !rgbIsNaN(colors.back)
    //     //     && isDark(colors.back)
    //     //     ? [1, 1, 1, 0.12]
    //     //     : [0, 0, 0, 0.09]; 


    //     // this.paramValue.controls[0].backStyleLight  =
    //     // this.paramValue.controls[0].backStyleDark   = rgb2style_a(rgbHeaderFromType(this.type, this.active), 0.95);

    //     // this.paramValue.controls[0].valueStyleLight =
    //     // this.paramValue.controls[0].valueStyleDark  = rgba2style(colSpaceBar);

    //     // this.paramValue.controls[0].textStyleLight  =
    //     // this.paramValue.controls[0].textStyleDark   = rgba2style(colors.text);
    // }



    // updateNode()
    // {
    //     this.updateValueParam();

    //     super.updateNode();
    // }
}