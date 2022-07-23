class   OpWebContrast
extends OpColorBase
{
    paramValue;
    paramStandard;



    constructor()
    {
        super('webcontrast', 'contrast', 'color', 80);


        this.addInput(new Input(COLOR_TYPES));
        this.addInput(new Input(COLOR_TYPES));


        this.addParam(this.paramStandard = new SelectParam('standard', '', false, true,  true, ['WCAG 2', 'WCAG 3'], 1));
        this.addParam(this.paramValue    = new NumberParam('value',    '', false, false, true, 0, 0));
      

        enableSliderText(this.paramValue.control, false);


        createTooltip(ttWcag2);
        createTooltip(ttWcag3);

        createTooltipSrc(
            this.paramValue.control, 
            () => this.paramStandard.value == 1 ? ttWcag3 : ttWcag2);


            this.header.connectionPadding = 12.5;
    }



    getShowTooltip()
    {
        return this.paramStandard.value == 1
               ? ttWcag3
               : ttWcag2;
    }



    // updateData()
    // {
    //     //console.log(this.id + '.OpWebContrast.updateData()');

        
    //     this._color = 
    //         this.inputs[1].connected
    //         ? this.inputs[1].data.color
    //         : dataColor_NaN;


    //     if (   this.inputs[0].connected
    //         && this.inputs[1].connected)
    //     {
    //         const rgb0 = dataColor2rgb(this.inputs[0].data.color);
    //         const rgb1 = dataColor2rgb(this.inputs[1].data.color);
            
    //         if (   isRgbValid(rgb0) && this.inputs[0].data.isValid
    //             && isRgbValid(rgb1) && this.inputs[1].data.isValid)
    //         {
    //             if (this.paramStandard.value == 0)
    //             {
    //                 const ratio = getContrastRatio2(
    //                     dataColor2rgb(this.inputs[0].data.color),
    //                     dataColor2rgb(this.inputs[1].data.color));

    //                 let rating = getContrastRating2(ratio);

    //                 if (rating != '')
    //                     rating = '&nbsp;&nbsp;' + rating;

    //                 this.paramValue.control.min        = 
    //                 this.paramValue.control.displayMin = 0;

    //                 this.paramValue.control.max        = 
    //                 this.paramValue.control.displayMax = 21;

    //                 this.paramValue.control.setDecimals(2);
    //                 this.paramValue.control.setSuffix(rating);
    //                 this.paramValue.control.setValue(ratio, false, false, false);
    //             }
    //             else
    //             {
    //                 const ratio = getContrastRatio3(
    //                     dataColor2rgb(this.inputs[0].data.color),
    //                     dataColor2rgb(this.inputs[1].data.color));
                        
    //                 this.paramValue.control.min        = 
    //                 this.paramValue.control.displayMin = 0;

    //                 this.paramValue.control.max        = 
    //                 this.paramValue.control.displayMax = 105;

    //                 this.paramValue.control.setDecimals(1);
    //                 this.paramValue.control.setSuffix('<span style="font-size: 5; position: relative; top: -7px; left: 2px;">L</span><span style="font-size: 3; font-weight: bold; position: relative; top: -9px; left: 2px;">c</span>');
    //                 this.paramValue.control.setValue(Math.abs(ratio), false, false, false);
    //             }


    //             this.forceShowWarning = false;

    //             super.updateData();
    //             return;
    //         }

    //         else if ((!isRgbValid(rgb0) || !this.inputs[0].data.isValid)
    //                &&  isRgbValid(rgb1) &&  this.inputs[1].data.isValid)
    //         {
    //             this.warningStyle     = colorStyleRgb_a(invalid2validRgb(rgb0), 0.3);
    //             this.forceShowWarning = true;
    //         }
            
    //         else if (  isRgbValid(rgb0) &&  this.inputs[0].data.isValid
    //               && (!isRgbValid(rgb1) || !this.inputs[1].data.isValid))
    //         {
    //             this.warningStyle     = this.getDefaultWarningStyle(rgb1);
    //             this.forceShowWarning = true;
    //         }

    //         else
    //             this.forceShowWarning = false;
    //     }

    //     else if (this.inputs[1].connected)
    //     {
    //         const rgb1 = dataColor2rgb(this.inputs[1].data.color);
            
    //         this.forceShowWarning = 
    //                !isRgbValid(rgb1) 
    //             || !this.inputs[1].data.isValid;
    //     }


    //     this.paramValue.setValue(Number.NaN, false, true, false);

        
    //     super.updateData();
    // }



    updateNode()
    {
        this.setRanges();
        
        super.updateNode();
    }



    setRanges()
    {
        if (this.paramStandard.value == 0)
            this.paramValue.control.ranges = [
                new NumberSliderRange(0  /21,  3  /21, 'rgba(255, 112,  0, 0.1)', 0.8),
                new NumberSliderRange(3  /21,  4.5/21, 'rgba(255, 255,  0, 0.2)', 0.8),
                new NumberSliderRange(4.5/21,  7  /21, 'rgba(64,  255, 64, 0.2)', 0.8),
                new NumberSliderRange(7  /21, 21  /21, 'transparent') ];

        else
            this.paramValue.control.ranges = [
                new NumberSliderRange( 0/105,  15/105, 'rgba(255,   0,  64, 0.2 )', 0.8),
                new NumberSliderRange(15/105,  30/105, 'rgba(255, 112,   0, 0.2 )', 0.8),
                new NumberSliderRange(30/105,  45/105, 'rgba(255, 185,   0, 0.2 )', 0.8),
                new NumberSliderRange(45/105,  60/105, 'rgba(255, 255,   0, 0.2 )', 0.8),
                new NumberSliderRange(60/105,  75/105, 'rgba(64,  255,  64, 0.2 )', 0.8),
                new NumberSliderRange(75/105,  90/105, 'rgba(0,     0, 255, 0.07)', 0.8),
                new NumberSliderRange(90/105, 105/105, 'transparent') ];

        this.paramValue.control.update();
    }



    canShowColor()
    {
        return this.inputs[1].connected;
    }



    updateHeaderLabel()
    {
        if (   this.inputs[0].connected 
            && this.inputs[1].connected)
            this.label.style.color = colorStyleRgb(dataColor2rgb(this.inputs[0].data.color));
        else if (this.inputs[1].connected)
        {
            const [,,,, colText,] = this.getHeaderColors();
            this.label.style.color = colorStyleRgba(colText);
        }
        else 
            this.label.style.color = 'black';
    }
}