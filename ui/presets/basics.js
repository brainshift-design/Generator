const presetNodeBasics = '\
    {\
        "nodes":\
        [\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "Connect%20this%20here%20to%20see%20the%20result",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "789",\
            "y": "485",\
            "z": "0"\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "input",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "602",\
            "y": "643",\
            "z": "1",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "5,0"]\
            ]\
            },\
            {\
            "type": "MATH",\
            "id": "math",\
            "name": "operation",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "794",\
            "y": "590",\
            "z": "2",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "value", "8,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Nodes%20contain%20or%20modify%20data.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "664",\
            "y": "318",\
            "z": "3"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "Drag%20or%20type",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "324",\
            "y": "569",\
            "z": "4"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "the%20input%20values",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "322",\
            "y": "616",\
            "z": "5"\
            },\
            {\
            "type": "NUM",\
            "id": "num3",\
            "name": "output",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "983",\
            "y": "600",\
            "z": "6",\
            "active": "true",\
            "width": "120",\
            "height": "54"\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "input",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "602",\
            "y": "539",\
            "z": "7",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "3,0"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math",\
            "inputId": "h1",\
            "list": "false"\
            }\
        ]\
    }';



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
            "x": "376",\
            "y": "1165",\
            "z": "0",\
            "active": "true",\
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
            "x": "745",\
            "y": "1192",\
            "z": "1",\
            "active": "true",\
            "width": "120",\
            "height": "98",\
            "params":\
            [\
                    ["TEXT#", "value", "%221234567%22", "center"],\
                    ["TEXT#", "what", "(.*)", "center"],\
                    ["TEXT#", "with", "%22%241", "center"],\
                    ["NUM#", "regex", "1,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "In%20the%20following%20example%20a%20number%20is%20converted%20to%20text",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "365",\
            "y": "1018",\
            "z": "2"\
            },\
            {\
            "type": "N2T",\
            "id": "numToText",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "560",\
            "y": "1165",\
            "z": "3",\
            "active": "true",\
            "params":\
            [\
                    ["TEXT#", "value", "1234567", "center"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "A%20node\'s%20data%20is%20typically%20in%20the%20header%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "452",\
            "y": "593",\
            "z": "4"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "which%20is%20%3Cb%3Ecolored%3C%2Fb%3E%20based%20on%20the%20%3Cb%3Edata%20type%3C%2Fb%3E.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "450",\
            "y": "642",\
            "z": "5"\
            },\
            {\
            "type": "NULL",\
            "id": "null",\
            "name": "flow",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "330",\
            "y": "743",\
            "z": "6",\
            "active": "true"\
            },\
            {\
            "type": "TXTS",\
            "id": "text2",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "931",\
            "y": "1165",\
            "z": "7",\
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
            "x": "487",\
            "y": "743",\
            "z": "8",\
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
            "x": "954",\
            "y": "742",\
            "z": "9",\
            "active": "true"\
            },\
            {\
            "type": "TEXT",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "643",\
            "y": "743",\
            "z": "10",\
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
            "name": "which%20is%20then%20passed%20to%20a%20text%20shape%20on%20the%20canvas.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "365",\
            "y": "1061",\
            "z": "11"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "798",\
            "y": "743",\
            "z": "12",\
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
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "replace",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num5",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "numToText",\
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
            }\
        ]\
    }';



const presetOrganize = '\
    {\
        "nodes":\
        [\
            {\
            "type": "NUM",\
            "id": "num12",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "489",\
            "y": "2160",\
            "z": "0",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "3,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num10",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "908",\
            "y": "1625",\
            "z": "1",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "5,0"]\
            ]\
            },\
            {\
            "type": "TJOIN",\
            "id": "join",\
            "name": "join",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "869",\
            "y": "2153",\
            "z": "2",\
            "active": "true",\
            "width": "120",\
            "height": "73.00000491969925",\
            "params":\
            [\
                    ["TEXT#", "value", "AB", "center"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment12",\
            "name": "Double-click%20a%20panel%20header%20to%20select%20the%20nodes%20inside.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "303",\
            "y": "1924",\
            "z": "3"\
            },\
            {\
            "type": "NUM",\
            "id": "num6",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "293",\
            "y": "1626",\
            "z": "4",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num9",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "754",\
            "y": "1625",\
            "z": "5",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "4,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num13",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "189",\
            "y": "2190",\
            "z": "6",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "2,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num7",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "447",\
            "y": "1626",\
            "z": "7",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "2,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "154",\
            "y": "2031",\
            "z": "8",\
            "width": "481",\
            "height": "273.5307260702646",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text4",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "717",\
            "y": "2189",\
            "z": "9",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "B", "center"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment10",\
            "name": "to%20help%20navigate%20complex%20graphs.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "366",\
            "y": "1509",\
            "z": "10"\
            },\
            {\
            "type": "MATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "342",\
            "y": "2151",\
            "z": "11",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "value", "3,0"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text3",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "716",\
            "y": "2116",\
            "z": "12",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "A", "center"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num11",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "189",\
            "y": "2118",\
            "z": "13",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment9",\
            "name": "Nodes%20can%20be%20highlighted%20with%20different%20colors",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "368",\
            "y": "1458",\
            "z": "14"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment11",\
            "name": "Use%20panels%20to%20organize%20your%20nodes.%20They%20can%20be%20colored%20too.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "301",\
            "y": "1873",\
            "z": "15"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "689",\
            "y": "2029",\
            "z": "16",\
            "width": "481",\
            "height": "277.7321321240401",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num8",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "600",\
            "y": "1625",\
            "z": "17",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "3,0"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text5",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1022",\
            "y": "2162",\
            "z": "18",\
            "active": "true",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["TEXT#", "value", "AB", "center"]\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "num12",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "join",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num11",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num13",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "join",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text5",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';



