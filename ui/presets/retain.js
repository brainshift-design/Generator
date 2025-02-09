const presetRetain = '\
{\
    "generatorVersion": "447",\
        "nodes":\
    [\
        {\
            "type": "TJOIN",\
            "created": "1738960955348",\
            "updated": "1738960955348",\
            "id": "join",\
            "name": "join",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6366.28",\
            "y": "5593",\
            "z": "0",\
            "width": "120",\
            "height": "99",\
            "params":\
                [\
                    ["TEXT#", "with", "%20", "center"]\
                ]\
        },\
        {\
            "type": "N2T",\
            "created": "1738960955349",\
            "updated": "1738960955349",\
            "id": "numToText2",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6135.28",\
            "y": "5742",\
            "z": "1",\
            "params":\
                [\
                    ["TEXT#", "decimals", ".", "left"],\
                    ["TEXT#", "thousands", "", "left"]\
                ]\
        },\
        {\
            "type": "DATE",\
            "created": "1738960955350",\
            "updated": "1738960955350",\
            "id": "dateTime",\
            "name": "date%20%26%20time",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5747.28",\
            "y": "5528",\
            "z": "2",\
            "params":\
                [\
                    ["NUM#", "hours", "21,0"],\
                    ["NUM#", "minutes", "44,0"],\
                    ["NUM#", "seconds", "49,0"],\
                    ["NUM#", "dayOfWeek", "5,0"],\
                    ["NUM#", "date", "7,0"],\
                    ["NUM#", "month", "2,0"],\
                    ["NUM#", "year", "2025,0"]\
                ]\
        },\
        {\
            "type": "TXTS",\
            "created": "1738960955354",\
            "updated": "1738960955354",\
            "id": "text2",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6561.12",\
            "y": "5588",\
            "z": "3",\
            "params":\
                [\
                    ["TEXT#", "text", "Updated%20on%2025%20%202023", "center"],\
                    ["NUM#", "x", "-137,0"],\
                    ["NUM#", "y", "407,0"],\
                    ["NUM#", "width", "385,0"],\
                    ["NUM#", "height", "28,0"],\
                    ["NUM#", "size", "24,0"],\
                    ["TEXT#", "style", "Bold"],\
                    ["NUM#", "alignX", "1,0"]\
                ]\
        },\
        {\
            "type": "CMNT",\
            "created": "1738960955355",\
            "updated": "1738960955391",\
            "id": "comment7",\
            "name": "Click%20the%20retain%20node%3Cb%3E%20icon%3C%2Fb%3E%20to%20create%20an%20unlinked%20copy%20of%20the%20objects",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7408",\
            "y": "5157",\
            "z": "4",\
            "active": "true"\
        },\
        {\
            "type": "MOVE",\
            "created": "1738960955357",\
            "updated": "1738960955357",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6305",\
            "y": "4278",\
            "z": "5",\
            "params":\
                [\
                    ["NUM#", "x", "27,0"]\
                ]\
        },\
        {\
            "type": "ROT",\
            "created": "1738960955358",\
            "updated": "1738960955358",\
            "id": "rotate2",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6149",\
            "y": "4277",\
            "z": "6",\
            "params":\
                [\
                    ["NUM#", "angle", "-90,0"]\
                ]\
        },\
        {\
            "type": "RAND",\
            "created": "1738960955360",\
            "updated": "1738960955360",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5512",\
            "y": "4326",\
            "z": "7",\
            "params":\
                [\
                    ["NUM#", "seed", "2099,0"],\
                    ["NUM#", "iteration", "?,?"],\
                    ["NUM#", "min", "-100,0"],\
                    ["NUM#", "max", "-50,0"]\
                ]\
        },\
        {\
            "type": "CMNT",\
            "created": "1738960955360",\
            "updated": "1738960955391",\
            "id": "comment6",\
            "name": "the%20objects%20will%20be%20updated.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7410",\
            "y": "5072",\
            "z": "8",\
            "active": "true"\
        },\
        {\
            "type": "ROT",\
            "created": "1738960955361",\
            "updated": "1738960955361",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6585",\
            "y": "4280",\
            "z": "9",\
            "params":\
                [\
                    ["NUM#", "angle", "336,0"],\
                    ["NUM#", "affectSpace", "2,0"]\
                ]\
        },\
        {\
            "type": "SCALE",\
            "created": "1738960955363",\
            "updated": "1738960955363",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5993",\
            "y": "4276",\
            "z": "10",\
            "params":\
                [\
                    ["NUM#", "scaleX", "32,0"],\
                    ["NUM#", "scaleY", "32,0"]\
                ]\
        },\
        {\
            "type": "CMNT",\
            "created": "1738960955363",\
            "updated": "1738960955391",\
            "id": "comment8",\
            "name": "that%20will%20not%20be%20managed%20by%20Generator.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7407",\
            "y": "5199",\
            "z": "11",\
            "active": "true"\
        },\
        {\
            "type": "INDEX",\
            "created": "1738960955364",\
            "updated": "1738960955364",\
            "id": "index",\
            "name": "to%20name",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5947.28",\
            "y": "5616",\
            "z": "12",\
            "params":\
                [\
                    ["NUM#", "name", "1,0"],\
                    ["NUM#", "index", "11,0"]\
                ]\
        },\
        {\
            "type": "SEQ",\
            "created": "1738960955366",\
            "updated": "1738960955366",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5681",\
            "y": "4850",\
            "z": "13",\
            "params":\
                [\
                    ["NUM#", "start", "100,0"],\
                    ["NUM#", "add", "-17,0"],\
                    ["NUM#", "end", "?,?"]\
                ]\
        },\
        {\
            "type": "COL",\
            "created": "1738960955368",\
            "updated": "1738960955368",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5511",\
            "y": "4544",\
            "z": "14",\
            "prevSpace": "hsv",\
            "params":\
                [\
                    ["NUM#", "space", "3,0"],\
                    ["NUM#", "c1", "300,0"],\
                    ["NUM#", "c2", "0,0"],\
                    ["NUM#", "c3", "25,0"]\
                ]\
        },\
        {\
            "type": "TRPZ",\
            "created": "1738960955369",\
            "updated": "1738960955369",\
            "id": "trapeze",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5750",\
            "y": "4276",\
            "z": "15",\
            "params":\
                [\
                    ["NUM#", "height", "174,0"],\
                    ["NUM#", "round", "50,0"],\
                    ["NUM#", "bias", "-93.625938400452,0"]\
                ]\
        },\
        {\
            "type": "COL",\
            "created": "1738960955371",\
            "updated": "1738960955371",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6365",\
            "y": "5878",\
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
            "created": "1738960955371",\
            "updated": "1738960955371",\
            "id": "numToText",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6136.28",\
            "y": "5519",\
            "z": "17",\
            "params":\
                [\
                    ["TEXT#", "decimals", ".", "left"],\
                    ["TEXT#", "thousands", "", "left"]\
                ]\
        },\
        {\
            "type": "CMNT",\
            "created": "1738960955372",\
            "updated": "1738960955391",\
            "id": "comment",\
            "name": "To%20avoid%20conflicts%20with%20existing%20geometry%20on%20the%20canvas",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7409",\
            "y": "4625",\
            "z": "18",\
            "active": "true"\
        },\
        {\
            "type": "SEQ",\
            "created": "1738960955372",\
            "updated": "1738960955372",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5262",\
            "y": "4858",\
            "z": "19",\
            "params":\
                [\
                    ["NUM#", "start", "85,0"],\
                    ["NUM#", "add", "-15,0"],\
                    ["NUM#", "end", "?,?"]\
                ]\
        },\
        {\
            "type": "TEXT",\
            "created": "1738960955373",\
            "updated": "1738960955373",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6135.28",\
            "y": "5444",\
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
            "created": "1738960955373",\
            "updated": "1738960955373",\
            "id": "case",\
            "name": "case",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6135.28",\
            "y": "5663",\
            "z": "21"\
        },\
        {\
            "type": "RANGE",\
            "created": "1738960955374",\
            "updated": "1738960955374",\
            "id": "range",\
            "name": "range",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6371",\
            "y": "4546",\
            "z": "22",\
            "params":\
                [\
                    ["NUM#", "from", "0,0"],\
                    ["NUM#", "end", "360,0"]\
                ]\
        },\
        {\
            "type": "LIST",\
            "created": "1738960955375",\
            "updated": "1738960955375",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6831",\
            "y": "4845",\
            "z": "23",\
            "width": "120",\
            "height": "64"\
        },\
        {\
            "type": "CMNT",\
            "created": "1738960955375",\
            "updated": "1738960955391",\
            "id": "comment2",\
            "name": "Generator%20removes%20its%20objects%20when%20you%20close%20the%20plugin.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7407",\
            "y": "4666",\
            "z": "24",\
            "active": "true"\
        },\
        {\
            "type": "CMNT",\
            "created": "1738960955375",\
            "updated": "1738960955391",\
            "id": "comment5",\
            "name": "on%20the%20canvas%20when%20you%20close%20the%20plugin.%20When%20you%20reopen%20it%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7409",\
            "y": "5026",\
            "z": "25",\
            "active": "true"\
        },\
        {\
            "type": "CMNT",\
            "created": "1738960955375",\
            "updated": "1738960955391",\
            "id": "comment4",\
            "name": "By%20enabling%20it%20you%20tell%20Generator%20to%20leave%20the%20objects",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7412",\
            "y": "4983",\
            "z": "26",\
            "active": "true"\
        },\
        {\
            "type": "SEQ",\
            "created": "1738960955376",\
            "updated": "1738960955376",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "5975",\
            "y": "4841",\
            "z": "27",\
            "params":\
                [\
                    ["NUM#", "start", "187,0"],\
                    ["NUM#", "add", "-40,0"],\
                    ["NUM#", "end", "?,?"]\
                ]\
        },\
        {\
            "type": "REPT",\
            "created": "1738960955377",\
            "updated": "1738960955377",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7068",\
            "y": "4768",\
            "z": "28",\
            "params":\
                [\
                    ["NUM#", "count", "5,0"],\
                    ["NUM#", "iteration", "?,0"]\
                ]\
        },\
        {\
            "type": "RETAIN",\
            "created": "1738960955377",\
            "updated": "1738960955391",\
            "id": "retain",\
            "name": "retain",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7412",\
            "y": "4772",\
            "z": "29",\
            "active": "true"\
        },\
        {\
            "type": "CMNT",\
            "created": "1738960955377",\
            "updated": "1738960955391",\
            "id": "comment3",\
            "name": "The%20Retain%20node%20makes%20things%20move%20flexible.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "7410",\
            "y": "4902",\
            "z": "30",\
            "active": "true"\
        },\
        {\
            "type": "REPT",\
            "created": "1738960955378",\
            "updated": "1738960955378",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6778",\
            "y": "4453",\
            "z": "31",\
            "params":\
                [\
                    ["NUM#", "count", "15,0"],\
                    ["NUM#", "iteration", "?,0"]\
                ]\
        },\
        {\
            "type": "CMNT",\
            "created": "1738960955378",\
            "updated": "1738960955391",\
            "id": "comment9",\
            "name": "In%20this%20case%20Retain%20is%20used%20to%20leave%20a%20time%20stamp",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6934.33",\
            "y": "5577",\
            "z": "32",\
            "active": "true"\
        },\
        {\
            "type": "RETAIN",\
            "created": "1738960955378",\
            "updated": "1738960955391",\
            "id": "retain2",\
            "name": "retain",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6718.12",\
            "y": "5592",\
            "z": "33",\
            "active": "true"\
        },\
        {\
            "type": "CMNT",\
            "created": "1738960955378",\
            "updated": "1738960955391",\
            "id": "comment10",\
            "name": "which%20gets%20updated%20every%20time%20the%20graph%20is%20loaded.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "notCondition": "false",\
            "x": "6931.33",\
            "y": "5617",\
            "z": "34",\
            "active": "true"\
        }\
    ],\
        "connections":\
    [\
        {\
            "created": "1738960955385",\
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "numToText",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "case",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "numToText2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h3",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "dateTime",\
            "outputId": "year",\
            "outputOrder": "0",\
            "inputNodeId": "numToText2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "join",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "text",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "rotate2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "scale",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "angle",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "trapeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "scale",\
            "inputId": "scaleY",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "dateTime",\
            "outputId": "month",\
            "outputOrder": "0",\
            "inputNodeId": "index",\
            "inputId": "index",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "bias",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "trapeze",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "dateTime",\
            "outputId": "date",\
            "outputOrder": "0",\
            "inputNodeId": "numToText",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "index",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "case",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "true"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "retain",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "rotate",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "range",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "false"\
        },\
        {\
            "created": "1738960955385",\
            "outputNodeId": "text2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "retain2",\
            "inputId": "h0",\
            "list": "false"\
        }\
    ]\
}';