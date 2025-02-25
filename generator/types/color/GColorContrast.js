class GColorContrast
extends GOperator2
{
    static { GNode.types[COLOR_CONTRAST] = this; }



    standard = null;
    contrast = null;



    constructor(nodeId, options)
    {
        super(COLOR_CONTRAST, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.standard = null;
        this.contrast = null;
    }



    copy()
    {
        const copy = new GColorContrast(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.standard) copy.standard = this.standard.copy();
        if (this.contrast) copy.contrast = this.contrast.copy();

        return copy;
    }


    
    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0    = await evalColorValue (this.input0,   parse);
        const input1    = await evalColorValue (this.input1,   parse);
        const standard  = await evalNumberValue(this.standard, parse);

        
        if (standard.isValid())
            standard.value = Math.min(Math.max(0, standard.value), 1);


        if (   input0 && input0.type == COLOR_VALUE 
            && input1 && input1.type == COLOR_VALUE)
        {
            if (   input0.isValid()
                && input1.isValid())
            {
                if (   dataColorIsValid(input0.toDataColor())
                    && dataColorIsValid(input1.toDataColor()))
                {
                    if (standard.value == 0)
                    {
                        const value = getContrastRatio2(input0.toRgb(), input1.toRgb());
                        this.value = new NumberValue(value, 2);
                    }
                    else
                    {
                        const value = getContrastRatio3(input0.toRgb(), input1.toRgb());
                        this.value = new NumberValue(value, 1);
                    }
                }
                else
                    this.value = NumberValue.NaN();
            }
            else
                this.value = NumberValue.NaN();


            this.setUpdateValues(parse,
            [
                ['text', input0],
                ['back', input1]
            ]);
        }

        else if (input0 && input0.type == COLOR_VALUE) 
        {
            this.setUpdateValues(parse,
            [
                ['text', input0.isValid() ? input0 : ColorValue.NaN()],
                ['back', ColorValue.NaN()                            ]
            ]);
            
            this.value = NumberValue.NaN();
        }

        else if (input1 && input1.type == COLOR_VALUE) 
        {
            this.setUpdateValues(parse,
            [
                ['text', ColorValue.NaN()                            ],
                ['back', input1.isValid() ? input1 : ColorValue.NaN()]
            ]);

            this.value = NumberValue.NaN();
        }

        else
        {
            this.value = NumberValue.NaN();

            this.setUpdateValues(parse,
            [
                ['text', ColorValue.NaN()],
                ['back', ColorValue.NaN()]
            ]);
        }
        

        if (this.value.isValid())
            this.setValueDecorations(standard, parse);


        this.setUpdateValues(parse,
        [
            ['type',     this.outputType()],
            ['standard', standard         ]
        ],
        true);


        this.validate();


        return this;
    }



    setValueDecorations(standard, parse)
    {
        if (standard.value == 0) // WCAG 2
        {
            let rating = getContrastRating2(this.value.value);

            if (rating != NULL)
                rating = '&nbsp;&nbsp;' + rating;


            const cnt = Math.abs(this.value.value) / 21;

            const is1 = cnt > 0  /21 && cnt <=  3  /21;
            const is2 = cnt > 3  /21 && cnt <=  4.5/21;
            const is3 = cnt > 4.5/21 && cnt <=  7  /21;
            
            const ranges = 
            [ 
                new NumberValueRange(0  /21,  3  /21, is1 ? 'contrast20_vivid' : 'contrast20', 0.8),
                new NumberValueRange(3  /21,  4.5/21, is2 ? 'contrast21_vivid' : 'contrast21', 0.8),
                new NumberValueRange(4.5/21,  7  /21, is3 ? 'contrast22_vivid' : 'contrast22', 0.8),
                new NumberValueRange(7  /21, 21  /21, 'transparent') 
            ];


            this.value.meta = new NumberValueMeta(
                0, 0,
                21, 21,
                2,
                rating,
                0,
                false,
                ranges,
                false,
                parse.settings.showTooltipColorContrast ? 'ttWcag2' : NULL);
        }
        else // APCA
        {
            const cnt = Math.abs(this.value.value) / 100;

            const is1 = cnt >=  0/100 && cnt <= 15/100; // red
            const is2 = cnt >  15/100 && cnt <= 30/100; // amber
            const is3 = cnt >  30/100 && cnt <= 45/100; // orange
            const is4 = cnt >  45/100 && cnt <= 60/100; // yellow
            const is5 = cnt >  60/100 && cnt <= 75/100; // green
            const is6 = cnt >  75/100 && cnt <= 90/100; // blue
            const is7 = cnt >  90/100;                  // white

            const ranges = 
            [ 
                new NumberValueRange( 0/105,  15/105, is1 ? 'contrast30_vivid' : 'contrast30', 0.8), // red
                new NumberValueRange(15/105,  30/105, is2 ? 'contrast31_vivid' : 'contrast31', 0.8), // amber
                new NumberValueRange(30/105,  45/105, is3 ? 'contrast32_vivid' : 'contrast32', 0.8), // orange
                new NumberValueRange(45/105,  60/105, is4 ? 'contrast33_vivid' : 'contrast33', 0.8), // yellow
                new NumberValueRange(60/105,  75/105, is5 ? 'contrast34_vivid' : 'contrast34', 0.8), // green
                new NumberValueRange(75/105,  90/105, is6 ? 'contrast35_vivid' : 'contrast35', 0.8), // blue
                new NumberValueRange(90/105, 105/105, is7 ? 'contrast36_vivid' : 'contrast36', 0.8)  // white
            ];


            this.value.meta = new NumberValueMeta(
               -108, -105,
                106,  105,
                1,
                '<span style="font-size: 5; position: relative; top: -7px; left: 2px;">L</span><span style="font-size: 3; font-weight: bold; position: relative; top: -9px; left: 2px;">c</span>',
                0,
                false,
                ranges,
                true,
                parse.settings.showTooltipColorContrast ? 'ttWcag3' : NULL);
        }
    }



    isValid()
    {
        return super.isValid()
            && this.standard && this.standard.isValid()
            && (!this.contrast || this.contrast.isValid());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.standard) this.standard.pushValueUpdates(parse);
        if (this.contrast) this.contrast.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.standard) this.standard.invalidateInputs(parse, from, force);
        if (this.contrast) this.contrast.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.standard) this.standard.iterateLoop(parse);
        if (this.contrast) this.contrast.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const cnt = new GColorContrast(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
        }
    
    
        const valueIndex = 
            nInputs == 1
            ? parseInt(parse.move())
            : -1;
    
        
        if (parse.settings.logRequests) 
            logReqColorContrast(cnt, nInputs, valueIndex, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, cnt);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 2)
        {
            cnt.input0 = genParse(parse);
            cnt.input1 = genParse(parse);
        }
        else if (nInputs == 1)
        {
                 if (valueIndex == 0) cnt.input0 = genParse(parse); 
            else if (valueIndex == 1) cnt.input1 = genParse(parse); 
        }
      
    
        cnt.standard = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, cnt);
        return cnt;
    }
}
