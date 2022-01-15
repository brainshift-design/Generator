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
        this.addOutput(new Output(this.dataType));


        this.inputs[0].addEventListener('connect', () =>
        {
            this.#c1.control.style.fontStyle = 'italic'; this.#c1.control.pointerEvents = false;
            this.#c2.control.style.fontStyle = 'italic'; this.#c2.control.pointerEvents = false;
            this.#c3.control.style.fontStyle = 'italic'; this.#c3.control.pointerEvents = false;

            this.pushUpdate();
        });
    
        
        this.inputs[0].addEventListener('disconnect', () =>
        {
            if (!this.#c1.input.isConnected) { this.#c1.control.style.fontStyle = 'normal'; this.#c1.control.pointerEvents = true; }
            if (!this.#c2.input.isConnected) { this.#c2.control.style.fontStyle = 'normal'; this.#c2.control.pointerEvents = true; }
            if (!this.#c3.input.isConnected) { this.#c3.control.style.fontStyle = 'normal'; this.#c3.control.pointerEvents = true; }

            this.pushUpdate();
        });


        this.addParam(this.#space = new SelectParam('space', true, true, OpColorSpaces.map(s => s[1])));
        this.addParam(this.#c1    = new NumberParam('c1',    true, true, 128, 0, 255));
        this.addParam(this.#c2    = new NumberParam('c2',    true, true, 128, 0, 255));
        this.addParam(this.#c3    = new NumberParam('c3',    true, true, 128, 0, 255));


        this.#space.addEventListener('change', () => 
        {
            this.setColorToCurrentSpace(this.#color);
            this.pushUpdate();
        });
        

        this.#c1.addEventListener('change', () => this.pushUpdate());
        this.#c2.addEventListener('change', () => this.pushUpdate());
        this.#c3.addEventListener('change', () => this.pushUpdate());

        
        setTimeout(() => 
        {
            this.update();
            this.#space.setValue(0); // init all the params with names
            this.switch2rgb();
        });
    }



    switchToSpace(space)
    {
        switch (space)
        {
            case 'rgb': this.switch2rgb(); break;
            case 'hsv': this.switch2hsv(); break;
            case 'hsl': this.switch2hsl(); break;
            case 'hcl': this.switch2hcl(); break;
        }
    }



    switch2rgb() { this.switchControls('R', 'G', 'B', 0, 255, '',  false, 0, 255, 0, 255); }
    switch2hsv() { this.switchControls('H', 'S', 'V', 0, 360, '°', true,  0, 100, 0, 100); }
    switch2hsl() { this.switchControls('H', 'S', 'L', 0, 360, '°', true,  0, 100, 0, 100); }
    switch2hcl() { this.switchControls('H', 'C', 'L', 0, 360, '°', true,  0, 400, 0, 400); }
    
    
    
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



    setColorToCurrentSpace(color)
    {
        const toSpace = OpColorSpaces[this.#space.value][0];
        this.#color = convertColorTo(color, toSpace);
        this.switchToSpace(toSpace);
        this.setColorParams(this.#color, false);
    }



    getColorFromParams()
    {
        const col = getNormalColor_(
            OpColorSpaces[this.#space.value][0],
            this.#c1.value,
            this.#c2.value,
            this.#c3.value);
    
        return [
            OpColorSpaces[this.#space.value][0],
            col[0],
            col[1],
            col[2] ];
    }
    
    
    
    setColorParams(color, dispatchEvents)
    {
        const col = getSliderColor(color);
        
        this.#c1.setValue(col[0], false, true, dispatchEvents);
        this.#c2.setValue(col[1], false, true, dispatchEvents);
        this.#c3.setValue(col[2], false, true, dispatchEvents);
    }



    getHeaderColor() 
    {
        return color2rgb(this.#color); 
    }



    update()
    {
        if (!this.needsUpdate())
            return;

            
        this.updateParams(false);


        if (this.inputs[0].isConnected) 
        {
            let color = this.inputs[0].data.color;

            color = convertColorTo(color, OpColorSpaces[this.#space.value][0]);

            if (this.#c1.input.isConnected) color[1] = getNormalValue(this.#c1.input.data.value, color[0], 0);
            if (this.#c2.input.isConnected) color[2] = getNormalValue(this.#c2.input.data.value, color[0], 1);
            if (this.#c3.input.isConnected) color[3] = getNormalValue(this.#c3.input.data.value, color[0], 2);

            this.setColorToCurrentSpace(color);
        }
        else if (this.inputs[1].isConnected) 
        {
            this.switchToSpace(OpColorSpaces[this.inputs[1].data.value][0]);
        }
        else
        {
            this.#color = this.getColorFromParams();
        }

    
        this.outputs[0]._data = dataFromColor(this.#color);


        super.update()

        this.updateOutputWires();
    }



    updateNode()
    {
        const colBack = color2rgb(this.#color);

        let colVal = rgb2hsv(colBack);
        colVal[2]  = Math.max(0, colVal[2]-0.05);
        colVal     = hsv2rgb(colVal);
        
        const darkText = rgb2okhcl(colBack)[2] > 0.71;
        const colText  = darkText ? [0, 0, 0, 0.24] : [1, 1, 1, 0.4];


        this.inner .style.backgroundColor = colorStyleRgb (colBack);
        this.header.style.backgroundColor = colorStyleRgb (colBack);
        this.label .style.color           = colorStyleRgba(colText);


        this.#space.control.backColor  = colBack;
        this.#space.control.valueColor = colVal;
        this.#space.control.textColor  = colText;
        this.#space.control.update();


        this.inputs [0].wireColor = colBack;
        this.outputs[0].wireColor = colBack;
        

        const colIn  = colorStyleRgba(colText, darkText ? 0.12 : 0.24);
        const colOut = colorStyleRgba(colText, darkText ? 0.08 : 0.16);


        this.inputs [0].color = colIn;
        this.outputs[0].color = colOut;
        
        this.inputs [0].updateControl();
        this.outputs[0].updateControl();


        this.#space.input .color = colIn;
        this.#space.output.color = colOut;

        this.#space.input .updateControl();
        this.#space.output.updateControl();


        super.updateNode();
    }
}



function color2array(color)
{
    return [
        color[1], 
        color[2], 
        color[3]];
}



function color2rgb(color)
{
    const col = color2array(color);

    switch (color[0])
    {
        case 'rgb': return col;
        case 'hsv': return hsv2rgb(col);
        case 'hsl': return hsl2rgb(col);
        case 'hcl': return okhcl2rgb(col);
    }
}



function getNormalValue(value, space, chan)
{
    switch (space)
    {
        case 'rgb': return getNormalValueRgb_(value, chan);
        case 'hsv':
        case 'hsl': return getNormalValueHs_(value, chan);
        case 'hcl': return getNormalValueHcl(value, chan);
    }
}



function getNormalValueRgb_(value, chan)
{
    switch (chan)
    {
        case 0: return value / 255;
        case 1: return value / 255; 
        case 2: return value / 255;
    }
}



function getNormalValueHs_(value, chan)
{
    switch (chan)
    {
        case 0: return value / 360;
        case 1: return value / 100; 
        case 2: return value / 100;
    }
}



function getNormalValueHcl(value, chan)
{
    switch (chan)
    {
        case 0: return value / 360;
        case 1: return value / 100; 
        case 2: return value / 100;
    }
}



function getNormalColor(color)
{
    return getNormalColor_(
        color[0], 
        color[1], 
        color[2], 
        color[3])
}



function getNormalColor_(space, c1, c2, c3)
{
    switch (space)
    {
        case 'rgb': return getNormalColorRgb_(c1, c2, c3);
        case 'hsv':
        case 'hsl': return getNormalColorHs_(c1, c2, c3);
        case 'hcl': return getNormalColorHcl(c1, c2, c3);
    }
}



function getNormalColorRgb_(c1, c2, c3)
{
    return [
        c1 / 255, 
        c2 / 255, 
        c3 / 255];
}



function getNormalColorHs_(c1, c2, c3)
{
    return [
        c1 / 360, 
        c2 / 100, 
        c3 / 100];
}



function getNormalColorHcl(c1, c2, c3)
{
    return [
        c1 / 360, 
        c2 / 100, 
        c3 / 100];
}



function getSliderColor(color)
{
    switch (color[0])
    {
        case 'rgb': return getSliderColorRgb_(color[1], color[2], color[3]);
        case 'hsv':
        case 'hsl': return getSliderColorHs_(color[1], color[2], color[3]);
        case 'hcl': return getSliderColorHcl(color[1], color[2], color[3]);
    }
}



function getSliderColorRgb_(c1, c2, c3)
{
    return [
        c1 * 255, 
        c2 * 255, 
        c3 * 255];
}



function getSliderColorHs_(c1, c2, c3)
{
    return [
        c1 * 360, 
        c2 * 100, 
        c3 * 100];
}



function getSliderColorHcl(c1, c2, c3)
{
    return [
        c1 * 360, 
        c2 * 100, 
        c3 * 100];
}



function convertColorTo(color, toSpace)
{
    switch (toSpace)
    {
        case 'rgb': return convert2rgb(color);
        case 'hsv': return convert2hsv(color);
        case 'hsl': return convert2hsl(color);
        case 'hcl': return convert2hcl(color);
    }
}



function convert2rgb(color)
{
    const col = color2array(color);

    let rgb;

    switch (color[0])
    {
        case 'rgb': rgb = col;            break;
        case 'hsv': rgb = hsv2rgb(col);   break;
        case 'hsl': rgb = hsl2rgb(col);   break;
        case 'hcl': rgb = okhcl2rgb(col); break;
    }

    return [
       'rgb',
        rgb[0],
        rgb[1],
        rgb[2] ];
}



function convert2hsv(color)
{
    const col = color2array(color);
    
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
    
    return [
       'hsv',
        hsv[0],
        hsv[1],
        hsv[2] ];
}



function convert2hsl(color)
{
    const col = color2array(color);

    let hsl;

    switch (color[0])
    {
        case 'rgb': hsl = rgb2hsl(col);            break;
        case 'hsv': hsl = rgb2hsl(hsv2rgb(col));   break;
        case 'hsl': hsl = col;                     break;
        case 'hcl': hsl = rgb2hsl(okhcl2rgb(col)); break;
    }

    return [
       'hsl',
        hsl[0],
        hsl[1],
        hsl[2] ];
}



function convert2hcl(color)
{
    const col = color2array(color);

    let hcl;

    switch (color[0])
    {
        case 'rgb': hcl = rgb2okhcl(col);          break;
        case 'hsv': hcl = rgb2okhcl(hsv2rgb(col)); break;
        case 'hsl': hcl = rgb2okhcl(hsl2rgb(col)); break;
        case 'hcl': hcl = col;                     break;
    }

    return [
       'hcl',
        hcl[0],
        hcl[1],
        hcl[2] ];
}