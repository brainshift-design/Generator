const presetLoop1d = '\
    {\
        "nodes":\
        [\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "95",\
            "y": "377",\
            "z": "0",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "46,0"],\
                    ["NUM#", "c2", "75,0"],\
                    ["NUM#", "c3", "90,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "790",\
            "y": "218",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "x", "1080,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1037",\
            "y": "498",\
            "z": "2",\
            "active": "true"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "567",\
            "y": "498",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "step", "120,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "1D%20loop",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "508",\
            "y": "150",\
            "z": "4",\
            "width": "691",\
            "height": "494.2911638796187",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "257",\
            "y": "218",\
            "z": "5",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Incoming%20data%20(in%20this%20case%20a%20polygon)%20is%20%22repeated%E2%80%89%22%2C%20with%20",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "497",\
            "y": "674",\
            "z": "6"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "each%20new%20repeat%20receiving%20a%20new%20X%20value%20from%20the%20sequence.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "496",\
            "y": "717",\
            "z": "7"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "poly",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "poly",\
            "inputId": "props",\
            "list": "false"\
            }\
        ]\
    }';



const presetLoop2d = '\
    {\
        "nodes":\
        [\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2667",\
            "y": "2773",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "step", "120,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2195",\
            "y": "2477",\
            "z": "1",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "46,0"],\
                    ["NUM#", "c2", "75,0"],\
                    ["NUM#", "c3", "90,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "the%20repeat%20is%20done.%20Unlink%20the%20gray%20wires%20to%20see%20the%20difference.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2565",\
            "y": "3181",\
            "z": "2"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "with%20each%20new%20repeat%20receiving%20new%20X%20and%20Y%20values",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2610",\
            "y": "2998",\
            "z": "3"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "2D%20loop",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2608",\
            "y": "2250",\
            "z": "4",\
            "width": "691",\
            "height": "673.6051224213832",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "%3Cb%3ELinking%20a%20sequence%20to%20a%20repeat%3C%2Fb%3E%20causes%20it%20to%20reset%20when%20",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2565",\
            "y": "3136",\
            "z": "5"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "from%20two%20separate%20sequences.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2613",\
            "y": "3043",\
            "z": "6"\
            },\
            {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2357",\
            "y": "2318",\
            "z": "7",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2667",\
            "y": "2598",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "step", "120,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2890",\
            "y": "2318",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "x", "480,0"],\
                    ["NUM#", "y", "480,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3117",\
            "y": "2598",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "count", "5,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3117",\
            "y": "2773",\
            "z": "11",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "5,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Incoming%20data%20(in%20this%20case%20a%20polygon)%20is%20%22repeated%E2%80%89%22%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2612",\
            "y": "2954",\
            "z": "12"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "2871",\
            "y": "2790",\
            "z": "13",\
            "active": "true",\
            "width": "60",\
            "height": "32",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "2931",\
            "y": "2811",\
            "z": "14",\
            "active": "true",\
            "width": "60",\
            "height": "32",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel4",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "2991",\
            "y": "2829",\
            "z": "15",\
            "active": "true",\
            "width": "60",\
            "height": "32",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel5",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "2875",\
            "y": "2616",\
            "z": "16",\
            "active": "true",\
            "width": "60",\
            "height": "32",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel6",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "2935",\
            "y": "2637",\
            "z": "17",\
            "active": "true",\
            "width": "60",\
            "height": "32",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel7",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "2995",\
            "y": "2655",\
            "z": "18",\
            "active": "true",\
            "width": "60",\
            "height": "32",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel8",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "2537",\
            "y": "3123",\
            "z": "19",\
            "active": "true",\
            "width": "826.8969014821726",\
            "height": "119",\
            "params":\
            [\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "poly",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "poly",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "false"\
            }\
        ]\
    }';
    
    

