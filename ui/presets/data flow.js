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
            "x": "2374",\
            "y": "3697",\
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
            "x": "2182",\
            "y": "3626",\
            "z": "1",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "57,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "76,0"]\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2574",\
            "y": "3649",\
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
            "x": "2374",\
            "y": "3457",\
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
            "x": "2551.48",\
            "y": "3753",\
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
            "x": "2554",\
            "y": "3799",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "with%20only%20one%20input%20it%20works%20as%20a%20pass-or-not%20node.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2550",\
            "y": "3844",\
            "z": "6",\
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


    
const presetSelect = '\
    {\
        "nodes":\
        [\
            {\
            "type": "TRPZ",\
            "id": "trapeze",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1251",\
            "y": "2732",\
            "z": "0",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1250",\
            "y": "2500",\
            "z": "1",\
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
            "x": "982",\
            "y": "2790",\
            "z": "2",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "88,0"],\
                    ["NUM#", "c2", "85,0"],\
                    ["NUM#", "c3", "66,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1252",\
            "y": "2315",\
            "z": "3",\
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
            "x": "1251",\
            "y": "2948",\
            "z": "4",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Change%20the%20select%20index%20to%20decide",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1513",\
            "y": "2943",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "which%20object%20goes%20through.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1514",\
            "y": "2989",\
            "z": "6",\
            "active": "true"\
            },\
            {\
            "type": "STAR",\
            "id": "star",\
            "name": "star",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1251",\
            "y": "3172",\
            "z": "7",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1723",\
            "y": "2831",\
            "z": "8",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "index", "0,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1512",\
            "y": "2802",\
            "z": "9",\
            "width": "120",\
            "height": "90"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "trapeze",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
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
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "poly",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "4",\
            "inputNodeId": "star",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "trapeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "poly",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "star",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h4",\
            "list": "false"\
            }\
        ]\
    }';