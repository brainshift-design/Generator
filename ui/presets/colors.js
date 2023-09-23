const presetColorContrast = '\
    {\
        "nodes":\
        [\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1073",\
            "y": "2611",\
            "z": "0",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "187.00000000000003,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1073",\
            "y": "2416",\
            "z": "1",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "222,0"],\
                    ["NUM#", "c2", "90,0"],\
                    ["NUM#", "c3", "31,0"]\
            ]\
            },\
            {\
            "type": "CCNT",\
            "id": "contrast2",\
            "name": "contrast",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1296",\
            "y": "2472",\
            "z": "2",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "contrast", "74.6288956286683,1"]\
            ]\
            },\
            {\
            "type": "CCNT",\
            "id": "contrast3",\
            "name": "contrast",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1296",\
            "y": "2597",\
            "z": "3",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "contrast", "10.17373424657917,2"],\
                    ["NUM#", "standard", "0,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "contrast2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "contrast2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "contrast3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "contrast3",\
            "inputId": "h1",\
            "list": "false"\
            }\
        ]\
    }';


const presetColorSpaces = '\
    {\
        "nodes":\
        [\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2208",\
            "y": "2732",\
            "z": "0",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "255,0"],\
                    ["NUM#", "c2", "235,0"],\
                    ["NUM#", "c3", "40,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "2022",\
            "y": "2835",\
            "z": "1",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "255,0"],\
                    ["NUM#", "c2", "235,0"],\
                    ["NUM#", "c3", "40,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2208",\
            "y": "2835",\
            "z": "2",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "54.41860465116281,0"],\
                    ["NUM#", "c2", "84.31372549019608,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2209",\
            "y": "2985",\
            "z": "3",\
            "active": "true",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "102.8916688473251,0"],\
                    ["NUM#", "c2", "20.242185668089707,0"],\
                    ["NUM#", "c3", "92.76589836625774,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2387",\
            "y": "2834",\
            "z": "4",\
            "active": "true",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "54.4186037441861,0"],\
                    ["NUM#", "c2", "99.99999999999999,0"],\
                    ["NUM#", "c3", "57.843137254901954,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Adjust%20color%20to",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1791",\
            "y": "2826",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "get%20its%20value%20in",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1785",\
            "y": "2871",\
            "z": "6",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "other%20color%20spaces.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1749",\
            "y": "2915",\
            "z": "7",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "color3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "color4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';

    

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
            [\
                    ["NUM#", "value", "68.38478086073042,1"]\
            ]\
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
            "highlight": "7",\
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
            "highlight": "7",\
            "x": "2650",\
            "y": "3261",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"],\
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
                    ["NUM#", "alignH", "1,0"]\
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
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "h1",\
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
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h1",\
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