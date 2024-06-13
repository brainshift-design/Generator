const htmlColors = 
[
    {name: 'AliceBlue',            color: 'f0f8ff'},
    {name: 'AntiqueWhite',         color: 'faebd7'},
    {name: 'Aqua',                 color: '00ffff'},
    {name: 'Aquamarine',           color: '7fffd4'},
    {name: 'Azure',                color: 'f0ffff'},
    {name: 'Beige',                color: 'f5f5dc'},
    {name: 'Bisque',               color: 'ffe4c4'},
    {name: 'Black',                color: '000000'},
    {name: 'BlanchedAlmond',       color: 'ffebcd'},
    {name: 'Blue',                 color: '0000ff'},
    {name: 'BlueViolet',           color: '8a2be2'},
    {name: 'Brown',                color: 'a52a2a'},
    {name: 'BurlyWood',            color: 'deb887'},
    {name: 'CadetBlue',            color: '5f9ea0'},
    {name: 'Chartreuse',           color: '7fff00'},
    {name: 'Chocolate',            color: 'd2691e'},
    {name: 'Coral',                color: 'ff7f50'},
    {name: 'CornflowerBlue',       color: '6495ed'},
    {name: 'Cornsilk',             color: 'fff8dc'},
    {name: 'Crimson',              color: 'dc143c'},
    {name: 'Cyan',                 color: '00ffff'},
    {name: 'DarkBlue',             color: '00008b'},
    {name: 'DarkCyan',             color: '008b8b'},
    {name: 'DarkGoldenRod',        color: 'b8860b'},
    {name: 'DarkGray',             color: 'a9a9a9'},
    {name: 'DarkGrey',             color: 'a9a9a9'},
    {name: 'DarkGreen',            color: '006400'},
    {name: 'DarkKhaki',            color: 'bdb76b'},
    {name: 'DarkMagenta',          color: '8b008b'},
    {name: 'DarkOliveGreen',       color: '556b2f'},
    {name: 'DarkOrange',           color: 'ff8c00'},
    {name: 'DarkOrchid',           color: '9932cc'},
    {name: 'DarkRed',              color: '8b0000'},
    {name: 'DarkSalmon',           color: 'e9967a'},
    {name: 'DarkSeaGreen',         color: '8fbc8f'},
    {name: 'DarkSlateBlue',        color: '483d8b'},
    {name: 'DarkSlateGray',        color: '2f4f4f'},
    {name: 'DarkSlateGrey',        color: '2f4f4f'},
    {name: 'DarkTurquoise',        color: '00ced1'},
    {name: 'DarkViolet',           color: '9400d3'},
    {name: 'DeepPink',             color: 'ff1493'},
    {name: 'DeepSkyBlue',          color: '00bfff'},
    {name: 'DimGray',              color: '696969'},
    {name: 'DimGrey',              color: '696969'},
    {name: 'DodgerBlue',           color: '1e90ff'},
    {name: 'FireBrick',            color: 'b22222'},
    {name: 'FloralWhite',          color: 'fffaf0'},
    {name: 'ForestGreen',          color: '228b22'},
    {name: 'Fuchsia',              color: 'ff00ff'},
    {name: 'Gainsboro',            color: 'dcdcdc'},
    {name: 'GhostWhite',           color: 'f8f8ff'},
    {name: 'Gold',                 color: 'ffd700'},
    {name: 'GoldenRod',            color: 'daa520'},
    {name: 'Gray',                 color: '808080'},
    {name: 'Grey',                 color: '808080'},
    {name: 'Green',                color: '008000'},
    {name: 'GreenYellow',          color: 'adff2f'},
    {name: 'HoneyDew',             color: 'f0fff0'},
    {name: 'HotPink',              color: 'ff69b4'},
    {name: 'IndianRed',            color: 'cd5c5c'},
    {name: 'Indigo',               color: '4b0082'},
    {name: 'Ivory',                color: 'fffff0'},
    {name: 'Khaki',                color: 'f0e68c'},
    {name: 'Lavender',             color: 'e6e6fa'},
    {name: 'LavenderBlush',        color: 'fff0f5'},
    {name: 'LawnGreen',            color: '7cfc00'},
    {name: 'LemonChiffon',         color: 'fffacd'},
    {name: 'LightBlue',            color: 'add8e6'},
    {name: 'LightCoral',           color: 'f08080'},
    {name: 'LightCyan',            color: 'e0ffff'},
    {name: 'LightGoldenRodYellow', color: 'fafad2'},
    {name: 'LightGray',            color: 'd3d3d3'},
    {name: 'LightGrey',            color: 'd3d3d3'},
    {name: 'LightGreen',           color: '90ee90'},
    {name: 'LightPink',            color: 'ffb6c1'},
    {name: 'LightSalmon',          color: 'ffa07a'},
    {name: 'LightSeaGreen',        color: '20b2aa'},
    {name: 'LightSkyBlue',         color: '87cefa'},
    {name: 'LightSlateGray',       color: '778899'},
    {name: 'LightSlateGrey',       color: '778899'},
    {name: 'LightSteelBlue',       color: 'b0c4de'},
    {name: 'LightYellow',          color: 'ffffe0'},
    {name: 'Lime',                 color: '00ff00'},
    {name: 'LimeGreen',            color: '32cd32'},
    {name: 'Linen',                color: 'faf0e6'},
    {name: 'Magenta',              color: 'ff00ff'},
    {name: 'Maroon',               color: '800000'},
    {name: 'MediumAquaMarine',     color: '66cdaa'},
    {name: 'MediumBlue',           color: '0000cd'},
    {name: 'MediumOrchid',         color: 'ba55d3'},
    {name: 'MediumPurple',         color: '9370db'},
    {name: 'MediumSeaGreen',       color: '3cb371'},
    {name: 'MediumSlateBlue',      color: '7b68ee'},
    {name: 'MediumSpringGreen',    color: '00fa9a'},
    {name: 'MediumTurquoise',      color: '48d1cc'},
    {name: 'MediumVioletRed',      color: 'c71585'},
    {name: 'MidnightBlue',         color: '191970'},
    {name: 'MintCream',            color: 'f5fffa'},
    {name: 'MistyRose',            color: 'ffe4e1'},
    {name: 'Moccasin',             color: 'ffe4b5'},
    {name: 'NavajoWhite',          color: 'ffdead'},
    {name: 'Navy',                 color: '000080'},
    {name: 'OldLace',              color: 'fdf5e6'},
    {name: 'Olive',                color: '808000'},
    {name: 'OliveDrab',            color: '6b8e23'},
    {name: 'Orange',               color: 'ffa500'},
    {name: 'OrangeRed',            color: 'ff4500'},
    {name: 'Orchid',               color: 'da70d6'},
    {name: 'PaleGoldenRod',        color: 'eee8aa'},
    {name: 'PaleGreen',            color: '98fb98'},
    {name: 'PaleTurquoise',        color: 'afeeee'},
    {name: 'PaleVioletRed',        color: 'db7093'},
    {name: 'PapayaWhip',           color: 'ffefd5'},
    {name: 'PeachPuff',            color: 'ffdab9'},
    {name: 'Peru',                 color: 'cd853f'},
    {name: 'Pink',                 color: 'ffc0cb'},
    {name: 'Plum',                 color: 'dda0dd'},
    {name: 'PowderBlue',           color: 'b0e0e6'},
    {name: 'Purple',               color: '800080'},
    {name: 'RebeccaPurple',        color: '663399'},
    {name: 'Red',                  color: 'ff0000'},
    {name: 'RosyBrown',            color: 'bc8f8f'},
    {name: 'RoyalBlue',            color: '4169e1'},
    {name: 'SaddleBrown',          color: '8b4513'},
    {name: 'Salmon',               color: 'fa8072'},
    {name: 'SandyBrown',           color: 'f4a460'},
    {name: 'SeaGreen',             color: '2e8b57'},
    {name: 'SeaShell',             color: 'fff5ee'},
    {name: 'Sienna',               color: 'a0522d'},
    {name: 'Silver',               color: 'c0c0c0'},
    {name: 'SkyBlue',              color: '87ceeb'},
    {name: 'SlateBlue',            color: '6a5acd'},
    {name: 'SlateGray',            color: '708090'},
    {name: 'SlateGrey',            color: '708090'},
    {name: 'Snow',                 color: 'fffafa'},
    {name: 'SpringGreen',          color: '00ff7f'},
    {name: 'SteelBlue',            color: '4682b4'},
    {name: 'Tan',                  color: 'd2b48c'},
    {name: 'Teal',                 color: '008080'},
    {name: 'Thistle',              color: 'd8bfd8'},
    {name: 'Tomato',               color: 'ff6347'},
    {name: 'Turquoise',            color: '40e0d0'},
    {name: 'Violet',               color: 'ee82ee'},
    {name: 'Wheat',                color: 'f5deb3'},
    {name: 'White',                color: 'ffffff'},
    {name: 'WhiteSmoke',           color: 'f5f5f5'},
    {name: 'Yellow',               color: 'ffff00'},
    {name: 'YellowGreen',          color: '9acd32'}
];



