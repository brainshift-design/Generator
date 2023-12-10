const presetDataTypes = '\
    {\
        "nodes":\
        [\
            {\
            "type": "NUM",\
            "id": "num5",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "674",\
            "y": "1492",\
            "z": "0",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "1234567,0"]\
            ]\
            },\
            {\
            "type": "TREPL",\
            "id": "replace",\
            "name": "replace",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1042",\
            "y": "1492",\
            "z": "1",\
            "width": "120",\
            "height": "98",\
            "params":\
            [\
                    ["TEXT#", "what", "(.*)", "center"],\
                    ["TEXT#", "with", "%22%241", "center"],\
                    ["NUM#", "regex", "1,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "In%20the%20following%20example%20a%20number%20is%20converted%20to%20text%2C%20which",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "633",\
            "y": "1321",\
            "z": "2"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "A%20node\'s%20data%20is%20typically%20in%20the%20header%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "752",\
            "y": "893",\
            "z": "3"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "which%20is%20%3Cb%3Ecolored%3C%2Fb%3E%20based%20on%20the%20%3Cb%3Edata%20type%3C%2Fb%3E.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "750",\
            "y": "942",\
            "z": "4"\
            },\
            {\
            "type": "NULL",\
            "id": "null",\
            "name": "flow",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "630",\
            "y": "1043",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "TXTS",\
            "id": "text2",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1228",\
            "y": "1465",\
            "z": "6",\
            "active": "true",\
            "params":\
            [\
                    ["TEXT#", "text", "%221234567%22", "center"],\
                    ["NUM#", "width", "337,0"],\
                    ["NUM#", "height", "64,0"],\
                    ["NUM#", "size", "64,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num4",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "787",\
            "y": "1043",\
            "z": "7",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "123,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "shape",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1254",\
            "y": "1042",\
            "z": "8",\
            "active": "true"\
            },\
            {\
            "type": "TEXT",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "943",\
            "y": "1043",\
            "z": "9",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "ABC", "center"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment13",\
            "name": "is%20then%20modified%20and%20passed%20to%20a%20text%20shape%20on%20the%20canvas.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "633",\
            "y": "1364",\
            "z": "10"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1098",\
            "y": "1043",\
            "z": "11",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "17,0"],\
                    ["NUM#", "c2", "184,0"],\
                    ["NUM#", "c3", "54,0"]\
            ]\
            },\
            {\
            "type": "N2T",\
            "id": "numToText",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "858",\
            "y": "1492",\
            "z": "12"\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1042",\
            "y": "1756",\
            "z": "13",\
            "active": "true",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "17,0"],\
                    ["NUM#", "c2", "184,0"],\
                    ["NUM#", "c3", "54,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "numToText",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "replace",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "replace",\
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
            "outputNodeId": "num5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "numToText",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';
