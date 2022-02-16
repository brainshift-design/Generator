class   OpValidateColor
extends OpColorBase
{
    paramOrder;

    paramMargin1;
    paramMargin2;
    paramMargin3;



    constructor()
    {
        super('validatecolor', 'validate', 'color', 80);


        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));


        this.addParam(this.paramOrder   = new SelectParam('order',   '',  false, true, true, ['H, C, L', 'H, L, C', 'C, H, L', 'C, L, H', 'L, H, C', 'L, C, H'], 3));
        this.addParam(this.paramMargin1 = new NumberParam('margin1', 'C', true,  true, true, 10, 0, 20));
        this.addParam(this.paramMargin2 = new NumberParam('margin2', 'L', true,  true, true, 10, 0, 20));
        this.addParam(this.paramMargin3 = new NumberParam('margin3', 'H', true,  true, true, 10, 0, 60));


        this.paramMargin1.control.max = 100;
        this.paramMargin2.control.max = 100;
        this.paramMargin3.control.max = 360;


        this.header.connectionPadding = 18;
    }



    updateData()
    {
        //log(this.id + '.OpValidColor.updateData()');


        // if (   this.paramRule1.value == 0
        //     && this.paramRule2.value == 0)
        //     this.paramRule2.setValue(2, false, true, false);

        // else if (this.paramRule1.value == 1
        //       && this.paramRule2.value == 1)
        //     this.paramRule2.setValue(2, false, true, false);

        // else if (this.paramRule1.value == 2
        //       && this.paramRule2.value == 2)
        //     this.paramRule2.setValue(1, false, true, false);


        this.updateMargins();


        if (this.inputs[0].isConnected)
        {
            const color = this.inputs[0].data.color;


            this._color = color;

            //      if (this.paramRule1.value == 0) this.adjustChannel(color, 0, this.paramMax1.value);
            // else if (this.paramRule1.value == 1) this.adjustChannel(color, 1, this.paramMax1.value);
            // else if (this.paramRule1.value == 2) this.adjustChannel(color, 2, this.paramMax1.value);

            // if (!isValidRgb(dataColor2rgb(this._color)))
            // {
            //          if (this.paramRule2.value == 0) this.adjustChannel(color, 0, this.paramMax2.value);
            //     else if (this.paramRule2.value == 1) this.adjustChannel(color, 1, this.paramMax2.value);
            //     else if (this.paramRule2.value == 2) this.adjustChannel(color, 2, this.paramMax2.value);
            // }
        }

        else
            this._color = dataColor_NaN;


        this.outputs[0]._data = dataFromDataColor(this._color);


        super.updateData()
    }



    adjustChannel(color, iChan, margin)
    {
        const d = 0.001;

        let _c  = color[iChan+1],
             c_ = color[iChan+1];

        let _valid  = isValidRgb(dataColor2rgb(color));
        let  valid_ = isValidRgb(dataColor2rgb(color));


        const factor = getColorSpaceFactor(color[0]);
        const scale  = getColorSpaceScale (color[0]);

        margin /= factor[iChan];

        let stackOverflowProtect = 1/d;

        while (   !_valid 
               && ! valid_
               && stackOverflowProtect-- > 0
               && margin > 0)
        {
            _c  += d;
             c_ -= d;

             color[iChan+1] = _c;  _valid  = isValidRgb(dataColor2rgb(color));
             color[iChan+1] =  c_;  valid_ = isValidRgb(dataColor2rgb(color));

             margin -= d;//1/factor[iChan];
        }


        if (_valid) 
        { 
            color[iChan+1] = _c;
            this._color = color;
        }
        else if (valid_) 
        { 
            color[iChan+1] = c_;
            this._color = color;
        }
    }



    updateMargins()
    {
        switch (this.paramOrder.value)
        {
            case 0: // HCL
            case 1: // HLC
                this.updateMargin(true,  this.paramMargin1);
                this.updateMargin(false, this.paramMargin2);
                this.updateMargin(false, this.paramMargin3);
                break;

            case 2: // CHL
            case 4: // LHC
                this.updateMargin(false, this.paramMargin1);
                this.updateMargin(true,  this.paramMargin2);
                this.updateMargin(false, this.paramMargin3);
                break;
            
            case 3: // CLH
            case 5: // LCH
                this.updateMargin(false, this.paramMargin1);
                this.updateMargin(false, this.paramMargin2);
                this.updateMargin(true,  this.paramMargin3);
                break;
        }
    }



    updateMargin(isHue, margin)
    {
        if (isHue) 
        {
            margin.control.max        = 360;
            margin.control.displayMax = 60;
        }
        else 
        {
            margin.control.max        = 100;
            margin.control.displayMax = 20;
        }

        margin.control.update();
    }



    canShowColor()
    {
        return this.inputs[0].isConnected;
    }



    isConnected()
    {
        return this.inputs[0].isConnected;
    }
}