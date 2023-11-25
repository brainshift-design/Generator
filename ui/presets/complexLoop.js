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
                    ["NUM#", "add", "30,0"],\
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
                    ["NUM#", "add", "120,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
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
                    ["NUM#", "add", "120,0"],\
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