const presetActive = '\
    {\
        "nodes":\
        [\
        {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "%3Cb%3EShift%3C%2Fb%3E%2BDouble%20click%20to%20activate%20%3Cb%3Emultiple%20nodes%3C%2Fb%3E%20at%20the%20same%20time.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2125",\
            "y": "1659",\
            "z": "0"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment11",\
            "name": "%3Cb%3EDouble%20click%3C%2Fb%3E%20a%20node\'s%20header%20to%20activate%20the%20node",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2130",\
            "y": "1283",\
            "z": "1"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "Double%20click%20the%20plugin%20background%20to%20deactivate%20all%20nodes.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2121",\
            "y": "1713",\
            "z": "2"\
        },\
        {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1623",\
            "y": "1555",\
            "z": "3",\
            "params":\
            [\
                ["NUM#", "y", "100,0"]\
            ]\
        },\
        {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1814",\
            "y": "1283",\
            "z": "4",\
            "params":\
            [\
                ["NUM#", "x", "100,0"]\
            ]\
        },\
        {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1626",\
            "y": "1284",\
            "z": "5",\
            "params":\
            [\
                ["NUM#", "corners", "6,0"]\
            ]\
        },\
        {\
            "type": "STAR",\
            "id": "star",\
            "name": "star",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1815",\
            "y": "1555",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "x", "100,0"],\
                ["NUM#", "y", "100,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1340",\
            "y": "1475",\
            "z": "7",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "27,0"],\
                ["NUM#", "c2", "100,0"],\
                ["NUM#", "c3", "93,0"]\
            ]\
        },\
        {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2126",\
            "y": "1503",\
            "z": "8",\
            "width": "120",\
            "height": "77"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment13",\
            "name": "to%20put%20its%20%3Cb%3Eobject%20on%20the%20canvas%3C%2Fb%3E.%20Objects%20created%20by%20Generator",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2130",\
            "y": "1331",\
            "z": "9"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment14",\
            "name": "have%20the%20%26nbsp%3B%26hairsp%3B%E2%97%A6G%E2%80%A2%26nbsp%3B%26thinsp%3Bprefix%20in%20the%20name.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2128",\
            "y": "1381",\
            "z": "10"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment12",\
            "name": "In%20the%20free%20version%20of%20Generator%2C%20when%20you%20close%20the%20plugin%20your%20objects%20are%20removed%20from%20the%20canvas.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1418",\
            "y": "1910",\
            "z": "11"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment15",\
            "name": "This%20is%20the%20cleanest%20way%20of%20separating%20Generator%20objects%20from%20your%20other%20work.%20To%20keep%20using%20Generator%20objects",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1413",\
            "y": "1967",\
            "z": "12"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment16",\
            "name": "after%20closing%20the%20plugin%2C%20first%20%3Cb%3Eselect%20and%20copy%20them%20to%20another%20Figma%20document%3C%2Fb%3E.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1417",\
            "y": "2023",\
            "z": "13"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment17",\
            "name": "Pro%20subscribers%20can%20use%20the%20Render%20node%20to%20keep%20their%20Generator%20objects%20on%20the%20same%20page%2C%20updated%20automatically",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1412",\
            "y": "2142",\
            "z": "14"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment18",\
            "name": "when%20Generator%20reloads.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1412",\
            "y": "2198",\
            "z": "15",\
            "active": "true"\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "poly",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "star",\
            "inputId": "props",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "poly",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "star",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
        }\
        ]\
    }';