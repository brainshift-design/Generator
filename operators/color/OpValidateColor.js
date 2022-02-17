class   OpValidateColor
extends OpColorBase
{
    paramOrder;

    param1;
    param2;
    param3;

    btnFind;



    constructor()
    {
        super('validatecolor', 'validate', 'color', 80);


        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));


        this.addParam(this.paramOrder = new SelectParam('order',   '', false, true, true, ['H,&thinsp;C,&thinsp;L', 'H,&thinsp;L,&thinsp;C', 'C,&thinsp;H,&thinsp;L', 'C,&thinsp;L,&thinsp;H', 'L,&thinsp;H,&thinsp;C', 'L,&thinsp;C,&thinsp;H'], 2));
        this.addParam(this.param1     = new NumberParam('margin1', '', true,  true, true, 0));
        this.addParam(this.param2     = new NumberParam('margin2', '', true,  true, true, 0));
        this.addParam(this.param3     = new NumberParam('margin3', '', true,  true, true, 0));


        this.param1.control.max = 100;
        this.param2.control.max = 100;
        this.param3.control.max = 360;


        this.header.connectionPadding = 18;


        this.btnFind = createDiv('findColorCorrection');
        this.header.appendChild(this.btnFind);


        this.btnFind.addEventListener('pointerenter', () => { this.btnFind.over = true;  this.updateHeaderLabel(); });
        this.btnFind.addEventListener('pointerleave', () => { this.btnFind.over = false; this.updateHeaderLabel(); });

        this.btnFind.addEventListener('pointerdown', e => 
        { 
            log('down');
            if (e.button0) 
                this.btnFind.button0 = true;  
                
            this.updateHeaderLabel(); 
        });

        this.btnFind.addEventListener('pointerup', e => 
        { 
            log('up');
            if (   e.button0
                && this.btnFind.button0) 
            { 
                this.btnFind.button0 = false;
                this.findCorrection();
            }
        });
    }



    findCorrection()
    {
        const color = [...this.inputs[0].data.color];
        const rgb   = dataColor2rgb(color);
        
        let closestRgb   = null;

        let closestOrder = -1,
            closest1     = -1,
            closest2     = -1,
            closest3     = -1;
            

        for (let order = 0; order < 6; order++)
        {
            for (let c1 = 0; c1 < this.param1.control.max; c1 += this.param1.control.max/10)
            {
                for (let c2 = 0; c2 < this.param2.control.max; c2 += this.param2.control.max/10)
                {
                    for (let c3 = 0; c3 < this.param3.control.max; c3 += this.param3.control.max/10)
                    {
                        const _color = this.adjustColor(order, color, c1, c2, c3);
                        const _rgb   = dataColor2rgb(_color);

                        if (   isValidRgb(_rgb)
                            && (  !closestRgb
                                || rgbDistance(rgb, _rgb) < rgbDistance(rgb, closestRgb)))
                        {
                            closestRgb   = _rgb;
                            
                            closestOrder = order;
                            closest1     = c1;
                            closest2     = c2;
                            closest3     = c3;
                        }
                    }
                }
            }
        }


        if (closestRgb)
        {
            this.paramOrder.setValue(closestOrder, true, true, false);
            this.param1    .setValue(closest1,     true, true, false);
            this.param2    .setValue(closest2,     true, true, false);
            this.param3    .setValue(closest3,     true, true, false);
        }
    }



    updateData()
    {
        //log(this.id + '.OpValidColor.updateData()');

        this.updateMargins();


        if (this.inputs[0].isConnected)
        {
            this._color = [...this.adjustColor(
                this.paramOrder.value, 
                [...this.inputs[0].data.color],
                this.param1.value,
                this.param2.value,
                this.param3.value)];
        }
        else
            this._color = dataColor_NaN;

            
        this.outputs[0]._data = dataFromDataColor(this._color);


        super.updateData()
    }



    adjustColor(order, color, c1, c2, c3)
    {
        let i0, i1, i2;
        
             if (order == 0) { i0 = 0; i1 = 1; i2 = 2; }
        else if (order == 1) { i0 = 0; i1 = 2; i2 = 1; }
        else if (order == 2) { i0 = 1; i1 = 0; i2 = 2; }
        else if (order == 4) { i0 = 2; i1 = 0; i2 = 1; }
        else if (order == 5) { i0 = 2; i1 = 1; i2 = 0; }
        else                 { i0 = 1; i1 = 2; i2 = 0; } // C, L, H by default

                                               color = this.adjustChannel(color, i0, c1);
        if (!isValidRgb(dataColor2rgb(color))) color = this.adjustChannel(color, i1, c2);
        if (!isValidRgb(dataColor2rgb(color))) color = this.adjustChannel(color, i2, c3);

        return color;
    }



    adjustChannel(color, iChan, margin)
    {
        const factor = getColorSpaceFactor(color[0]);

        margin /= factor[iChan];


        const savedColor = [...color];
        const savedValue = color[iChan+1];

        const d = 0.001;


        let _c      = savedValue,
             c_     = savedValue;

        let _valid  = isValidRgb(dataColor2rgb(color));
        let  valid_ = _valid;


        let stackOverflowProtect = 1/d;


        while (   !_valid
               && ! valid_
               && stackOverflowProtect-- > 0)
        {
            _c -= d;
            _valid = this.checkColor(_c, iChan, savedColor);

            c_ += d;
            valid_ = this.checkColor(c_, iChan, savedColor);
        }


        stackOverflowProtect = 1/d;
        color = [...savedColor];


        if (_valid) 
        { 
            _valid = isValidRgb(dataColor2rgb(color));
            _c     = savedValue;

            while (   !_valid
                   && stackOverflowProtect-- > 0
                   && margin > 0)
            {
                _c -= d; 
                _valid = this.checkColor(_c, iChan, savedColor);
                margin -= d;
            }

            color[iChan+1] = _c;
        }
        else if (valid_)
        { 
            valid_ = isValidRgb(dataColor2rgb(color));
            c_     = savedValue;

            while (   !valid_
                   && stackOverflowProtect-- > 0
                   && margin > 0)
            {
                c_ += d; 
                valid_ = this.checkColor(c_, iChan, savedColor);
                margin -= d;
            }

            color[iChan+1] = c_;
        }


        return color;
    }



    checkColor(c, iChan, savedColor)
    {
        let color = [...savedColor];
        color[iChan+1] = c; 
        return isValidRgb(dataColor2rgb(color));
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


        this.updateMargin(u1, this.param1); this.param1.control.name = n1; 
        this.updateMargin(u2, this.param2); this.param2.control.name = n2; 
        this.updateMargin(u3, this.param3); this.param3.control.name = n3; 
    }



    updateMargin(isHue, margin)
    {
        margin.control.setMin(0, false);
        margin.control.setMax(isHue ? 180 : 100, false);
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();

        this.label  .style.top = '40%';
        this.btnFind.style.top = '67%';

        const [,,,, textColor,] = this.getHeaderColors();

        const textStyle = colorStyleRgb_a(
            textColor, 
            this.btnFind.over
            ? Math.min(textColor[3] * 1.8, 1) 
            : textColor[3]);

        this.btnFind.style.background         = 'url(\'data:image/svg+xml;utf8,<svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.10345 5.05172C8.10345 7.01329 6.51329 8.60345 4.55172 8.60345C2.59016 8.60345 1 7.01329 1 5.05172C1 3.09016 2.59016 1.5 4.55172 1.5C6.51329 1.5 8.10345 3.09016 8.10345 5.05172ZM7.39723 8.60458C6.61787 9.22958 5.62846 9.60345 4.55172 9.60345C2.03788 9.60345 0 7.56557 0 5.05172C0 2.53788 2.03788 0.5 4.55172 0.5C7.06557 0.5 9.10345 2.53788 9.10345 5.05172C9.10345 6.12858 8.72949 7.1181 8.10436 7.8975L11.3535 11.1467L10.6464 11.8538L7.39723 8.60458Z" fill="'+textStyle+'" fill-opacity="0.8"/></svg>\')';
        this.btnFind.style.backgroundPosition = '50% 50%';
        this.btnFind.style.backgroundRepeat   = 'no-repeat';
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