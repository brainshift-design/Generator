const presetNorthernLights = '\
{\
  "generatorVersion": "419",\
  "nodes":\
  [\
    {\
      "type": "COL",\
      "created": "1715508594880",\
      "updated": "1715508649365",\
      "id": "color3",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10873",\
      "y": "9002",\
      "z": "0",\
      "prevSpace": "hsb",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "193,0"],\
            ["NUM#", "c2", "75,0"],\
            ["NUM#", "c3", "71,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715509159834",\
      "updated": "1715509178691",\
      "id": "random5",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6982",\
      "y": "8934",\
      "z": "1",\
      "params":\
      [\
            ["NUM#", "seed", "9144,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "max", "10000,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1715507635637",\
      "updated": "1715507678095",\
      "id": "fill2",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7798",\
      "y": "8077",\
      "z": "2",\
      "params":\
      [\
            ["COL#", "color", "1,0 0,0 0,0 0,0"],\
            ["NUM#", "opacity", "0,0"]\
      ]\
    },\
    {\
      "type": "MATH",\
      "created": "1715511591222",\
      "updated": "1715514811803",\
      "id": "math2",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10411",\
      "y": "10332",\
      "z": "3"\
    },\
    {\
      "type": "RANGE",\
      "created": "1715510729176",\
      "updated": "1715511895091",\
      "id": "range9",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11108",\
      "y": "10934",\
      "z": "4",\
      "params":\
      [\
            ["NUM#", "start", "90,0"],\
            ["NUM#", "end", "-16,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715507631420",\
      "updated": "1715509621294",\
      "id": "color",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7608",\
      "y": "7988",\
      "z": "5",\
      "prevSpace": "hsb",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "229.99999999999997,0"],\
            ["NUM#", "c2", "40,0"],\
            ["NUM#", "c3", "0,0"]\
      ]\
    },\
    {\
      "type": "PT",\
      "created": "1715508779142",\
      "updated": "1715508809022",\
      "id": "point",\
      "name": "point",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7704",\
      "y": "6764",\
      "z": "6",\
      "params":\
      [\
            ["NUM#", "x", "2000,0"],\
            ["NUM#", "y", "332.2832633735008,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715508639296",\
      "updated": "1715508663149",\
      "id": "colorStop7",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11058",\
      "y": "9324",\
      "z": "7",\
      "params":\
      [\
            ["FILL#", "fill", "7,0 8,0 41,0 100,0 0,0"],\
            ["NUM#", "position", "100,0"]\
      ]\
    },\
    {\
      "type": "VPATH",\
      "created": "1715508915955",\
      "updated": "1715508968816",\
      "id": "path",\
      "name": "path",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8263",\
      "y": "6868",\
      "z": "8",\
      "params":\
      [\
            ["NUM#", "degree", "5,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715507957512",\
      "updated": "1715507968511",\
      "id": "random2",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7594",\
      "y": "8486",\
      "z": "9",\
      "params":\
      [\
            ["NUM#", "seed", "5497,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "-20,0"],\
            ["NUM#", "max", "20,0"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1715508790874",\
      "updated": "1715508794493",\
      "id": "noise3",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7543",\
      "y": "7031",\
      "z": "10",\
      "params":\
      [\
            ["NUM#", "seed", "6313,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "300,0"],\
            ["NUM#", "max", "600,0"],\
            ["NUM#", "scale", "43.300000000000004,1"],\
            ["NUM#", "offset", "0,1"],\
            ["NUM#", "evolve", "0,1"],\
            ["NUM#", "detail", "6,0"]\
      ]\
    },\
    {\
      "type": "CMB",\
      "created": "1715510747891",\
      "updated": "1715511295995",\
      "id": "combine12",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11386.7",\
      "y": "11151.8",\
      "z": "11",\
      "width": "120",\
      "height": "77"\
    },\
    {\
      "type": "CMB",\
      "created": "1715508772425",\
      "updated": "1715512200626",\
      "id": "combine6",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10404.4",\
      "y": "7356.06",\
      "z": "12",\
      "width": "134.4908121011906",\
      "height": "51"\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715508639296",\
      "updated": "1715508654365",\
      "id": "colorStop5",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11064",\
      "y": "9039",\
      "z": "13",\
      "params":\
      [\
            ["FILL#", "fill", "45,0 152,0 181,0 100,0 0,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715508171673",\
      "updated": "1715509178691",\
      "id": "random3",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7375",\
      "y": "8470",\
      "z": "14",\
      "params":\
      [\
            ["NUM#", "seed", "754,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "-73,0"],\
            ["NUM#", "max", "50,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715507646091",\
      "updated": "1715507671432",\
      "id": "colorStop2",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7964",\
      "y": "7965",\
      "z": "15",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 0,0 0,0 100,0 0,0"],\
            ["NUM#", "position", "50,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715509159834",\
      "updated": "1715509181165",\
      "id": "random6",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "6984",\
      "y": "9162",\
      "z": "16",\
      "params":\
      [\
            ["NUM#", "seed", "2796,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "max", "10000,0"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1715514328671",\
      "updated": "1715525398974",\
      "id": "noise5",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10246",\
      "y": "10419",\
      "z": "17",\
      "active": "true",\
      "params":\
      [\
            ["NUM#", "seed", "6969,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "-360,0"],\
            ["NUM#", "max", "0,0"],\
            ["NUM#", "scale", "2400,0"],\
            ["NUM#", "offset", "0,1"],\
            ["NUM#", "evolve", "0,1"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715508639296",\
      "updated": "1715508657389",\
      "id": "colorStop6",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11063",\
      "y": "9175",\
      "z": "18",\
      "params":\
      [\
            ["FILL#", "fill", "11,0 52,0 66,0 100,0 0,0"],\
            ["NUM#", "position", "50,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715511528806",\
      "updated": "1715511548920",\
      "id": "color9",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9910",\
      "y": "10273",\
      "z": "19",\
      "prevSpace": "hsb",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "270,0"],\
            ["NUM#", "c2", "99,0"],\
            ["NUM#", "c3", "100,0"]\
      ]\
    },\
    {\
      "type": "RANGE",\
      "created": "1715511481625",\
      "updated": "1715511497050",\
      "id": "range13",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10572",\
      "y": "10659",\
      "z": "20",\
      "params":\
      [\
            ["NUM#", "start", "3,0"],\
            ["NUM#", "end", "8,0"]\
      ]\
    },\
    {\
      "type": "RANGE",\
      "created": "1715511349977",\
      "updated": "1715511440019",\
      "id": "range11",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10758",\
      "y": "10764",\
      "z": "21",\
      "params":\
      [\
            ["NUM#", "start", "50,0"],\
            ["NUM#", "end", "-100,0"]\
      ]\
    },\
    {\
      "type": "NBIAS",\
      "created": "1715511884447",\
      "updated": "1715511895091",\
      "id": "bias2",\
      "name": "bias",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11383",\
      "y": "10898",\
      "z": "22",\
      "params":\
      [\
            ["NUM#", "min", "90,0"],\
            ["NUM#", "max", "-16,0"],\
            ["NUM#", "bias", "-100,0"]\
      ]\
    },\
    {\
      "type": "RANGE",\
      "created": "1715510729176",\
      "updated": "1715511270344",\
      "id": "range7",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10822",\
      "y": "11034",\
      "z": "23",\
      "params":\
      [\
            ["NUM#", "start", "-111,0"],\
            ["NUM#", "end", "-96,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1715508804576",\
      "updated": "1715508810702",\
      "id": "repeat3",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7917",\
      "y": "6878",\
      "z": "24",\
      "params":\
      [\
            ["NUM#", "count", "101,0"],\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1715510528420",\
      "updated": "1715510539813",\
      "id": "fill4",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11026",\
      "y": "10389",\
      "z": "25",\
      "params":\
      [\
            ["COL#", "color", "1,0 69,0 536,0 -31,0"],\
            ["NUM#", "opacity", "0,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1715510632143",\
      "updated": "1715510639212",\
      "id": "repeat5",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11612",\
      "y": "10592",\
      "z": "26",\
      "params":\
      [\
            ["NUM#", "count", "500,0"],\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715508594880",\
      "updated": "1715508650872",\
      "id": "color4",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10871",\
      "y": "9153",\
      "z": "27",\
      "prevSpace": "hsb",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "195.99999999999997,0"],\
            ["NUM#", "c2", "83,0"],\
            ["NUM#", "c3", "26,0"]\
      ]\
    },\
    {\
      "type": "NEG",\
      "created": "1715508385802",\
      "updated": "1715508403008",\
      "id": "neg",\
      "name": "negative",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8800",\
      "y": "8077",\
      "z": "28"\
    },\
    {\
      "type": "RANGE",\
      "created": "1715510729176",\
      "updated": "1715511295995",\
      "id": "range10",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10937",\
      "y": "10887",\
      "z": "29",\
      "params":\
      [\
            ["NUM#", "end", "2,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1715507778526",\
      "updated": "1715507804030",\
      "id": "repeat",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8410",\
      "y": "8230",\
      "z": "30",\
      "params":\
      [\
            ["NUM#", "count", "50,0"],\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "RANGE",\
      "created": "1715509565627",\
      "updated": "1715509579476",\
      "id": "range6",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7380",\
      "y": "8121",\
      "z": "31",\
      "params":\
      [\
            ["NUM#", "start", "6,0"],\
            ["NUM#", "end", "0,0"]\
      ]\
    },\
    {\
      "type": "PT",\
      "created": "1715508779142",\
      "updated": "1715508913606",\
      "id": "point2",\
      "name": "point",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7220",\
      "y": "6699",\
      "z": "32",\
      "params":\
      [\
            ["NUM#", "y", "650,0"]\
      ]\
    },\
    {\
      "type": "GRAD",\
      "created": "1715507684203",\
      "updated": "1715513189311",\
      "id": "grad",\
      "name": "gradient",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8129",\
      "y": "8020",\
      "z": "33",\
      "diagAspect": "false",\
      "params":\
      [\
            ["NUM#", "gradType", "1,0"],\
            ["NUM#", "x", "50,0"],\
            ["NUM#", "y", "83,0"],\
            ["NUM#", "size", "88,0"],\
            ["NUM#", "angle", "217,0"],\
            ["NUM#", "aspect", "24,0"]\
      ]\
    },\
    {\
      "type": "CMB",\
      "created": "1715508902772",\
      "updated": "1715508918558",\
      "id": "combine8",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8076.55",\
      "y": "6877.84",\
      "z": "34",\
      "width": "120",\
      "height": "64"\
    },\
    {\
      "type": "REPT",\
      "created": "1715510720874",\
      "updated": "1715510751668",\
      "id": "repeat6",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11783",\
      "y": "10927",\
      "z": "35",\
      "params":\
      [\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "CMB",\
      "created": "1715509268330",\
      "updated": "1715509579476",\
      "id": "combine11",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9153.96",\
      "y": "9035.54",\
      "z": "36",\
      "width": "120",\
      "height": "64"\
    },\
    {\
      "type": "NOISE",\
      "created": "1715508227405",\
      "updated": "1715509349958",\
      "id": "noise2",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8742",\
      "y": "8522",\
      "z": "37",\
      "params":\
      [\
            ["NUM#", "seed", "8362,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "50,0"],\
            ["NUM#", "max", "500,0"],\
            ["NUM#", "scale", "4,0"],\
            ["NUM#", "offset", "0,1"],\
            ["NUM#", "evolve", "0,1"],\
            ["NUM#", "detail", "5,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715511565872",\
      "updated": "1715511593961",\
      "id": "color10",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10250",\
      "y": "10214",\
      "z": "38",\
      "prevSpace": "hsb",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "109.42383146382626,0"],\
            ["NUM#", "c2", "105.82639714625446,0"],\
            ["NUM#", "c3", "210.25,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715507723368",\
      "updated": "1715525398974",\
      "id": "color2",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8414",\
      "y": "8019",\
      "z": "39",\
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
      "created": "1715510636728",\
      "updated": "1715511650768",\
      "id": "combine10",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11425.9",\
      "y": "10681.4",\
      "z": "40",\
      "width": "120",\
      "height": "103"\
    },\
    {\
      "type": "CMB",\
      "created": "1715508252955",\
      "updated": "1715509349958",\
      "id": "combine3",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8974.96",\
      "y": "8381.54",\
      "z": "41",\
      "width": "120",\
      "height": "38"\
    },\
    {\
      "type": "COL",\
      "created": "1715511565872",\
      "updated": "1715511821941",\
      "id": "color11",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10595",\
      "y": "10235",\
      "z": "42",\
      "prevSpace": "hsb",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "109.42383146382626,0"],\
            ["NUM#", "c2", "105.82639714625446,0"],\
            ["NUM#", "c3", "210.25,0"]\
      ]\
    },\
    {\
      "type": "RECT",\
      "created": "1715507613721",\
      "updated": "1715508398109",\
      "id": "rect",\
      "name": "rectangle",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8950",\
      "y": "7984",\
      "z": "43",\
      "params":\
      [\
            ["NUM#", "width", "140,0"],\
            ["NUM#", "height", "-290.67643697856033,0"]\
      ]\
    },\
    {\
      "type": "CACHE",\
      "created": "1715509449791",\
      "updated": "1715509449794",\
      "id": "cache",\
      "name": "cache",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9069",\
      "y": "8583",\
      "z": "44"\
    },\
    {\
      "type": "RANGE",\
      "created": "1715507795970",\
      "updated": "1715508132131",\
      "id": "range2",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7532",\
      "y": "8228",\
      "z": "45",\
      "params":\
      [\
            ["NUM#", "end", "83,0"]\
      ]\
    },\
    {\
      "type": "CLERP",\
      "created": "1715511545973",\
      "updated": "1715511821941",\
      "id": "inter",\
      "name": "interpolate",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10093",\
      "y": "10211",\
      "z": "46",\
      "params":\
      [\
            ["NUM#", "amount", "-50,0"],\
            ["NUM#", "gamma", "0.5,1"]\
      ]\
    },\
    {\
      "type": "PT",\
      "created": "1715508779142",\
      "updated": "1715508909076",\
      "id": "point3",\
      "name": "point",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7217",\
      "y": "6827",\
      "z": "47",\
      "params":\
      [\
            ["NUM#", "x", "2000,0"],\
            ["NUM#", "y", "650,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715508935088",\
      "updated": "1715509621294",\
      "id": "color6",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8077",\
      "y": "7053",\
      "z": "48",\
      "prevSpace": "hsb",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "229.99999999999997,0"],\
            ["NUM#", "c2", "55.00000000000001,0"],\
            ["NUM#", "c3", "15,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1715508218276",\
      "updated": "1715508979410",\
      "id": "repeat2",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9392",\
      "y": "8300",\
      "z": "49",\
      "params":\
      [\
            ["NUM#", "count", "40,0"],\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "RANGE",\
      "created": "1715510729176",\
      "updated": "1715511269111",\
      "id": "range8",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10825",\
      "y": "11185",\
      "z": "50",\
      "params":\
      [\
            ["NUM#", "start", "139,0"],\
            ["NUM#", "end", "238,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715510514499",\
      "updated": "1715511821941",\
      "id": "color7",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10862",\
      "y": "10300",\
      "z": "51",\
      "prevSpace": "hsl",\
      "params":\
      [\
            ["NUM#", "space", "3,0"],\
            ["NUM#", "c1", "109.42382964009573,0"],\
            ["NUM#", "c2", "11124.99999999999,0"],\
            ["NUM#", "c3", "99,0"]\
      ]\
    },\
    {\
      "type": "CMB",\
      "created": "1715508801082",\
      "updated": "1715508810702",\
      "id": "combine7",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7702.55",\
      "y": "6968.84",\
      "z": "52",\
      "width": "120",\
      "height": "51"\
    },\
    {\
      "type": "RANGE",\
      "created": "1715507795970",\
      "updated": "1715507846594",\
      "id": "range3",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7809",\
      "y": "8612",\
      "z": "53",\
      "params":\
      [\
            ["NUM#", "start", "18,0"],\
            ["NUM#", "end", "24,0"]\
      ]\
    },\
    {\
      "type": "RANGE",\
      "created": "1715511609371",\
      "updated": "1715511618039",\
      "id": "range14",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9904",\
      "y": "10514",\
      "z": "54",\
      "params":\
      [\
            ["NUM#", "start", "150,0"],\
            ["NUM#", "end", "-50,0"]\
      ]\
    },\
    {\
      "type": "RANGE",\
      "created": "1715511349977",\
      "updated": "1715511441396",\
      "id": "range12",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10766",\
      "y": "10885",\
      "z": "55",\
      "params":\
      [\
            ["NUM#", "start", "50,0"],\
            ["NUM#", "end", "200,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715508171673",\
      "updated": "1715509181165",\
      "id": "random4",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7369",\
      "y": "8688",\
      "z": "56",\
      "params":\
      [\
            ["NUM#", "seed", "6199,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "-82,0"],\
            ["NUM#", "max", "50,0"]\
      ]\
    },\
    {\
      "type": "RAND",\
      "created": "1715507871115",\
      "updated": "1715513189311",\
      "id": "random",\
      "name": "random",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7814",\
      "y": "8754",\
      "z": "57",\
      "params":\
      [\
            ["NUM#", "seed", "2514,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "-45,0"],\
            ["NUM#", "max", "225,0"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1715510592847",\
      "updated": "1715511420256",\
      "id": "noise4",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "4",\
      "notCondition": "false",\
      "x": "11138",\
      "y": "10617",\
      "z": "58",\
      "params":\
      [\
            ["NUM#", "seed", "1608,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "-100,0"],\
            ["NUM#", "max", "200,0"],\
            ["NUM#", "scale", "600,0"],\
            ["NUM#", "offset", "0,1"],\
            ["NUM#", "evolve", "2,0"],\
            ["NUM#", "detail", "5,0"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1715508227405",\
      "updated": "1715509344110",\
      "id": "noise",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8743",\
      "y": "8261",\
      "z": "59",\
      "params":\
      [\
            ["NUM#", "seed", "9959,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "-200,0"],\
            ["NUM#", "max", "2000,0"],\
            ["NUM#", "scale", "20,0"],\
            ["NUM#", "offset", "0,1"],\
            ["NUM#", "evolve", "0,1"],\
            ["NUM#", "detail", "4,0"]\
      ]\
    },\
    {\
      "type": "COL",\
      "created": "1715508594880",\
      "updated": "1715508652817",\
      "id": "color5",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10877",\
      "y": "9313",\
      "z": "60",\
      "prevSpace": "hsb",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "238,0"],\
            ["NUM#", "c2", "84,0"],\
            ["NUM#", "c3", "16,0"]\
      ]\
    },\
    {\
      "type": "MOVE",\
      "created": "1715508240067",\
      "updated": "1715509422807",\
      "id": "move",\
      "name": "move",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9117",\
      "y": "7991",\
      "z": "61",\
      "params":\
      [\
            ["NUM#", "x", "253.80902328286425,0"],\
            ["NUM#", "y", "700,0"]\
      ]\
    },\
    {\
      "type": "MATH",\
      "created": "1715507964762",\
      "updated": "1715508132131",\
      "id": "math",\
      "name": "math",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7763",\
      "y": "8426",\
      "z": "62"\
    },\
    {\
      "type": "FRM",\
      "created": "1715508485966",\
      "updated": "1715525398974",\
      "id": "frame",\
      "name": "frame",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "12359",\
      "y": "8611",\
      "z": "63",\
      "active": "true",\
      "params":\
      [\
            ["NUM#", "position", "1,0"],\
            ["NUM#", "y", "-1229,0"],\
            ["NUM#", "width", "2000,0"],\
            ["NUM#", "height", "1875,0"]\
      ]\
    },\
    {\
      "type": "FILL",\
      "created": "1715507635637",\
      "updated": "1715507671432",\
      "id": "fill",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7800",\
      "y": "7939",\
      "z": "64",\
      "params":\
      [\
            ["COL#", "color", "1,0 0,0 0,0 0,0"]\
      ]\
    },\
    {\
      "type": "CMB",\
      "created": "1715507801542",\
      "updated": "1715513053259",\
      "id": "combine2",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8112.96",\
      "y": "8422.54",\
      "z": "65",\
      "width": "120",\
      "height": "77"\
    },\
    {\
      "type": "RANGE",\
      "created": "1715509416226",\
      "updated": "1715509432184",\
      "id": "range5",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8909",\
      "y": "8583",\
      "z": "66",\
      "params":\
      [\
            ["NUM#", "start", "700,0"],\
            ["NUM#", "end", "0,0"]\
      ]\
    },\
    {\
      "type": "GRAD",\
      "created": "1715510508782",\
      "updated": "1715511895091",\
      "id": "grad3",\
      "name": "gradient",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11441",\
      "y": "10285",\
      "z": "67",\
      "diagAspect": "false",\
      "params":\
      [\
            ["NUM#", "gradType", "1,0"],\
            ["NUM#", "x", "-73.73589477290469,0"],\
            ["NUM#", "y", "-16,0"],\
            ["NUM#", "size", "1.3,1"],\
            ["NUM#", "angle", "139.2503989028981,0"],\
            ["NUM#", "aspect", "1091,0"],\
            ["NUM#", "blend", "7,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715507646091",\
      "updated": "1715507678095",\
      "id": "colorStop4",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7969",\
      "y": "8175",\
      "z": "68",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 0,0 0,0 0,0 0,0"],\
            ["NUM#", "position", "100,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715507646091",\
      "updated": "1715507670143",\
      "id": "colorStop",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7963",\
      "y": "7861",\
      "z": "69",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 0,0 0,0 100,0 0,0"]\
      ]\
    },\
    {\
      "type": "CMB",\
      "created": "1715508572505",\
      "updated": "1715510511881",\
      "id": "combine5",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11737.1",\
      "y": "10001.8",\
      "z": "70",\
      "width": "120",\
      "height": "51"\
    },\
    {\
      "type": "COL",\
      "created": "1715511528806",\
      "updated": "1715511547816",\
      "id": "color8",\
      "name": "color",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9913",\
      "y": "10111",\
      "z": "71",\
      "prevSpace": "hsb",\
      "params":\
      [\
            ["NUM#", "space", "2,0"],\
            ["NUM#", "c1", "100,0"],\
            ["NUM#", "c2", "99,0"],\
            ["NUM#", "c3", "100,0"]\
      ]\
    },\
    {\
      "type": "GRAD",\
      "created": "1715508564814",\
      "updated": "1715508663149",\
      "id": "grad2",\
      "name": "gradient",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11260",\
      "y": "9089",\
      "z": "72",\
      "diagAspect": "false",\
      "params":\
      [\
            ["NUM#", "gradType", "1,0"],\
            ["NUM#", "x", "35,0"],\
            ["NUM#", "y", "120,0"]\
      ]\
    },\
    {\
      "type": "REPT",\
      "created": "1715509138172",\
      "updated": "1715512200626",\
      "id": "repeat4",\
      "name": "repeat",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "9908",\
      "y": "8937",\
      "z": "73",\
      "params":\
      [\
            ["NUM#", "iteration", "?,0"]\
      ]\
    },\
    {\
      "type": "CSTOP",\
      "created": "1715507646091",\
      "updated": "1715507675119",\
      "id": "colorStop3",\
      "name": "color%20stop",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7969",\
      "y": "8078",\
      "z": "74",\
      "params":\
      [\
            ["FILL#", "fill", "0,0 0,0 0,0 0,0 0,0"],\
            ["NUM#", "position", "51,0"]\
      ]\
    },\
    {\
      "type": "NBIAS",\
      "created": "1715508119659",\
      "updated": "1715508183240",\
      "id": "bias",\
      "name": "bias",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7692",\
      "y": "8265",\
      "z": "75",\
      "params":\
      [\
            ["NUM#", "max", "83,0"],\
            ["NUM#", "bias", "-13,0"],\
            ["NUM#", "spread", "-27,0"]\
      ]\
    },\
    {\
      "type": "NOISE",\
      "created": "1715510592847",\
      "updated": "1715511441396",\
      "id": "noise6",\
      "name": "noise",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "10951",\
      "y": "10592",\
      "z": "76",\
      "params":\
      [\
            ["NUM#", "seed", "369,0"],\
            ["NUM#", "iteration", "?,?"],\
            ["NUM#", "min", "-360,0"],\
            ["NUM#", "max", "360,0"],\
            ["NUM#", "scale", "10,0"],\
            ["NUM#", "offset", "0,1"],\
            ["NUM#", "evolve", "0,1"]\
      ]\
    },\
    {\
      "type": "CMB",\
      "created": "1715508261421",\
      "updated": "1715508278476",\
      "id": "combine4",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7437.25",\
      "y": "8941.84",\
      "z": "77",\
      "width": "125.43405453794648",\
      "height": "51"\
    },\
    {\
      "type": "RANGE",\
      "created": "1715507795970",\
      "updated": "1715507806996",\
      "id": "range",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7939",\
      "y": "8425",\
      "z": "78",\
      "params":\
      [\
            ["NUM#", "start", "5,0"],\
            ["NUM#", "end", "83,0"]\
      ]\
    },\
    {\
      "type": "CMB",\
      "created": "1715509184167",\
      "updated": "1715509275599",\
      "id": "combine9",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7476.96",\
      "y": "9040.54",\
      "z": "79",\
      "width": "120",\
      "height": "51"\
    },\
    {\
      "type": "FILL",\
      "created": "1715510528420",\
      "updated": "1715511492378",\
      "id": "fill3",\
      "name": "fill",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "11027",\
      "y": "10261",\
      "z": "80",\
      "params":\
      [\
            ["COL#", "color", "1,0 69,0 536,0 -31,0"],\
            ["NUM#", "opacity", "8,0"]\
      ]\
    },\
    {\
      "type": "CMB",\
      "created": "1715507730332",\
      "updated": "1715508339731",\
      "id": "combine",\
      "name": "combine",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "8573.96",\
      "y": "8108.54",\
      "z": "81",\
      "width": "98.03603603603602",\
      "height": "38"\
    },\
    {\
      "type": "RANGE",\
      "created": "1715508785041",\
      "updated": "1715508896529",\
      "id": "range4",\
      "name": "range",\
      "renamed": "false",\
      "enabled": "true",\
      "highlight": "0",\
      "notCondition": "false",\
      "x": "7543",\
      "y": "6906",\
      "z": "82",\
      "params":\
      [\
            ["NUM#", "end", "2000,0"]\
      ]\
    }\
  ],\
  "connections":\
  [\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "fill2",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color10",\
      "outputId": "c1",\
      "outputOrder": "0",\
      "inputNodeId": "math2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color6",\
      "outputId": "c1",\
      "outputOrder": "0",\
      "inputNodeId": "color",\
      "inputId": "c1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "color",\
      "inputId": "c3",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "point",\
      "inputId": "x",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "noise3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "point",\
      "inputId": "y",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop7",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine8",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "path",\
      "inputId": "points",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "path",\
      "inputId": "props",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range7",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine12",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range8",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine12",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "noise6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine12",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range10",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine12",\
      "inputId": "h3",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "path",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine6",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "repeat4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine6",\
      "inputId": "h1",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop5",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "random5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "random3",\
      "inputId": "seed",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "fill",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop2",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop6",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range9",\
      "outputId": "h0",\
      "outputOrder": "4",\
      "inputNodeId": "bias2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range9",\
      "outputId": "start",\
      "outputOrder": "0",\
      "inputNodeId": "bias2",\
      "inputId": "min",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range9",\
      "outputId": "end",\
      "outputOrder": "0",\
      "inputNodeId": "bias2",\
      "inputId": "max",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "point",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat3",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine7",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat3",\
      "inputId": "loop",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color7",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "fill4",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "grad3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat5",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine10",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat5",\
      "inputId": "loop",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "noise2",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "neg",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "grad",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat",\
      "inputId": "loop",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "colorStop",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "colorStop2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "colorStop3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "colorStop4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "h3",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "grad",\
      "inputId": "y",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "math",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "size",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "random",\
      "outputId": "h0",\
      "outputOrder": "3",\
      "inputNodeId": "grad",\
      "inputId": "angle",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad",\
      "inputId": "aspect",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "repeat3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine8",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "point3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine8",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "point2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine8",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "repeat5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat6",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine12",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat6",\
      "inputId": "loop",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine9",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine11",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "cache",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine11",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range6",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine11",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "inter",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "color10",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "noise4",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine10",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range9",\
      "outputId": "h0",\
      "outputOrder": "3",\
      "inputNodeId": "combine10",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range11",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine10",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range12",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine10",\
      "inputId": "h3",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range13",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine10",\
      "inputId": "h4",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range14",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine10",\
      "inputId": "h5",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine3",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color10",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "color11",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "math2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "color11",\
      "inputId": "c1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "neg",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "rect",\
      "inputId": "height",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "rect",\
      "inputId": "props",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "cache",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color8",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "inter",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color9",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "inter",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range14",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "inter",\
      "inputId": "amount",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "point2",\
      "outputId": "y",\
      "outputOrder": "0",\
      "inputNodeId": "point3",\
      "inputId": "y",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "move",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat2",\
      "inputId": "loop",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color11",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "color7",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range4",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine7",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "noise3",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine7",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "random6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "random4",\
      "inputId": "seed",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range11",\
      "outputId": "h0",\
      "outputOrder": "2",\
      "inputNodeId": "noise4",\
      "inputId": "min",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range12",\
      "outputId": "h0",\
      "outputOrder": "2",\
      "inputNodeId": "noise4",\
      "inputId": "max",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range10",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "noise4",\
      "inputId": "evolve",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "rect",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "move",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "noise",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "move",\
      "inputId": "x",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "cache",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "move",\
      "inputId": "y",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "bias",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "random2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "math",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "frame",\
      "inputId": "children",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "frame",\
      "inputId": "props",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "fill",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range2",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine2",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range3",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine2",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "random",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine2",\
      "inputId": "h3",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "fill3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad3",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "fill4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad3",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "noise4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad3",\
      "inputId": "x",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "bias2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad3",\
      "inputId": "y",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "noise6",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "grad3",\
      "inputId": "angle",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "fill2",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "colorStop4",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "fill",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "grad2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine5",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "repeat6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "combine5",\
      "inputId": "h1",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "colorStop5",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad2",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "colorStop6",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad2",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "colorStop7",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "grad2",\
      "inputId": "h2",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "repeat2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat4",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "combine11",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "repeat4",\
      "inputId": "loop",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "fill2",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "colorStop3",\
      "inputId": "fill",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range2",\
      "outputId": "h0",\
      "outputOrder": "3",\
      "inputNodeId": "bias",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range2",\
      "outputId": "start",\
      "outputOrder": "1",\
      "inputNodeId": "bias",\
      "inputId": "min",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range2",\
      "outputId": "end",\
      "outputOrder": "0",\
      "inputNodeId": "bias",\
      "inputId": "max",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "random3",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "bias",\
      "inputId": "bias",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "random4",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "bias",\
      "inputId": "spread",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "random3",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine4",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "random4",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine4",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "random5",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine9",\
      "inputId": "h0",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "random6",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine9",\
      "inputId": "h1",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "color7",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "fill3",\
      "inputId": "color",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "range13",\
      "outputId": "h0",\
      "outputOrder": "0",\
      "inputNodeId": "fill3",\
      "inputId": "opacity",\
      "list": "false"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "repeat",\
      "outputId": "h0",\
      "outputOrder": "1",\
      "inputNodeId": "combine",\
      "inputId": "h0",\
      "list": "true"\
    },\
    {\
      "created": "1715525398964",\
      "outputNodeId": "point3",\
      "outputId": "x",\
      "outputOrder": "0",\
      "inputNodeId": "range4",\
      "inputId": "end",\
      "list": "false"\
    }\
  ]\
}';