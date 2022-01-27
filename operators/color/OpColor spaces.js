const OpColorSpaces = 
[
    ['hex',    'Hex'    ],
    ['rgbhex', '<span class=\'hash\'>#</span>RGB'],
    ['rgb',    'RGB'    ], 
    ['hsv',    'HSV'    ], 
    ['hsl',    'HSL'    ], 
    ['hclokl', 'HCL OKL'],
    ['hcllab', 'HCL Lab'],
    ['hclluv', 'HCL Luv'],
    ['oklab',  'OKLab'  ],
    ['lab',    'Lab'    ],
    ['luv',    'Luv'    ]
];


const rgbFactor   = [255, 255, 255];
const hs_Factor   = [360, 100, 100];
const hclFactor   = [360, 100, 100];
const oppFactor   = [100, 100, 100];

const rgbScale    = [255, 255, 255];
const hs_Scale    = [360, 100, 100];
const hcloklScale = [360,  51, 100];
const hcllabScale = [360, 400, 100];
const hclluvScale = [360, 330, 100];
const oklabScale  = [100,  30,  30];
const labScale    = [100, 100, 100];
const luvScale    = [100, 150, 150];



function switchToSpace(op, space)
{
    switch (space)
    {
        case 'hex':    switchToHex   (op); break;
        case 'rgbhex': switchToRgbHex(op); break;
        case 'rgb':    switchToRgb   (op); break;
        case 'hsv':    switchToHsv   (op); break;
        case 'hsl':    switchToHsl   (op); break;
        case 'hclokl': switchToHclOkl(op); break;
        case 'hcllab': switchToHclLab(op); break;
        case 'hclluv': switchToHclLuv(op); break;
        case 'oklab':  switchToOklab (op); break;
        case 'lab':    switchToLab   (op); break;
        case 'luv':    switchToLuv   (op); break;
    }

    op.resetAllControlRanges();
}



function switchToHex   (op) { switchToTextbox       (op);           }
function switchToRgbHex(op) { switchToRgbHexControls(op);           }
function switchToRgb   (op) { switchToRgbControls   (op);           }
function switchToHsv   (op) { switchToHs_Controls   (op, 'V');      }
function switchToHsl   (op) { switchToHs_Controls   (op, 'L');      }
function switchToHclOkl(op) { switchToHclOklControls(op);           }
function switchToHclLab(op) { switchToHclLabControls(op);           }
function switchToHclLuv(op) { switchToHclLuvControls(op);           }
function switchToOklab (op) { switchToOklabControls (op, 'a', 'b'); }
function switchToLab   (op) { switchToLabControls   (op, 'a', 'b'); }
function switchToLuv   (op) { switchToLuvControls   (op, 'u', 'v'); }
   


function switchToRgbHexControls(op)
{
    switchToControls(op, 
        '<span class=\'hash\'>#</span>R', 0, rgbScale[0], '', false, 
        '<span class=\'hash\'>#</span>G', 0, rgbScale[1], 
        '<span class=\'hash\'>#</span>B', 0, rgbScale[2]);  

    showRgbControlHex(op, true);
}



function switchToRgbControls(op)
{
    switchToControls(op, 
        'R', 0, rgbScale[0], '', false, 
        'G', 0, rgbScale[1], 
        'B', 0, rgbScale[2]);  

    showRgbControlHex(op, false);    
}



function switchToHs_Controls(op, v_or_l) 
{ 
    switchToControls(op, 
        'H',    0, hs_Scale[0], '°', true,  
        'S',    0, hs_Scale[1], 
        v_or_l, 0, hs_Scale[2]);  

    showRgbControlHex(op, false); 
}



function switchToHclControls(op, scale) 
{ 
    switchToControls(op, 
        'H', 0, scale[0], '°', true,  
        'C', 0, scale[1], 
        'L', 0, scale[2]);  

    showRgbControlHex(op, false); 
}