const presetLoopLock = '\
    {\
        "nodes":\
        [\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "A%20combine%20node%20can%20be%20used%20to%20link%20several%20sets%20to%20the%20same%20repeat.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "388",\
            "y": "823",\
            "z": "0"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-147",\
            "y": "488",\
            "z": "1",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "step", "30,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "969",\
            "y": "623",\
            "z": "2",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "5,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "45",\
            "y": "327",\
            "z": "3",\
            "active": "true",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "120,0"],\
                    ["NUM#", "c2", "75,0"],\
                    ["NUM#", "c3", "90,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "740",\
            "y": "168",\
            "z": "4",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "x", "480,0"],\
                    ["NUM#", "y", "480,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "(Sets%20are%20nodes%20with%20.%E2%80%8A.%E2%80%8A.%20that%20generate%20many%20values.)",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "381",\
            "y": "864",\
            "z": "5"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "517",\
            "y": "623",\
            "z": "6",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "step", "120,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "751",\
            "y": "479",\
            "z": "7",\
            "active": "true",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "517",\
            "y": "448",\
            "z": "8",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "step", "120,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "967",\
            "y": "448",\
            "z": "9",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "5,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "2D%20loop",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "458",\
            "y": "100",\
            "z": "10",\
            "width": "691",\
            "height": "673.6051224213832",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "207",\
            "y": "168",\
            "z": "11",\
            "active": "true",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "Insert%20a%20new%20combine%20node%20here%20and%20re-connect%20the%20color%20sequence",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "388",\
            "y": "941",\
            "z": "12"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "to%20change%20the%20color%20for%20every%20row%20instead%20of%20every%20column.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "385",\
            "y": "987",\
            "z": "13"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "poly",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "poly",\
            "inputId": "props",\
            "list": "false"\
            }\
        ]\
    }';



const presetWavyDots = '\
    {\
        "nodes":\
        [\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "ellipse",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "45.044",\
            "y": "487",\
            "z": "0",\
            "width": "685.9561841543723",\
            "height": "558",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence5",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "90",\
            "y": "896",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "step", "-4,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "573",\
            "y": "562",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "width", "10,0"],\
                    ["NUM#", "height", "10,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "270",\
            "y": "772",\
            "z": "3",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "204,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "The%20green%20nodes%20define%20the%20overall%20width%20and%20height%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1071",\
            "y": "1031",\
            "z": "4"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat%20Y",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1843",\
            "y": "1081",\
            "z": "5",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence%20Y",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "901",\
            "y": "1142",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "step", "12,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence4",\
            "name": "acceleration",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "579",\
            "y": "1608",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "start", "0.01,2"],\
                    ["NUM#", "step", "-0.0003,4"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1465",\
            "y": "882",\
            "z": "8",\
            "width": "120",\
            "height": "64"\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "426",\
            "y": "745",\
            "z": "9",\
            "params":\
            [\
                    ["COL#", "color", "1,0 0,0 153,0 255,0"],\
                    ["NUM#", "blend", "5,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1084",\
            "y": "1223",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "value", "177.95480311939951,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence%20X",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "1081",\
            "y": "877",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "step", "20,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1665",\
            "y": "1141",\
            "z": "12",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat%20X",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1621",\
            "y": "826",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "count", "40,0"]\
            ]\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "903",\
            "y": "1318",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "seed", "2028,0"],\
                    ["NUM#", "max", "100,0"],\
                    ["NUM#", "scale", "5,0"],\
                    ["NUM#", "offset", "0,4"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "offset%20rate",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "736",\
            "y": "1559",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "step", "-0.10969999999999999,4"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1389",\
            "y": "562",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "x", "780,0"],\
                    ["NUM#", "y", "177.95480311939951,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "while%20the%20blue%20node%20makes%20the%20lines%20noisy.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1073",\
            "y": "1069",\
            "z": "17"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "These%20red%20nodes%20are%20slowly%20moving%20the%20noise",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "451",\
            "y": "1747",\
            "z": "18"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "and%20accelerating.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "450",\
            "y": "1782",\
            "z": "19"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "This%20orange%20sequence%20is%20slowly%20changing%20the%20hue.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "41",\
            "y": "1080",\
            "z": "20"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "Notice%20how%20the%20different%20sequences%20are",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1353",\
            "y": "1583",\
            "z": "21"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "connected%20to%20the%20different%20repeats.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1351",\
            "y": "1628",\
            "z": "22"\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2109",\
            "y": "943",\
            "z": "23",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "900,0"],\
                    ["NUM#", "height", "250,0"],\
                    ["NUM#", "round", "20,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2107",\
            "y": "1142",\
            "z": "24",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "68,0"],\
                    ["NUM#", "c2", "68,0"],\
                    ["NUM#", "c3", "68,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence5",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "noise",\
            "inputId": "offset",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sequence3",\
            "inputId": "step",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
            }\
        ]\
    }';



