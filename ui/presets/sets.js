const presetSequence = '\
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
            "x": "311",\
            "y": "1907",\
            "z": "0",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "add", "15,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "707",\
            "y": "2229",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "start", "1,0"],\
                    ["NUM#", "multiply", "1.12,2"],\
                    ["NUM#", "add", "3,0"],\
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
            "x": "500",\
            "y": "1702",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "x", "735,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "759",\
            "y": "1702",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-5",\
            "y": "1840",\
            "z": "4",\
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
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1090",\
            "y": "1937",\
            "z": "5",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "50,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-51",\
            "y": "1657",\
            "z": "6",\
            "width": "1305.8120687980118",\
            "height": "417.66207376486375",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "909",\
            "y": "1702",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "scaleY", "405.0376694910721,10"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "156",\
            "y": "1702",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "width", "10,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Sequence%20performs%20a%20multiply-and-add%20operation%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "908",\
            "y": "2244",\
            "z": "9",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "which%20gives%20you%20good%20control%20over%20simple%20curvature.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "908",\
            "y": "2290",\
            "z": "10",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
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
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center",\
            "inputId": "h0",\
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
            "outputNodeId": "center",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "false"\
            }\
        ]\
    }';



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
            "highlight": "7",\
            "x": "788",\
            "y": "2485",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "end", "500,0"],\
                    ["NUM#", "spread", "2,0"],\
                    ["NUM#", "bias", "32,0"]\
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



const presetDefine = '\
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
            "x": "406",\
            "y": "1952",\
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
            "x": "750",\
            "y": "1952",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "x", "1470,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "245",\
            "y": "2090",\
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
            "x": "593",\
            "y": "2172",\
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
            "x": "1340",\
            "y": "2187",\
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
            "x": "1009",\
            "y": "1952",\
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
            "x": "1159",\
            "y": "1952",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "scaleY", "345,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "196",\
            "y": "1898",\
            "z": "7",\
            "width": "1305.8120687980118",\
            "height": "417.66207376486375",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Define%20lets%20you%20manualy%20define%20a%20sequence",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1095",\
            "y": "2554",\
            "z": "8"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "which%20repeats%20when%20it%20runs%20out%20of%20values.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1095",\
            "y": "2598",\
            "z": "9",\
            "active": "true"\
            },\
            {\
            "type": "DEFINE",\
            "id": "define",\
            "name": "define",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "893",\
            "y": "2558",\
            "z": "10"\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "698",\
            "y": "2439",\
            "z": "11",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "123,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "698",\
            "y": "2525",\
            "z": "12",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "345,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "697",\
            "y": "2609",\
            "z": "13",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "345,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num5",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "696",\
            "y": "2692",\
            "z": "14",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "456,0"]\
            ]\
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
            "outputNodeId": "define",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "define",\
            "inputId": "h3",\
            "list": "false"\
            }\
        ]\
    }';



const presetRandom = '\
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
            "x": "556",\
            "y": "2102",\
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
            "x": "900",\
            "y": "2102",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "x", "1470,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "395",\
            "y": "2240",\
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
            "x": "743",\
            "y": "2322",\
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
            "x": "1490",\
            "y": "2337",\
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
            "x": "1159",\
            "y": "2102",\
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
            "x": "1309",\
            "y": "2102",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "scaleY", "221,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "346",\
            "y": "2048",\
            "z": "7",\
            "width": "1305.8120687980118",\
            "height": "417.66207376486375",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "950",\
            "y": "2751",\
            "z": "8",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "1234,0"],\
                    ["NUM#", "max", "500,0"]\
            ]\
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
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
            }\
        ]\
    }';



