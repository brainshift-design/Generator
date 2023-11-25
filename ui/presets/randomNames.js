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
            "highlight": "1",\
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
            "highlight": "1",\
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
            "highlight": "1",\
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
            "highlight": "1",\
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