function switchToHclOklControls(op) { switchToHclControls(op, hcloklScale); }
function switchToHclLabControls(op) { switchToHclControls(op, hcllabScale); }
function switchToHclLuvControls(op) { switchToHclControls(op, hclluvScale); }



function switchToOppControls(op, c2, c3, scale)
{ 
    switchToControls(op, 
        'L', 0,        scale[0], '', false,  
        c2, -scale[1], scale[1], 
        c3, -scale[2], scale[2]);  

    showRgbControlHex(op, false); 
}



function switchToOklabControls(op) { switchToOppControls(op, 'a', 'b', oklabScale); }
function switchToLabControls  (op) { switchToOppControls(op, 'a', 'b', labScale  ); }
function switchToLuvControls  (op) { switchToOppControls(op, 'u', 'v', luvScale  ); }



function showRgbControlHex(op, show)
{
    op.param1.control.showHex = show;
    op.param2.control.showHex = show;
    op.param3.control.showHex = show;
}



function switchToControls(op, c1, c1min, c1max, c1suffix, c1wrap, c2, c2min, c2max, c3, c3min, c3max)
{
    switchToSliders(op);

    op.param1.setName(c1, false); 
    op.param2.setName(c2, false); 
    op.param3.setName(c3, false);

    op.param1.control.wrapValue = c1wrap;
    op.param1.control.suffix    = c1suffix;

    op.param1.control.min = c1min; op.param1.control.max = c1max; op.param1.control.update();
    op.param2.control.min = c2min; op.param2.control.max = c2max; op.param2.control.update();
    op.param3.control.min = c3min; op.param3.control.max = c3max; op.param3.control.update();
}



function switchToTextbox(op)
{
    //console.log('switchToTextbox(' + op.name + ')');
    if (!op.inner.contains(op.hexbox))
    {
        removeOpColorParamWires(op);

        op.inner.removeChild(op.param1.div);
        op.inner.removeChild(op.param2.div);
        op.inner.removeChild(op.param3.div);
        
        op.inner.appendChild(op.hexbox);

        graphView.updateNodeTransform(op);
    }
}



function removeOpColorParamWires(op)
{
    for (let i = op.inputs.length-1; i >= 2; i--)
        if (op.inputs[i].isConnected)
            uiDisconnect(op.inputs[i]);

    for (let i = op.outputs.length-1; i >= 2; i--)
        for (const input of op.outputs[i].connectedInputs)
            uiDisconnect(input);
}



function switchToSliders(op)
{
    if (op.inner.contains(op.hexbox))
    {
        op.inner.removeChild(op.hexbox);

        op.inner.appendChild(op.param1.div);
        op.inner.appendChild(op.param2.div);
        op.inner.appendChild(op.param3.div);

        graphView.updateNodeTransform(op);
    }
}



function rgb2dataColor(rgb)
{
    return [
       'rgb',
        rgb[0],
        rgb[1],
        rgb[2] ];
}



function getNormalValue(value, space, chan)
{
    switch (space)
    {
        //case 'rgbhex':
        case 'rgb':    return getNormalValueRgb_(value, chan);
        case 'hsv':   
        case 'hsl':    return getNormalValueHs_ (value, chan);
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return getNormalValueHcl (value, chan);
        case 'oklab':  
        case 'lab':    
        case 'luv':    return getNormalValuesOpp(value, chan);
    }
}



function getNormalValueRgb_(value, chan)
{
    switch (chan)
    {
        case 0: return value / rgbFactor[0];
        case 1: return value / rgbFactor[1]; 
        case 2: return value / rgbFactor[2];
    }
}



function getNormalValueHs_(value, chan)
{
    switch (chan)
    {
        case 0: return value / hs_Factor[0];
        case 1: return value / hs_Factor[1]; 
        case 2: return value / hs_Factor[2];
    }
}



function getNormalValueOpp(value, chan)
{
    switch (chan)
    {
        case 0: return value / oppFactor[0];
        case 1: return value / oppFactor[1]; 
        case 2: return value / oppFactor[2];
    }
}