const presetNoise = '\
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
            "x": "1393",\
            "y": "2972",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "add", "15,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1959",\
            "y": "2752",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "scaleY", "469.09588744415277,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2140",\
            "y": "2987",\
            "z": "2",\
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
            "x": "1045",\
            "y": "2890",\
            "z": "3",\
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
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "996",\
            "y": "2698",\
            "z": "4",\
            "width": "1305.8120687980118",\
            "height": "417.66207376486375",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Unlike%20Random%2C%20Noise%20has%20a%20scale%20parameter",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1786",\
            "y": "3452",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1206",\
            "y": "2752",\
            "z": "6",\
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
            "x": "1550",\
            "y": "2752",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "x", "1470,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "which%20allows%20for%20%22slower%22%20random%20values.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1786",\
            "y": "3495",\
            "z": "8",\
            "active": "true"\
            },\
            {\
            "type": "NOISE",\
            "id": "noise",\
            "name": "noise",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "1600",\
            "y": "3400",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "seed", "1234,0"],\
                    ["NUM#", "max", "500,0"],\
                    ["NUM#", "scale", "4,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1809",\
            "y": "2752",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "centerY", "100,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "center",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "noise",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
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
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "center",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';


const presetProbability = '\
    {\
        "nodes":\
        [\
            {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1394",\
            "y": "2974",\
            "z": "0",\
            "active": "true",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1197",\
            "y": "3017",\
            "z": "1",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "500,0"]\
            ]\
            },\
            {\
            "type": "CENTR",\
            "id": "center",\
            "name": "center",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1559",\
            "y": "2502",\
            "z": "2",\
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
            "x": "1709",\
            "y": "2502",\
            "z": "3",\
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
            "x": "795",\
            "y": "2640",\
            "z": "4",\
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
            "type": "CMNT",\
            "id": "comment",\
            "name": "Probability%20is%20a%20convenient%20way%20to%20alternate%20between%20values",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1404",\
            "y": "3176",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "746",\
            "y": "2448",\
            "z": "6",\
            "width": "1305.8120687980118",\
            "height": "417.66207376486375",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "with%20a%20certain%20chance%20of%20success.%20It%20generates%20a%20list%20of%201s%20and%200s",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1404",\
            "y": "3219",\
            "z": "7",\
            "active": "true"\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "956",\
            "y": "2502",\
            "z": "8",\
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
            "x": "1300",\
            "y": "2502",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "x", "1470,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1890",\
            "y": "2737",\
            "z": "10",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "50,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1196",\
            "y": "2940",\
            "z": "11",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "100,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1143",\
            "y": "2722",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "add", "15,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "PROB",\
            "id": "prob",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "1197",\
            "y": "3202",\
            "z": "13",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "seed", "1234,0"],\
                    ["NUM#", "chance", "75,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "that%20can%20be%20used%20as%20True%20and%20False.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1404",\
            "y": "3261",\
            "z": "14",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "prob",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "condition",\
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
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
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
            }\
        ]\
    }';



