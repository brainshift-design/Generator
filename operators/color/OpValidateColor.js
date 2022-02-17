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


        this.addParam(this.paramOrder   = new SelectParam('order',   '',  false, true, true, ['H,&thinsp;C,&thinsp;L', 'H,&thinsp;L,&thinsp;C', 'C,&thinsp;H,&thinsp;L', 'C,&thinsp;L,&thinsp;H', 'L,&thinsp;H,&thinsp;C', 'L,&thinsp;C,&thinsp;H'], 2));
        this.addParam(this.paramMargin1 = new NumberParam('margin1', 'C', true,  true, true, 0));
        this.addParam(this.paramMargin2 = new NumberParam('margin2', 'L', true,  true, true, 0));
        this.addParam(this.paramMargin3 = new NumberParam('margin3', 'H', true,  true, true, 0));


        this.paramMargin1.control.max = 100;
        this.paramMargin2.control.max = 100;
        this.paramMargin3.control.max = 360;


        this.header.connectionPadding = 18;
    }



    updateData()
    {
        //log(this.id + '.OpValidColor.updateData()');


        this.updateMargins();


        if (this.inputs[0].isConnected)
        {
            const color = [...this.inputs[0].data.color];

            this._color = color;

            
            let i0, i1, i2;
            
                 if (this.paramOrder.value == 0) { i0 = 0; i1 = 1; i2 = 2; }
            else if (this.paramOrder.value == 1) { i0 = 0; i1 = 2; i2 = 1; }
            else if (this.paramOrder.value == 2) { i0 = 1; i1 = 0; i2 = 2; }
            else if (this.paramOrder.value == 4) { i0 = 2; i1 = 0; i2 = 1; }
            else if (this.paramOrder.value == 5) { i0 = 2; i1 = 1; i2 = 0; }
            else                                 { i0 = 1; i1 = 2; i2 = 0; } // C, L, H by default

                                                         this.adjustChannel(this._color, i0, this.paramMargin1.value);
            if (!isValidRgb(dataColor2rgb(this._color))) this.adjustChannel(this._color, i1, this.paramMargin2.value);
            if (!isValidRgb(dataColor2rgb(this._color))) this.adjustChannel(this._color, i2, this.paramMargin3.value);
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

             margin -= d;
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
        let u1, u2, u3;
        let n1, n2, n3;

        switch (this.paramOrder.value)
        {
            case 0: // HCL
                u1 = true ; n1 = 'H'; 
                u2 = false; n2 = 'C'; 
                u3 = false; n3 = 'L'; 
                break;

            case 1: // HLC
                u1 = true;  n1 = 'H'; 
                u2 = false; n2 = 'L'; 
                u3 = false; n3 = 'C'; 
                break;

            case 2: // CHL
                u1 = false; n1 = 'C'; 
                u2 = true;  n2 = 'H'; 
                u3 = false; n3 = 'L'; 
                break;

            case 3: // CLH
                u1 = false; n1 = 'C';
                u2 = false; n2 = 'L';
                u3 = true;  n3 = 'H';
                break;

            case 4: // LHC    
                u1 = false; n1 = 'L';
                u2 = true;  n2 = 'H';
                u3 = false; n3 = 'C';
                break;
                
            case 5: // LCH
                u1 = false; n1 = 'L';
                u2 = false; n2 = 'C';
                u3 = true;  n3 = 'H';
                break;
        }


        this.updateMargin(u1, this.paramMargin1); this.paramMargin1.control.name = n1; 
        this.updateMargin(u2, this.paramMargin2); this.paramMargin2.control.name = n2; 
        this.updateMargin(u3, this.paramMargin3); this.paramMargin3.control.name = n3; 
    }



    updateMargin(isHue, margin)
    {
        margin.control.setMin(0, false);
        margin.control.setMax(isHue ? 180 : 100, false);
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