const presetBasicVariables = '\
    {\
        "nodes":\
        [\
            {\
            "type": "VAR",\
            "id": "variable",\
            "name": "variable",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "180",\
            "y": "464",\
            "z": "0",\
            "width": "120",\
            "height": "32",\
            "linkedVariableId": "",\
            "linkedVariableType": "",\
            "linkedVariableName": ""\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "540",\
            "y": "471",\
            "z": "1",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "103,0"],\
                    ["NUM#", "c2", "12,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "COND",\
            "id": "cond",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "874",\
            "y": "614",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"],\
                    ["NUM#", "operation", "4,0"]\
            ]\
            },\
            {\
            "type": "COND",\
            "id": "cond2",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "874",\
            "y": "530",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"],\
                    ["NUM#", "operation", "4,0"]\
            ]\
            },\
            {\
            "type": "COND",\
            "id": "cond3",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "719",\
            "y": "443",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"],\
                    ["NUM#", "operation", "4,0"]\
            ]\
            },\
            {\
            "type": "COND",\
            "id": "cond4",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "719",\
            "y": "359",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"],\
                    ["NUM#", "operation", "2,0"]\
            ]\
            },\
            {\
            "type": "NBOOL",\
            "id": "bool",\
            "name": "boolean",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "874",\
            "y": "407",\
            "z": "6",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"]\
            ]\
            },\
            {\
            "type": "NBOOL",\
            "id": "bool2",\
            "name": "is%20yellow",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "1051",\
            "y": "486",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"]\
            ]\
            },\
            {\
            "type": "VAR",\
            "id": "variable2",\
            "name": "variable",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1395",\
            "y": "467",\
            "z": "8",\
            "width": "120",\
            "height": "32",\
            "linkedVariableId": "",\
            "linkedVariableType": "",\
            "linkedVariableName": ""\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Create%20a%20color%20variable",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "102",\
            "y": "294",\
            "z": "9"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "and%20link%20it%20to%20this%20node",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "105",\
            "y": "336",\
            "z": "10"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "by%20clicking%20the%20node%20icon.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "103",\
            "y": "376",\
            "z": "11"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "Create%20a%20boolean%20variable",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1300",\
            "y": "291",\
            "z": "12"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "and%20link%20it%20to%20this%20node",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1303",\
            "y": "333",\
            "z": "13"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "by%20clicking%20the%20node%20icon.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1301",\
            "y": "373",\
            "z": "14"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "Check%20if%20the%20color%20is%20considered%20yellow",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "611",\
            "y": "279",\
            "z": "15"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "Then%20connect%20the%20value",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "105",\
            "y": "552",\
            "z": "16",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment9",\
            "name": "to%20the%20green%20color%20node.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "107",\
            "y": "592",\
            "z": "17",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment10",\
            "name": "Then%20connect%20the%20result",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1312",\
            "y": "561",\
            "z": "18",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment11",\
            "name": "of%20the%20blue%20boolean%20node.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1314",\
            "y": "601",\
            "z": "19",\
            "active": "true"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "487",\
            "y": "230",\
            "z": "20",\
            "active": "true",\
            "width": "734",\
            "height": "502.0000032152824",\
            "params":\
            [\
            ]\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color",\
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "cond",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "c2",\
            "outputOrder": "0",\
            "inputNodeId": "cond2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "space",\
            "outputOrder": "1",\
            "inputNodeId": "cond3",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "space",\
            "outputOrder": "2",\
            "inputNodeId": "cond4",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "cond4",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "bool",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "cond3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "bool",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "bool",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "bool2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "cond2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "bool2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "cond",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "bool2",\
            "inputId": "h2",\
            "list": "false"\
            }\
        ]\
    }';