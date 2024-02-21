const presetArcs = '\
{\
  "generatorVersion": "364",\
  "nodes":\
  [\
    {\
      "type": "NOISE",\
      "created": "1708461786265",\
      "updated": "1708461911126",\
      "id": "noise",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4792",\
      "y": "3022",\
      "z": "0",\
      "params":\
      [\
            ["NUM#", "seed", "2810,0"],\
            ["NUM#", "scale", "2,0"],\
            ["NUM#", "offset", "0.7129,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1708457955374",\
      "updated": "1708458520476",\
      "id": "repeat",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5231",\
      "y": "3130",\
      "z": "1",\
      "params":\
      [\
            ["NUM#", "count", "10,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1708458194692",\
      "updated": "1708458194696",\
      "id": "color3",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5036",\
      "y": "3716",\
      "z": "2",\
      "prevSpace": "hex",\
      "params":\
      [\
            ["NUM#", "space", "0,0"],\
            ["NUM#", "c1", "0,0"],\
            ["NUM#", "c2", "0,0"],\
            ["NUM#", "c3", "255,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1708458162823",\
      "updated": "1708463085682",\
      "id": "repeat2",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5605",\
      "y": "3136",\
      "z": "3",\
      "params":\
      [\
            ["NUM#", "count", "3,0"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1708461786265",\
      "updated": "1708461915443",\
      "id": "noise4",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4791",\
      "y": "3424",\
      "z": "4",\
      "params":\
      [\
            ["NUM#", "seed", "5496,0"],\
            ["NUM#", "scale", "2,0"],\
            ["NUM#", "offset", "0.7129,0"]\
      ]\
    },\
    {\
      "type": "ITER",\
      "created": "1708458206457",\
      "updated": "1708458225930",\
      "id": "define",\
      "name": "define",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5203",\
      "y": "3609",\
      "z": "5"\
    },\
    {\
      "type": "NOISE",\
      "created": "1708461786265",\
      "updated": "1708461913351",\
      "id": "noise3",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4790",\
      "y": "3224",\
      "z": "6",\
      "params":\
      [\
            ["NUM#", "seed", "3817,0"],\
            ["NUM#", "scale", "2,0"],\
            ["NUM#", "offset", "0.7129,0"]\
      ]\
    },\
    {\
      "type": "ARC",\
      "created": "1708445796092",\
      "updated": "1708461810663",\
      "id": "arc",\
      "name": "arc",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5071",\
      "y": "3130",\
      "z": "7",\
      "sweepInDegrees": "false",\
      "params":\
      [\
            ["NUM#", "position", "1,0"],\
            ["NUM#", "x", "150,0"],\
            ["NUM#", "y", "150,0"],\
            ["NUM#", "width", "51.77714368769949,0"],\
            ["NUM#", "height", "51.77714368769949,0"],\
            ["NUM#", "start", "10.911932338397804,0"],\
            ["NUM#", "sweep", "7.287922240428436,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1708458187431",\
      "updated": "1708458187438",\
      "id": "color",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5037",\
      "y": "3521",\
      "z": "8",\
      "prevSpace": "hex",\
      "params":\
      [\
            ["NUM#", "space", "0,0"],\
            ["NUM#", "c1", "255,0"],\
            ["NUM#", "c2", "0,0"],\
            ["NUM#", "c3", "0,0"]\
      ]\
    },\
    {\
      "type": "JOINPTH",\
      "created": "1708451788288",\
      "updated": "1708458528901",\
      "id": "joinPath",\
      "name": "join%20paths",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5442",\
      "y": "3134",\
      "z": "9",\
      "params":\
      [\
            ["NUM#", "closed", "1,0"],\
            ["NUM#", "degree", "4,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1705642582453",\
      "updated": "1708458211585",\
      "id": "fill",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5302",\
      "y": "3345",\
      "z": "10",\
      "params":\
      [\
            ["COL#", "color", "1,0 0,0 0,0 255,0"],\
            ["NUM#", "blend", "6,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1708458191001",\
      "updated": "1708458191009",\
      "id": "color2",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5038",\
      "y": "3619",\
      "z": "11",\
      "prevSpace": "hex",\
      "params":\
      [\
            ["NUM#", "space", "0,0"],\
            ["NUM#", "c1", "204,0"],\
            ["NUM#", "c2", "204,0"],\
            ["NUM#", "c3", "0,0"]\
      ]\
    },\
    {\
      "type": "FRM",\
      "created": "1708463081262",\
      "updated": "1708463194709",\
      "id": "frame",\
      "name": "arcs",\
      "renamed": "true",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6051",\
      "y": "3000",\
      "z": "12",\
      "active": "true",\
      "params":\
      [\
            ["NUM#", "width", "300,0"],\
            ["NUM#", "height", "300,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1708463093996",\
      "updated": "1708463096605",\
      "id": "color4",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5885",\
      "y": "3260",\
      "z": "13",\
      "active": "true",\
      "prevSpace": "hex",\
      "params":\
      [\
            ["NUM#", "space", "0,0"],\
            ["NUM#", "c1", "0,0"],\
            ["NUM#", "c2", "0,0"],\
            ["NUM#", "c3", "0,0"]\
      ]\
    }\
  ],\
  "connections":\
  [\
    {\
      "created": "1708457955377",\
      "outputNodeId": "arc",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1708458162828",\
      "outputNodeId": "joinPath",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1708458206459",\
      "outputNodeId": "color",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "define",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1708458206460",\
      "outputNodeId": "color2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "define",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1708458206461",\
      "outputNodeId": "color3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "define",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1708461796847",\
      "outputNodeId": "noise",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "arc",\
      "inputId": "width",\
      "list": "false"\
    },\
    {\
      "created": "1708461799054",\
      "outputNodeId": "noise",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "arc",\
      "inputId": "height",\
      "list": "false"\
    },\
    {\
      "created": "1708461804451",\
      "outputNodeId": "noise3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "arc",\
      "inputId": "start",\
      "list": "false"\
    },\
    {\
      "created": "1708461810662",\
      "outputNodeId": "noise4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "arc",\
      "inputId": "sweep",\
      "list": "false"\
    },\
    {\
      "created": "1708458026187",\
      "outputNodeId": "repeat",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "joinPath",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1708458177213",\
      "outputNodeId": "fill",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "joinPath",\
      "inputId": "props",\
      "list": "false"\
    },\
    {\
      "created": "1708458211585",\
      "outputNodeId": "define",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "fill",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1708463085682",\
      "outputNodeId": "repeat2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "frame",\
      "inputId": "children",\
      "list": "true"\
    },\
    {\
      "created": "1708463096604",\
      "outputNodeId": "color4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "frame",\
      "inputId": "props",\
      "list": "false"\
    }\
  ]\
}';