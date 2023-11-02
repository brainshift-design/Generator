const presetFontList = '\
    {\
        "nodes":\
        [\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5841.77",\
            "y": "3644",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "add", "35,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "TXTS",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5269",\
            "y": "3253",\
            "z": "1",\
            "params":\
            [\
                    ["TEXT#", "text", "The%20quick%20brown%20fox%20jumps%20over%20the%20lazy%20dog.", "center"],\
                    ["TEXT#", "font", "Aclonica"],\
                    ["NUM#", "size", "16,0"]\
            ]\
            },\
            {\
            "type": "FNTNM",\
            "id": "fontName",\
            "name": "font%20name",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5113",\
            "y": "3694",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "index", "9,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6038.77",\
            "y": "3481",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "y", "315,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4900",\
            "y": "3391",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "add", "1,0"],\
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
            "x": "5103",\
            "y": "3545",\
            "z": "5",\
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
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6256.77",\
            "y": "3792",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "count", "10,0"]\
            ]\
            },\
            {\
            "type": "TXTS",\
            "id": "text2",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5266",\
            "y": "3666",\
            "z": "7",\
            "params":\
            [\
                    ["TEXT#", "text", "Aclonica", "center"],\
                    ["NUM#", "y", "-14,0"],\
                    ["NUM#", "size", "7,0"],\
                    ["TEXT#", "style", "Light"]\
            ]\
            },\
            {\
            "type": "SGRP",\
            "id": "group",\
            "name": "group",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5467",\
            "y": "3471",\
            "z": "8"\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5111",\
            "y": "3956",\
            "z": "9",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "39.99999933333329,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "font%20page",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "4546.46",\
            "y": "3775",\
            "z": "10",\
            "width": "120",\
            "height": "54"\
            },\
            {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4724",\
            "y": "3775",\
            "z": "11",\
            "params":\
            [\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "10,0"]\
            ]\
            },\
            {\
            "type": "FRM",\
            "id": "frame",\
            "name": "frame",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6583.77",\
            "y": "3656",\
            "z": "12",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "width", "485,0"],\
                    ["NUM#", "height", "395,0"],\
                    ["NUM#", "round", "20,0"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color3",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6441.77",\
            "y": "3855",\
            "z": "13",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "17,0"],\
                    ["NUM#", "c2", "17,0"],\
                    ["NUM#", "c3", "17,0"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move2",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5607",\
            "y": "3481",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "x", "35,0"],\
                    ["NUM#", "y", "42,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "font",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "fontName",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move2",\
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
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "sequence2",\
            "inputId": "start",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "operand",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "count",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "fontName",\
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
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "group",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "group",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "repeat",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "children",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "color3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "frame",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "group",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move2",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';