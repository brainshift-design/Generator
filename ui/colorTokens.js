const colorTokens = 
{
    transparent: { lightMode: [0, 0, 0, 0], darkMode: [0, 0, 0, 0] },


    // WCAG2 contrast semaphore

    contrast20_color: { lightMode: [255/255,  50/255, 50/255], darkMode: [255/255,  64/255, 96/255] },
    contrast21_color: { lightMode: [200/255, 195/255,  0/255], darkMode: [255/255, 255/255,  0/255] },
    contrast22_color: { lightMode: [ 64/255, 220/255, 64/255], darkMode: [ 64/255, 220/255, 64/255] },

    contrast20_vivid: { token: 'contrast20_color', opacity: 1    },
    contrast20:       { token: 'contrast20_color', opacity: 0.2  },

    contrast21_vivid: { token: 'contrast21_color', opacity: 1    },
    contrast21:       { token: 'contrast21_color', opacity: 0.27 },

    contrast22_vivid: { token: 'contrast22_color', opacity: 1    },
    contrast22:       { token: 'contrast22_color', opacity: 0.27 },


    // APCA contrast semaphore

    contrast30_color: { lightMode: [255/255,   0/255,  64/255], darkMode: [255/255,  64/255,  96/255] },
    contrast31_color: { lightMode: [255/255, 128/255,   0/255], darkMode: [255/255, 128/255,  24/255] },
    contrast32_color: { lightMode: [250/255, 170/255,   0/255], darkMode: [255/255, 185/255,   0/255] },
    contrast33_color: { lightMode: [205/255, 175/255,   0/255], darkMode: [255/255, 255/255,   0/255] },
    contrast34_color: { lightMode: [ 30/255, 220/255,  30/255], darkMode: [ 64/255, 255/255,  64/255] },
    contrast35_color: { lightMode: [128/255, 128/255, 255/255], darkMode: [  0/255, 164/255, 255/255] },
    contrast36_color: { lightMode: [255/255, 255/255, 255/255], darkMode: [230/255, 230/255, 230/255] },

    contrast30_vivid: { token: 'contrast30_color', opacity: 1   },
    contrast30:       { token: 'contrast30_color', opacity: 0.2 },

    contrast31_vivid: { token: 'contrast31_color', opacity: 1   },
    contrast31:       { token: 'contrast31_color', opacity: 0.2 },

    contrast32_vivid: { token: 'contrast32_color', opacity: 1   },
    contrast32:       { token: 'contrast32_color', opacity: 0.2 },

    contrast33_vivid: { token: 'contrast33_color', opacity: 1   },
    contrast33:       { token: 'contrast33_color', opacity: 0.2 },

    contrast34_vivid: { token: 'contrast34_color', opacity: 1   },
    contrast34:       { token: 'contrast34_color', opacity: 0.2 },

    contrast35_vivid: { token: 'contrast35_color', opacity: 1   },
    contrast35:       { token: 'contrast35_color', opacity: 0.4 },

    contrast36_vivid: { token: 'contrast36_color', opacity: 1   },
    contrast36:       { token: 'contrast36_color', opacity: 0   }
};



function colorOrToken(value, darkMode = false)
{
    if (typeof value === 'string')
    {
        const color = getColorFromToken(
            value, 
            darkMode 
                ? 'darkMode' 
                : 'lightMode');

        if (color) return color;
    }

    return value;
}



function getColorFromToken(tokenId, mode)
{
    if (!(tokenId in colorTokens))
        return null;


    let opacity = 1;


    let token = colorTokens[tokenId];


    while ('token' in token) // alias
    {
        if ('opacity' in token)
            opacity *= token.opacity;

        token = colorTokens[token.token];
    }


    if ('opacity' in token)
        opacity *= token.opacity;


    let color = token[mode];


    if (color.length == 4)
        color[3] *= opacity;
    else
        color = rgb_a(color, opacity);


    return color ?? null;
}