const presetNumberLine = '\
    {\
        "nodes":\
        [\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "681",\
            "y": "328",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "step", "20,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "213",\
            "y": "-26",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "start", "1,0"],\
                    ["NUM#", "step", "1,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "874",\
            "y": "88",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "x", "640,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "261.1",\
            "y": "379",\
            "z": "3",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "0,0"],\
                    ["NUM#", "c2", "0,0"],\
                    ["NUM#", "c3", "0,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "1069",\
            "y": "322.271",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "count", "33,0"]\
            ]\
            },\
            {\
            "type": "N2T",\
            "id": "numToText",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "213",\
            "y": "83",\
            "z": "5"\
            },\
            {\
            "type": "TXTS",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "438.1",\
            "y": "88",\
            "z": "6",\
            "params":\
            [\
                    ["TEXT#", "text", "33", "center"],\
                    ["NUM#", "y", "6,0"],\
                    ["NUM#", "width", "17,0"],\
                    ["NUM#", "height", "12,0"],\
                    ["TEXT#", "style", "Medium"],\
                    ["NUM#", "alignH", "1,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "214",\
            "y": "173",\
            "z": "7",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "17,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "214",\
            "y": "236",\
            "z": "8",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "12,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "number%20line",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1579",\
            "y": "183.271",\
            "z": "9",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "660,0"],\
                    ["NUM#", "height", "24,0"],\
                    ["NUM#", "round", "4,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1579",\
            "y": "380",\
            "z": "10",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "217,0"],\
                    ["NUM#", "c2", "217,0"],\
                    ["NUM#", "c3", "217,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1387.1",\
            "y": "364",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "value", "660,0"],\
                    ["NUM#", "operation", "4,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1389",\
            "y": "236",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "value", "24,0"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "2,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "numToText",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "numToText",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "text",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "count",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "step",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';



