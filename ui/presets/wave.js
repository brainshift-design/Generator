const presetWave = '\
    {\
        "nodes":\
        [\
            {\
            "type": "WAVE",\
            "id": "wave",\
            "name": "wave",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "602",\
            "y": "2372",\
            "z": "0",\
            "active": "true",\
            "useWavelength": "false",\
            "params":\
            [\
                    ["NUM#", "amplitude", "200,0"],\
                    ["NUM#", "frequency", "1,1"],\
                    ["NUM#", "offset", "0,1"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "856",\
            "y": "1953",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "width", "10,0"],\
                    ["NUM#", "height", "-25.06664671286093,10"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "because%20the%20repeat%20count%20determines%20the%20wave%20length.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "841",\
            "y": "2487",\
            "z": "2",\
            "active": "true"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "571.923",\
            "y": "1898",\
            "z": "3",\
            "width": "930.0768927436977",\
            "height": "448",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "916",\
            "y": "2159",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "add", "15,0"],\
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
            "x": "1340",\
            "y": "2187",\
            "z": "5",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "50,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "615",\
            "y": "2090",\
            "z": "6",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "142,0"],\
                    ["NUM#", "c2", "80,0"],\
                    ["NUM#", "c3", "70,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1073",\
            "y": "1952",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "x", "735,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Like%20Range%2C%20Wave%20%3Cb%3Emust%3C%2Fb%3E%20be%20connected%20to%20a%20Repeat",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "841",\
            "y": "2443",\
            "z": "8",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "wave",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "rect",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
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
            "outputNodeId": "wave",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rect",\
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
            }\
        ]\
    }';