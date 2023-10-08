const presetBasicVariables = '\
    {\
        "nodes":\
        [\
            {\
            "type": "COND",\
            "id": "cond2",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1374",\
            "y": "1034",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "40,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "1.%20Create%20a%20color%20variable",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "579",\
            "y": "802",\
            "z": "1"\
            },\
            {\
            "type": "COND",\
            "id": "cond",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1374",\
            "y": "1138",\
            "z": "2",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "96,0"]\
            ]\
            },\
            {\
            "type": "COND",\
            "id": "cond4",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1219",\
            "y": "861",\
            "z": "3",\
            "params":\
            [\
                    ["NUM#", "value", "1,0"],\
                    ["NUM#", "operation", "4,0"],\
                    ["NUM#", "operand", "57,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment17",\
            "name": "to%20the%20green%20color%20node.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "609",\
            "y": "1153",\
            "z": "4",\
            "active": "true"\
            },\
            {\
            "type": "VAR",\
            "id": "variable2",\
            "name": "variable",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1933.6",\
            "y": "976",\
            "z": "5",\
            "width": "120",\
            "height": "32",\
            "linkedVariableId": "",\
            "linkedVariableType": "",\
            "linkedVariableName": ""\
            },\
            {\
            "type": "NBOOL",\
            "id": "bool2",\
            "name": "is%20yellow",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "5",\
            "x": "1551",\
            "y": "990",\
            "z": "6"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "1040",\
            "y": "973",\
            "z": "7",\
            "active": "true",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "120,0"],\
                    ["NUM#", "c2", "50,0"],\
                    ["NUM#", "c3", "100,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment10",\
            "name": "4.%20Then%20connect",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1802",\
            "y": "1074",\
            "z": "8",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment12",\
            "name": "5.%20After%20you%20link%20the%20nodes%20to%20the%20variables%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1084",\
            "y": "1343",\
            "z": "9"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment11",\
            "name": "the%20blue%20boolean%20node",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1840",\
            "y": "1113",\
            "z": "10",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "by%20clicking%20the%20node%20icon.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1839.6",\
            "y": "882",\
            "z": "11"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment13",\
            "name": "%3Cb%3Ewhile%20Generator%20is%20running%3C%2Fb%3E",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1115",\
            "y": "1422.25",\
            "z": "12"\
            },\
            {\
            "type": "NBOOL",\
            "id": "bool",\
            "name": "boolean",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1374",\
            "y": "912",\
            "z": "13"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment9",\
            "name": "the%20variable%20value",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "609",\
            "y": "1114",\
            "z": "14",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment18",\
            "name": "to%20the%20variable%20value.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1839.6",\
            "y": "1153",\
            "z": "15",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment16",\
            "name": "changing%20the%20color%20variable",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1116",\
            "y": "1381",\
            "z": "16"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "2.%20Then%20connect%20",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "567",\
            "y": "1076",\
            "z": "17",\
            "active": "true"\
            },\
            {\
            "type": "COND",\
            "id": "cond3",\
            "name": "condition",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1219",\
            "y": "965",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "operation", "1,0"],\
                    ["NUM#", "operand", "63,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "and%20link%20it%20to%20this%20node",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "607",\
            "y": "840",\
            "z": "19"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment15",\
            "name": "to%20indicate%20if%20the%20color%20is%20yellow.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1114",\
            "y": "1506",\
            "z": "20"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "3.%20Create%20a%20boolean%20variable",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1797.6",\
            "y": "799",\
            "z": "21"\
            },\
            {\
            "type": "VAR",\
            "id": "variable",\
            "name": "variable",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "684",\
            "y": "975",\
            "z": "22",\
            "width": "120",\
            "height": "32",\
            "linkedVariableId": "",\
            "linkedVariableType": "",\
            "linkedVariableName": ""\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "and%20link%20it%20to%20this%20node",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1841.6",\
            "y": "841",\
            "z": "23"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment14",\
            "name": "will%20change%20the%20boolean%20variable",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1112",\
            "y": "1462",\
            "z": "24"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "3",\
            "x": "987",\
            "y": "730",\
            "z": "25",\
            "active": "true",\
            "width": "734",\
            "height": "540.484361542489",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "by%20clicking%20the%20node%20icon.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "605",\
            "y": "880",\
            "z": "26"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "Check%20if%20the%20color%20can%20be%20considered%20yellow",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1076",\
            "y": "786",\
            "z": "27"\
            }\
        ],\
        "connections":\
        [\
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
            "outputId": "c3",\
            "outputOrder": "0",\
            "inputNodeId": "cond",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "c1",\
            "outputOrder": "0",\
            "inputNodeId": "cond4",\
            "inputId": "h0",\
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
            "outputNodeId": "color",\
            "outputId": "c1",\
            "outputOrder": "1",\
            "inputNodeId": "cond3",\
            "inputId": "h0",\
            "list": "false"\
            }\
        ]\
    }';