const presetTextFromBackground = '\
    {\
        "nodes":\
        [\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "semi%20bold%20italic",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2588",\
            "y": "2994",\
            "z": "0",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "7,0"]\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse2",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2826",\
            "y": "3028",\
            "z": "1",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CCNT",\
            "id": "contrast",\
            "name": "contrast",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2352",\
            "y": "3219",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "contrast", "-68.38478086073042,1"]\
            ]\
            },\
            {\
            "type": "ABS",\
            "id": "abs",\
            "name": "absolute",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2505",\
            "y": "3261",\
            "z": "3",\
            "params":\
            []\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "italic",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2588",\
            "y": "3062",\
            "z": "4",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "4,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "background",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "2144",\
            "y": "3639.25",\
            "z": "5",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "229.99999999999997,0"],\
                    ["NUM#", "c2", "76.33136094674555,0"],\
                    ["NUM#", "c3", "67,0"]\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2830",\
            "y": "3390",\
            "z": "6",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2143",\
            "y": "3361",\
            "z": "7",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "255,0"],\
                    ["NUM#", "c2", "255,0"],\
                    ["NUM#", "c3", "255,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3022",\
            "y": "3500",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "y", "-50,0"],\
                    ["NUM#", "width", "300,0"],\
                    ["NUM#", "round", "10,0"]\
            ]\
            },\
            {\
            "type": "COND",\
            "id": "cond",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "2650",\
            "y": "3261",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "operation", "5,0"],\
                    ["NUM#", "operand", "35,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2143",\
            "y": "3448",\
            "z": "10",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "0,0"],\
                    ["NUM#", "c2", "0,0"],\
                    ["NUM#", "c3", "0,0"]\
            ]\
            },\
            {\
            "type": "TXTS",\
            "id": "text",\
            "name": "button%20title",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3021",\
            "y": "3101",\
            "z": "11",\
            "params":\
            [\
                    ["TEXT#", "text", "TEXT%20LABEL", "center"],\
                    ["NUM#", "width", "300,0"],\
                    ["NUM#", "size", "30,0"],\
                    ["TEXT#", "style", "Semi%20Bold%20Italic"],\
                    ["NUM#", "alignX", "1,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3254",\
            "y": "3364",\
            "z": "12",\
            "active": "true",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Adjust%20the%20background%20color%20to%20see%20how%20the%20text%20color%20and%20weight",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2359",\
            "y": "3716",\
            "z": "13",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "are%20automatically%20determined%20from%20the%20contrast.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2356",\
            "y": "3765",\
            "z": "14",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "Get%20the%20contrast%20of",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2148",\
            "y": "2840",\
            "z": "15",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "white%20on%20background%20and",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2145",\
            "y": "2890",\
            "z": "16",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "compare%20it%20to%20a%20threshold.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2147",\
            "y": "2936",\
            "z": "17",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "No%20need%20to%20contrast",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2149",\
            "y": "3021",\
            "z": "18",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "black%20on%20background%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2150",\
            "y": "3066",\
            "z": "19",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "here%20if%20it\'s%20not%20white%20%E2%80%94",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2149",\
            "y": "3111",\
            "z": "20",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment9",\
            "name": "it\'s%20black.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2148",\
            "y": "3157",\
            "z": "21",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "cond",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ifElse2",\
            "inputId": "condition",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "contrast",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "contrast",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "contrast",\
            "outputId": "contrast",\
            "outputOrder": "0",\
            "inputNodeId": "abs",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ifElse",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "cond",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "condition",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "abs",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "cond",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rect",\
            "outputId": "width",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ifElse2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "style",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "props",\
            "list": "false"\
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
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            }\
        ]\
    }';