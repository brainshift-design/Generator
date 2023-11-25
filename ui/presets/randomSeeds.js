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
            "x": "3591",\
            "y": "5394",\
            "z": "0"\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "3042",\
            "y": "5637",\
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
            "x": "4024",\
            "y": "4609",\
            "z": "2"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "use%20two%20random%20nodes%20%3Cb%3Ewith%20different%20seeds%3C%2Fb%3E.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4021",\
            "y": "5011",\
            "z": "3"\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3859",\
            "y": "5104",\
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
            "highlight": "5",\
            "x": "3042",\
            "y": "5837",\
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
            "x": "3230",\
            "y": "5637",\
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
            "x": "2814",\
            "y": "5552",\
            "z": "7"\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3671",\
            "y": "4630",\
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
            "x": "3230",\
            "y": "5820",\
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
            "x": "3859",\
            "y": "4921",\
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
            "x": "3859",\
            "y": "4546",\
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
            "x": "4024",\
            "y": "4657",\
            "z": "12"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "2763",\
            "y": "5401",\
            "z": "13",\
            "width": "664",\
            "height": "660.0210223943318",\
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
            "x": "4021",\
            "y": "4965",\
            "z": "14"\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3671",\
            "y": "4906.11",\
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
            "highlight": "6",\
            "x": "2844",\
            "y": "5734",\
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
            "x": "3859",\
            "y": "4729",\
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
            "x": "3672",\
            "y": "5087",\
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
            "x": "4027",\
            "y": "4563",\
            "z": "19"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "because%20the%20blue%20random%20gives%20the%20same%20seed",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2815",\
            "y": "5507",\
            "z": "20"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "%3Cb%3ETHIS%20WILL%20NOT%20WORK%3C%2Fb%3E",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2816",\
            "y": "5462",\
            "z": "21"\
            },\
            {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "4285.17",\
            "y": "5586",\
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
            "x": "4442",\
            "y": "5585",\
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
            "highlight": "6",\
            "x": "4770.56",\
            "y": "5585",\
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
            "x": "4626.56",\
            "y": "5469",\
            "z": "25"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4230",\
            "y": "5402",\
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
            "highlight": "5",\
            "x": "5085",\
            "y": "5122",\
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
            "highlight": "5",\
            "x": "5085",\
            "y": "5312",\
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
            "x": "5426.56",\
            "y": "5360",\
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
            "x": "3594",\
            "y": "5436",\
            "z": "30"\
            },\
            {\
            "type": "RAND",\
            "id": "random10",\
            "name": "random%20W",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "5085",\
            "y": "5504",\
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
            "highlight": "5",\
            "x": "5084.56",\
            "y": "5701",\
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
            "x": "5242.56",\
            "y": "5959",\
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
            "x": "5426.56",\
            "y": "5535",\
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
            "x": "5084",\
            "y": "5904",\
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
            "x": "5084",\
            "y": "6081",\
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
            "x": "5084",\
            "y": "6257",\
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
            "x": "4624.56",\
            "y": "5506",\
            "z": "38"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment13",\
            "name": "MAIN",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4292.17",\
            "y": "5471",\
            "z": "39"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment14",\
            "name": "SEED",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4292.17",\
            "y": "5506",\
            "z": "40"\
            },\
            {\
            "type": "FRZ",\
            "id": "freeze",\
            "name": "freeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "6",\
            "x": "4608",\
            "y": "5585",\
            "z": "41"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "6",\
            "x": "4249",\
            "y": "5853",\
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
            "x": "4287",\
            "y": "5895",\
            "z": "43"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment16",\
            "name": "from%20generating%20new%20values.%20%20Once%20the%20repeat",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4292",\
            "y": "5937",\
            "z": "44"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment17",\
            "name": "is%20done%2C%20freeze%20caches%20the%20results.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4290",\
            "y": "5981",\
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