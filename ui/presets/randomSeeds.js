const presetRandomSeeds = '\
    {\
        "nodes":\
        [\
            {\
            "type": "CMNT",\
            "id": "comment15",\
            "name": "The%20%3Cb%3Efreeze%20node%3C%2Fb%3E%20stops%20anything%20to%20the%20left%20of%20it",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4387",\
            "y": "5995",\
            "z": "0"\
            },\
            {\
            "type": "RECT",\
            "id": "rect4",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5526.56",\
            "y": "5460",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "x", "600,0"],\
                    ["NUM#", "width", "183,0"],\
                    ["NUM#", "height", "112,0"]\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5526.56",\
            "y": "5635",\
            "z": "2",\
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
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "3142",\
            "y": "5937",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "seed", "141,0"],\
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
            "x": "4592",\
            "y": "5683",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "count", "7,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "use%20two%20random%20nodes%20%3Cb%3Ewith%20different%20seeds%3C%2Fb%3E.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4121",\
            "y": "5111",\
            "z": "5"\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3772",\
            "y": "5187",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "seed", "456,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment11",\
            "name": "creates%20a%20list%20of%20seeds.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4655",\
            "y": "5604",\
            "z": "7"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3959",\
            "y": "4829",\
            "z": "8",\
            "t3172": "hex",\
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
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "6",\
            "x": "2944",\
            "y": "5834",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel3",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "6",\
            "x": "4349",\
            "y": "5953",\
            "z": "10",\
            "width": "664",\
            "height": "204.16025645645797",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3330",\
            "y": "5920",\
            "z": "11",\
            "t3172": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "226.95000000000002,0"],\
                    ["NUM#", "c2", "54.467999999999996,0"],\
                    ["NUM#", "c3", "62.040397609798625,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "every%20time%20until%20the%20seed%20is%20changed%2C%20so",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4124",\
            "y": "4709",\
            "z": "12"\
            },\
            {\
            "type": "RAND",\
            "id": "random8",\
            "name": "random%20W",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "5185",\
            "y": "5222",\
            "z": "13",\
            "params":\
            [\
                    ["NUM#", "seed", "111,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random14",\
            "name": "random%20B",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5184",\
            "y": "6357",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "seed", "198,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color5",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5342.56",\
            "y": "6059",\
            "z": "15",\
            "t3172": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "118,0"],\
                    ["NUM#", "c2", "57,0"],\
                    ["NUM#", "c3", "184,0"]\
            ]\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "seeds",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "6",\
            "x": "4801",\
            "y": "5683",\
            "z": "16",\
            "active": "true",\
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
            "id": "comment7",\
            "name": "Sometimes%20you\'ll%20want%20to%20randomize",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3691",\
            "y": "5494",\
            "z": "17"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment14",\
            "name": "SEED",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4442",\
            "y": "5604",\
            "z": "18"\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3771",\
            "y": "5006.11",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment12",\
            "name": "a%20lot%20of%20stuff%20from%20just%20one%20seed.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3694",\
            "y": "5536",\
            "z": "20"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "%3Cb%3ETHIS%20WILL%20NOT%20WORK%3C%2Fb%3E",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2916",\
            "y": "5562",\
            "z": "21"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "because%20the%20blue%20random%20gives%20the%20same%20seed",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2915",\
            "y": "5607",\
            "z": "22"\
            },\
            {\
            "type": "RECT",\
            "id": "rect2",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3959",\
            "y": "5021",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "x", "200,0"],\
                    ["NUM#", "width", "111,0"],\
                    ["NUM#", "height", "173,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment17",\
            "name": "is%20done%2C%20freeze%20caches%20the%20results.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4390",\
            "y": "6081",\
            "z": "24"\
            },\
            {\
            "type": "RECT",\
            "id": "rect3",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3330",\
            "y": "5737",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "x", "400,0"],\
                    ["NUM#", "width", "101,0"],\
                    ["NUM#", "height", "101,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "3142",\
            "y": "5737",\
            "z": "26",\
            "params":\
            [\
                    ["NUM#", "seed", "141,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4347",\
            "y": "5502",\
            "z": "27",\
            "width": "663.998062298179",\
            "height": "419",\
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
            "highlight": "0",\
            "x": "3771",\
            "y": "4730",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random12",\
            "name": "random%20R",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5184",\
            "y": "6004",\
            "z": "29",\
            "params":\
            [\
                    ["NUM#", "seed", "21,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random10",\
            "name": "random%20W",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "5185",\
            "y": "5604",\
            "z": "30",\
            "params":\
            [\
                    ["NUM#", "seed", "54,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3959",\
            "y": "5204",\
            "z": "31",\
            "t3172": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "179,0"],\
                    ["NUM#", "c2", "202,0"],\
                    ["NUM#", "c3", "114,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "2863",\
            "y": "5501",\
            "z": "32",\
            "width": "664",\
            "height": "660.0210223943318",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random7",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "4435",\
            "y": "5684",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment9",\
            "name": "to%20both%20green%20randoms.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2914",\
            "y": "5652",\
            "z": "34"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment10",\
            "name": "Repeating%20a%20random",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4657",\
            "y": "5567",\
            "z": "35"\
            },\
            {\
            "type": "RAND",\
            "id": "random13",\
            "name": "random%20G",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5184",\
            "y": "6181",\
            "z": "36",\
            "params":\
            [\
                    ["NUM#", "seed", "119,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment16",\
            "name": "from%20generating%20new%20values.%20%20Once%20the%20repeat",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4392",\
            "y": "6037",\
            "z": "37"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "A%20random%20node%20will%20give%20the%20same%20value",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4127",\
            "y": "4663",\
            "z": "38"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "this%20rectangle%20will%20always%20be%20a%20square.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4124",\
            "y": "4757",\
            "z": "39"\
            },\
            {\
            "type": "RAND",\
            "id": "random9",\
            "name": "random%20H",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "5185",\
            "y": "5412",\
            "z": "40",\
            "params":\
            [\
                    ["NUM#", "seed", "166,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment13",\
            "name": "MAIN",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4442",\
            "y": "5569",\
            "z": "41"\
            },\
            {\
            "type": "RAND",\
            "id": "random11",\
            "name": "random%20H",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "5184.56",\
            "y": "5801",\
            "z": "42",\
            "params":\
            [\
                    ["NUM#", "seed", "13,0"],\
                    ["NUM#", "max", "200,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3959",\
            "y": "4646",\
            "z": "43",\
            "params":\
            [\
                    ["NUM#", "width", "111,0"],\
                    ["NUM#", "height", "111,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "To%20randomize%20both%20dimensions%20separately%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4121",\
            "y": "5065",\
            "z": "44"\
            }\
        ],\
        "connections":\
        [\
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
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "random5",\
            "inputId": "seed",\
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
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "2",\
            "inputNodeId": "random8",\
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
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
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
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "random4",\
            "inputId": "seed",\
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
            "outputId": "2",\
            "outputOrder": "0",\
            "inputNodeId": "random10",\
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
            "outputId": "1",\
            "outputOrder": "2",\
            "inputNodeId": "random9",\
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
            }\
        ]\
    }';