const genColorNameLightness =
[
    {name: 'pale',   value: 0.87},
    {name: 'light',  value: 0.75},
    {name: 'bright', value: 0.62},
    {name: 'deep',   value: 0.37},
    {name: 'dim',    value: 0.25},
    {name: 'dark',   value: 0.12}
];



const genColorNameSaturation =
[
    {name: 'calm',  value: 0.75},
    {name: 'dull',  value: 0.46},
    {name: 'dirty', value: 0.21}
];



const genColorNameHue =
[
    {name: 'violet',  value: 285},
    {name: 'purple',  value: 269},
    {name: 'indigo',  value: 254},
    {name: 'blue',    value: 241},
    {name: 'cobalt',  value: 227},
    {name: 'sky',     value: 211},
    {name: 'aqua',    value: 193},
    {name: 'cyan',    value: 177},
    {name: 'jade',    value: 154},
    {name: 'green',   value: 112},
    {name: 'lime',    value:  74},
    {name: 'yellow',  value:  54},
    {name: 'mango',   value:  42},
    {name: 'orange',  value:  30},
    {name: 'amber',   value:  17},
    {name: 'salmon',  value:  11},
    {name: 'red',     value:   0},
    {name: 'crimson', value: 347},
    {name: 'rose',    value: 335},
    {name: 'magenta', value: 310}
];



