const presetCircleFields = '\
{\
  "generatorVersion": "373",\
  "nodes":\
  [\
    {\
      "type": "NOISE",\
      "created": "1709373449935",\
      "updated": "1709373449935",\
      "id": "noise6",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "-52",\
      "y": "907",\
      "z": "0",\
      "params":\
      [\
            ["NUM#", "seed", "2451,0"],\
            ["NUM#", "iteration", "?,0"],\
            ["NUM#", "min", "300,0"],\
            ["NUM#", "max", "500,0"],\
            ["NUM#", "scale", "40,0"],\
            ["NUM#", "offset", "0.49,2"]\
      ]\
    },\
    {\
      "type": "PT",\
      "created": "1709373449938",\
      "updated": "1709373474577",\
      "id": "point3",\
      "name": "point",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "348",\
      "y": "788",\
      "z": "1",\
      "params":\
      [\
            ["NUM#", "x", "265.3304933345296,0"],\
            ["NUM#", "y", "449.1475285522352,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1709373449942",\
      "updated": "1709373449942",\
      "id": "random",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "-856",\
      "y": "595",\
      "z": "2",\
      "params":\
      [\
            ["NUM#", "seed", "2512,0"],\
            ["NUM#", "iteration", "?,0"],\
            ["NUM#", "max", "10000,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1709373449949",\
      "updated": "1709373449949",\
      "id": "color",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "467",\
      "y": "969",\
      "z": "3",\
      "prevSpace": "hex",\
      "params":\
      [\
            ["NUM#", "space", "0,0"],\
            ["NUM#", "c1", "143,0"],\
            ["NUM#", "c2", "214,0"],\
            ["NUM#", "c3", "2,0"]\
      ]\
    },\
    {\
      "type": "STRK",\
      "created": "1709373449954",\
      "updated": "1709373449954",\
      "id": "stroke",\
      "name": "stroke",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "868",\
      "y": "946",\
      "z": "4",\
      "params":\
      [\
            ["LIST#", "fills", "1 FILL# 143,0 214,0 2,0 100,0 6,0"],\
            ["NUM#", "weight", "2,0"],\
            ["TEXT#", "dashes", "", "center"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1709373449961",\
      "updated": "1709373449961",\
      "id": "noise2",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "-52",\
      "y": "400",\
      "z": "5",\
      "params":\
      [\
            ["NUM#", "seed", "6198,0"],\
            ["NUM#", "iteration", "?,0"],\
            ["NUM#", "min", "300,0"],\
            ["NUM#", "max", "500,0"],\
            ["NUM#", "scale", "40,0"],\
            ["NUM#", "offset", "0.49,2"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1709373449966",\
      "updated": "1709373449966",\
      "id": "repeat2",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "1480",\
      "y": "849",\
      "z": "6",\
      "params":\
      [\
            ["NUM#", "count", "50,0"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1709373449971",\
      "updated": "1709373449971",\
      "id": "noise5",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "-194",\
      "y": "909",\
      "z": "7",\
      "params":\
      [\
            ["NUM#", "seed", "4768,0"],\
            ["NUM#", "iteration", "?,0"],\
            ["NUM#", "min", "100,0"],\
            ["NUM#", "max", "300,0"],\
            ["NUM#", "scale", "40,0"],\
            ["NUM#", "offset", "0.49,2"]\
      ]\
    },\
    {\
      "type": "PT",\
      "created": "1709373449972",\
      "updated": "1709373449972",\
      "id": "point",\
      "name": "point",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "349",\
      "y": "550",\
      "z": "8",\
      "params":\
      [\
            ["NUM#", "x", "263.6275391103047,0"],\
            ["NUM#", "y", "356.1422815093347,0"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1709373449977",\
      "updated": "1709373449977",\
      "id": "noise4",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "-49",\
      "y": "644",\
      "z": "9",\
      "params":\
      [\
            ["NUM#", "seed", "1942,0"],\
            ["NUM#", "iteration", "?,0"],\
            ["NUM#", "min", "300,0"],\
            ["NUM#", "max", "500,0"],\
            ["NUM#", "scale", "40,0"],\
            ["NUM#", "offset", "0.49,2"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1709373449981",\
      "updated": "1709373449981",\
      "id": "noise3",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "-191",\
      "y": "646",\
      "z": "10",\
      "params":\
      [\
            ["NUM#", "seed", "5331,0"],\
            ["NUM#", "iteration", "?,0"],\
            ["NUM#", "min", "100,0"],\
            ["NUM#", "max", "300,0"],\
            ["NUM#", "scale", "40,0"],\
            ["NUM#", "offset", "0.49,2"]\
      ]\
    },\
    {\
      "type": "PT",\
      "created": "1709373449983",\
      "updated": "1709373449983",\
      "id": "point2",\
      "name": "point",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "342",\
      "y": "665",\
      "z": "11",\
      "params":\
      [\
            ["NUM#", "x", "154.2547030403694,0"],\
            ["NUM#", "y", "394.90561377327765,0"]\
      ]\
    },\
    {\
      "type": "LIST",\
      "created": "1709373449984",\
      "updated": "1709373449984",\
      "id": "list",\
      "name": "list",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "-695",\
      "y": "613",\
      "z": "12",\
      "width": "120",\
      "height": "252",\
      "divider": "0.25",\
      "scroll": "0",\
      "params":\
      [\
            ["NUM#", "0", "5521,0"],\
            ["NUM#", "1", "6198,0"],\
            ["NUM#", "2", "5331,0"],\
            ["NUM#", "3", "1942,0"],\
            ["NUM#", "4", "4768,0"],\
            ["NUM#", "5", "2451,0"],\
            ["NUM#", "6", "5012,0"],\
            ["NUM#", "7", "7887,0"],\
            ["NUM#", "8", "5940,0"],\
            ["NUM#", "9", "8294,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1709373449993",\
      "updated": "1709373449993",\
      "id": "repeat",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "-856",\
      "y": "776",\
      "z": "13",\
      "params":\
      [\
            ["NUM#", "count", "10,0"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1709373449997",\
      "updated": "1709373449997",\
      "id": "noise",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "-194",\
      "y": "402",\
      "z": "14",\
      "params":\
      [\
            ["NUM#", "seed", "5521,0"],\
            ["NUM#", "iteration", "?,0"],\
            ["NUM#", "min", "100,0"],\
            ["NUM#", "max", "300,0"],\
            ["NUM#", "scale", "40,0"],\
            ["NUM#", "offset", "0.49,2"]\
      ]\
    },\
    {\
      "type": "ELPS",\
      "created": "1709373450003",\
      "updated": "1709373482101",\
      "id": "ellipse",\
      "name": "ellipse",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "1112",\
      "y": "592",\
      "z": "15",\
      "innerAbsolute": "false",\
      "sweepInDegrees": "false",\
      "params":\
      [\
            ["NUM#", "position", "1,0"],\
            ["NUM#", "x", "218.84929619892165,10"],\
            ["NUM#", "y", "403.480399015639,10"],\
            ["NUM#", "width", "65.16124927647952,-2"],\
            ["NUM#", "height", "65.16124927647952,-2"]\
      ]\
    },\
    {\
      "type": "CIRCEN",\
      "created": "1709373450003",\
      "updated": "1709373472092",\
      "id": "circleCenter",\
      "name": "circle%20center",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "546",\
      "y": "654",\
      "z": "16"\
    },\
    {\
      "type": "PT",\
      "created": "1709373450005",\
      "updated": "1709373450005",\
      "id": "point4",\
      "name": "point",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "915",\
      "y": "614",\
      "z": "17",\
      "params":\
      [\
            ["NUM#", "x", "218.84929619892165,10"],\
            ["NUM#", "y", "403.480399015639,10"]\
      ]\
    },\
    {\
      "type": "SEQ",\
      "created": "1709373450007",\
      "updated": "1709373450007",\
      "id": "sequence",\
      "name": "sequence",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "-554",\
      "y": "1143",\
      "z": "18",\
      "params":\
      [\
            ["NUM#", "add", "0.01,2"],\
            ["NUM#", "end", "?,0"]\
      ]\
    },\
    {\
      "type": "FRM",\
      "created": "1709373450011",\
      "updated": "1709373450043",\
      "id": "frame",\
      "name": "frame",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "1799",\
      "y": "715",\
      "z": "19",\
      "active": "true",\
      "params":\
      [\
            ["NUM#", "width", "400,0"],\
            ["NUM#", "height", "800,0"],\
            ["NUM#", "round", "10,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1709373450013",\
      "updated": "1709373450013",\
      "id": "color2",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "1614",\
      "y": "1017",\
      "z": "20",\
      "prevSpace": "hex",\
      "params":\
      [\
            ["NUM#", "space", "0,0"],\
            ["NUM#", "c1", "0,0"],\
            ["NUM#", "c2", "0,0"],\
            ["NUM#", "c3", "0,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1709373450015",\
      "updated": "1709373450015",\
      "id": "fill",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "673",\
      "y": "952",\
      "z": "21",\
      "params":\
      [\
            ["COL#", "color", "1,0 143,0 214,0 2,0"],\
            ["NUM#", "blend", "6,0"]\
      ]\
    },\
    {\
      "type": "PANEL",\
      "created": "1709373450016",\
      "updated": "1709373450043",\
      "id": "panel",\
      "name": "",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "1",\
      "notCondition": "false",\
      "x": "-893",\
      "y": "554",\
      "z": "22",\
      "width": "356.1439573182158",\
      "height": "357.55866837246697",\
      "params":\
      [\
      ]\
    },\
    {\
      "type": "VECLEN",\
      "created": "1709373463375",\
      "updated": "1709373476814",\
      "id": "vector",\
      "name": "vector",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "718",\
      "y": "735",\
      "z": "23",\
      "active": "true"\
    },\
    {\
      "type": "MESPT",\
      "created": "1709373465944",\
      "updated": "1709373482101",\
      "id": "measure",\
      "name": "measure",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "880",\
      "y": "738",\
      "z": "24",\
      "active": "true",\
      "params":\
      [\
            ["NUM#", "length", "65.16124927647952,-2"],\
            ["NUM#", "angle", "44.49384404479108,-2"]\
      ]\
    }\
  ],\
  "connections":\
  [\
    {\
      "created": "1709373450022",\
      "outputNodeId": "list",\
      "outputId": "5",\
      "outputOrder": "5",\
      "inputNodeId": "noise6",\
      "inputId": "seed",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise4",\
      "outputId": "min",\
      "outputOrder": "0",\
      "inputNodeId": "noise6",\
      "inputId": "min",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise4",\
      "outputId": "max",\
      "outputOrder": "0",\
      "inputNodeId": "noise6",\
      "inputId": "max",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise5",\
      "outputId": "scale",\
      "outputOrder": "0",\
      "inputNodeId": "noise6",\
      "inputId": "scale",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "sequence",\
      "outputId": "h0",\
      "outputOrder": "4",\
      "inputNodeId": "noise6",\
      "inputId": "offset",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "point3",\
      "inputId": "x",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "point3",\
      "inputId": "y",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "fill",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "stroke",\
      "inputId": "fills",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "list",\
      "outputId": "1",\
      "outputOrder": "5",\
      "inputNodeId": "noise2",\
      "inputId": "seed",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise",\
      "outputId": "scale",\
      "outputOrder": "0",\
      "inputNodeId": "noise2",\
      "inputId": "scale",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "sequence",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "noise2",\
      "inputId": "offset",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "ellipse",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "list",\
      "outputId": "4",\
      "outputOrder": "5",\
      "inputNodeId": "noise5",\
      "inputId": "seed",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise3",\
      "outputId": "min",\
      "outputOrder": "0",\
      "inputNodeId": "noise5",\
      "inputId": "min",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise3",\
      "outputId": "max",\
      "outputOrder": "0",\
      "inputNodeId": "noise5",\
      "inputId": "max",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise4",\
      "outputId": "scale",\
      "outputOrder": "0",\
      "inputNodeId": "noise5",\
      "inputId": "scale",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "sequence",\
      "outputId": "h0",\
      "outputOrder": "3",\
      "inputNodeId": "noise5",\
      "inputId": "offset",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "point",\
      "inputId": "x",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "point",\
      "inputId": "y",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "list",\
      "outputId": "3",\
      "outputOrder": "5",\
      "inputNodeId": "noise4",\
      "inputId": "seed",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise2",\
      "outputId": "min",\
      "outputOrder": "0",\
      "inputNodeId": "noise4",\
      "inputId": "min",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise2",\
      "outputId": "max",\
      "outputOrder": "0",\
      "inputNodeId": "noise4",\
      "inputId": "max",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise3",\
      "outputId": "scale",\
      "outputOrder": "0",\
      "inputNodeId": "noise4",\
      "inputId": "scale",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "sequence",\
      "outputId": "h0",\
      "outputOrder": "2",\
      "inputNodeId": "noise4",\
      "inputId": "offset",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "list",\
      "outputId": "2",\
      "outputOrder": "5",\
      "inputNodeId": "noise3",\
      "inputId": "seed",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise",\
      "outputId": "min",\
      "outputOrder": "0",\
      "inputNodeId": "noise3",\
      "inputId": "min",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise",\
      "outputId": "max",\
      "outputOrder": "0",\
      "inputNodeId": "noise3",\
      "inputId": "max",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise2",\
      "outputId": "scale",\
      "outputOrder": "0",\
      "inputNodeId": "noise3",\
      "inputId": "scale",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "sequence",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "noise3",\
      "inputId": "offset",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "point2",\
      "inputId": "x",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "noise4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "point2",\
      "inputId": "y",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "repeat",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "list",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "random",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "list",\
      "outputId": "0",\
      "outputOrder": "5",\
      "inputNodeId": "noise",\
      "inputId": "seed",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "sequence",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "noise",\
      "inputId": "offset",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "point4",\
      "outputId": "x",\
      "outputOrder": "0",\
      "inputNodeId": "ellipse",\
      "inputId": "x",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "point4",\
      "outputId": "y",\
      "outputOrder": "0",\
      "inputNodeId": "ellipse",\
      "inputId": "y",\
      "list": "false"\
    },\
    {\
      "created": "1709373480582",\
      "outputNodeId": "measure",\
      "outputId": "length",\
      "outputOrder": "0",\
      "inputNodeId": "ellipse",\
      "inputId": "width",\
      "list": "false"\
    },\
    {\
      "created": "1709373482100",\
      "outputNodeId": "measure",\
      "outputId": "length",\
      "outputOrder": "1",\
      "inputNodeId": "ellipse",\
      "inputId": "height",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "stroke",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "ellipse",\
      "inputId": "props",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "point",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "circleCenter",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "point2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "circleCenter",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "point3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "circleCenter",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "circleCenter",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "point4",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "repeat2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "frame",\
      "inputId": "children",\
      "list": "true"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "color2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "frame",\
      "inputId": "props",\
      "list": "false"\
    },\
    {\
      "created": "1709373450022",\
      "outputNodeId": "color",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "fill",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1709373472091",\
      "outputNodeId": "circleCenter",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "vector",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1709373474577",\
      "outputNodeId": "point3",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "vector",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1709373476813",\
      "outputNodeId": "vector",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "measure",\
      "inputId": "h0",\
      "list": "false"\
    }\
  ]\
}';