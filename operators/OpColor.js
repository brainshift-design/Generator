/* 
    the data type 'color' contains four elements: 
        color space 
        c1
        c2
        c3
*/



const OpColorSpaces = 
[
    ['rgb', 'RGB'], 
    ['hsv', 'HSV'], 
    ['hsl', 'HSL'], 
    ['hcl', 'HCL']
];



class   OpColor
extends Operator
{
    #color;

    #space;
    
    #c1;
    #c2;
    #c3;



    constructor()
    {
        super('color', 'col', 'color', 80);

        this.#color = ['rgb', 128, 128, 128];

        this.addInput (new Input (this.dataType));
        this.setOutput(new Output(this.dataType));

        this.addParam(this.#space = new SelectParam('space', true, true, OpColorSpaces.map(s => s[1])));
        this.addParam(this.#c1    = new NumberParam('c1',    true, true, 128, 0, 255));
        this.addParam(this.#c2    = new NumberParam('c2',    true, true, 128, 0, 255));
        this.addParam(this.#c3    = new NumberParam('c3',    true, true, 128, 0, 255));

        this.#space.control.addEventListener('change', () => 
        {
            switch (this.#space.value)
            {
                case 0: this.convert2rgb(this.#color); break;
                case 1: this.convert2hsv(this.#color); break;
                case 2: this.convert2hsl(this.#color); break;
                case 3: this.convert2hcl(this.#color); break;
            }

            this.pushUpdate();
        });
        
        this.#c1.control.addEventListener('change', () => this.pushUpdate());
        this.#c2.control.addEventListener('change', () => this.pushUpdate());
        this.#c3.control.addEventListener('change', () => this.pushUpdate());

        setTimeout(() => 
        {
            this.update();
            this.#space.setValue(0); // init all the params with names
            this.switch2rgb();
        });
    }



    color2array(color)
    {
        return [
            color[1], 
            color[2], 
            color[3]];
    }



    color2rgb(color)
    {
        const col = this.color2array(color);

        switch (color[0])
        {
            case 'rgb': return col;
            case 'hsv': return hsv2rgb(col);
            case 'hsl': return hsl2rgb(col);
            case 'hcl': return okhcl2rgb(col);
        }
    }



    getColorFromParams()
    {
        const color = [
            OpColorSpaces[this.#space.value][0],
            this.#c1.value,
            this.#c2.value,
            this.#c3.value];

        const col = this.getNormalColor(color);

        color[1] = col[0];
        color[2] = col[1];
        color[3] = col[2];

        return color;
    }



    getNormalColor(color)
    {
        switch (color[0])
        {
            case 'rgb': return this.getNormalColorRgb(color[1], color[2], color[3]);
            case 'hsv':
            case 'hsl':
            case 'hcl': return this.getNormalColorH(color[1], color[2], color[3]);
        }
    }



    getNormalColorRgb(c1, c2, c3)
    {
        return [
            c1 / 255, 
            c2 / 255, 
            c3 / 255];
    }



    getNormalColorH(c1, c2, c3)
    {
        return [
            c1 / 360, 
            c2 / 100, 
            c3 / 100];
    }



    switchControls(c1, c2, c3, c1min, c1max, c1suffix, c1wrap, c2min, c2max, c3min, c3max)
    {
        this.#c1.setName(c1, false); 
        this.#c2.setName(c2, false); 
        this.#c3.setName(c3, false);

        this.#c1.control.wrapValue = c1wrap;
        this.#c1.control.suffix    = c1suffix;

        this.#c1.control.min = c1min; this.#c1.control.max = c1max; this.#c1.control.update();
        this.#c2.control.min = c2min; this.#c2.control.max = c2max; this.#c2.control.update();
        this.#c3.control.min = c3min; this.#c3.control.max = c3max; this.#c3.control.update();
    }



    switch2rgb() { this.switchControls('R', 'G', 'B', 0, 255, '',  false, 0, 255, 0, 255); }
    switch2hsv() { this.switchControls('H', 'S', 'V', 0, 360, '°', true,  0, 100, 0, 100); }
    switch2hsl() { this.switchControls('H', 'S', 'L', 0, 360, '°', true,  0, 100, 0, 100); }
    switch2hcl() { this.switchControls('H', 'C', 'L', 0, 360, '°', true,  0, 100, 0, 100); }



    setParamControls(space, col)
    {
        this.#space.setValue(space, false, true, true);

        let mult;

        switch (space)
        {
        case 'rgb':
            this.#c1.control.wrapValue = false;
            this.#c1.control.suffix = '';
            mult = [255, 255, 255];
            break;

        case 'hsv':
        case 'hsl':
        case 'hcl':
            this.#c1.control.wrapValue = true;
            this.#c1.control.suffix = '°';
            mult = [360, 100, 100];
            break;
        }

        this.setParams(
            col[0] * mult[0],
            col[1] * mult[1],
            col[2] * mult[2]);
    }



    convertColorFrom(space)
    {
        switch (space)
        {
            case 'rgb': this.#color = this.convert2rgb(this.#color); break;
            case 'hsv': this.#color = this.convert2hsv(this.#color); break;
            case 'hsl': this.#color = this.convert2hsl(this.#color); break;
            case 'hcl': this.#color = this.convert2hcl(this.#color); break;
        }
    }



    convert2rgb(color)
    {
        const col = this.color2array(color);

        let rgb;

        switch (color[0])
        {
            case 'rgb': rgb = col;            break;
            case 'hsv': rgb = hsv2rgb(col);   break;
            case 'hsl': rgb = hsl2rgb(col);   break;
            case 'hcl': rgb = okhcl2rgb(col); break;
        }

        this.switch2rgb();

        this.setParams(
            rgb[0] * 255,
            rgb[1] * 255,
            rgb[2] * 255);
    }



    convert2hsv(color)
    {
        const col = this.color2array(color);

        let hsv;

        switch (color[0])
        {
            case 'rgb': hsv = rgb2hsv(col);            break;
            case 'hsv': hsv = col;                     break;
            case 'hsl': hsv = rgb2hsv(hsl2rgb(col));   break;
            case 'hcl': hsv = rgb2hsv(okhcl2rgb(col)); break;
        }

        if (isNaN(hsv[0]))
            hsv[0] = 5/6;
            
        this.switch2hsv();

        this.setParams(
            hsv[0] * 360,
            hsv[1] * 100,
            hsv[2] * 100);
    }



    convert2hsl(color)
    {
        const col = this.color2array(color);

        let hsl;

        switch (color[0])
        {
            case 'rgb': hsl = rgb2hsl(col);            break;
            case 'hsv': hsl = rgb2hsl(hsv2rgb(col));   break;
            case 'hsl': hsl = col;                     break;
            case 'hcl': hsl = rgb2hsl(okhcl2rgb(col)); break;
        }

        this.switch2hsl();

        this.setParams(
            hsl[0] * 360,
            hsl[1] * 100,
            hsl[2] * 100);
    }



    convert2hcl(color)
    {
        const col = this.color2array(color);

        let hcl;

        switch (color[0])
        {
            case 'rgb': hcl = rgb2okhcl(col);          break;
            case 'hsv': hcl = rgb2okhcl(hsv2rgb(col)); break;
            case 'hsl': hcl = rgb2okhcl(hsl2rgb(col)); break;
            case 'hcl': hcl = col;                     break;
        }

        this.switch2hcl();

        this.setParams(
            hcl[0] * 360,
            hcl[1] * 100,
            hcl[2] * 100);
    }



    setParams(c1, c2, c3)
    {
        this.#c1.setValue(c1, false, true, true);
        this.#c2.setValue(c2, false, true, true);
        this.#c3.setValue(c3, false, true, true);
    }



    getOutputDataColor()
    {
        return this.color2rgb(this.#color);
    }



    update()
    {
        if (!this.needsUpdate())
            return;


        // const oldColorSpace = this.#color[0];

        // if (oldColorSpace != this.#space.value)
        //     this.convertColorFrom(oldColorSpace);


        const input = this.inputs[0];
        
        this.#color = 
            input.isConnected 
            ? input.data 
            : this.getColorFromParams();
            
            

        //this.updateParams(true);


        this.output._data = this.#color;

        super.update()
    }



    updateNode()
    {
        const colBack = this.color2rgb(this.#color);//this.getColorFromParams());

        let colVal = rgb2hsv(colBack);
        colVal[2]  = Math.max(0, colVal[2]-0.05);
        colVal     = hsv2rgb(colVal);
        
        const darkText = rgb2okhcl(colBack)[2] > 0.71;
        const colText  = darkText ? [0, 0, 0] : [1, 1, 1];


        this.header.style.backgroundColor = colorStyleRgb(colBack);
        this.label .style.color           = colorStyleRgb(colText);


        this.#space.control.backColor  = colBack;
        this.#space.control.valueColor = colVal;
        this.#space.control.textColor  = colText;
        this.#space.control.update();
        

        const colIn  = colorStyleRgba(colText, darkText ? 0.22 : 0.4 );
        const colOut = colorStyleRgba(colText, darkText ? 0.12 : 0.24);


        this.inputs[0].color = colIn;
        this.inputs[0].updateControl();
        
        this.output.color = colOut;
        this.output.updateControl();


        this.#space.input.color = colIn;
        this.#space.input.updateControl();

        this.#space.output.color = colOut;
        this.#space.output.updateControl();


        super.updateNode();
    }
}