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
            "highlight": "3",\
            "x": "90",\
            "y": "896",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "add", "-4,0"],\
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
                ["NUM#", "count", "10,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence%20Y",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "901",\
            "y": "1142",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "add", "12,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence4",\
            "name": "acceleration",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "579",\
            "y": "1608",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "start", "0.01,2"],\
                    ["NUM#", "add", "-0.0003,4"],\
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
            []\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence%20X",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "1081",\
            "y": "877",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "add", "20,0"],\
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
            "highlight": "6",\
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
            "highlight": "2",\
            "x": "736",\
            "y": "1559",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "add", "-0.10969999999999999,4"],\
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
            "inputId": "add",\
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
