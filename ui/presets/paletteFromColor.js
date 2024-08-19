const presetPaletteFromColor = '\
    {\
        "nodes":\
        [\
        {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4192",\
            "y": "5398",\
            "z": "0",\
            "prevSpace": "hsl",\
            "params":\
            [\
                ["NUM#", "space", "3,0"],\
                ["NUM#", "c1", "211.99999646666666,0"],\
                ["NUM#", "c2", "90.03416856492026,0"],\
                ["NUM#", "c3", "15,0"]\
            ]\
        },\
        {\
            "type": "LIST",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "4753.44",\
            "y": "5398",\
            "z": "1",\
            "active": "true",\
            "width": "120",\
            "height": "230",\
            "params":\
            [\
                ["COL#", "100", "3,0 211.99999646666666,0 90.03416856492026,0 95,0"],\
                ["COL#", "200", "3,0 211.99999646666666,0 90.03416856492026,0 85,0"],\
                ["COL#", "300", "3,0 211.99999646666666,0 90.03416856492026,0 75,0"],\
                ["COL#", "400", "3,0 211.99999646666666,0 90.03416856492026,0 65,0"],\
                ["COL#", "500", "3,0 211.99999646666666,0 90.03416856492026,0 55,0"],\
                ["COL#", "600", "3,0 211.99999646666666,0 90.03416856492026,0 45,0"],\
                ["COL#", "700", "3,0 211.99999646666666,0 90.03416856492026,0 35,0"],\
                ["COL#", "800", "3,0 211.99999646666666,0 90.03416856492026,0 25,0"],\
                ["COL#", "900", "3,0 211.99999646666666,0 90.03416856492026,0 15,0"]\
            ]\
        },\
        {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4551",\
            "y": "5398",\
            "z": "2",\
            "params":\
            [\
                ["NUM#", "count", "9,0"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4035",\
            "y": "5524",\
            "z": "3",\
            "params":\
            [\
                ["NUM#", "start", "95,0"],\
                ["NUM#", "add", "-10,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "1",\
            "x": "4035",\
            "y": "5368",\
            "z": "4",\
            "prevSpace": "hsv",\
            "params":\
            [\
                ["NUM#", "space", "2,0"],\
                ["NUM#", "c1", "212,0"],\
                ["NUM#", "c2", "51,0"],\
                ["NUM#", "c3", "97.25490196078431,0"]\
            ]\
        },\
        {\
            "type": "VNAME",\
            "id": "valueName",\
            "name": "value%20name",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4394",\
            "y": "5398",\
            "z": "5",\
            "params":\
            [\
                ["TEXT#", "name", "900", "center"]\
            ]\
        },\
        {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4282",\
            "y": "5694",\
            "z": "6",\
            "params":\
            [\
                ["NUM#", "start", "100,0"],\
                ["NUM#", "add", "100,0"],\
                ["NUM#", "end", "?,0"]\
            ]\
        },\
        {\
            "type": "N2T",\
            "id": "numToText",\
            "name": "to%20text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4431",\
            "y": "5694",\
            "z": "7",\
            "params":\
            [\
                ["TEXT#", "decimals", ".", "left"],\
                ["TEXT#", "thousands", "", "left"]\
            ]\
        },\
        {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "4258",\
            "y": "5562",\
            "z": "8",\
            "active": "true",\
            "width": "316",\
            "height": "267.9080178708404",\
            "params":\
            [\
            ]\
        },\
        {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Name%20the%20colors",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4307",\
            "y": "5601",\
            "z": "9",\
            "active": "true"\
        },\
        {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "100-900",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4332",\
            "y": "5640",\
            "z": "10",\
            "active": "true"\
        }\
        ],\
        "connections":\
        [\
        {\
            "outputNodeId": "color2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
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
            "outputNodeId": "valueName",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "valueName",\
            "inputId": "h0",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "numToText",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "valueName",\
            "inputId": "name",\
            "list": "false"\
        },\
        {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "numToText",\
            "inputId": "h0",\
            "list": "false"\
        }\
        ]\
    }';