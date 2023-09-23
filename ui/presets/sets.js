const presetSequence = '\
    {\
        "nodes":\
        [\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "500",\
            "y": "2300",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "106",\
            "y": "1652",\
            "z": "1",\
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
            "x": "450",\
            "y": "1652",\
            "z": "2",\
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
            "x": "-55",\
            "y": "1790",\
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
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "293",\
            "y": "1872",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "step", "30,0"],\
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
            "x": "1040",\
            "y": "1887",\
            "z": "5",\
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
            "x": "709",\
            "y": "1652",\
            "z": "6",\
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
            "x": "859",\
            "y": "1652",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "scaleY", "490,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "-104",\
            "y": "1598",\
            "z": "8",\
            "width": "1305.8120687980118",\
            "height": "417.66207376486375",\
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
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
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
            "x": "156",\
            "y": "1702",\
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
            "x": "500",\
            "y": "1702",\
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
            "x": "-5",\
            "y": "1840",\
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
            "x": "343",\
            "y": "1922",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "step", "30,0"],\
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
            "x": "1090",\
            "y": "1937",\
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
            "x": "759",\
            "y": "1702",\
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
            "x": "909",\
            "y": "1702",\
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
            "x": "-54",\
            "y": "1648",\
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
            "x": "638",\
            "y": "2335",\
            "z": "8",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "end", "500,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Unlike%20Sequence%2C%20Range%20%3Cb%3Emust%3C%2Fb%3E%20be%20connected%20to%20a%20Repeat",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "973",\
            "y": "2177",\
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
            "x": "973",\
            "y": "2221",\
            "z": "10",\
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
                    ["NUM#", "step", "30,0"],\
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
                    ["NUM#", "value", "567,0"]\
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
                    ["NUM#", "value", "789,0"]\
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
                    ["NUM#", "step", "30,0"],\
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
                    ["NUM#", "step", "30,0"],\
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
                    ["NUM#", "step", "30,0"],\
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