class   OperatorWithValue
extends OperatorBase
{
    paramValue;
    


    updateValueParam()
    {
        const colors = this.getHeaderColors();

        const colSpaceBar = 
              !rgbIsNaN(colors.back)
            && isDark(colors.back)
            ? [1, 1, 1, 0.12]
            : [0, 0, 0, 0.09]; 


        // this.paramValue.control.backStyleLight  =
        // this.paramValue.control.backStyleDark   = rgb2style_a(rgbHeaderFromType(this.type, this.active), 0.95);

        // this.paramValue.control.valueStyleLight =
        // this.paramValue.control.valueStyleDark  = rgba2style(colSpaceBar);

        // this.paramValue.control.textStyleLight  =
        // this.paramValue.control.textStyleDark   = rgba2style(colors.text);
    }



    updateNode()
    {
        this.updateValueParam();

        super.updateNode();
    }
}