const presetRange = '\
    {\
        "nodes":\
        [\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "306",\
            "y": "1852",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "width", "10,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "650",\
            "y": "1852",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "x", "735,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "145",\
            "y": "1990",\
            "z": "2",\
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
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "493",\
            "y": "2072",\
            "z": "3",\
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
            "x": "1240",\
            "y": "2087",\
            "z": "4",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "50,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "909",\
            "y": "1852",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1059",\
            "y": "1852",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "scaleY", "500,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "96",\
            "y": "1798",\
            "z": "7",\
            "width": "1305.8120687980118",\
            "height": "417.66207376486375",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "788",\
            "y": "2485",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "end", "500,0"],\
                    ["NUM#", "bias", "0,0"],\
                    ["NUM#", "spread", "32,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Unlike%20Sequence%2C%20Range%20%3Cb%3Emust%3C%2Fb%3E%20be%20connected%20to%20a%20Repeat",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1123",\
            "y": "2327",\
            "z": "9",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "because%20the%20repeat%20count%20determines%20the%20step%20size.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1123",\
            "y": "2371",\
            "z": "10",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "Because%20the%20end%20value%20is%20known%2C%20curvature%20can%20be",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1002",\
            "y": "2536",\
            "z": "11",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "controlled%20using%20the%20spread%20and%20bias%20parameters",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "999",\
            "y": "2577",\
            "z": "12",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "in%20ways%20not%20possible%20with%20a%20sequence",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "998",\
            "y": "2616",\
            "z": "13",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "%E2%9F%B5",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "940",\
            "y": "2581",\
            "z": "14",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
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
            },\
            {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "center",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            }\
        ]\
    }';