function getNormalValueHcl(value, chan)
{
    switch (chan)
    {
        case 0: return value / hclFactor[0];
        case 1: return value / hclFactor[1]; 
        case 2: return value / hclFactor[2];
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
        //case 'rgbhex':
        case 'rgb':    return getNormalColorRgb_(c1, c2, c3);
        case 'hsv':   
        case 'hsl':    return getNormalColorHs_(c1, c2, c3);
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return getNormalColorHcl(c1, c2, c3);
        case 'oklab': 
        case 'lab': 
        case 'luv':    return getNormalColorOpp(c1, c2, c3);
    }
}



function getNormalColorRgb_(c1, c2, c3)
{
    return [
        c1 / rgbFactor[0], 
        c2 / rgbFactor[1], 
        c3 / rgbFactor[2]];
}



function getNormalColorHs_(c1, c2, c3)
{
    return [
        c1 / hs_Factor[0], 
        c2 / hs_Factor[1], 
        c3 / hs_Factor[2]];
}



function getNormalColorOpp(c1, c2, c3)
{
    return [
        c1 / oppFactor[0], 
        c2 / oppFactor[1], 
        c3 / oppFactor[2]];
}



function getNormalColorHcl(c1, c2, c3)
{
    return [
        c1 / hclFactor[0], 
        c2 / hclFactor[1], 
        c3 / hclFactor[2]];
}



function getDataColor(color)
{
    switch (color[0])
    {
        //case 'rgbhex':    
        case 'rgb':    return getDataColorRgb(color[1], color[2], color[3]);
        case 'hsv':   
        case 'hsl':    return getDataColorHs_(color[1], color[2], color[3]);
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return getDataColorHcl(color[1], color[2], color[3]);
        case 'oklab': 
        case 'lab': 
        case 'luv':    return getDataColorOpp(color[1], color[2], color[3]);
    }
}



function getDataColorRgb(c1, c2, c3)
{
    return [
        c1 * rgbFactor[0], 
        c2 * rgbFactor[1], 
        c3 * rgbFactor[2] ];
}



function getDataColorHs_(c1, c2, c3)
{
    return [
        c1 * hs_Factor[0], 
        c2 * hs_Factor[1], 
        c3 * hs_Factor[2] ];
}



function getDataColorOpp(c1, c2, c3)
{
    return [
        c1 * oppFactor[0], 
        c2 * oppFactor[1], 
        c3 * oppFactor[2] ];
}



function getDataColorHcl(c1, c2, c3)
{
    return [
        c1 * hclFactor[0], 
        c2 * hclFactor[1], 
        c3 * hclFactor[2] ];
}


function setDataColorToSpace(op, color, toSpace)
{
    op._color = convertDataColorToSpace(color, toSpace);
    op._oldSpace = op._color[0];

    switchToSpace(op, toSpace);
    op.setColorParams(op._color, false);
}



function setDataColorToCurrentSpace(op, color)
{
    const toSpace = OpColorSpaces[op.paramSpace.value][0];

    op._color = convertDataColorToSpace(color, toSpace);
    //op._oldSpace = op._color[0];

    switchToSpace(op, toSpace);
    op.setColorParams(op._color, false);
}



function getCurrentDataColorSpace(op)
{
    var index = op.paramSpace.value;
    if (index < 2) index = 2;

    return OpColorSpaces[index][0];
}



function getColorSpaceFactor(space)
{
    switch (space)
    {
        //case 'rgbhex':    
        case 'rgb':    return rgbFactor;
        case 'hsv':   
        case 'hsl':    return hs_Factor;
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return hclFactor;
        case 'oklab': 
        case 'lab': 
        case 'luv':    return oppFactor;
    }    
}



function getColorSpaceScale(space)
{
    switch (space)
    {
        //case 'rgbhex':    
        case 'rgb':    return rgbScale;
        case 'hsv':   
        case 'hsl':    return hs_Scale;
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return hclScale;
        case 'oklab': 
        case 'lab': 
        case 'luv':    return oppScale;
    }    
}