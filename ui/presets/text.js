const presetRandomNames = '\
    {\
        "nodes":\
        [\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5488",\
            "y": "5857",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "seed", "218,0"],\
                    ["NUM#", "min", "2,0"],\
                    ["NUM#", "max", "4,0"]\
            ]\
            },\
            {\
            "type": "TJOIN",\
            "id": "join2",\
            "name": "join%20as%20text",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5913",\
            "y": "5744",\
            "z": "1",\
            "width": "120",\
            "height": "59.9999844390567",\
            "params":\
            [\
                    ["TEXT#", "value", "NIJOXU", "center"]\
            ]\
            },\
            {\
            "type": "TSPLT",\
            "id": "split2",\
            "name": "split",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4941",\
            "y": "5716",\
            "z": "2",\
            "params":\
            [\
                    ["LIST#", "value", "6 TEXT# A TEXT# E TEXT# I TEXT# O TEXT# U TEXT# Y"]\
            ]\
            },\
            {\
            "type": "COUNT",\
            "id": "count2",\
            "name": "count",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4963",\
            "y": "6024",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "value", "5,0"],\
                    ["NUM#", "start", "0,0"]\
            ]\
            },\
            {\
            "type": "TSPLT",\
            "id": "split",\
            "name": "split",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4941",\
            "y": "5588",\
            "z": "4",\
            "params":\
            [\
                    ["LIST#", "value", "20 TEXT# B TEXT# C TEXT# D TEXT# F TEXT# G TEXT# H TEXT# J TEXT# K TEXT# L TEXT# M TEXT# N TEXT# P TEXT# Q TEXT# R TEXT# S TEXT# T TEXT# V TEXT# W TEXT# X TEXT# Z"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5162",\
            "y": "5979",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "seed", "142,0"],\
                    ["NUM#", "max", "5,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5162",\
            "y": "5838",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "seed", "43,0"],\
                    ["NUM#", "max", "19,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6250.84",\
            "y": "5750",\
            "z": "7",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "140,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "An%20issue%20with%20the%20plugin\'s%20architecture%20makes%20auto-sized%20text%20slow%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6129",\
            "y": "5500",\
            "z": "8",\
            "active": "true"\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4813",\
            "y": "6200",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "count", "3,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4663",\
            "y": "6200",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat3",\
            "name": "words%20in%20name",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5751",\
            "y": "5890",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "count", "2,0"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text2",\
            "name": "vowels",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "4768",\
            "y": "5716",\
            "z": "12",\
            "width": "141.22003193114557",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "AEIOUY", "center"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat4",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6642.84",\
            "y": "5678",\
            "z": "13",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "20,0"]\
            ]\
            },\
            {\
            "type": "TXTS",\
            "id": "text4",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6492.84",\
            "y": "5678",\
            "z": "14",\
            "params":\
            [\
                    ["TEXT#", "text", "Virivi%20Nijoxu", "center"],\
                    ["NUM#", "y", "266,0"],\
                    ["NUM#", "width", "140,0"],\
                    ["NUM#", "height", "12,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6250.84",\
            "y": "5816",\
            "z": "15",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "12,0"]\
            ]\
            },\
            {\
            "type": "TCASE",\
            "id": "case",\
            "name": "case",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5750",\
            "y": "6027",\
            "z": "16",\
            "params":\
            [\
                    ["TEXT#", "value", "Virivi%20Nijoxu", "center"],\
                    ["NUM#", "case", "2,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "at%20least%20for%20now.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6127",\
            "y": "5583",\
            "z": "17",\
            "active": "true"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6247.84",\
            "y": "6168",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "add", "14,0"],\
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
            "x": "6492.84",\
            "y": "6016",\
            "z": "19",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "68,0"],\
                    ["NUM#", "c2", "161,0"],\
                    ["NUM#", "c3", "209,0"]\
            ]\
            },\
            {\
            "type": "TJOIN",\
            "id": "join3",\
            "name": "join%20as%20text",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5911",\
            "y": "5894",\
            "z": "20",\
            "width": "120",\
            "height": "59.9999844390567",\
            "params":\
            [\
                    ["TEXT#", "value", "VIRIVI%20NIJOXU", "center"],\
                    ["TEXT#", "with", "%20", "center"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "random%20seeds",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4637",\
            "y": "6155",\
            "z": "21",\
            "active": "true",\
            "width": "468.8442779332754",\
            "height": "185.46228882668984",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text3",\
            "name": "final%20name",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "5914",\
            "y": "6027",\
            "z": "22",\
            "width": "116.04433665830365",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "Virivi%20Nijoxu", "center"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "syllables%20in%20word",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5750",\
            "y": "5740",\
            "z": "23",\
            "params":\
            [\
                    ["NUM#", "count", "3,0"]\
            ]\
            },\
            {\
            "type": "TJOIN",\
            "id": "join",\
            "name": "syllable",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "5489",\
            "y": "5683",\
            "z": "24",\
            "width": "120",\
            "height": "72.9999952221861",\
            "params":\
            [\
                    ["TEXT#", "value", "XU", "center"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select2",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5317.31",\
            "y": "5743",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "index", "4,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5317.31",\
            "y": "5615",\
            "z": "26",\
            "params":\
            [\
                    ["NUM#", "index", "18,0"]\
            ]\
            },\
            {\
            "type": "COUNT",\
            "id": "count",\
            "name": "count",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4961",\
            "y": "5882",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "value", "19,0"],\
                    ["NUM#", "start", "0,0"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text",\
            "name": "consonants",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "7",\
            "x": "4769",\
            "y": "5588",\
            "z": "28",\
            "width": "141.22003193114557",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "BCDFGHJKLMNPQRSTVWXZ", "center"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "while%20%3Cb%3Etext%20with%20manually%20set%20dimensions%20is%20much%20faster%20to%20generate%3C%2Fb%3E%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6126",\
            "y": "5541",\
            "z": "29",\
            "active": "true"\
            },\
            {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4963",\
            "y": "6200",\
            "z": "30",\
            "width": "120",\
            "height": "98",\
            "params":\
            [\
                    ["NUM#", "0", "43,0"],\
                    ["NUM#", "1", "142,0"],\
                    ["NUM#", "2", "79,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "list",\
            "outputId": "2",\
            "outputOrder": "0",\
            "inputNodeId": "random4",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join2",\
            "inputId": "h0",\
            "list": "true"\
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
            "outputOrder": "1",\
            "inputNodeId": "count2",\
            "inputId": "h0",\
            "list": "true"\
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
            "outputNodeId": "list",\
            "outputId": "1",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "count2",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "random2",\
            "inputId": "max",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "list",\
            "outputId": "0",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "seed",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "count",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "random",\
            "inputId": "max",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "join2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text4",\
            "inputId": "text",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text4",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text4",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text4",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text4",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "join3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "case",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "case",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "join",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "count",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "split2",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "select2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select2",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "split",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "split",\
            "outputId": "value",\
            "outputOrder": "1",\
            "inputNodeId": "count",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "repeat2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            }\
        ]\
    }';



const presetLetterSalad = '\
    {\
        "nodes":\
        [\
            {\
            "type": "MESPT",\
            "id": "measure",\
            "name": "measure",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2863.64",\
            "y": "973",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "distance", "209.60916010518244,10"],\
                    ["NUM#", "angle", "48.094058058917106,10"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2418",\
            "y": "1352",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "add", "34,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2416",\
            "y": "1186",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "add", "30,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1137",\
            "y": "791",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "seed", "7214,0"],\
                    ["NUM#", "min", "65,0"],\
                    ["NUM#", "max", "90,0"],\
                    ["NUM#", "unique", "100,0"]\
            ]\
            },\
            {\
            "type": "TCHAR",\
            "id": "codeToChar",\
            "name": "to%20char",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1442",\
            "y": "715",\
            "z": "4",\
            "params":\
            [\
                    ["TEXT#", "value", "L", "center"],\
                    ["NUM#", "code", "76,0"]\
            ]\
            },\
            {\
            "type": "FILL",\
            "id": "fill",\
            "name": "fill",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1403",\
            "y": "1915",\
            "z": "5",\
            "params":\
            [\
                    ["COL#", "color", "1,0 64,0 112,0 47,0"],\
                    ["NUM#", "opacity", "50,0"]\
            ]\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow2",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1569",\
            "y": "1810",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "y", "2,0"],\
                    ["NUM#", "blur", "5,0"],\
                    ["NUM#", "spread", "4,0"],\
                    ["FILL#", "fill", "64,0 112,0 47,0 50,0 0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random4",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1002",\
            "y": "1836",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "seed", "1175,0"],\
                    ["NUM#", "max", "70,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random6",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1145",\
            "y": "1227",\
            "z": "8",\
            "params":\
            [\
                    ["NUM#", "seed", "1391,0"],\
                    ["NUM#", "min", "100,0"],\
                    ["NUM#", "max", "140,0"]\
            ]\
            },\
            {\
            "type": "GRAD",\
            "id": "grad",\
            "name": "gradient",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1568",\
            "y": "1298",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "type", "1,0"],\
                    ["NUM#", "x", "50,0"],\
                    ["NUM#", "size", "85,0"],\
                    ["NUM#", "aspect", "100,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1828",\
            "y": "1451",\
            "z": "10",\
            "width": "60",\
            "height": "64"\
            },\
            {\
            "type": "TXTS",\
            "id": "text2",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1967",\
            "y": "709",\
            "z": "11",\
            "params":\
            [\
                    ["TEXT#", "text", "L", "center"],\
                    ["NUM#", "width", "40,0"],\
                    ["NUM#", "height", "45,0"],\
                    ["NUM#", "size", "45,0"],\
                    ["TEXT#", "style", "Regular"],\
                    ["NUM#", "alignH", "1,0"]\
            ]\
            },\
            {\
            "type": "SCALE",\
            "id": "scale",\
            "name": "scale",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3495.64",\
            "y": "705",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "scaleX", "15,10"],\
                    ["NUM#", "scaleY", "15,10"],\
                    ["NUM#", "affectStyle", "0,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3713.64",\
            "y": "1108",\
            "z": "13",\
            "params":\
            [\
                ["NUM#", "count", "10,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat2",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3714.64",\
            "y": "1269",\
            "z": "14",\
            "active": "true",\
            "params":\
            [\
                ["NUM#", "count", "10,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1583",\
            "y": "868",\
            "z": "15",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "45,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1582",\
            "y": "806",\
            "z": "16",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "40,0"]\
            ]\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1572",\
            "y": "1615",\
            "z": "17",\
            "params":\
            [\
                    ["NUM#", "y", "1,0"],\
                    ["NUM#", "blur", "1,0"],\
                    ["NUM#", "spread", "4,0"],\
                    ["FILL#", "fill", "64,0 112,0 47,0 100,0 0,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1009",\
            "y": "1695",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "seed", "1174,0"],\
                    ["NUM#", "min", "50,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2714.64",\
            "y": "928",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "x", "130,0"],\
                    ["NUM#", "y", "150,0"]\
            ]\
            },\
            {\
            "type": "PT",\
            "id": "point2",\
            "name": "point",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2720.64",\
            "y": "1019",\
            "z": "20",\
            "params":\
            [\
                    ["NUM#", "x", "270,0"],\
                    ["NUM#", "y", "306,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1226",\
            "y": "1714",\
            "z": "21",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "103.99999999999999,0"],\
                    ["NUM#", "c2", "58,0"],\
                    ["NUM#", "c3", "44,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1375",\
            "y": "1375",\
            "z": "22",\
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
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1380",\
            "y": "1234",\
            "z": "23",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "111,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "23,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1298",\
            "y": "742",\
            "z": "24",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "76,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random5",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1140",\
            "y": "1388",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "seed", "9756,0"],\
                    ["NUM#", "min", "20,0"],\
                    ["NUM#", "max", "100,0"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1584",\
            "y": "715",\
            "z": "26",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "L", "center"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1599",\
            "y": "955",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "seed", "5563,0"],\
                    ["NUM#", "min", "9,0"],\
                    ["NUM#", "max", "17,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2561",\
            "y": "705",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "x", "270,0"],\
                    ["NUM#", "y", "306,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2880.64",\
            "y": "821",\
            "z": "29",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "200,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3027.64",\
            "y": "893",\
            "z": "30",\
            "params":\
            [\
                    ["NUM#", "value", "-9.60916010518244,10"],\
                    ["NUM#", "operation", "0,0"]\
            ]\
            },\
            {\
            "type": "MINMAX",\
            "id": "minmax",\
            "name": "min%2Fmax",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3177",\
            "y": "917",\
            "z": "31",\
            "params":\
            [\
                    ["NUM#", "value", "10,10"],\
                    ["NUM#", "operation", "1,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num5",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3034",\
            "y": "993",\
            "z": "32",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "10,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3327",\
            "y": "917",\
            "z": "33",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "0.5,1"]\
            ]\
            },\
            {\
            "type": "ROT",\
            "id": "rotate",\
            "name": "rotate",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2178",\
            "y": "813",\
            "z": "34",\
            "params":\
            [\
                    ["NUM#", "angle", "90,0"],\
                    ["NUM#", "affectSpace", "0,0"]\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2345",\
            "y": "713",\
            "z": "35",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PROB",\
            "id": "prob",\
            "name": "probability",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2183",\
            "y": "962",\
            "z": "36",\
            "params":\
            [\
                    ["NUM#", "seed", "2620,0"],\
                    ["NUM#", "chance", "75,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "point",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "measure",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "point2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "measure",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "codeToChar",\
            "inputId": "code",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fill",\
            "inputId": "color",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fill",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "dropShadow2",\
            "inputId": "fill",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "grad",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "grad",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "dropShadow",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "dropShadow2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "text",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "text2",\
            "inputId": "size",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "style",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "scale",\
            "inputId": "scaleX",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "1",\
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
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat",\
            "inputId": "loop",\
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
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "repeat2",\
            "inputId": "loop",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "dropShadow",\
            "inputId": "fill",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "x",\
            "outputOrder": "0",\
            "inputNodeId": "point2",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "y",\
            "outputOrder": "0",\
            "inputNodeId": "point2",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color2",\
            "inputId": "c3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random6",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random5",\
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
            "inputNodeId": "num",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "codeToChar",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ifElse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "measure",\
            "outputId": "distance",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "minmax",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "minmax",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "minmax",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rotate",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ifElse",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rotate",\
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
            }\
        ]\
    }';