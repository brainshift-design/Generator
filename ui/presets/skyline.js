const presetSkyline ='\
{\
  "generatorVersion": "419",\
  "nodes":\
  [\
    {\
      "type": "STRKSD",\
      "created": "1715273971005",\
      "updated": "1715274307350",\
      "id": "strokeSides",\
      "name": "stroke%20sides",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6147",\
      "y": "9360",\
      "z": "0",\
      "params":\
      [\
            ["NUM#", "top", "0,0"],\
            ["NUM#", "left", "0,0"],\
            ["NUM#", "right", "0,0"]\
      ]\
    },\
    {\
      "type": "SEQ",\
      "created": "1715277303376",\
      "updated": "1715277396661",\
      "id": "sequence2",\
      "name": "sequence",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9698",\
      "y": "13583",\
      "z": "1",\
      "params":\
      [\
            ["NUM#", "start", "5,0"],\
            ["NUM#", "add", "2,0"],\
            ["NUM#", "end", "?,?"]\
      ]\
    },\
    {\
      "type": "SCALE",\
      "created": "1715276997797",\
      "updated": "1715277069301",\
      "id": "scale",\
      "name": "scale",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10291",\
      "y": "12252",\
      "z": "2",\
      "params":\
      [\
            ["NUM#", "scaleY", "-100,0"],\
            ["NUM#", "affectSpace", "0,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1715277319753",\
      "updated": "1715278002511",\
      "id": "repeat6",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10462",\
      "y": "12992",\
      "z": "3",\
      "params":\
      [\
            ["NUM#", "count", "75,0"],\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1715276488107",\
      "updated": "1715276494573",\
      "id": "repeat5",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6519",\
      "y": "12099",\
      "z": "4",\
      "params":\
      [\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1715276438526",\
      "updated": "1715276771403",\
      "id": "repeat4",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8958",\
      "y": "12145",\
      "z": "5",\
      "params":\
      [\
            ["NUM#", "count", "20,0"],\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1715274047076",\
      "updated": "1715275471093",\
      "id": "repeat3",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7147",\
      "y": "7588",\
      "z": "6",\
      "params":\
      [\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "RECT",\
      "created": "1715273178302",\
      "updated": "1715273757297",\
      "id": "rect",\
      "name": "rectangle",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6555",\
      "y": "7272",\
      "z": "7",\
      "params":\
      [\
            ["NUM#", "width", "183,0"],\
            ["NUM#", "height", "-462,0"]\
      ]\
    },\
    {\
      "type": "RANGE",\
      "created": "1715273412812",\
      "updated": "1715273457492",\
      "id": "range",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5592",\
      "y": "8375",\
      "z": "8",\
      "params":\
      [\
            ["NUM#", "start", "6,0"],\
            ["NUM#", "end", "94,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715275226137",\
      "updated": "1715275226140",\
      "id": "random9",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6272",\
      "y": "8968",\
      "z": "9",\
      "params":\
      [\
            ["NUM#", "seed", "8095,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "75,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715274637985",\
      "updated": "1715274649183",\
      "id": "random7",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5382",\
      "y": "10363",\
      "z": "10",\
      "params":\
      [\
            ["NUM#", "seed", "8584,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "max", "20,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715274168995",\
      "updated": "1715274183088",\
      "id": "random3",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4773",\
      "y": "8824",\
      "z": "11",\
      "params":\
      [\
            ["NUM#", "seed", "2049,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "20,0"],\
            ["NUM#", "max", "200,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715275824807",\
      "updated": "1715275824810",\
      "id": "random11",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4911",\
      "y": "11492",\
      "z": "12",\
      "params":\
      [\
            ["NUM#", "seed", "8718,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "max", "25,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715275824807",\
      "updated": "1715275824810",\
      "id": "random10",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4911",\
      "y": "11062",\
      "z": "13",\
      "params":\
      [\
            ["NUM#", "seed", "2822,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "max", "25,0"]\
      ]\
    },\
    {\
      "type": "NUM",\
      "created": "1715273434561",\
      "updated": "1715274190507",\
      "id": "num6",\
      "name": "window%20aspect",\
      "renamed": "true",\
      "enabled": "true",\
      "highlight": "3",\
      "notCondition": "false",\
      "x": "5149",\
      "y": "8765",\
      "z": "14",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "138,0"]\
      ]\
    },\
    {\
      "type": "NUM",\
      "created": "1715273335448",\
      "updated": "1715273344096",\
      "id": "num3",\
      "name": "window%20size",\
      "renamed": "true",\
      "enabled": "true",\
      "highlight": "3",\
      "notCondition": "false",\
      "x": "4888.03",\
      "y": "7942.9",\
      "z": "15",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "25,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715273999848",\
      "updated": "1715276261464",\
      "id": "random",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4874",\
      "y": "6868",\
      "z": "16",\
      "params":\
      [\
            ["NUM#", "seed", "7293,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "50,0"],\
            ["NUM#", "max", "200,0"]\
      ]\
    },\
    {\
      "type": "NUM",\
      "created": "1715273191251",\
      "updated": "1715274010791",\
      "id": "num2",\
      "name": "number",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "2",\
      "notCondition": "false",\
      "x": "5390.93",\
      "y": "6963.96",\
      "z": "17",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "183,0"]\
      ]\
    },\
    {\
      "type": "NUM",\
      "created": "1715276152099",\
      "updated": "1715276188008",\
      "id": "num12",\
      "name": "number",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "6",\
      "notCondition": "false",\
      "x": "4880.4",\
      "y": "9516.2",\
      "z": "18",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "500,0"]\
      ]\
    },\
    {\
      "type": "NUM",\
      "created": "1715276152099",\
      "updated": "1715276418474",\
      "id": "num11",\
      "name": "number",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "6",\
      "notCondition": "false",\
      "x": "4877.47",\
      "y": "9399.07",\
      "z": "19",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "1141,0"]\
      ]\
    },\
    {\
      "type": "NUM",\
      "created": "1715275546547",\
      "updated": "1715275845699",\
      "id": "num10",\
      "name": "number",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "3",\
      "notCondition": "false",\
      "x": "5231.45",\
      "y": "11527",\
      "z": "20",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "14,0"]\
      ]\
    },\
    {\
      "type": "NUM",\
      "created": "1715273191251",\
      "updated": "1715274034144",\
      "id": "num",\
      "name": "number",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "2",\
      "notCondition": "false",\
      "x": "5384.93",\
      "y": "7098.96",\
      "z": "21",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "462,0"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1715275926355",\
      "updated": "1715276033985",\
      "id": "noise3",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5134",\
      "y": "11666",\
      "z": "22",\
      "params":\
      [\
            ["NUM#", "seed", "9724,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "max", "15,0"],\
            ["NUM#", "scale", "2,0"],\
            ["NUM#", "offset", "0,1"],\
            ["NUM#", "evolve", "0,1"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1715275926355",\
      "updated": "1715276033985",\
      "id": "noise2",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5128",\
      "y": "10674",\
      "z": "23",\
      "params":\
      [\
            ["NUM#", "seed", "3242,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "max", "15,0"],\
            ["NUM#", "scale", "2,0"],\
            ["NUM#", "offset", "0,1"],\
            ["NUM#", "evolve", "0,1"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1715274069547",\
      "updated": "1715276378861",\
      "id": "noise",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6612",\
      "y": "7555",\
      "z": "24",\
      "params":\
      [\
            ["NUM#", "seed", "3501,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "641,0"],\
            ["NUM#", "max", "1641,0"],\
            ["NUM#", "scale", "4,0"],\
            ["NUM#", "offset", "0,1"],\
            ["NUM#", "evolve", "0,1"]\
      ]\
    },\
    {\
      "type": "NEG",\
      "created": "1715273197581",\
      "updated": "1715273197583",\
      "id": "neg",\
      "name": "negative",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6385",\
      "y": "7367",\
      "z": "25"\
    },\
    {\
      "type": "MOVE",\
      "created": "1715277712439",\
      "updated": "1715277959751",\
      "id": "move2",\
      "name": "move",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10472",\
      "y": "12252",\
      "z": "26",\
      "params":\
      [\
            ["NUM#", "y", "2,0"]\
      ]\
    },\
    {\
      "type": "MOVE",\
      "created": "1715274057276",\
      "updated": "1715274079230",\
      "id": "move",\
      "name": "move",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6814",\
      "y": "7265",\
      "z": "27",\
      "params":\
      [\
            ["NUM#", "x", "1082.2348187201364,0"]\
      ]\
    },\
    {\
      "type": "SMATH",\
      "created": "1715273445430",\
      "updated": "1715273794004",\
      "id": "math7",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5335",\
      "y": "8807",\
      "z": "28",\
      "params":\
      [\
            ["NUM#", "operation", "1,0"],\
            ["NUM#", "operand", "200,0"]\
      ]\
    },\
    {\
      "type": "SMATH",\
      "created": "1715273543110",\
      "updated": "1715273589661",\
      "id": "math3",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5383",\
      "y": "7231",\
      "z": "29",\
      "params":\
      [\
            ["NUM#", "operation", "1,0"],\
            ["NUM#", "operand", "100,0"]\
      ]\
    },\
    {\
      "type": "SMATH",\
      "created": "1715273445430",\
      "updated": "1715273457492",\
      "id": "math2",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5431",\
      "y": "8461",\
      "z": "30",\
      "params":\
      [\
            ["NUM#", "operand", "100,0"],\
            ["NUM#", "operation", "2,0"],\
            ["NUM#", "invert", "1,0"]\
      ]\
    },\
    {\
      "type": "MATH",\
      "created": "1715276177711",\
      "updated": "1715276378861",\
      "id": "math13",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5049",\
      "y": "9508",\
      "z": "31"\
    },\
    {\
      "type": "MATH",\
      "created": "1715276173703",\
      "updated": "1715276356150",\
      "id": "math12",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5044",\
      "y": "9400",\
      "z": "32",\
      "params":\
      [\
            ["NUM#", "operation", "2,0"]\
      ]\
    },\
    {\
      "type": "NUM",\
      "created": "1715274287559",\
      "updated": "1715274295830",\
      "id": "num7",\
      "name": "number",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5756.14",\
      "y": "9343.59",\
      "z": "33",\
      "width": "120",\
      "height": "54"\
    },\
    {\
      "type": "SMATH",\
      "created": "1715275730809",\
      "updated": "1715275730813",\
      "id": "math11",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5388",\
      "y": "11504",\
      "z": "34",\
      "params":\
      [\
            ["NUM#", "operand", "100,0"],\
            ["NUM#", "operation", "2,0"],\
            ["NUM#", "invert", "1,0"]\
      ]\
    },\
    {\
      "type": "SMATH",\
      "created": "1715275554507",\
      "updated": "1715275563464",\
      "id": "math10",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5469",\
      "y": "11627",\
      "z": "35",\
      "params":\
      [\
            ["NUM#", "operand", "0.01,2"]\
      ]\
    },\
    {\
      "type": "LBLR",\
      "created": "1715274885712",\
      "updated": "1715274888404",\
      "id": "layerBlur",\
      "name": "layer%20blur",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6716",\
      "y": "8473",\
      "z": "36",\
      "params":\
      [\
            ["NUM#", "radius", "200,0"]\
      ]\
    },\
    {\
      "type": "GRAD",\
      "created": "1715279107753",\
      "updated": "1715279205637",\
      "id": "grad5",\
      "name": "gradient",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9562",\
      "y": "12472",\
      "z": "37",\
      "diagAspect": "false",\
      "params":\
      [\
            ["NUM#", "gradType", "1,0"],\
            ["NUM#", "position", "2,0"],\
            ["NUM#", "x", "50,0"],\
            ["NUM#", "y", "100,0"],\
            ["NUM#", "size", "150,0"],\
            ["NUM#", "angle", "90,0"]\
      ]\
    },\
    {\
      "type": "GRAD",\
      "created": "1715275514764",\
      "updated": "1715275701945",\
      "id": "grad4",\
      "name": "gradient",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6136",\
      "y": "11249",\
      "z": "38",\
      "diagAspect": "false",\
      "params":\
      [\
            ["NUM#", "blend", "5,0"]\
      ]\
    },\
    {\
      "type": "GRAD",\
      "created": "1715275514764",\
      "updated": "1715275652531",\
      "id": "grad3",\
      "name": "gradient",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6168",\
      "y": "10734",\
      "z": "39",\
      "diagAspect": "false",\
      "params":\
      [\
            ["NUM#", "blend", "5,0"]\
      ]\
    },\
    {\
      "type": "NUM",\
      "created": "1715275546547",\
      "updated": "1715275842957",\
      "id": "num9",\
      "name": "number",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "3",\
      "notCondition": "false",\
      "x": "5344.66",\
      "y": "11030",\
      "z": "40",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "4,0"]\
      ]\
    },\
    {\
      "type": "GRAD",\
      "created": "1715274343191",\
      "updated": "1715274413300",\
      "id": "grad2",\
      "name": "gradient",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6141",\
      "y": "9941",\
      "z": "41",\
      "diagAspect": "false",\
      "params":\
      [\
            ["NUM#", "position", "2,0"],\
            ["NUM#", "y", "0,0"],\
            ["NUM#", "angle", "90,0"],\
            ["NUM#", "blend", "5,0"]\
      ]\
    },\
    {\
      "type": "GRAD",\
      "created": "1715273225784",\
      "updated": "1715273775708",\
      "id": "grad",\
      "name": "gradient",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5767",\
      "y": "8012",\
      "z": "42",\
      "diagAspect": "true",\
      "params":\
      [\
            ["NUM#", "gradType", "3,0"],\
            ["NUM#", "position", "2,0"],\
            ["NUM#", "x", "94,0"],\
            ["NUM#", "y", "97,0"],\
            ["NUM#", "size", "1.948051948051948,0"],\
            ["NUM#", "angle", "45,0"],\
            ["NUM#", "aspect", "138,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1715277366371",\
      "updated": "1715277369482",\
      "id": "fill7",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9877",\
      "y": "13322",\
      "z": "43",\
      "params":\
      [\
            ["COL#", "color", "1,0 0,0 2,0 13,0"],\
            ["NUM#", "opacity", "50,0"],\
            ["NUM#", "blend", "12,0"]\
      ]\
    },\
    {\
      "type": "RECT",\
      "created": "1715277270491",\
      "updated": "1715277406688",\
      "id": "rect2",\
      "name": "rectangle",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10266",\
      "y": "12992",\
      "z": "44",\
      "params":\
      [\
            ["NUM#", "y", "742,0"],\
            ["NUM#", "width", "2000,0"],\
            ["NUM#", "height", "10,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1715275572535",\
      "updated": "1715276033985",\
      "id": "fill6",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5673",\
      "y": "11447",\
      "z": "45",\
      "params":\
      [\
            ["COL#", "color", "1,0 0,0 4,0 255,0"],\
            ["NUM#", "opacity", "12.428782792590823,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1715275572535",\
      "updated": "1715275604309",\
      "id": "fill4",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5666",\
      "y": "11289",\
      "z": "46",\
      "params":\
      [\
            ["COL#", "color", "1,0 0,0 4,0 255,0"],\
            ["NUM#", "opacity", "0,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1715275572535",\
      "updated": "1715275936349",\
      "id": "fill3",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5698",\
      "y": "10774",\
      "z": "47",\
      "params":\
      [\
            ["COL#", "color", "1,0 0,0 4,0 255,0"],\
            ["NUM#", "opacity", "9.69434935764326,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1715273241175",\
      "updated": "1715273320055",\
      "id": "fill2",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5116",\
      "y": "7761",\
      "z": "48",\
      "params":\
      [\
            ["COL#", "color", "1,0 255,0 255,0 255,0"],\
            ["NUM#", "opacity", "0,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1715273241175",\
      "updated": "1715273317803",\
      "id": "fill",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5109",\
      "y": "7631",\
      "z": "49",\
      "params":\
      [\
            ["COL#", "color", "1,0 255,0 255,0 255,0"]\
      ]\
    },\
    {\
      "type": "ELPS",\
      "created": "1715274827047",\
      "updated": "1715276199314",\
      "id": "ellipse",\
      "name": "ellipse",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7123",\
      "y": "8210",\
      "z": "50",\
      "innerAbsolute": "false",\
      "sweepInDegrees": "false",\
      "params":\
      [\
            ["NUM#", "position", "1,0"],\
            ["NUM#", "x", "1141,0"],\
            ["NUM#", "y", "100,0"],\
            ["NUM#", "width", "400,0"],\
            ["NUM#", "height", "400,0"]\
      ]\
    },\
    {\
      "type": "CMB",\
      "created": "1715275839788",\
      "updated": "1715275860011",\
      "id": "combine7",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5231",\
      "y": "11277",\
      "z": "51",\
      "width": "90.133842770077",\
      "height": "51"\
    },\
    {\
      "type": "CMB",\
      "created": "1715274873730",\
      "updated": "1715275017762",\
      "id": "combine6",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6883.11",\
      "y": "8419.87",\
      "z": "52",\
      "width": "120",\
      "height": "64"\
    },\
    {\
      "type": "CMB",\
      "created": "1715274141895",\
      "updated": "1715274150414",\
      "id": "combine3",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5202",\
      "y": "7006",\
      "z": "53",\
      "width": "120",\
      "height": "51"\
    },\
    {\
      "type": "CMB",\
      "created": "1715274129679",\
      "updated": "1715275860011",\
      "id": "combine2",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6886.77",\
      "y": "7953.49",\
      "z": "54",\
      "width": "120",\
      "height": "116"\
    },\
    {\
      "type": "CMB",\
      "created": "1715277437949",\
      "updated": "1715277441947",\
      "id": "combine11",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10268.2",\
      "y": "13251",\
      "z": "55",\
      "width": "120",\
      "height": "51"\
    },\
    {\
      "type": "CMB",\
      "created": "1715277399157",\
      "updated": "1715277535584",\
      "id": "combine10",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10041.2",\
      "y": "13443",\
      "z": "56",\
      "width": "109.52938035550686",\
      "height": "64"\
    },\
    {\
      "type": "CMB",\
      "created": "1715273220622",\
      "updated": "1715275701945",\
      "id": "combine",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6280.88",\
      "y": "7834.83",\
      "z": "57",\
      "width": "120",\
      "height": "116"\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715275522233",\
      "updated": "1715275621750",\
      "id": "colorStop8",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5883",\
      "y": "10692",\
      "z": "58",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 4,0 255,0 9.69434935764326,0 0,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715274395609",\
      "updated": "1715274413300",\
      "id": "colorStop7",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5951",\
      "y": "10087",\
      "z": "59",\
      "params":\
      [\
            ["FILL#", "fill", "77,0 37,0 0,0 100,0 0,0"],\
            ["NUM#", "position", "100,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715273299977",\
      "updated": "1715273323587",\
      "id": "colorStop4",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5291",\
      "y": "7855",\
      "z": "60",\
      "params":\
      [\
            ["FILL#", "fill", "255,0 255,0 255,0 0,0 0,0"],\
            ["NUM#", "position", "100,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715273299977",\
      "updated": "1715273351599",\
      "id": "colorStop3",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5288",\
      "y": "7751",\
      "z": "61",\
      "params":\
      [\
            ["FILL#", "fill", "255,0 255,0 255,0 0,0 0,0"],\
            ["NUM#", "position", "25.01,2"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715273299977",\
      "updated": "1715273317803",\
      "id": "colorStop2",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5286",\
      "y": "7536",\
      "z": "62",\
      "params":\
      [\
            ["FILL#", "fill", "255,0 255,0 255,0 100,0 0,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715275522233",\
      "updated": "1715275681245",\
      "id": "colorStop15",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5864",\
      "y": "11529",\
      "z": "63",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 4,0 255,0 12.428782792590823,0 0,0"],\
            ["NUM#", "position", "100,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715275522233",\
      "updated": "1715275681004",\
      "id": "colorStop14",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5856",\
      "y": "11427",\
      "z": "64",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 4,0 255,0 12.428782792590823,0 0,0"],\
            ["NUM#", "position", "86.01,2"]\
      ]\
    },\
    {\
      "type": "STRK",\
      "created": "1715273938151",\
      "updated": "1715276100216",\
      "id": "stroke",\
      "name": "stroke",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6136",\
      "y": "9105",\
      "z": "65",\
      "params":\
      [\
            ["LIST#", "fills", "1 FILL# 0,0 4,0 255,0 100,0 0,0"],\
            ["TEXT#", "dashes", "", "center"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715275519046",\
      "updated": "1715275910245",\
      "id": "color9",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5481",\
      "y": "11339",\
      "z": "66",\
      "prevSpace": "hex",\
      "params":\
      [\
            ["NUM#", "space", "0,0"],\
            ["NUM#", "c1", "0,0"],\
            ["NUM#", "c2", "4.250016929166806,0"],\
            ["NUM#", "c3", "255,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715275519046",\
      "updated": "1715275886968",\
      "id": "color8",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5513",\
      "y": "10824",\
      "z": "67",\
      "prevSpace": "hex",\
      "params":\
      [\
            ["NUM#", "space", "0,0"],\
            ["NUM#", "c1", "0,0"],\
            ["NUM#", "c2", "4.250016929166806,0"],\
            ["NUM#", "c3", "255,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715274765081",\
      "updated": "1715279205637",\
      "id": "color6",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9337",\
      "y": "12538",\
      "z": "68",\
      "prevSpace": "hsv",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "300,0"],\
            ["NUM#", "c2", "0,0"],\
            ["NUM#", "c3", "0,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715274368390",\
      "updated": "1715274707776",\
      "id": "color5",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5792",\
      "y": "10087",\
      "z": "69",\
      "prevSpace": "hsl",\
      "params":\
      [\
            ["NUM#", "space", "3,0"],\
            ["NUM#", "c1", "29,0"],\
            ["NUM#", "c2", "100,0"],\
            ["NUM#", "c3", "15,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715274870362",\
      "updated": "1715276658568",\
      "id": "color7",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6495",\
      "y": "8681",\
      "z": "70",\
      "prevSpace": "hsv",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "239,0"],\
            ["NUM#", "c2", "100,0"],\
            ["NUM#", "c3", "100,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715274368390",\
      "updated": "1715274403802",\
      "id": "color4",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5778",\
      "y": "9920",\
      "z": "71",\
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
      "type": "COL",\
      "created": "1715276449425",\
      "updated": "1715276481360",\
      "id": "color3",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6366",\
      "y": "12037",\
      "z": "72",\
      "prevSpace": "hsv",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "94,0"],\
            ["NUM#", "c2", "100,0"],\
            ["NUM#", "c3", "100,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1715273402092",\
      "updated": "1715273676512",\
      "id": "repeat2",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6117",\
      "y": "8505",\
      "z": "73",\
      "params":\
      [\
            ["NUM#", "count", "46,0"],\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715273236467",\
      "updated": "1715273255324",\
      "id": "color2",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4915",\
      "y": "7705",\
      "z": "74",\
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
      "type": "COL",\
      "created": "1715276506157",\
      "updated": "1715276506160",\
      "id": "color10",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6680",\
      "y": "12291",\
      "z": "75",\
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
      "type": "REPT",\
      "created": "1715273400764",\
      "updated": "1715273673880",\
      "id": "repeat",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6117",\
      "y": "8337",\
      "z": "76",\
      "params":\
      [\
            ["NUM#", "count", "33,0"],\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "CACHE",\
      "created": "1715276500171",\
      "updated": "1715276500177",\
      "id": "cache6",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6679",\
      "y": "12099",\
      "z": "77"\
    },\
    {\
      "type": "SMATH",\
      "created": "1715273646307",\
      "updated": "1715273673880",\
      "id": "math5",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5627",\
      "y": "8841",\
      "z": "78",\
      "params":\
      [\
            ["NUM#", "operation", "1,0"],\
            ["NUM#", "operand", "8,0"]\
      ]\
    },\
    {\
      "type": "CACHE",\
      "created": "1715276410384",\
      "updated": "1715276542428",\
      "id": "cache5",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4678",\
      "y": "9425",\
      "z": "79"\
    },\
    {\
      "type": "CACHE",\
      "created": "1715275828836",\
      "updated": "1715275842957",\
      "id": "cache11",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5071",\
      "y": "11062",\
      "z": "80"\
    },\
    {\
      "type": "CACHE",\
      "created": "1715275230182",\
      "updated": "1715601280167",\
      "id": "cache10",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6432",\
      "y": "8968",\
      "z": "81"\
    },\
    {\
      "type": "BLEND",\
      "created": "1715275015176",\
      "updated": "1715275017762",\
      "id": "blend",\
      "name": "blend",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6720",\
      "y": "8552",\
      "z": "82",\
      "params":\
      [\
            ["NUM#", "blend", "7,0"],\
            ["NUM#", "opacity", "20,0"]\
      ]\
    },\
    {\
      "type": "CACHE",\
      "created": "1715274652314",\
      "updated": "1715274662975",\
      "id": "cache7",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5522",\
      "y": "10121",\
      "z": "83"\
    },\
    {\
      "type": "CACHE",\
      "created": "1715275230182",\
      "updated": "1715601280167",\
      "id": "cache9",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6297",\
      "y": "8739",\
      "z": "84"\
    },\
    {\
      "type": "COL",\
      "created": "1715277731879",\
      "updated": "1715277745221",\
      "id": "color12",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10620",\
      "y": "12394",\
      "z": "85",\
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
      "type": "CSTOP",\
      "created": "1715274395609",\
      "updated": "1715274410826",\
      "id": "colorStop6",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5937",\
      "y": "9986",\
      "z": "86",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 0,0 0,0 100,0 0,0"],\
            ["NUM#", "position", "50,0"]\
      ]\
    },\
    {\
      "type": "SCENTR",\
      "created": "1715277030766",\
      "updated": "1715277069301",\
      "id": "setCenter",\
      "name": "set%20center",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10127",\
      "y": "12252",\
      "z": "87",\
      "params":\
      [\
            ["NUM#", "centerY", "100,0"]\
      ]\
    },\
    {\
      "type": "IF",\
      "created": "1715274293645",\
      "updated": "1715274319507",\
      "id": "ifElse2",\
      "name": "if%2Felse",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5914",\
      "y": "9382",\
      "z": "88",\
      "params":\
      [\
            ["NUM#", "condition", "0,0"]\
      ]\
    },\
    {\
      "type": "ITER",\
      "created": "1715276515476",\
      "updated": "1715276653671",\
      "id": "iterate",\
      "name": "iterate",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7142",\
      "y": "12181",\
      "z": "89"\
    },\
    {\
      "type": "CACHE",\
      "created": "1715274003530",\
      "updated": "1715274034144",\
      "id": "cache2",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5042",\
      "y": "7144",\
      "z": "90"\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715273299977",\
      "updated": "1715273344096",\
      "id": "colorStop",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5283",\
      "y": "7638",\
      "z": "91",\
      "params":\
      [\
            ["FILL#", "fill", "255,0 255,0 255,0 100,0 0,0"],\
            ["NUM#", "position", "25,0"]\
      ]\
    },\
    {\
      "type": "CACHE",\
      "created": "1715274003530",\
      "updated": "1715274010791",\
      "id": "cache",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5034",\
      "y": "6868",\
      "z": "92"\
    },\
    {\
      "type": "CMB",\
      "created": "1715276521037",\
      "updated": "1715276632800",\
      "id": "combine8",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8261.88",\
      "y": "12222.8",\
      "z": "93",\
      "width": "120",\
      "height": "51"\
    },\
    {\
      "type": "RSTX",\
      "created": "1715277006614",\
      "updated": "1715277006624",\
      "id": "reset",\
      "name": "reset%20transform",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9967",\
      "y": "12252",\
      "z": "94"\
    },\
    {\
      "type": "NUM",\
      "created": "1715277283339",\
      "updated": "1715277315414",\
      "id": "num13",\
      "name": "number",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9536.21",\
      "y": "13091",\
      "z": "95",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "10,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715275522233",\
      "updated": "1715275623646",\
      "id": "colorStop9",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5889",\
      "y": "10805",\
      "z": "96",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 4,0 255,0 9.69434935764326,0 0,0"],\
            ["NUM#", "position", "4,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715273182405",\
      "updated": "1715273185423",\
      "id": "color",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6016",\
      "y": "7627",\
      "z": "97",\
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
      "type": "CMB",\
      "created": "1715276512764",\
      "updated": "1715276512770",\
      "id": "combine4",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6840",\
      "y": "12195",\
      "z": "98",\
      "width": "120",\
      "height": "51"\
    },\
    {\
      "type": "CMB",\
      "created": "1715274855121",\
      "updated": "1715276771403",\
      "id": "combine5",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7307",\
      "y": "7899",\
      "z": "99",\
      "width": "121.62450479271247",\
      "height": "51"\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715274395609",\
      "updated": "1715274407885",\
      "id": "colorStop5",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5927",\
      "y": "9875",\
      "z": "100",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 0,0 0,0 100,0 0,0"]\
      ]\
    },\
    {\
      "type": "RANGE",\
      "created": "1715273412812",\
      "updated": "1715273430850",\
      "id": "range2",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5597",\
      "y": "8540",\
      "z": "101",\
      "params":\
      [\
            ["NUM#", "start", "6,0"],\
            ["NUM#", "end", "97,0"]\
      ]\
    },\
    {\
      "type": "CACHE",\
      "created": "1715274652314",\
      "updated": "1715274713927",\
      "id": "cache8",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5542",\
      "y": "10363",\
      "z": "102"\
    },\
    {\
      "type": "RAND",\
      "created": "1715275226137",\
      "updated": "1715275226140",\
      "id": "random8",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6137",\
      "y": "8739",\
      "z": "103",\
      "params":\
      [\
            ["NUM#", "seed", "6393,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "max", "360,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715276406128",\
      "updated": "1715276406131",\
      "id": "random4",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4518",\
      "y": "9425",\
      "z": "104",\
      "params":\
      [\
            ["NUM#", "seed", "7673,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "500,0"],\
            ["NUM#", "max", "1500,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715275522233",\
      "updated": "1715275625727",\
      "id": "colorStop10",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5888",\
      "y": "10912",\
      "z": "105",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 4,0 255,0 0,0 0,0"],\
            ["NUM#", "position", "4.01,2"]\
      ]\
    },\
    {\
      "type": "SEQ",\
      "created": "1715277303376",\
      "updated": "1715277312050",\
      "id": "sequence",\
      "name": "sequence",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9729",\
      "y": "13164",\
      "z": "106",\
      "params":\
      [\
            ["NUM#", "start", "2,0"],\
            ["NUM#", "end", "?,?"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715273999848",\
      "updated": "1715273999851",\
      "id": "random2",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4882",\
      "y": "7144",\
      "z": "107",\
      "params":\
      [\
            ["NUM#", "seed", "5857,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "50,0"],\
            ["NUM#", "max", "600,0"],\
            ["NUM#", "bias", "-100,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715274637985",\
      "updated": "1715274649183",\
      "id": "random6",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5362",\
      "y": "10121",\
      "z": "108",\
      "params":\
      [\
            ["NUM#", "seed", "8567,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "15,0"],\
            ["NUM#", "max", "30,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1715277366371",\
      "updated": "1715277531010",\
      "id": "fill8",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9877",\
      "y": "13478",\
      "z": "109",\
      "params":\
      [\
            ["COL#", "color", "1,0 0,0 2,0 13,0"],\
            ["NUM#", "opacity", "50,0"],\
            ["NUM#", "blend", "7,0"]\
      ]\
    },\
    {\
      "type": "MATH",\
      "created": "1715273579402",\
      "updated": "1715273594405",\
      "id": "math4",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5561",\
      "y": "8086",\
      "z": "110",\
      "params":\
      [\
            ["NUM#", "operation", "1,0"]\
      ]\
    },\
    {\
      "type": "IF",\
      "created": "1715273920200",\
      "updated": "1715273932206",\
      "id": "ifElse",\
      "name": "if%2Felse",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5927",\
      "y": "8012",\
      "z": "111",\
      "params":\
      [\
            ["NUM#", "condition", "0,0"]\
      ]\
    },\
    {\
      "type": "FRM",\
      "created": "1715274751515",\
      "updated": "1715279138197",\
      "id": "frame",\
      "name": "frame",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9804",\
      "y": "12132",\
      "z": "112",\
      "params":\
      [\
            ["NUM#", "position", "1,0"],\
            ["NUM#", "y", "-750,0"],\
            ["NUM#", "width", "2000,0"],\
            ["NUM#", "height", "750,0"]\
      ]\
    },\
    {\
      "type": "PROB",\
      "created": "1715274313641",\
      "updated": "1715274313643",\
      "id": "prob2",\
      "name": "probability",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5746",\
      "y": "9550",\
      "z": "113",\
      "params":\
      [\
            ["NUM#", "seed", "370,0"],\
            ["NUM#", "iteration", "?,?"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715275522233",\
      "updated": "1715275680717",\
      "id": "colorStop13",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5857",\
      "y": "11320",\
      "z": "114",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 4,0 255,0 0,0 0,0"],\
            ["NUM#", "position", "86,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715274765081",\
      "updated": "1715279089584",\
      "id": "color13",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9357",\
      "y": "12340",\
      "z": "115",\
      "prevSpace": "hsv",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "210,0"],\
            ["NUM#", "c2", "100,0"],\
            ["NUM#", "c3", "30,0"]\
      ]\
    },\
    {\
      "type": "CACHE",\
      "created": "1715275828836",\
      "updated": "1715275845699",\
      "id": "cache12",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5071",\
      "y": "11492",\
      "z": "116"\
    },\
    {\
      "type": "SMATH",\
      "created": "1715275554507",\
      "updated": "1715275563464",\
      "id": "math9",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5501",\
      "y": "11112",\
      "z": "117",\
      "params":\
      [\
            ["NUM#", "operand", "0.01,2"]\
      ]\
    },\
    {\
      "type": "FRM",\
      "created": "1715277129132",\
      "updated": "1715601280167",\
      "id": "frame2",\
      "name": "frame",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10837",\
      "y": "12174",\
      "z": "118",\
      "active": "true",\
      "params":\
      [\
            ["NUM#", "position", "1,0"],\
            ["NUM#", "y", "-750,0"],\
            ["NUM#", "width", "2000,0"],\
            ["NUM#", "height", "1500,0"]\
      ]\
    },\
    {\
      "type": "CACHE",\
      "created": "1715274184745",\
      "updated": "1715274196747",\
      "id": "cache3",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "4933",\
      "y": "8824",\
      "z": "119"\
    },\
    {\
      "type": "NUM",\
      "created": "1715273434561",\
      "updated": "1715273455786",\
      "id": "num4",\
      "name": "side%20margin",\
      "renamed": "true",\
      "enabled": "true",\
      "highlight": "3",\
      "notCondition": "false",\
      "x": "5263.07",\
      "y": "8425",\
      "z": "120",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "6,0"]\
      ]\
    },\
    {\
      "type": "SMATH",\
      "created": "1715273646307",\
      "updated": "1715273676512",\
      "id": "math6",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5627",\
      "y": "9005",\
      "z": "121",\
      "params":\
      [\
            ["NUM#", "operation", "1,0"],\
            ["NUM#", "operand", "10,0"]\
      ]\
    },\
    {\
      "type": "SMATH",\
      "created": "1715273339947",\
      "updated": "1715273351599",\
      "id": "math",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5087",\
      "y": "7953",\
      "z": "122",\
      "params":\
      [\
            ["NUM#", "operand", "0.01,2"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715275522233",\
      "updated": "1715275680309",\
      "id": "colorStop12",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5851",\
      "y": "11207",\
      "z": "123",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 4,0 255,0 0,0 0,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1715275572535",\
      "updated": "1715275614690",\
      "id": "fill5",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5705",\
      "y": "10932",\
      "z": "124",\
      "params":\
      [\
            ["COL#", "color", "1,0 0,0 4,0 255,0"],\
            ["NUM#", "opacity", "0,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715277343820",\
      "updated": "1715277524510",\
      "id": "color11",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9712",\
      "y": "13396",\
      "z": "125",\
      "prevSpace": "hsv",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "232.00000000000003,0"],\
            ["NUM#", "c2", "100,0"],\
            ["NUM#", "c3", "5,0"]\
      ]\
    },\
    {\
      "type": "PROB",\
      "created": "1715273929067",\
      "updated": "1715273932206",\
      "id": "prob",\
      "name": "probability",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5926",\
      "y": "8114",\
      "z": "126",\
      "params":\
      [\
            ["NUM#", "seed", "2582,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "chance", "8,0"]\
      ]\
    },\
    {\
      "type": "MATH",\
      "created": "1715273787794",\
      "updated": "1715273794004",\
      "id": "math8",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5787",\
      "y": "8841",\
      "z": "127",\
      "params":\
      [\
            ["NUM#", "operation", "1,0"]\
      ]\
    },\
    {\
      "type": "NUM",\
      "created": "1715274287559",\
      "updated": "1715274296956",\
      "id": "num8",\
      "name": "number",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5753.54",\
      "y": "9416.64",\
      "z": "128",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "0,0"]\
      ]\
    },\
    {\
      "type": "CACHE",\
      "created": "1715274316517",\
      "updated": "1715274327339",\
      "id": "cache4",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5906",\
      "y": "9550",\
      "z": "129"\
    },\
    {\
      "type": "CMB",\
      "created": "1715277087010",\
      "updated": "1715278002511",\
      "id": "combine9",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10643.3",\
      "y": "12202.2",\
      "z": "130",\
      "width": "120",\
      "height": "64"\
    },\
    {\
      "type": "NUM",\
      "created": "1715273566375",\
      "updated": "1715273566377",\
      "id": "num5",\
      "name": "number",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5400.91",\
      "y": "8086.28",\
      "z": "131",\
      "width": "120",\
      "height": "54",\
      "params":\
      [\
            ["NUM#", "value", "9,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715275522233",\
      "updated": "1715275627646",\
      "id": "colorStop11",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "5896",\
      "y": "11014",\
      "z": "132",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 4,0 255,0 0,0 0,0"],\
            ["NUM#", "position", "100,0"]\
      ]\
    },\
    {\
      "type": "BBLR",\
      "created": "1715277384290",\
      "updated": "1715277535584",\
      "id": "backBlur",\
      "name": "back%20blur",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9877",\
      "y": "13596",\
      "z": "133",\
      "params":\
      [\
            ["NUM#", "radius", "153,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715276464791",\
      "updated": "1715276653671",\
      "id": "random5",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6210",\
      "y": "12200",\
      "z": "134",\
      "params":\
      [\
            ["NUM#", "seed", "7952,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "max", "360,0"]\
      ]\
    }\
  ],\
  "connections":\
  [\
    {\
      "created": "1715274304286",\
      "outputNodeId": "ifElse2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "strokeSides",\
      "inputId": "top",\
      "list": "false"\
    },\
    {\
      "created": "1715274305916",\
      "outputNodeId": "ifElse2",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "strokeSides",\
      "inputId": "left",\
      "list": "false"\
    },\
    {\
      "created": "1715274307350",\
      "outputNodeId": "ifElse2",\
      "outputId": "h0",\
      "outputOrder": "2",\
      "inputNodeId": "strokeSides",\
      "inputId": "right",\
      "list": "false"\
    },\
    {\
      "created": "1715277069301",\
      "outputNodeId": "setCenter",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "scale",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715277319756",\
      "outputNodeId": "rect2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat6",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715277441946",\
      "outputNodeId": "combine11",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat6",\
      "inputId": "loop",\
      "list": "true"\
    },\
    {\
      "created": "1715276488110",\
      "outputNodeId": "color3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat5",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715276494572",\
      "outputNodeId": "random5",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "repeat5",\
      "inputId": "loop",\
      "list": "false"\
    },\
    {\
      "created": "1715276671871",\
      "outputNodeId": "combine5",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "repeat4",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1715276548053",\
      "outputNodeId": "combine8",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat4",\
      "inputId": "loop",\
      "list": "true"\
    },\
    {\
      "created": "1715274057279",\
      "outputNodeId": "move",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat3",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274133876",\
      "outputNodeId": "combine2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat3",\
      "inputId": "loop",\
      "list": "true"\
    },\
    {\
      "created": "1715273206099",\
      "outputNodeId": "num2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "rect",\
      "inputId": "width",\
      "list": "false"\
    },\
    {\
      "created": "1715273197583",\
      "outputNodeId": "neg",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "rect",\
      "inputId": "height",\
      "list": "false"\
    },\
    {\
      "created": "1715273220624",\
      "outputNodeId": "combine",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "rect",\
      "inputId": "props",\
      "list": "true"\
    },\
    {\
      "created": "1715273455786",\
      "outputNodeId": "num4",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "range",\
      "inputId": "start",\
      "list": "false"\
    },\
    {\
      "created": "1715273457492",\
      "outputNodeId": "math2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "range",\
      "inputId": "end",\
      "list": "false"\
    },\
    {\
      "created": "1715274190507",\
      "outputNodeId": "cache3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "num6",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274010791",\
      "outputNodeId": "cache",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "num2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715276418474",\
      "outputNodeId": "cache5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "num11",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275845698",\
      "outputNodeId": "cache12",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "num10",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274034144",\
      "outputNodeId": "cache2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "num",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715276356150",\
      "outputNodeId": "math12",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "noise",\
      "inputId": "min",\
      "list": "false"\
    },\
    {\
      "created": "1715276378860",\
      "outputNodeId": "math13",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "noise",\
      "inputId": "max",\
      "list": "false"\
    },\
    {\
      "created": "1715273197582",\
      "outputNodeId": "num",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "neg",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715277712443",\
      "outputNodeId": "scale",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "move2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274057278",\
      "outputNodeId": "rect",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "move",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274103917",\
      "outputNodeId": "noise",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "move",\
      "inputId": "x",\
      "list": "false"\
    },\
    {\
      "created": "1715273769467",\
      "outputNodeId": "num6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math7",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715273548983",\
      "outputNodeId": "num",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "math3",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715273445432",\
      "outputNodeId": "num4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715276177714",\
      "outputNodeId": "num11",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "math13",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715276188008",\
      "outputNodeId": "num12",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "math13",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715276173706",\
      "outputNodeId": "num11",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math12",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715276184631",\
      "outputNodeId": "num12",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math12",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715275730812",\
      "outputNodeId": "num10",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math11",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275730813",\
      "outputNodeId": "math11",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math10",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715279107757",\
      "outputNodeId": "color13",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad5",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715279205637",\
      "outputNodeId": "color6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad5",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715275680309",\
      "outputNodeId": "colorStop12",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad4",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275680717",\
      "outputNodeId": "colorStop13",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad4",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715275681005",\
      "outputNodeId": "colorStop14",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad4",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715275681245",\
      "outputNodeId": "colorStop15",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad4",\
      "inputId": "h3",\
      "list": "false"\
    },\
    {\
      "created": "1715275621749",\
      "outputNodeId": "colorStop8",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad3",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275623645",\
      "outputNodeId": "colorStop9",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad3",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715275625727",\
      "outputNodeId": "colorStop10",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad3",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715275627646",\
      "outputNodeId": "colorStop11",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad3",\
      "inputId": "h3",\
      "list": "false"\
    },\
    {\
      "created": "1715275842957",\
      "outputNodeId": "cache11",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "num9",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274407885",\
      "outputNodeId": "colorStop5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274410826",\
      "outputNodeId": "colorStop6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad2",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715274413300",\
      "outputNodeId": "colorStop7",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad2",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715273317803",\
      "outputNodeId": "colorStop2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715273320055",\
      "outputNodeId": "colorStop",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715273321567",\
      "outputNodeId": "colorStop3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715273323587",\
      "outputNodeId": "colorStop4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "h3",\
      "list": "false"\
    },\
    {\
      "created": "1715273423490",\
      "outputNodeId": "range",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "x",\
      "list": "false"\
    },\
    {\
      "created": "1715273425793",\
      "outputNodeId": "range2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "y",\
      "list": "false"\
    },\
    {\
      "created": "1715273594405",\
      "outputNodeId": "math4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "size",\
      "list": "false"\
    },\
    {\
      "created": "1715273775707",\
      "outputNodeId": "num6",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "grad",\
      "inputId": "aspect",\
      "list": "false"\
    },\
    {\
      "created": "1715277369481",\
      "outputNodeId": "color11",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "fill7",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715277308882",\
      "outputNodeId": "sequence",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "rect2",\
      "inputId": "y",\
      "list": "false"\
    },\
    {\
      "created": "1715277315413",\
      "outputNodeId": "num13",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "rect2",\
      "inputId": "height",\
      "list": "false"\
    },\
    {\
      "created": "1715277406688",\
      "outputNodeId": "combine10",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "rect2",\
      "inputId": "props",\
      "list": "true"\
    },\
    {\
      "created": "1715275665809",\
      "outputNodeId": "color9",\
      "outputId": "h0",\
      "outputOrder": "5",\
      "inputNodeId": "fill6",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715276033984",\
      "outputNodeId": "noise3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "fill6",\
      "inputId": "opacity",\
      "list": "false"\
    },\
    {\
      "created": "1715275665809",\
      "outputNodeId": "color9",\
      "outputId": "h0",\
      "outputOrder": "4",\
      "inputNodeId": "fill4",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715275574385",\
      "outputNodeId": "color8",\
      "outputId": "h0",\
      "outputOrder": "4",\
      "inputNodeId": "fill3",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715275936349",\
      "outputNodeId": "noise2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "fill3",\
      "inputId": "opacity",\
      "list": "false"\
    },\
    {\
      "created": "1715273255324",\
      "outputNodeId": "color2",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "fill2",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715273244802",\
      "outputNodeId": "color2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "fill",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715276199314",\
      "outputNodeId": "num11",\
      "outputId": "h0",\
      "outputOrder": "2",\
      "inputNodeId": "ellipse",\
      "inputId": "x",\
      "list": "false"\
    },\
    {\
      "created": "1715274877983",\
      "outputNodeId": "combine6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "ellipse",\
      "inputId": "props",\
      "list": "true"\
    },\
    {\
      "created": "1715275839791",\
      "outputNodeId": "cache11",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine7",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275839791",\
      "outputNodeId": "cache12",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine7",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715274873732",\
      "outputNodeId": "color7",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine6",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274888403",\
      "outputNodeId": "layerBlur",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine6",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715275017761",\
      "outputNodeId": "blend",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine6",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715274141897",\
      "outputNodeId": "cache",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine3",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274141897",\
      "outputNodeId": "cache2",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine3",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715274131975",\
      "outputNodeId": "noise",\
      "outputId": "h0",\
      "outputOrder": "2",\
      "inputNodeId": "combine2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274150414",\
      "outputNodeId": "combine3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine2",\
      "inputId": "h1",\
      "list": "true"\
    },\
    {\
      "created": "1715274196747",\
      "outputNodeId": "cache3",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine2",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715274327338",\
      "outputNodeId": "cache4",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine2",\
      "inputId": "h3",\
      "list": "false"\
    },\
    {\
      "created": "1715274662975",\
      "outputNodeId": "cache7",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine2",\
      "inputId": "h4",\
      "list": "false"\
    },\
    {\
      "created": "1715274713926",\
      "outputNodeId": "cache8",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine2",\
      "inputId": "h5",\
      "list": "false"\
    },\
    {\
      "created": "1715275860010",\
      "outputNodeId": "combine7",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine2",\
      "inputId": "h6",\
      "list": "true"\
    },\
    {\
      "created": "1715277437952",\
      "outputNodeId": "sequence",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine11",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715277437952",\
      "outputNodeId": "sequence2",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine11",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715277399161",\
      "outputNodeId": "fill7",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine10",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715277531010",\
      "outputNodeId": "fill8",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine10",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715277535583",\
      "outputNodeId": "backBlur",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine10",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715273220623",\
      "outputNodeId": "color",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715273402094",\
      "outputNodeId": "repeat2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine",\
      "inputId": "h1",\
      "list": "true"\
    },\
    {\
      "created": "1715273941557",\
      "outputNodeId": "stroke",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715273975930",\
      "outputNodeId": "strokeSides",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine",\
      "inputId": "h3",\
      "list": "false"\
    },\
    {\
      "created": "1715274358476",\
      "outputNodeId": "grad2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine",\
      "inputId": "h4",\
      "list": "false"\
    },\
    {\
      "created": "1715275652531",\
      "outputNodeId": "grad3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine",\
      "inputId": "h5",\
      "list": "false"\
    },\
    {\
      "created": "1715275701944",\
      "outputNodeId": "grad4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine",\
      "inputId": "h6",\
      "list": "false"\
    },\
    {\
      "created": "1715275575432",\
      "outputNodeId": "fill3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop8",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715274405986",\
      "outputNodeId": "color5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop7",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715273315209",\
      "outputNodeId": "fill2",\
      "outputId": "h0",\
      "outputOrder": "2",\
      "inputNodeId": "colorStop4",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715273313370",\
      "outputNodeId": "fill2",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop3",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715273351599",\
      "outputNodeId": "math",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop3",\
      "inputId": "position",\
      "list": "false"\
    },\
    {\
      "created": "1715273310025",\
      "outputNodeId": "fill",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop2",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715275665809",\
      "outputNodeId": "fill6",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop15",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715275665809",\
      "outputNodeId": "fill6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop14",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715275665809",\
      "outputNodeId": "math10",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop14",\
      "inputId": "position",\
      "list": "false"\
    },\
    {\
      "created": "1715276100215",\
      "outputNodeId": "color7",\
      "outputId": "h0",\
      "outputOrder": "3",\
      "inputNodeId": "stroke",\
      "inputId": "fills",\
      "list": "false"\
    },\
    {\
      "created": "1715275910245",\
      "outputNodeId": "color7",\
      "outputId": "h0",\
      "outputOrder": "2",\
      "inputNodeId": "color9",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275886968",\
      "outputNodeId": "color7",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "color8",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274652317",\
      "outputNodeId": "cache7",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "color5",\
      "inputId": "c1",\
      "list": "false"\
    },\
    {\
      "created": "1715274707776",\
      "outputNodeId": "cache8",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "color5",\
      "inputId": "c3",\
      "list": "false"\
    },\
    {\
      "created": "1715276653671",\
      "outputNodeId": "iterate",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "color7",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715276481360",\
      "outputNodeId": "random5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "color3",\
      "inputId": "c1",\
      "list": "false"\
    },\
    {\
      "created": "1715273402094",\
      "outputNodeId": "repeat",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat2",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1715273676512",\
      "outputNodeId": "math6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat2",\
      "inputId": "count",\
      "list": "false"\
    },\
    {\
      "created": "1715273430850",\
      "outputNodeId": "range2",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "repeat2",\
      "inputId": "loop",\
      "list": "false"\
    },\
    {\
      "created": "1715273920202",\
      "outputNodeId": "ifElse",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715273787796",\
      "outputNodeId": "math8",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat",\
      "inputId": "count",\
      "list": "false"\
    },\
    {\
      "created": "1715273428866",\
      "outputNodeId": "range",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "repeat",\
      "inputId": "loop",\
      "list": "false"\
    },\
    {\
      "created": "1715276500173",\
      "outputNodeId": "repeat5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache6",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1715273654707",\
      "outputNodeId": "num2",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "math5",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715276410387",\
      "outputNodeId": "random4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache5",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275828838",\
      "outputNodeId": "random10",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache11",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275248191",\
      "outputNodeId": "random9",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache10",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274652316",\
      "outputNodeId": "random6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache7",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275230184",\
      "outputNodeId": "random8",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache9",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274403802",\
      "outputNodeId": "color4",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop6",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715277030770",\
      "outputNodeId": "reset",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "setCenter",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274295830",\
      "outputNodeId": "num7",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "ifElse2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715274296955",\
      "outputNodeId": "num8",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "ifElse2",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715274319506",\
      "outputNodeId": "cache4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "ifElse2",\
      "inputId": "condition",\
      "list": "false"\
    },\
    {\
      "created": "1715276515478",\
      "outputNodeId": "combine4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "iterate",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1715274012435",\
      "outputNodeId": "random2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715273311377",\
      "outputNodeId": "fill",\
      "outputId": "h0",\
      "outputOrder": "2",\
      "inputNodeId": "colorStop",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715273344096",\
      "outputNodeId": "num3",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop",\
      "inputId": "position",\
      "list": "false"\
    },\
    {\
      "created": "1715274003532",\
      "outputNodeId": "random",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715276521039",\
      "outputNodeId": "iterate",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine8",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715276542427",\
      "outputNodeId": "cache5",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine8",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715277006618",\
      "outputNodeId": "frame",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "reset",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275604309",\
      "outputNodeId": "fill3",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop9",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715275561549",\
      "outputNodeId": "num9",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop9",\
      "inputId": "position",\
      "list": "false"\
    },\
    {\
      "created": "1715276512766",\
      "outputNodeId": "cache6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine4",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1715276512766",\
      "outputNodeId": "color10",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine4",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715274855123",\
      "outputNodeId": "ellipse",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine5",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275471092",\
      "outputNodeId": "repeat3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine5",\
      "inputId": "h1",\
      "list": "true"\
    },\
    {\
      "created": "1715274402419",\
      "outputNodeId": "color4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop5",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715274698864",\
      "outputNodeId": "random7",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache8",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275612934",\
      "outputNodeId": "fill5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop10",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715275563464",\
      "outputNodeId": "math9",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop10",\
      "inputId": "position",\
      "list": "false"\
    },\
    {\
      "created": "1715277312050",\
      "outputNodeId": "num13",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "sequence",\
      "inputId": "add",\
      "list": "false"\
    },\
    {\
      "created": "1715277524510",\
      "outputNodeId": "color11",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "fill8",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715273579403",\
      "outputNodeId": "num5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math4",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715273589660",\
      "outputNodeId": "math3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math4",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715273920201",\
      "outputNodeId": "grad",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "ifElse",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715273932205",\
      "outputNodeId": "prob",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "ifElse",\
      "inputId": "condition",\
      "list": "false"\
    },\
    {\
      "created": "1715276771403",\
      "outputNodeId": "repeat4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "frame",\
      "inputId": "children",\
      "list": "true"\
    },\
    {\
      "created": "1715279138197",\
      "outputNodeId": "grad5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "frame",\
      "inputId": "props",\
      "list": "false"\
    },\
    {\
      "created": "1715275665809",\
      "outputNodeId": "fill4",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop13",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715275730813",\
      "outputNodeId": "math11",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop13",\
      "inputId": "position",\
      "list": "false"\
    },\
    {\
      "created": "1715275834978",\
      "outputNodeId": "random11",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache12",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275554509",\
      "outputNodeId": "num9",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math9",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715277159777",\
      "outputNodeId": "combine9",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "frame2",\
      "inputId": "children",\
      "list": "true"\
    },\
    {\
      "created": "1715277745221",\
      "outputNodeId": "color12",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "frame2",\
      "inputId": "props",\
      "list": "false"\
    },\
    {\
      "created": "1715274184746",\
      "outputNodeId": "random3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache3",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715273668216",\
      "outputNodeId": "num",\
      "outputId": "h0",\
      "outputOrder": "2",\
      "inputNodeId": "math6",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715273339949",\
      "outputNodeId": "num3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715275665809",\
      "outputNodeId": "fill4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop12",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715275609599",\
      "outputNodeId": "color8",\
      "outputId": "h0",\
      "outputOrder": "5",\
      "inputNodeId": "fill5",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715273787796",\
      "outputNodeId": "math5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math8",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715273794004",\
      "outputNodeId": "math7",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math8",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715274316519",\
      "outputNodeId": "prob2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache4",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715277087013",\
      "outputNodeId": "frame",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine9",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715277959750",\
      "outputNodeId": "move2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine9",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715278002510",\
      "outputNodeId": "repeat6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine9",\
      "inputId": "h2",\
      "list": "true"\
    },\
    {\
      "created": "1715275614690",\
      "outputNodeId": "fill5",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop11",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715277396661",\
      "outputNodeId": "sequence2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "backBlur",\
      "inputId": "radius",\
      "list": "false"\
    }\
  ]\
}';