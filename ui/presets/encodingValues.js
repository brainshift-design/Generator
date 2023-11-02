        const presetEncodingValues = '\
    {\
        "nodes":\
        [\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "and%20can%20be%20accessed%20downstream.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1563",\
            "y": "1502",\
            "z": "0"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "%3Cb%3ESet%20parameter%3C%2Fb%3E%20and%20%3Cb%3EGet%20parameter%3C%2Fb%3E%20let%20you%20encode%20values%20into%20other%20values.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1563",\
            "y": "1402",\
            "z": "1"\
            },\
            {\
            "type": "SETP",\
            "id": "setParam",\
            "name": "set%20param",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1641",\
            "y": "1159",\
            "z": "2",\
            "active": "true",\
            "width": "120",\
            "height": "NaN",\
            "_connected": "false",\
            "params":\
            [\
                    ["TEXT#", "name", "name", "left"]\
            ]\
            },\
            {\
            "type": "EXTRP",\
            "id": "getParam",\
            "name": "get%20param",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2264",\
            "y": "1162",\
            "z": "3",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "_connected": "false",\
            "params":\
            [\
                    ["TEXT#", "name", "name", "left"]\
            ]\
            },\
            {\
            "type": "TXTS",\
            "id": "text3",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2062",\
            "y": "1003",\
            "z": "4",\
            "active": "true",\
            "params":\
            [\
                    ["TEXT#", "text", "Hello", "center"],\
                    ["NUM#", "size", "38,0"],\
                    ["NUM#", "alignH", "3,0"],\
                    ["NUM#", "alignV", "2,0"],\
                    ["NUM#", "lineHeight", "38,0"],\
                    ["NUM#", "letterSpacing", "38,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "Here%20text%20is%20encoded%20into%20the%20font%20size%20of%20a%20text%20shape%2C%20passed%20along%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1563",\
            "y": "1467",\
            "z": "5"\
            },\
            {\
            "type": "TEXT",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1444",\
            "y": "1273",\
            "z": "6",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "ABCDEFG", "center"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text4",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2471",\
            "y": "1162",\
            "z": "7",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "ABCDEFG", "center"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "See%20the%20%3Cb%3EHot%20spring%3C%2Fb%3E%20example%20to%20see%20how%20Z%20depth%20is%20encoded%20and%20used.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1561",\
            "y": "1564",\
            "z": "8"\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1444",\
            "y": "1156",\
            "z": "9",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "38,0"]\
            ]\
            },\
            {\
            "type": "TXTS",\
            "id": "text2",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1837",\
            "y": "1003",\
            "z": "10",\
            "active": "true",\
            "params":\
            [\
                    ["TEXT#", "text", "Hello", "center"],\
                    ["NUM#", "size", "38,0"],\
                    ["NUM#", "alignH", "1,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "setParam",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "setParam",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text3",\
            "outputId": "size",\
            "outputOrder": "0",\
            "inputNodeId": "getParam",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "getParam",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "setParam",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text2",\
            "inputId": "size",\
            "list": "false"\
            }\
        ]\
    }';