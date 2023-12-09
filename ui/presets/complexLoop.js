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
            "x": "438",\
            "y": "873",\
            "z": "0"\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-97",\
            "y": "538",\
            "z": "1",\
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
            "x": "1019",\
            "y": "673",\
            "z": "2",\
            "active": "true",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "95",\
            "y": "377",\
            "z": "3",\
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
            "x": "790",\
            "y": "218",\
            "z": "4",\
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
            "x": "431",\
            "y": "914",\
            "z": "5"\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "567",\
            "y": "673",\
            "z": "6",\
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
            "x": "801",\
            "y": "529",\
            "z": "7",\
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
            "x": "567",\
            "y": "498",\
            "z": "8",\
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
            "x": "1017",\
            "y": "498",\
            "z": "9",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "2D%20loop",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "508",\
            "y": "150",\
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
            "x": "257",\
            "y": "218",\
            "z": "11",\
            "params":\
            [\
                ["NUM#", "corners", "6,0"]\
            ]\
        },\
        {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "Insert%20a%20new%20combine%20node%20here%20and%20re-connect%20the%20color%20sequence",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "438",\
            "y": "991",\
            "z": "12"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "to%20change%20the%20color%20for%20every%20row%20instead%20of%20every%20column.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "435",\
            "y": "1037",\
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