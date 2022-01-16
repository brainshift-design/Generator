function switchToSpace(op, space)
{
    switch (space)
    {
        case 'hex':    switchToHex(op);    break;
        case 'rgbhex': switchToRgbHex(op); break;
        case 'rgb':    switchToRgb(op);    break;
        case 'hsv':    switchToHsv(op);    break;
        case 'hsl':    switchToHsl(op);    break;
        case 'hclokl': switchToHclOkl(op); break;
        case 'hcllab': switchToHclLab(op); break;
        case 'hclluv': switchToHclLuv(op); break;
    }
}



function switchToTextbox(op)
{
    if (!op.inner.contains(op.hexbox))
    {
        op.inner.removeChild(op._c1.div);
        op.inner.removeChild(op._c2.div);
        op.inner.removeChild(op._c3.div);
        
        op.inner.appendChild(op.hexbox);
    }
}



function switchToSliders(op)
{
    if (op.inner.contains(op.hexbox))
    {
        op.inner.removeChild(op.hexbox);

        op.inner.appendChild(op._c1.div);
        op.inner.appendChild(op._c2.div);
        op.inner.appendChild(op._c3.div);
    }
}



function switchToHex(op)   
{ 
    switchToTextbox(op);
    op.hexbox.value = rgb2hex(dataColor2rgb(op._color));
}

function switchToRgbHex(op) { switchToRgbControls(op);  showControlHex(op, true ); }
function switchToRgb(op)    { switchToRgbControls(op);  showControlHex(op, false); }
function switchToHsv(op)    { switchToHs_Controls(op, 'V'); }
function switchToHsl(op)    { switchToHs_Controls(op, 'L'); }
function switchToHclOkl(op) { switchToHclControls(op); }
function switchToHclLab(op) { switchToHclControls(op); }
function switchToHclLuv(op) { switchToHclControls(op); }
   

function switchToRgbControls(op)         { switchToControls(op, 'R', 'G', 'B',    0, 255, '',  false, 0, 255, 0, 255); }
function switchToHs_Controls(op, v_or_l) { switchToControls(op, 'H', 'S', v_or_l, 0, 360, '°', true,  0, 100, 0, 100);  op.showControlHex(false); }
function switchToHclControls(op)         { switchToControls(op, 'H', 'C', 'L',    0, 360, '°', true,  0, 400, 0, 400);  op.showControlHex(false); }



function showControlHex(op, show)
{
    op._c1.control.showHex = show;
    op._c2.control.showHex = show;
    op._c3.control.showHex = show;
}



function switchToControls(op, c1, c2, c3, c1min, c1max, c1suffix, c1wrap, c2min, c2max, c3min, c3max)
{
    switchToSliders(op);

    op._c1.setName(c1, false); 
    op._c2.setName(c2, false); 
    op._c3.setName(c3, false);

    op._c1.control.wrapValue = c1wrap;
    op._c1.control.suffix    = c1suffix;

    op._c1.control.min = c1min; op._c1.control.max = c1max; op._c1.control.update();
    op._c2.control.min = c2min; op._c2.control.max = c2max; op._c2.control.update();
    op._c3.control.min = c3min; op._c3.control.max = c3max; op._c3.control.update();
}



function setDataColorToCurrentSpace(op, color)
{
    const toSpace = OpColorSpaces[op._space.value][0];

    op._color = convertDataColorTo(color, toSpace);

    switchToSpace(op, toSpace);
    op.setColorParams(op._color, false);
}



function getCurrentDataColorSpace(op)
{
    var index = op._space.value;
    if (index < 2) index = 2;

    return OpColorSpaces[index][0];
}