function parseColorNameLightness(name) 
{
    for (const item of genColorNameLightness) 
    {
        if (   name.startsWith(item.name) 
            || getEditDistance(name.slice(0, item.name.length), item.name) <= 1) 
        {
            return { value:     item.value, 
                     remaining: name.slice(item.name.length) };
        }
    }

    return { value:     null, 
             remaining: name };
}



function parseColorNameSaturation(name) 
{
    for (const item of genColorNameSaturation) 
    {
        console.log(getEditDistance(name.slice(0, item.name.length), item.name));
        if (   name.startsWith(item.name) 
            || getEditDistance(name.slice(0, item.name.length), item.name) <= 1) 
        {
            return { value:     item.value, 
                     remaining: name.slice(item.name.length) };
        }
    }

    return { value:     null, 
             remaining: name };
}



function parseColorNameHue(name) 
{
    for (const item of genColorNameHue) 
    {
        if (   name === item.name 
            || getEditDistance(name.slice(0, item.name.length), item.name) <= 1) 
        {
            return item.value;
        }
    }

    return null;
}



function parseColorName(_colorName) 
{
    let colorName = _colorName.replace(/\s+/g, '');


    if (   colorName === 'black' 
        || getEditDistance(colorName, 'black') <= 1)
        return [0, 0, 0];

    if (   colorName === 'white' 
        || getEditDistance(colorName, 'white') <= 1)
        return [0, 0, 1];

        
    const grayVariants = ['gray', 'grey'];

    let isGray = false;
    let gl     = 0.5;

    for (const grayVariant of grayVariants) 
    {
        if (   colorName.endsWith(grayVariant) 
            || getEditDistance(colorName.slice(-grayVariant.length), grayVariant) <= 1) 
        {
            isGray = true;
        
            const grayPrefix = colorName.slice(0, -grayVariant.length);
            
            if (grayPrefix) 
            {
                const { value } = parseColorNameLightness(grayPrefix);
                
                if (value !== null) 
                    gl = value;
            }

            break;
        }
    }


    if (isGray)
        return [0, 0, gl];


    let h = null;
    let s = null;
    let l = null;

    
    // try lightness first
    
    let result  = parseColorNameLightness(colorName);
        l       = result.value;
    let remName = result.remaining;

        result  = parseColorNameSaturation(remName);
        s       = result.value;
        remName = result.remaining;

        h       = parseColorNameHue(remName);


    // reset if the first check fails
    // and try saturation first
    
    if (   h === null 
        || s === null 
        || l === null) 
    {
        h = null;
        s = null;
        l = null;

        result  = parseColorNameSaturation(colorName);
        s       = result.value;
        remName = result.remaining;

        result  = parseColorNameLightness(remName);
        l       = result.value;
        remName = result.remaining;

        h       = parseColorNameHue(remName);
    }


    if (h === null) return null; // hue is mandatory
    if (l === null) l = 0.5;
    if (s === null) s = 1.0;

    
    return [h / 360, s, l];
}



