const presetColorSwatches = '\
    {\
        "nodes":\
        [\
        {\
            "type": "CMB",\
            "id": "combine3",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5020",\
            "y": "4390",\
            "z": "0",\
            "width": "120",\
            "height": "51"\
        },\
        {\
            "type": "COUNT",\
            "id": "count",\
            "name": "count",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3164",\
            "y": "4034",\
            "z": "1",\
            "params":\
            [\
                ["NUM#", "value", "11,0"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence3",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4667",\
            "y": "4387",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "add", "132,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4668",\
            "y": "4106",\
            "z": "3",\
            "params":\
            [\
                ["NUM#", "add", "160,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "COND",\
            "id": "cond2",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3556",\
            "y": "4991",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "7,0"]\
            ]\
        },\
        {\
            "type": "TEXT",\
            "id": "text9",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3735",\
            "y": "5123",\
            "z": "5",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["TEXT#", "value", "", "center"]\
            ]\
        },\
        {\
            "type": "IF",\
            "id": "ifElse3",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3883",\
            "y": "5065",\
            "z": "6",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "TXTS",\
            "id": "text6",\
            "name": "W2",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4282",\
            "y": "4916",\
            "z": "7",\
            "params":\
            [\
                ["TEXT#", "text", "AAA", "center"],\
                ["NUM#", "x", "8,0"],\
                ["NUM#", "y", "10,0"],\
                ["NUM#", "width", "132,0"],\
                ["NUM#", "height", "18,0"],\
                ["NUM#", "size", "18,0"],\
                ["TEXT#", "style", "Medium"],\
                ["NUM#", "alignX", "2,0"]\
            ]\
        },\
        {\
            "type": "N2T",\
            "id": "numToText",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4093",\
            "y": "3635",\
            "z": "8",\
            "params":\
            [\
                ["TEXT#", "decimals", ".", "left"],\
                ["TEXT#", "thousands", "", "left"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color4",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4093",\
            "y": "3360",\
            "z": "9",\
            "prevSpace": "hclok",\
            "params":\
            [\
                ["NUM#", "space", "4,0"],\
                ["NUM#", "c1", "56.18865589511611,0"],\
                ["NUM#", "c2", "1.774695504634287,0"],\
                ["NUM#", "c3", "96.31414912142866,0"]\
            ]\
        },\
        {\
            "type": "COND",\
            "id": "cond",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4093",\
            "y": "3502",\
            "z": "10",\
            "params":\
            [\
                ["NUM#", "operation", "0,0"],\
                ["NUM#", "operand", "60,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3605",\
            "y": "4001",\
            "z": "11",\
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
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3356",\
            "y": "3908",\
            "z": "12",\
            "params":\
            [\
                ["NUM#", "add", "1,0"],\
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
            "x": "2654",\
            "y": "3724",\
            "z": "13",\
            "width": "285.1468395020149",\
            "height": "54",\
            "params":\
            [\
                ["TEXT#", "value", "5%2C%2010%2C%2020%2C%2030%2C%2040%2C%2050%2C%2060%2C%2070%2C%2080%2C%2090%2C%2096", "center"]\
            ]\
        },\
        {\
            "type": "TSPLT",\
            "id": "split",\
            "name": "split",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2731",\
            "y": "3806",\
            "z": "14",\
            "params":\
            [\
                ["ITEMS#", "value", "11 TEXT# 5 TEXT# %2010 TEXT# %2020 TEXT# %2030 TEXT# %2040 TEXT# %2050 TEXT# %2060 TEXT# %2070 TEXT# %2080 TEXT# %2090 TEXT# %2096"],\
                ["TEXT#", "separator", "%2C", "center"]\
            ]\
        },\
        {\
            "type": "SEL",\
            "id": "select2",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3503",\
            "y": "3773",\
            "z": "15",\
            "params":\
            [\
                ["NUM#", "index", "0,0"]\
            ]\
        },\
        {\
            "type": "MATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3694",\
            "y": "3549",\
            "z": "16",\
            "params":\
            [\
                ["NUM#", "operation", "0,0"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence4",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2883",\
            "y": "4390",\
            "z": "17",\
            "params":\
            [\
                ["NUM#", "add", "1,0"],\
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
            "x": "4259",\
            "y": "3112",\
            "z": "18",\
            "params":\
            [\
                ["NUM#", "width", "150,0"],\
                ["NUM#", "height", "120,0"],\
                ["NUM#", "round", "3,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4450",\
            "y": "3470",\
            "z": "19",\
            "width": "120",\
            "height": "90"\
        },\
        {\
            "type": "COUNT",\
            "id": "count2",\
            "name": "count",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5019",\
            "y": "4270",\
            "z": "20",\
            "params":\
            [\
                ["NUM#", "value", "14,0"]\
            ]\
        },\
        {\
            "type": "TEXT",\
            "id": "text7",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3735",\
            "y": "5032",\
            "z": "21",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["TEXT#", "value", "AA", "center"]\
            ]\
        },\
        {\
            "type": "NUM",\
            "id": "num9",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3504",\
            "y": "3495",\
            "z": "22",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["NUM#", "value", "100,0"]\
            ]\
        },\
        {\
            "type": "COND",\
            "id": "cond3",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3555",\
            "y": "5100",\
            "z": "23",\
            "params":\
            [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "4.5,1"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "3897",\
            "y": "3246",\
            "z": "24",\
            "prevSpace": "hsl",\
            "params":\
            [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "24,0"],\
                ["NUM#", "c2", "79.64601769911505,0"],\
                ["NUM#", "c3", "95,0"]\
            ]\
        },\
        {\
            "type": "C2T",\
            "id": "colToText",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3896",\
            "y": "3394",\
            "z": "25"\
        },\
        {\
            "type": "T2N",\
            "id": "textToNum",\
            "name": "to%20number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2731",\
            "y": "3905",\
            "z": "26",\
            "params":\
            [\
                ["TEXT#", "decimals", ".", "left"],\
                ["TEXT#", "thousands", "", "left"]\
            ]\
        },\
        {\
            "type": "TXTS",\
            "id": "text5",\
            "name": "APCA",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4281",\
            "y": "4465",\
            "z": "27",\
            "params":\
            [\
                ["TEXT#", "text", "105.7", "center"],\
                ["NUM#", "x", "8,0"],\
                ["NUM#", "y", "101,0"],\
                ["NUM#", "width", "133,0"],\
                ["NUM#", "height", "12,0"],\
                ["TEXT#", "style", "Medium%20Italic"],\
                ["NUM#", "alignX", "2,0"]\
            ]\
        },\
        {\
            "type": "TEXT",\
            "id": "text2",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2644",\
            "y": "3040",\
            "z": "28",\
            "width": "304",\
            "height": "75.0504125326314",\
            "params":\
            [\
                ["TEXT#", "value", "E87C34%2CE5A43C%2CE3B63F%2C93C842%2C60BF6B%2C54B484%2C54B5A4%2C4FB4D6%2C4BA0E1%2C4F82EF%2C6866E8%2C825CEF%2C9E5AEF%2CC753E8", "center"]\
            ]\
        },\
        {\
            "type": "CCNT",\
            "id": "contrast2",\
            "name": "contrast",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3729",\
            "y": "4800",\
            "z": "29",\
            "params":\
            [\
                ["NUM#", "contrast", "1.116396426928618,2"],\
                ["NUM#", "standard", "0,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5272",\
            "y": "4329",\
            "z": "30",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "count", "7,0"]\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "colors",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2612",\
            "y": "2980",\
            "z": "31",\
            "width": "366",\
            "height": "329.70577545683966",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "shades",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2615",\
            "y": "3667",\
            "z": "32",\
            "width": "366",\
            "height": "357.48800985484553",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "TXTS",\
            "id": "text4",\
            "name": "hex%20color",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4277",\
            "y": "4015",\
            "z": "33",\
            "params":\
            [\
                ["TEXT#", "text", "%23060E0D", "center"],\
                ["NUM#", "x", "8,0"],\
                ["NUM#", "y", "101,0"],\
                ["NUM#", "width", "100,0"],\
                ["NUM#", "height", "12,0"],\
                ["TEXT#", "style", "Medium"]\
            ]\
        },\
        {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5035",\
            "y": "3491",\
            "z": "34",\
            "params":\
            [\
                ["NUM#", "x", "1600,0"],\
                ["NUM#", "y", "792,0"]\
            ]\
        },\
        {\
            "type": "TSPLT",\
            "id": "split2",\
            "name": "split",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2734",\
            "y": "3156",\
            "z": "35",\
            "params":\
            [\
                ["ITEMS#", "value", "14 TEXT# E87C34 TEXT# E5A43C TEXT# E3B63F TEXT# 93C842 TEXT# 60BF6B TEXT# 54B484 TEXT# 54B5A4 TEXT# 4FB4D6 TEXT# 4BA0E1 TEXT# 4F82EF TEXT# 6866E8 TEXT# 825CEF TEXT# 9E5AEF TEXT# C753E8"],\
                ["TEXT#", "separator", "%2C", "center"]\
            ]\
        },\
        {\
            "type": "T2C",\
            "id": "textToColor",\
            "name": "to%20color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2734",\
            "y": "3254",\
            "z": "36"\
        },\
        {\
            "type": "TEXT",\
            "id": "text8",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3736",\
            "y": "4938",\
            "z": "37",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                ["TEXT#", "value", "AAA", "center"]\
            ]\
        },\
        {\
            "type": "N2T",\
            "id": "numToText2",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4015",\
            "y": "4459",\
            "z": "38",\
            "params":\
            [\
                ["TEXT#", "decimals", ".", "left"],\
                ["TEXT#", "thousands", "", "left"]\
            ]\
        },\
        {\
            "type": "CCNT",\
            "id": "contrast",\
            "name": "contrast",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3851",\
            "y": "4418",\
            "z": "39",\
            "params":\
            [\
                ["NUM#", "contrast", "4.984343698623663,1"]\
            ]\
        },\
        {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3905",\
            "y": "3689",\
            "z": "40",\
            "params":\
            [\
                ["NUM#", "operation", "4,0"],\
                ["NUM#", "operand", "10,0"]\
            ]\
        },\
        {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3109",\
            "y": "3252",\
            "z": "41",\
            "params":\
            [\
                ["NUM#", "index", "0,0"]\
            ]\
        },\
        {\
            "type": "TREPL",\
            "id": "replace",\
            "name": "replace",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3896",\
            "y": "3465",\
            "z": "42",\
            "width": "120",\
            "height": "120",\
            "params":\
            [\
                ["TEXT#", "what", "%5E", "center"],\
                ["TEXT#", "with", "%23", "center"],\
                ["NUM#", "regex", "1,0"]\
            ]\
        },\
        {\
            "type": "IF",\
            "id": "ifElse2",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4017",\
            "y": "4941",\
            "z": "43",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3958",\
            "y": "4265",\
            "z": "44",\
            "params":\
            [\
                ["COL#", "color", "1,0 255,0 255,0 255,0"],\
                ["NUM#", "opacity", "50,0"]\
            ]\
        },\
        {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3846",\
            "y": "3976",\
            "z": "45",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "TXTS",\
            "id": "text3",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4260",\
            "y": "3608",\
            "z": "46",\
            "params":\
            [\
                ["TEXT#", "text", "960", "center"],\
                ["NUM#", "x", "8,0"],\
                ["NUM#", "y", "8,0"],\
                ["NUM#", "width", "60,0"],\
                ["NUM#", "height", "24,0"],\
                ["NUM#", "size", "24,0"],\
                ["TEXT#", "style", "Thin"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5073",\
            "y": "4091",\
            "z": "47",\
            "width": "120",\
            "height": "51"\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5253",\
            "y": "4027",\
            "z": "48",\
            "params":\
            [\
                ["NUM#", "count", "11,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3607",\
            "y": "3914",\
            "z": "49",\
            "prevSpace": "hex",\
            "params":\
            [\
                ["NUM#", "space", "0,0"],\
                ["NUM#", "c1", "255,0"],\
                ["NUM#", "c2", "255,0"],\
                ["NUM#", "c3", "255,0"]\
            ]\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence4",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine3",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "textToNum",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "count",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "contrast2",\
            "outputId": "contrast",\
            "outputOrder": "0",\
            "inputNodeId": "cond2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "text7",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "text9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse3",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "cond3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse3",\
            "inputId": "condition",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "ifElse2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text6",\
            "inputId": "text",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "text6",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "numToText",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "color4",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color4",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "cond",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "split",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "textToNum",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "select2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select2",\
            "inputId": "index",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "num9",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "select2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
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
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "text3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "text4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "text5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "text6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h4",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "textToColor",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "count2",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "contrast2",\
            "outputId": "contrast",\
            "outputOrder": "1",\
            "inputNodeId": "cond3",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "colToText",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "split",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "textToNum",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "numToText2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text5",\
            "inputId": "text",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "text5",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "4",\
            "inputNodeId": "contrast2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "contrast2",\
            "inputId": "h1",\
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
            "outputNodeId": "combine3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "replace",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text4",\
            "inputId": "text",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text4",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "true"\
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
            "outputNodeId": "sequence3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "text2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "split2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "split2",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "textToColor",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "contrast",\
            "outputId": "contrast",\
            "outputOrder": "0",\
            "inputNodeId": "numToText2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "contrast",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "contrast",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "select2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "textToColor",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "sequence4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "index",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "colToText",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "replace",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "text8",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "ifElse3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "cond2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse2",\
            "inputId": "condition",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fill",\
            "inputId": "color",\
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
            "outputNodeId": "color",\
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
            "outputNodeId": "numToText",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text3",\
            "inputId": "text",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text3",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "true"\
        },\
        {\
            "outputNodeId": "count",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "count",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
            "list": "true"\
        }\
        ]\
    }';