const presetRandomSeeds = '\
    {\
        "nodes":\
        [\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "Sometimes%20you\'ll%20want%20to%20randomize",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2491",\
            "y": "4294",\
            "z": "0"\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "1942",\
            "y": "4537",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "seed", "141,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "every%20time%20until%20the%20seed%20is%20changed%2C%20so",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2924",\
            "y": "3509",\
            "z": "2"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "use%20two%20random%20nodes%20%3Cb%3Ewith%20different%20seeds%3C%2Fb%3E.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2921",\
            "y": "3911",\
            "z": "3"\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2759",\
            "y": "4004",\
            "z": "4",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "179,0"],\
                    ["NUM#", "c2", "202,0"],\
                    ["NUM#", "c3", "114,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "1942",\
            "y": "4680",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "seed", "141,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect3",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2130",\
            "y": "4537",\
            "z": "6",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "x", "400,0"],\
                    ["NUM#", "width", "101,0"],\
                    ["NUM#", "height", "101,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment9",\
            "name": "to%20both%20green%20randoms.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1714",\
            "y": "4452",\
            "z": "7"\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2571",\
            "y": "3530",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2130",\
            "y": "4720",\
            "z": "9",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "226.95000000000002,0"],\
                    ["NUM#", "c2", "54.467999999999996,0"],\
                    ["NUM#", "c3", "62.040397609798625,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect2",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2759",\
            "y": "3821",\
            "z": "10",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "x", "200,0"],\
                    ["NUM#", "width", "111,0"],\
                    ["NUM#", "height", "173,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2759",\
            "y": "3446",\
            "z": "11",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "111,0"],\
                    ["NUM#", "height", "111,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "this%20rectangle%20will%20always%20be%20a%20square.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2924",\
            "y": "3557",\
            "z": "12"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "1663",\
            "y": "4301",\
            "z": "13",\
            "width": "664",\
            "height": "551.542398553761",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "To%20randomize%20both%20dimensions%20separately%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2921",\
            "y": "3865",\
            "z": "14"\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2571",\
            "y": "3844",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "1744",\
            "y": "4634",\
            "z": "16",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2759",\
            "y": "3629",\
            "z": "17",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "179,0"],\
                    ["NUM#", "c2", "202,0"],\
                    ["NUM#", "c3", "114,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2572",\
            "y": "3987",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "seed", "456,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "A%20random%20node%20will%20give%20the%20same%20value",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2927",\
            "y": "3463",\
            "z": "19"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "because%20the%20blue%20random%20gives%20the%20same%20seed",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1715",\
            "y": "4407",\
            "z": "20"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "%3Cb%3ETHIS%20WILL%20NOT%20WORK%3C%2Fb%3E",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1716",\
            "y": "4362",\
            "z": "21"\
            },\
            {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "3185.17",\
            "y": "4486",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3342",\
            "y": "4485",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "count", "7,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "seeds",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "3670.56",\
            "y": "4485",\
            "z": "24",\
            "width": "120",\
            "height": "186",\
            "params":\
            [\
                    ["NUM#", "0", "111,0"],\
                    ["NUM#", "1", "166,0"],\
                    ["NUM#", "2", "54,0"],\
                    ["NUM#", "3", "13,0"],\
                    ["NUM#", "4", "21,0"],\
                    ["NUM#", "5", "119,0"],\
                    ["NUM#", "6", "198,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment10",\
            "name": "Repeating%20a%20random",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3526.56",\
            "y": "4369",\
            "z": "25"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3130",\
            "y": "4302",\
            "z": "26",\
            "width": "709.7971882372418",\
            "height": "419",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random8",\
            "name": "random%20W",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "3984.56",\
            "y": "4171",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "seed", "111,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random9",\
            "name": "random%20H",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "3984.56",\
            "y": "4314",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "seed", "166,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect4",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4326.56",\
            "y": "4260",\
            "z": "29",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "x", "600,0"],\
                    ["NUM#", "width", "183,0"],\
                    ["NUM#", "height", "112,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment12",\
            "name": "a%20lot%20of%20stuff%20from%20just%20one%20seed.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2494",\
            "y": "4336",\
            "z": "30"\
            },\
            {\
            "type": "RAND",\
            "id": "random10",\
            "name": "random%20W",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "3984.56",\
            "y": "4458",\
            "z": "31",\
            "params":\
            [\
                    ["NUM#", "seed", "54,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random11",\
            "name": "random%20H",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "3984.56",\
            "y": "4601",\
            "z": "32",\
            "params":\
            [\
                    ["NUM#", "seed", "13,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4142.56",\
            "y": "4859",\
            "z": "33",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "118,0"],\
                    ["NUM#", "c2", "57,0"],\
                    ["NUM#", "c3", "184,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4326.56",\
            "y": "4435",\
            "z": "34",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "x", "600,0"],\
                    ["NUM#", "y", "200,0"],\
                    ["NUM#", "width", "47,0"],\
                    ["NUM#", "height", "184,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random12",\
            "name": "random%20R",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3983.56",\
            "y": "4798",\
            "z": "35",\
            "params":\
            [\
                    ["NUM#", "seed", "21,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random13",\
            "name": "random%20G",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3983.56",\
            "y": "4930",\
            "z": "36",\
            "params":\
            [\
                    ["NUM#", "seed", "119,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random14",\
            "name": "random%20B",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3983.56",\
            "y": "5065",\
            "z": "37",\
            "params":\
            [\
                    ["NUM#", "seed", "198,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment11",\
            "name": "creates%20a%20list%20of%20seeds.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3524.56",\
            "y": "4406",\
            "z": "38"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment13",\
            "name": "MAIN",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3192.17",\
            "y": "4371",\
            "z": "39"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment14",\
            "name": "SEED",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3192.17",\
            "y": "4406",\
            "z": "40"\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "3508",\
            "y": "4485",\
            "z": "41"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "3149",\
            "y": "4753",\
            "z": "42",\
            "width": "664",\
            "height": "204.16025645645797",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment15",\
            "name": "The%20%3Cb%3Efreeze%20node%3C%2Fb%3E%20stops%20anything%20to%20the%20left%20of%20it",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3187",\
            "y": "4795",\
            "z": "43"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment16",\
            "name": "from%20generating%20new%20values.%20%20Once%20the%20repeat",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3192",\
            "y": "4837",\
            "z": "44"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment17",\
            "name": "is%20done%2C%20freeze%20caches%20the%20results.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3190",\
            "y": "4881",\
            "z": "45"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "random4",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "random5",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect3",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect3",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect3",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect2",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect2",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect2",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "1",\
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
            "outputNodeId": "random7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "freeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "2",\
            "inputNodeId": "random8",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "2",\
            "inputNodeId": "random9",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect4",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect4",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect4",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "0",\
            "inputNodeId": "random10",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "3",\
            "outputOrder": "0",\
            "inputNodeId": "random11",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random12",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random13",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random14",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random10",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "4",\
            "outputOrder": "0",\
            "inputNodeId": "random12",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "5",\
            "outputOrder": "0",\
            "inputNodeId": "random13",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "6",\
            "outputOrder": "0",\
            "inputNodeId": "random14",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "freeze",\
            "inputId": "h0",\
            "list": "true"\
            }\
        ]\
    }';