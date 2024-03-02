const presetRandomColors = '\
    {\
        "nodes":\
        [\
            {\
            "type": "RAND",\
            "id": "random",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2623",\
            "y": "3620",\
            "z": "0",\
            "params":\
            [\
                    ["NUM#", "seed", "123,0"]\
            ]\
            },\
            {\
            "type": "RAND",\
            "id": "random3",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2623",\
            "y": "4172.28",\
            "z": "1",\
            "params":\
            [\
                    ["NUM#", "seed", "789,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "creating%20a%20color%20node",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3428",\
            "y": "3914",\
            "z": "2"\
            },\
            {\
            "type": "COL",\
            "id": "color2",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3120",\
            "y": "3852",\
            "z": "3",\
            "prevSpace": "hex",\
            "params":\
            [\
                    ["NUM#", "space", "0,0"],\
                    ["NUM#", "c1", "217,0"],\
                    ["NUM#", "c2", "217,0"],\
                    ["NUM#", "c3", "217,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "Or%20hold%20Alt%2FOption%20when",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3429",\
            "y": "3874",\
            "z": "4"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "from%20the%20toolbar.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3428",\
            "y": "3955",\
            "z": "5"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Type%20%22random%22%20or%20%22rnd%20%22",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3030",\
            "y": "3950",\
            "z": "6"\
            },\
            {\
            "type": "RAND",\
            "id": "random2",\
            "name": "random",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2623",\
            "y": "3896",\
            "z": "7",\
            "params":\
            [\
                    ["NUM#", "seed", "456,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "instead%20of%20D9D9D9.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3043",\
            "y": "3996",\
            "z": "8",\
            "active": "true"\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2820",\
            "y": "3868",\
            "z": "9",\
            "prevSpace": "rgb",\
            "params":\
            [\
                    ["NUM#", "space", "1,0"],\
                    ["NUM#", "c1", "141,0"],\
                    ["NUM#", "c2", "220,0"],\
                    ["NUM#", "c3", "78,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "Use%20random%20nodes.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2337",\
            "y": "3919",\
            "z": "10"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "random",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "random3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "color",\
            "inputId": "c3",\
            "list": "false"\
            }\
        ]\
    }';