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



const presetRandomColors = '\
    {\
        "nodes":\
        [\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2473",\
            "y": "3611",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2473",\
            "y": "3884",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "seed", "789,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "creating%20a%20color%20node",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3278",\
            "y": "3764",\
            "z": "2",\
            "active": "true"\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2964",\
            "y": "3702",\
            "z": "3",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "217,0"],\
                    ["NUM#", "c2", "217,0"],\
                    ["NUM#", "c3", "217,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "Or%20hold%20Alt%2FOption%20when",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3279",\
            "y": "3724",\
            "z": "4",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "from%20the%20toolbar.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3278",\
            "y": "3805",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Type%20%22random%22",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2932",\
            "y": "3800",\
            "z": "6",\
            "active": "true"\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2473",\
            "y": "3746",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "seed", "456,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "instead%20of%20hex.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2936",\
            "y": "3847",\
            "z": "8",\
            "active": "true"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2670",\
            "y": "3718",\
            "z": "9",\
            "active": "true",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "141,0"],\
                    ["NUM#", "c2", "220,0"],\
                    ["NUM#", "c3", "78,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "Use%20random%20nodes.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2187",\
            "y": "3769",\
            "z": "10",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
            }\
        ]\
    }';



const presetTintsAndShades = '\
    {\
        "nodes":\
        [\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "2792",\
            "y": "3998",\
            "z": "0",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "90,0"],\
                    ["NUM#", "c2", "87,0"],\
                    ["NUM#", "c3", "82,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3008",\
            "y": "3827",\
            "z": "1",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "89.99999849999999,0"],\
                    ["NUM#", "c2", "76.99115044247787,0"],\
                    ["NUM#", "c3", "46.33,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3298",\
            "y": "3827",\
            "z": "2",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "89.99999849999999,0"],\
                    ["NUM#", "c2", "76.99115044247787,0"],\
                    ["NUM#", "c3", "76.33,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3152",\
            "y": "3920",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "value", "76.33,0"],\
                    ["NUM#", "operand", "30,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3008",\
            "y": "4131.41",\
            "z": "4",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "89.99999849999999,0"],\
                    ["NUM#", "c2", "76.99115044247787,0"],\
                    ["NUM#", "c3", "46.33,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3298",\
            "y": "4131.41",\
            "z": "5",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "89.99999849999999,0"],\
                    ["NUM#", "c2", "76.99115044247787,0"],\
                    ["NUM#", "c3", "31.33,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3152",\
            "y": "4224.41",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "value", "31.33,0"],\
                    ["NUM#", "operation", "0,0"],\
                    ["NUM#", "operand", "15,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3502",\
            "y": "3989",\
            "z": "7",\
            "width": "120",\
            "height": "64"\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "3669",\
            "y": "4005",\
            "z": "8",\
            "active": "true",\
            "width": "120",\
            "height": "98",\
            "params":\
            [\
                    ["COL#", "0", "3,0 89.99999849999999,0 76.99115044247787,0 76.33,0"],\
                    ["COL#", "1", "2,0 90,0 87,0 82,0"],\
                    ["COL#", "2", "3,0 89.99999849999999,0 76.99115044247787,0 31.33,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color3",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "color4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            }\
        ]\
    }';



