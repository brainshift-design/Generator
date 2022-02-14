class   OpValidColor
extends OpColorBase
{
    paramSpace;

    paramRule1;
    paramMargin1;

    paramRule2;
    paramMargin2;



    constructor()
    {
        super('validcolor', 'valid', 'color', 80);


        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));


        this.addParam(this.paramSpace   = new SelectParam('space',   '',    false, true, true, OpColorSpaces.map(s => s[1]), 4));
        this.addParam(this.paramRule1   = new SelectParam('rule1',   '1:',  true,  true, true, ['H', 'C', 'L'], 1));
        this.addParam(this.paramMargin1 = new NumberParam('margin1', 'max', true,  true, true, 4, 0, 10, 1));
        this.addParam(this.paramRule2   = new SelectParam('rule2',   '2:',  true,  true, true, ['H', 'C', 'L'], 2));
        this.addParam(this.paramMargin2 = new NumberParam('margin2', 'max', true,  true, true, 4, 0, 10, 1));


        this.paramSpace.control.min        = 4;
        this.paramSpace.control.displayMin = 4;
        this.paramSpace.control.update();


        this.paramMargin1.control.max = 100;
        this.paramMargin2.control.max = 100;


        this.header.connectionPadding = 18;


        this.inputs[0].addEventListener('connect', () =>
        {
            if (!graphView.loadingNodes)
                this.paramSpace.setValue(
                    Math.max(4, colorSpaceIndex(this.inputs[0].data.color[0])),
                    true, true, false);
        });
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


        this.updateRuleMargin(this.paramRule1, this.paramMargin1);
        this.updateRuleMargin(this.paramRule2, this.paramMargin2);


        if (this.inputs[0].isConnected)
        {
            const color = convertDataColorToSpace(
                this.inputs[0].data.color,
                colorSpace(this.paramSpace.value));


            this._color = color;

                 if (this.paramRule1.value == 0) this.adjustChannel(color, 0, this.paramMargin1.value);
            else if (this.paramRule1.value == 1) this.adjustChannel(color, 1, this.paramMargin1.value);
            else if (this.paramRule1.value == 2) this.adjustChannel(color, 2, this.paramMargin1.value);

            if (!isValidRgb(dataColor2rgb(this._color)))
            {
                     if (this.paramRule2.value == 0) this.adjustChannel(color, 0, this.paramMargin2.value);
                else if (this.paramRule2.value == 1) this.adjustChannel(color, 1, this.paramMargin2.value);
                else if (this.paramRule2.value == 2) this.adjustChannel(color, 2, this.paramMargin2.value);
            }
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



    updateRuleMargin(rule, margin)
    {
        if (rule.value == 0) 
        {
            margin.control.max        = 360;
            margin.control.displayMax = 60;
        }
        else 
        {
            margin.control.max        = 100;
            margin.control.displayMax = 10;
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