function createColorName(rgb)
{
    if (rgb.length > 3 && rgba[3] == 0)
        return 'transparent';


    const hsl = rgb2hsl(rgb);

    let   h = hsl[0] * 360;

    while (h >= 360) h -= 360;
    while (h <    0) h += 360;
    
    const s = hsl[1];
    const l = hsl[2];


         if (l >= 0.94) return 'white';
    else if (l <  0.06) return 'black';


    let strH = '';
    let strS = '';
    let strL = '';


         if (l >= 0.81 && l < 0.94) strL = 'pale ';
    else if (l >= 0.69 && l < 0.81) strL = 'light ';
    else if (l >= 0.56 && l < 0.69) strL = 'bright ';
    else if (l >= 0.31 && l < 0.44) strL = 'deep ';
    else if (l >= 0.19 && l < 0.31) strL = 'dim ';
    else if (l >= 0.06 && l < 0.19) strL = 'dark ';
    

    if (l > 0.25 && l < 0.75) 
    {
             if (s >= 0.62 && s < 0.88) strS = 'calm ';
        else if (s >= 0.31 && s < 0.62) strS = 'dull ';
        else if (s >= 0.12 && s < 0.31) strS = 'dirty ';
    }


    if (s >= 0.12)
    {
             if (h < 293 && h >= 278) strH = 'violet';
        else if (h < 278 && h >= 259) strH = 'purple';
        else if (h < 259 && h >= 248) strH = 'indigo';
        else if (h < 248 && h >= 233) strH = 'blue';
        else if (h < 233 && h >= 221) strH = 'cobalt';
        else if (h < 221 && h >= 201) strH = 'sky';
        else if (h < 201 && h >= 185) strH = 'aqua';
        else if (h < 185 && h >= 169) strH = 'cyan';
        else if (h < 169 && h >= 139) strH = 'jade';
        else if (h < 139 && h >=  86) strH = 'green';
        else if (h <  86 && h >=  63) strH = 'lime';
        else if (h <  63 && h >=  45) strH = 'yellow';
        else if (h <  45 && h >=  40) strH = 'mango';
        else if (h <  40 && h >=  21) strH = 'orange';
        else if (h <  21 && h >=  13) strH = 'amber';
        else if (h <  13 && h >=   8) strH = 'salmon';
        else if (h <   8 || h >= 352) strH = 'red';
        else if (h < 352 && h >= 343) strH = 'crimson';
        else if (h < 343 && h >= 328) strH = 'rose';
        else if (h < 328 && h >= 293) strH = 'magenta';
        else 
            console.error('error parsing hue name');
    }
    else 
        strH = 'gray';


    return strL + strS + strH;
}