const presetFalsePerspective = '\
    {\
        "nodes":\
        [\
            {\
            "type": "PTLERP",\
            "id": "interpolate2",\
            "name": "interpolate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1244",\
            "y": "1960",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "amount", "100,0"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "847",\
            "y": "2277",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "spread", "1,0"],\
                    ["NUM#", "bias", "-66,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select4",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1055",\
            "y": "1685",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "index", "0,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "99",\
            "y": "440",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "value", "980.0000000000001,2"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "2.45,2"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "314",\
            "y": "609",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "x", "980.0000000000001,2"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "542",\
            "y": "611",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "count", "15,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "COUNT",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "287",\
            "y": "942",\
            "z": "6",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "15,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "540",\
            "y": "185",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "count", "15,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1442",\
            "y": "387",\
            "z": "8",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1332",\
            "y": "1232",\
            "z": "9",\
            "params":\
            [\
                    ["COL#", "color", "1,0 0,0 0,0 0,0"]\
            ]\
            },\
            {\
            "type": "VPATH",\
            "id": "path",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1838",\
            "y": "368",\
            "z": "10",\
            "params":\
            [\
                    ["LIST#", "points", "2 PT# 0,0 0,0 PT# -284,0 100,0"],\
                    ["NUM#", "degree", "0,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "2070",\
            "y": "915",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "count", "15,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1810",\
            "y": "-562",\
            "z": "12",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "255,0"],\
                    ["NUM#", "c2", "255,0"],\
                    ["NUM#", "c3", "255,0"]\
            ]\
            },\
            {\
            "type": "PTLERP",\
            "id": "interpolate",\
            "name": "interpolate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1244",\
            "y": "1659",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "amount", "100,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-361",\
            "y": "86",\
            "z": "14",\
            "width": "2635",\
            "height": "1016.9245370561073",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select5",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1058",\
            "y": "1914",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "index", "-1,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point2",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-253",\
            "y": "611",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "x", "-284,0"],\
                    ["NUM#", "y", "100,0"]\
            ]\
            },\
            {\
            "type": "STRK",\
            "id": "stroke",\
            "name": "stroke",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1496",\
            "y": "1230",\
            "z": "17",\
            "params":\
            [\
                    ["LIST#", "fills", "1 FILL# 0,0 0,0 0,0 100,0 0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1163",\
            "y": "1259",\
            "z": "18",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "30,0"],\
                    ["NUM#", "c2", "80,0"],\
                    ["NUM#", "c3", "0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1810",\
            "y": "-453",\
            "z": "19",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "204,0"],\
                    ["NUM#", "c2", "204,0"],\
                    ["NUM#", "c3", "204,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-252",\
            "y": "189",\
            "z": "20"\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "1201",\
            "y": "184",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "index", "14,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "962",\
            "y": "372",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "step", "1,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "746",\
            "y": "1542",\
            "z": "23",\
            "width": "1583",\
            "height": "944.9359744379389",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select6",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1058",\
            "y": "2014",\
            "z": "24",\
            "params":\
            [\
                    ["NUM#", "index", "-1,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat4",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "2091",\
            "y": "2207",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "count", "15,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2157",\
            "y": "-623",\
            "z": "26",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "x", "-344,0"],\
                    ["NUM#", "y", "-209,0"],\
                    ["NUM#", "width", "1100,0"],\
                    ["NUM#", "height", "550,0"]\
            ]\
            },\
            {\
            "type": "VPATH",\
            "id": "path2",\
            "name": "path",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1720",\
            "y": "1826",\
            "z": "27",\
            "params":\
            [\
                    ["LIST#", "points", "2 PT# -284,0 100,0 PT# 696.0000000000001,0 100,0"]\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range2",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-55",\
            "y": "368",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "end", "400,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1426",\
            "y": "1846",\
            "z": "29",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "317",\
            "y": "187",\
            "z": "30",\
            "params":\
            [\
                    ["NUM#", "x", "400,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select3",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1057",\
            "y": "1604",\
            "z": "31",\
            "params":\
            [\
                    ["NUM#", "index", "0,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2679",\
            "y": "1572",\
            "z": "32",\
            "active": "true",\
            "width": "120",\
            "height": "64"\
            },\
            {\
            "type": "SEL",\
            "id": "select2",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "1201",\
            "y": "611",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "index", "14,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1979",\
            "y": "-511",\
            "z": "34",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "type", "1,0"],\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "size", "75,0"],\
                    ["NUM#", "aspect", "100,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "select5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "interpolate2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "interpolate2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "interpolate2",\
            "inputId": "amount",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "select4",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat2",\
            "inputId": "count",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "count",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "points",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "path",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "repeat3",\
            "inputId": "count",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "repeat3",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "interpolate",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "interpolate",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "interpolate",\
            "inputId": "amount",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "select5",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "stroke",\
            "inputId": "fills",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "select6",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "path2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "repeat4",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "path2",\
            "inputId": "points",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "stroke",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "path2",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "interpolate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "interpolate2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "select3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h1",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine3",\
            "inputId": "h2",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "select2",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            }\
        ]\
    }';