const presetPaletteFromColor = '\
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
            "x": "2942",\
            "y": "4148",\
            "z": "0",\
            "active": "true",\
            "prevSpace": "hsl",\
            "params":\
            [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "211.99999646666666,0"],\
                    ["NUM#", "c2", "90.03416856492026,0"],\
                    ["NUM#", "c3", "15,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "3503.44",\
            "y": "4148",\
            "z": "1",\
            "active": "true",\
            "width": "120",\
            "height": "230",\
            "params":\
            [\
                    ["COL#", "100", "3,0 211.99999646666666,0 90.03416856492026,0 95,0"],\
                    ["COL#", "200", "3,0 211.99999646666666,0 90.03416856492026,0 85,0"],\
                    ["COL#", "300", "3,0 211.99999646666666,0 90.03416856492026,0 75,0"],\
                    ["COL#", "400", "3,0 211.99999646666666,0 90.03416856492026,0 65,0"],\
                    ["COL#", "500", "3,0 211.99999646666666,0 90.03416856492026,0 55,0"],\
                    ["COL#", "600", "3,0 211.99999646666666,0 90.03416856492026,0 45,0"],\
                    ["COL#", "700", "3,0 211.99999646666666,0 90.03416856492026,0 35,0"],\
                    ["COL#", "800", "3,0 211.99999646666666,0 90.03416856492026,0 25,0"],\
                    ["COL#", "900", "3,0 211.99999646666666,0 90.03416856492026,0 15,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3301",\
            "y": "4148",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "count", "9,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2785",\
            "y": "4274",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "start", "95,0"],\
                    ["NUM#", "step", "-10,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "2785",\
            "y": "4118",\
            "z": "4",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "212,0"],\
                    ["NUM#", "c2", "51,0"],\
                    ["NUM#", "c3", "97.25490196078431,0"]\
            ]\
            },\
            {\
            "type": "VNAME",\
            "id": "valueName",\
            "name": "value%20name",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3144",\
            "y": "4148",\
            "z": "5",\
            "params":\
            [\
                    ["TEXT#", "name", "900", "center"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3032",\
            "y": "4444",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "start", "100,0"],\
                    ["NUM#", "step", "100,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "N2T",\
            "id": "numToText",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3181",\
            "y": "4444",\
            "z": "7"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "3008",\
            "y": "4312",\
            "z": "8",\
            "active": "true",\
            "width": "316",\
            "height": "249.87860984500307",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Name%20the%20colors",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3057",\
            "y": "4351",\
            "z": "9",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "100-900",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3082",\
            "y": "4390",\
            "z": "10",\
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
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "valueName",\
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
            "inputNodeId": "valueName",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "numToText",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "valueName",\
            "inputId": "name",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "numToText",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';



const presetInvalidColors = '\
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
            "x": "3962",\
            "y": "5202",\
            "z": "0",\
            "active": "true",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "220.00000000000003,0"],\
                    ["NUM#", "c2", "12,0"],\
                    ["NUM#", "c3", "84.53053082647973,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3965",\
            "y": "5488",\
            "z": "1",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "220.00000000000003,0"],\
                    ["NUM#", "c2", "45,0"],\
                    ["NUM#", "c3", "84.53053082647973,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "In%20HCL%20and%20other%20perceptual%20spaces",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3969",\
            "y": "5095",\
            "z": "2",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "red%20lines%20indicate%20values%20%3Cb%3Eoutside%20of%20sRGB%3C%2Fb%3E.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3969",\
            "y": "5135",\
            "z": "3",\
            "active": "true"\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4128",\
            "y": "5488",\
            "z": "4",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "-2284.3631331320794,0"],\
                    ["NUM#", "c2", "241.70725117047726,0"],\
                    ["NUM#", "c3", "370.5187787883573,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "Such%20values%20create%20%3Cb%3Einvalid%20colors%3C%2Fb%3E%2C%20shown%20with%20stripes.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3966",\
            "y": "5423",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4785",\
            "y": "5304",\
            "z": "6",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "220.00000000000003,0"],\
                    ["NUM#", "c2", "45,0"],\
                    ["NUM#", "c3", "84.53053082647973,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5114",\
            "y": "5174",\
            "z": "7",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "0,0"],\
                    ["NUM#", "c2", "242,0"],\
                    ["NUM#", "c3", "255,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "Use%20a%20Valid%20color%20node%20to%20limit%20the%20color%20to%20sRGB.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4781",\
            "y": "5100",\
            "z": "8",\
            "active": "true"\
            },\
            {\
            "type": "CVAL",\
            "id": "valid",\
            "name": "valid",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4950",\
            "y": "5169",\
            "z": "9",\
            "_color": "1,0 0,0 242,0 255,0",\
            "params":\
            [\
                    ["NUM#", "quality", "0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color6",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5114",\
            "y": "5301",\
            "z": "10",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "109,0"],\
                    ["NUM#", "c2", "221,0"],\
                    ["NUM#", "c3", "255,0"]\
            ]\
            },\
            {\
            "type": "CVAL",\
            "id": "valid2",\
            "name": "valid",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4950",\
            "y": "5296",\
            "z": "11",\
            "_color": "1,0 109,0 221,0 255,0",\
            "params":\
            [\
                    ["NUM#", "quality", "1,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color7",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5116",\
            "y": "5422",\
            "z": "12",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "0.5495084313712395,9"],\
                    ["NUM#", "c2", "204.17043327626547,10"],\
                    ["NUM#", "c3", "246.59637947542154,8"]\
            ]\
            },\
            {\
            "type": "CVAL",\
            "id": "valid3",\
            "name": "valid",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4952",\
            "y": "5417",\
            "z": "13",\
            "_color": "4,0 219.9999918549708,9 18.19999741877982,10 78.23053036776213,8",\
            "params":\
            [\
                    ["NUM#", "quality", "2,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "3963",\
            "y": "5136",\
            "z": "14",\
            "active": "true",\
            "width": "118.57148918154229",\
            "height": "40.789739960360464",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "%3Cb%3EFind%20closest%3C%2Fb%3E%20searches%20the%20entire%20color%20space",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4788",\
            "y": "5530",\
            "z": "15",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "for%20the%20perceptually%20closest%20color.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4789",\
            "y": "5571",\
            "z": "16",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "The%20Correct%20color%20node%20lets%20you%20control%20exactly",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5551",\
            "y": "5101",\
            "z": "17",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment9",\
            "name": "how%20the%20closest%20color%20is%20found.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5552",\
            "y": "5143",\
            "z": "18",\
            "active": "true"\
            },\
            {\
            "type": "COL",\
            "id": "color8",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5554",\
            "y": "5220",\
            "z": "19",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "220.00000000000003,0"],\
                    ["NUM#", "c2", "45,0"],\
                    ["NUM#", "c3", "84.53053082647973,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color9",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5974",\
            "y": "5220",\
            "z": "20",\
            "active": "true",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "219.9999918549708,0"],\
                    ["NUM#", "c2", "18.19999741877982,0"],\
                    ["NUM#", "c3", "78.23053036776213,0"]\
            ]\
            },\
            {\
            "type": "CCOR",\
            "id": "correct",\
            "name": "correct",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5793",\
            "y": "5214",\
            "z": "21",\
            "_color": "4,0 219.9999918549708,9 18.19999741877982,10 78.23053036776213,8",\
            "params":\
            [\
                    ["NUM#", "order", "5,0"],\
                    ["NUM#", "c1", "6.25,2"],\
                    ["NUM#", "c2", "26.75,2"],\
                    ["NUM#", "c3", "0,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color10",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5974",\
            "y": "5389",\
            "z": "22",\
            "active": "true",\
            "prevSpace": "hclok",\
            "params":\
            [\
                    ["NUM#", "space", "4,0"],\
                    ["NUM#", "c1", "219.9999885481921,0"],\
                    ["NUM#", "c2", "13.299997469590782,0"],\
                    ["NUM#", "c3", "84.53053031574358,0"]\
            ]\
            },\
            {\
            "type": "CCOR",\
            "id": "correct2",\
            "name": "correct",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5793",\
            "y": "5383",\
            "z": "23",\
            "_color": "4,0 219.9999885481921,10 13.299997469590782,10 84.53053031574358,8",\
            "params":\
            [\
                    ["NUM#", "order", "5,0"],\
                    ["NUM#", "c1", "0,0"],\
                    ["NUM#", "c2", "32,0"],\
                    ["NUM#", "c3", "0,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "don\'t%20adjust%20L",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5594",\
            "y": "5466",\
            "z": "24",\
            "width": "150.3478113978905",\
            "height": "54"\
            },\
            {\
            "type": "NUM",\
            "id": "num3",\
            "name": "force%20correction%20order",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5596",\
            "y": "5397",\
            "z": "25",\
            "width": "146.5873157905789",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "5,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "valid",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color5",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "valid",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "valid2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color6",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "valid2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "valid3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color7",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color4",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "valid3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "correct",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color9",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color8",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "correct",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "correct2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color10",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "correct2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "correct2",\
            "inputId": "order",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "correct2",\
            "inputId": "c1",\
            "list": "false"\
            }\
        ]\
    }';