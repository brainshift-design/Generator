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
            "x": "1167",\
            "y": "1273",\
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
            "x": "695",\
            "y": "977",\
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
            "x": "1089",\
            "y": "1683",\
            "z": "2"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "each%20new%20repeat%20receiving%20new%20X%20and%20Y%20values%20from%20two",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1093",\
            "y": "1515",\
            "z": "3"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "2D%20loop",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1108",\
            "y": "750",\
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
            "name": "Linking%20a%20sequence%20to%20a%20repeat%20causes%20it%20to%20reset%20when%20",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1089",\
            "y": "1638",\
            "z": "5"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "separate%20sequences.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1090",\
            "y": "1557",\
            "z": "6"\
            },\
            {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "857",\
            "y": "818",\
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
            "x": "1167",\
            "y": "1098",\
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
            "x": "1390",\
            "y": "818",\
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
            "x": "1617",\
            "y": "1098",\
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
            "x": "1617",\
            "y": "1273",\
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
            "name": "Incoming%20data%20(in%20this%20case%20a%20polygon)%20is%20%22repeated%E2%80%89%22%2C%20with%20",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1094",\
            "y": "1472",\
            "z": "12"\
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
            "x": "-54.956",\
            "y": "387",\
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
            "x": "-10",\
            "y": "796",\
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
            "x": "473",\
            "y": "462",\
            "z": "2",\
            "params":\
            [\
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
            "x": "170",\
            "y": "672",\
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
            "x": "971",\
            "y": "931",\
            "z": "4"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat%20Y",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1743",\
            "y": "981",\
            "z": "5",\
            "active": "true",\
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
            "x": "801",\
            "y": "1042",\
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
            "x": "479",\
            "y": "1508",\
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
            "x": "1365",\
            "y": "782",\
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
            "x": "326",\
            "y": "645",\
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
            "x": "984",\
            "y": "1123",\
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
            "x": "981",\
            "y": "777",\
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
            "x": "1565",\
            "y": "1041",\
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
            "x": "1521",\
            "y": "726",\
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
            "x": "803",\
            "y": "1218",\
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
            "x": "636",\
            "y": "1459",\
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
            "x": "1289",\
            "y": "462",\
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
            "x": "973",\
            "y": "969",\
            "z": "17"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "These%20red%20nodes%20are%20slowly%20moving%20the%20noise",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "351",\
            "y": "1647",\
            "z": "18"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "and%20accelerating.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "350",\
            "y": "1682",\
            "z": "19"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "This%20orange%20sequence%20is%20slowly%20changing%20the%20hue.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-59",\
            "y": "980",\
            "z": "20"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "Notice%20how%20the%20different%20sequences%20are",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1253",\
            "y": "1483",\
            "z": "21"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "connected%20to%20the%20different%20repeats.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1251",\
            "y": "1528",\
            "z": "22"\
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
            }\
        ]\
    }';