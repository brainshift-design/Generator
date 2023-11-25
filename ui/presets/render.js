const presetRender = '\
    {\
        "nodes":\
        [\
        {\
            "type": "TJOIN",\
            "id": "join",\
            "name": "join",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6299.12",\
            "y": "5493",\
            "z": "0",\
            "width": "120",\
            "height": "99",\
            "params":\
            [\
                ["TEXT#", "value", "Updated%20on%205%20November%202023", "center"],\
                ["TEXT#", "with", "%20", "center"]\
            ]\
        },\
        {\
            "type": "N2T",\
            "id": "numToText2",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6097",\
            "y": "5613",\
            "z": "1",\
            "params":\
            [\
                ["TEXT#", "decimals", ".", "left"],\
                ["TEXT#", "thousands", "", "left"]\
            ]\
        },\
        {\
            "type": "DATE",\
            "id": "dateTime",\
            "name": "date%20%26%20time",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5778.88",\
            "y": "5428",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "hours", "10,0"],\
                ["NUM#", "minutes", "17,0"],\
                ["NUM#", "seconds", "18,0"],\
                ["NUM#", "dayOfWeek", "6,0"],\
                ["NUM#", "date", "25,0"],\
                ["NUM#", "month", "11,0"],\
                ["NUM#", "year", "2023,0"]\
            ]\
        },\
        {\
            "type": "TXTS",\
            "id": "text2",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6461.12",\
            "y": "5488",\
            "z": "3",\
            "params":\
            [\
                ["TEXT#", "text", "Updated%20on%205%20November%202023", "center"],\
                ["NUM#", "x", "-137,0"],\
                ["NUM#", "y", "407,0"],\
                ["NUM#", "width", "385,0"],\
                ["NUM#", "height", "28,0"],\
                ["NUM#", "size", "24,0"],\
                ["TEXT#", "style", "Bold"],\
                ["NUM#", "alignH", "1,0"]\
            ]\
        },\
        {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "Click%20the%20%3Cb%3Enode%20icon%3C%2Fb%3E%20to%20create%20a%20copy%20of%20the%20objects%20that%20are",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7308",\
            "y": "5057",\
            "z": "4",\
            "active": "true"\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6205",\
            "y": "4178",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "x", "27,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "ROT",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6049",\
            "y": "4177",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "angle", "-90,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5461",\
            "y": "4132",\
            "z": "7",\
            "params":\
            [\
                ["NUM#", "seed", "2099,0"],\
                ["NUM#", "min", "-100,0"],\
                ["NUM#", "max", "-50,0"]\
            ]\
        },\
        {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "the%20objects%20will%20be%20updated.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7310",\
            "y": "4972",\
            "z": "8",\
            "active": "true"\
        },\
        {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6485",\
            "y": "4180",\
            "z": "9",\
            "params":\
            [\
                ["NUM#", "angle", "336,0"]\
            ]\
        },\
        {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5893",\
            "y": "4176",\
            "z": "10",\
            "params":\
            [\
                ["NUM#", "scaleX", "32,0"],\
                ["NUM#", "scaleY", "32,0"],\
                ["NUM#", "affectSpace", "0,0"]\
            ]\
        },\
        {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "not%20linked%20and%20will%20not%20be%20managed%20by%20Generator.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7307",\
            "y": "5099",\
            "z": "11",\
            "active": "true"\
        },\
        {\
            "type": "INDEX",\
            "id": "index",\
            "name": "to%20name",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5951",\
            "y": "5525",\
            "z": "12",\
            "params":\
            [\
                ["NUM#", "name", "1,0"],\
                ["NUM#", "index", "11,0"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5657",\
            "y": "4544",\
            "z": "13",\
            "params":\
            [\
                ["NUM#", "start", "100,0"],\
                ["NUM#", "add", "-17,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5399",\
            "y": "4352",\
            "z": "14",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "300,0"],\
                ["NUM#", "c2", "0,0"],\
                ["NUM#", "c3", "25,0"]\
            ]\
        },\
        {\
            "type": "TRPZ",\
            "id": "trapeze",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5650",\
            "y": "4176",\
            "z": "15",\
            "params":\
            [\
                ["NUM#", "height", "174,0"],\
                ["NUM#", "round", "50,0"],\
                ["NUM#", "bias", "-94,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6265",\
            "y": "5778",\
            "z": "16",\
            "prevSpace": "hex",\
            "params":\
            [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "136,0"],\
                ["NUM#", "c2", "136,0"],\
                ["NUM#", "c3", "136,0"]\
            ]\
        },\
        {\
            "type": "N2T",\
            "id": "numToText",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6102",\
            "y": "5419",\
            "z": "17",\
            "params":\
            [\
                ["TEXT#", "decimals", ".", "left"],\
                ["TEXT#", "thousands", "", "left"]\
            ]\
        },\
        {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "To%20avoid%20conflicts%20with%20existing%20geometry%20on%20the%20canvas",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7309",\
            "y": "4525",\
            "z": "18",\
            "active": "true"\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5159",\
            "y": "4735",\
            "z": "19",\
            "params":\
            [\
                ["NUM#", "start", "85,0"],\
                ["NUM#", "add", "-15,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "TEXT",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6101",\
            "y": "5344",\
            "z": "20",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["TEXT#", "value", "Updated%20on", "center"]\
            ]\
        },\
        {\
            "type": "TCASE",\
            "id": "case",\
            "name": "case",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6101",\
            "y": "5535",\
            "z": "21",\
            "params":\
            [\
                ["TEXT#", "value", "November", "center"]\
            ]\
        },\
        {\
            "type": "RANGE",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6281",\
            "y": "4423",\
            "z": "22",\
            "params":\
            [\
                ["NUM#", "from", "0,0"],\
                ["NUM#", "end", "360,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6728",\
            "y": "4722",\
            "z": "23",\
            "width": "120",\
            "height": "64"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "Generator%20removes%20its%20objects%20when%20you%20close%20the%20plugin.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7307",\
            "y": "4566",\
            "z": "24",\
            "active": "true"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "on%20the%20canvas%20when%20you%20close%20the%20plugin.%20When%20you%20reopen%20it%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7309",\
            "y": "4926",\
            "z": "25",\
            "active": "true"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "By%20enabling%20%3Cb%3Epreserve%3C%2Fb%3E%20you%20tell%20Generator%20to%20leave%20the%20objects",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7312",\
            "y": "4883",\
            "z": "26",\
            "active": "true"\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5806",\
            "y": "4718",\
            "z": "27",\
            "params":\
            [\
                ["NUM#", "start", "187,0"],\
                ["NUM#", "add", "-40,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6965",\
            "y": "4668",\
            "z": "28",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "RENDER",\
            "id": "render",\
            "name": "render",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7312",\
            "y": "4672",\
            "z": "29",\
            "active": "true"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "The%20Render%20node%20makes%20things%20move%20flexible.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "7310",\
            "y": "4802",\
            "z": "30",\
            "active": "true"\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6678",\
            "y": "4353",\
            "z": "31",\
            "params":\
            [\
                ["NUM#", "count", "15,0"]\
            ]\
        },\
        {\
            "type": "CMNT",\
            "id": "comment9",\
            "name": "In%20this%20case%20Render%20is%20used%20to%20leave%20a%20time%20stamp",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6834.33",\
            "y": "5477",\
            "z": "32",\
            "active": "true"\
        },\
        {\
            "type": "RENDER",\
            "id": "render2",\
            "name": "render",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6618.12",\
            "y": "5492",\
            "z": "33",\
            "active": "true"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment10",\
            "name": "which%20gets%20updated%20every%20time%20the%20graph%20is%20loaded.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6831.33",\
            "y": "5517",\
            "z": "34",\
            "active": "true"\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "numToText",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "case",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "numToText2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "dateTime",\
            "outputId": "year",\
            "outputOrder": "0",\
            "inputNodeId": "numToText2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "join",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "text",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "rotate2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "trapeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "dateTime",\
            "outputId": "month",\
            "outputOrder": "0",\
            "inputNodeId": "index",\
            "inputId": "index",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "bias",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "dateTime",\
            "outputId": "date",\
            "outputOrder": "0",\
            "inputNodeId": "numToText",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "index",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "case",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "render",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "rotate",\
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
            "outputNodeId": "text2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "render2",\
            "inputId": "h0",\
            "list": "false"\
        }\
        ]\
    }';