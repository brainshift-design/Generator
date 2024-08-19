const presetIfElse = '\
        {\
        "nodes":\
        [\
            {\
            "type": "STAR",\
            "id": "star",\
            "name": "star",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3074",\
            "y": "4417.54",\
            "z": "0",\
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
            "x": "2882",\
            "y": "4324",\
            "z": "1",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "50.00000000000002,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "80,0"]\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "3274",\
            "y": "4353",\
            "z": "2",\
            "active": "true"\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3074",\
            "y": "4135.54",\
            "z": "3",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Change%20the%20condition%20of%20if%2Felse%20to%20see%20how%20that%20affects",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3486",\
            "y": "4379",\
            "z": "4",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "the%20output.%20Try%20disconnecting%20one%20of%20the%20red%20wires%20%E2%80%94",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3489",\
            "y": "4425",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "with%20only%20one%20input%20it%20works%20as%20pass-or-not.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3485",\
            "y": "4470",\
            "z": "6",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "%E2%9F%B5",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3423",\
            "y": "4379",\
            "z": "7",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "star",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "star",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
            }\
        ]\
    }';