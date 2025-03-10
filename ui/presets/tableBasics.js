const presetTableBasics = '\
    {\
        "nodes":\
        [\
            {\
            "type": "TCSV",\
            "id": "csv",\
            "name": "csv",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4255",\
            "y": "532",\
            "z": "0"\
            },\
            {\
            "type": "ITEMS",\
            "id": "list5",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5302",\
            "y": "1438",\
            "z": "1",\
            "active": "true",\
            "width": "265.82478708845963",\
            "height": "340",\
            "params":\
            [\
                    ["TEXT#", "0", "Jaideva%20Goswami", "left"],\
                    ["TEXT#", "1", "John%20Foreman", "left"],\
                    ["TEXT#", "2", "Stephen%20Hawking", "left"],\
                    ["TEXT#", "3", "Stephen%20Dubner", "left"],\
                    ["TEXT#", "4", "Edward%20Said", "left"],\
                    ["TEXT#", "5", "Vladimir%20Vapnik", "left"],\
                    ["TEXT#", "6", "V%20P%20Menon", "left"],\
                    ["TEXT#", "7", "Leonard%20Mlodinow", "left"],\
                    ["TEXT#", "8", "Frank%20Shih", "left"],\
                    ["TEXT#", "9", "Maria%20Konnikova", "left"],\
                    ["TEXT#", "10", "Sebastian%20Gutierrez", "left"],\
                    ["TEXT#", "11", "Kurt%20Vonnegut", "left"],\
                    ["TEXT#", "12", "Cedric%20Villani", "left"],\
                    ["TEXT#", "13", "Gerald%20Sussman", "left"]\
            ]\
            },\
            {\
            "type": "TREPL",\
            "id": "replace",\
            "name": "replace",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3850.64",\
            "y": "531",\
            "z": "2",\
            "width": "239.31498377267474",\
            "height": "98",\
            "params":\
            [\
                    ["TEXT#", "what", "%22(%5B%5E%22%5D*)%2C%20(%5B%5E%22%5D*)%22", "center"],\
                    ["TEXT#", "with", "%242%20%241", "center"],\
                    ["NUM#", "regex", "1,0"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text3",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3047.64",\
            "y": "530",\
            "z": "3",\
            "width": "599",\
            "height": "240.14634457403963",\
            "params":\
            [\
                    ["TEXT#", "value", "Title%2CAuthor%2CGenre%2CHeight%2CPublisher%0AFundamentals%20of%20Wavelets%2C%22Goswami%2C%20Jaideva%22%2Csignal_processing%2C228%2CWiley%0AData%20Smart%2C%22Foreman%2C%20John%22%2Cdata_science%2C235%2CWiley%0AGod%20Created%20the%20Integers%2C%22Hawking%2C%20Stephen%22%2Cmathematics%2C197%2CPenguin%0ASuperfreakonomics%2C%22Dubner%2C%20Stephen%22%2Ceconomics%2C179%2CHarperCollins%0AOrientalism%2C%22Said%2C%20Edward%22%2Chistory%2C197%2CPenguin%0A%22Nature%20of%20Statistical%20Learning%20Theory%2C%20The%22%2C%22Vapnik%2C%20Vladimir%22%2Cdata_science%2C230%2CSpringer%0AIntegration%20of%20the%20Indian%20States%2C%22Menon%2C%20V%20P%22%2Chistory%2C217%2COrient%20Blackswan%0A%22Drunkard\'s%20Walk%2C%20The%22%2C%22Mlodinow%2C%20Leonard%22%2Cscience%2C197%2CPenguin%0AImage%20Processing%20%26%20Mathematical%20Morphology%2C%22Shih%2C%20Frank%22%2Csignal_processing%2C241%2CCRC%0AHow%20to%20Think%20Like%20Sherlock%20Holmes%2C%22Konnikova%2C%20Maria%22%2Cpsychology%2C240%2CPenguin%0AData%20Scientists%20at%20Work%2CSebastian%20Gutierrez%2Cdata_science%2C230%2CApress%0ASlaughterhouse%20Five%2C%22Vonnegut%2C%20Kurt%22%2Cfiction%2C198%2CRandom%20House%0ABirth%20of%20a%20Theorem%2C%22Villani%2C%20Cedric%22%2Cmathematics%2C234%2CBodley%20Head%0AStructure%20%26%20Interpretation%20of%20Computer%20Programs%2C%22Sussman%2C%20Gerald%22%2Ccomputer_science%2C240%2CMIT%20Press", "left"]\
            ]\
            },\
            {\
            "type": "ITEMS",\
            "id": "list",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5115.36",\
            "y": "-130",\
            "z": "4",\
            "active": "true",\
            "width": "120",\
            "height": "340",\
            "params":\
            [\
                    ["LIST#", "0", "5 TEXT# Fundamentals%20of%20Wavelets TEXT# Jaideva%20Goswami TEXT# signal_processing TEXT# 228 TEXT# Wiley"],\
                    ["LIST#", "1", "5 TEXT# Data%20Smart TEXT# John%20Foreman TEXT# data_science TEXT# 235 TEXT# Wiley"],\
                    ["LIST#", "2", "5 TEXT# God%20Created%20the%20Integers TEXT# Stephen%20Hawking TEXT# mathematics TEXT# 197 TEXT# Penguin"],\
                    ["LIST#", "3", "5 TEXT# Superfreakonomics TEXT# Stephen%20Dubner TEXT# economics TEXT# 179 TEXT# HarperCollins"],\
                    ["LIST#", "4", "5 TEXT# Orientalism TEXT# Edward%20Said TEXT# history TEXT# 197 TEXT# Penguin"],\
                    ["LIST#", "5", "5 TEXT# The%20Nature%20of%20Statistical%20Learning%20Theory TEXT# Vladimir%20Vapnik TEXT# data_science TEXT# 230 TEXT# Springer"],\
                    ["LIST#", "6", "5 TEXT# Integration%20of%20the%20Indian%20States TEXT# V%20P%20Menon TEXT# history TEXT# 217 TEXT# Orient%20Blackswan"],\
                    ["LIST#", "7", "5 TEXT# The%20Drunkard\'s%20Walk TEXT# Leonard%20Mlodinow TEXT# science TEXT# 197 TEXT# Penguin"],\
                    ["LIST#", "8", "5 TEXT# Image%20Processing%20%26%20Mathematical%20Morphology TEXT# Frank%20Shih TEXT# signal_processing TEXT# 241 TEXT# CRC"],\
                    ["LIST#", "9", "5 TEXT# How%20to%20Think%20Like%20Sherlock%20Holmes TEXT# Maria%20Konnikova TEXT# psychology TEXT# 240 TEXT# Penguin"],\
                    ["LIST#", "10", "5 TEXT# Data%20Scientists%20at%20Work TEXT# Sebastian%20Gutierrez TEXT# data_science TEXT# 230 TEXT# Apress"],\
                    ["LIST#", "11", "5 TEXT# Slaughterhouse%20Five TEXT# Kurt%20Vonnegut TEXT# fiction TEXT# 198 TEXT# Random%20House"],\
                    ["LIST#", "12", "5 TEXT# Birth%20of%20a%20Theorem TEXT# Cedric%20Villani TEXT# mathematics TEXT# 234 TEXT# Bodley%20Head"],\
                    ["LIST#", "13", "5 TEXT# Structure%20%26%20Interpretation%20of%20Computer%20Programs TEXT# Gerald%20Sussman TEXT# computer_science TEXT# 240 TEXT# MIT%20Press"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Use%20RegEx%20to%20replace%20all%20%3Cb%3E%22Title%2C%20The%22%3C%2Fb%3E",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3710.64",\
            "y": "356",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "ITEMS",\
            "id": "list4",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5255",\
            "y": "1044",\
            "z": "6",\
            "active": "true",\
            "width": "460.14846849111586",\
            "height": "340",\
            "params":\
            [\
                    ["TEXT#", "0", "Fundamentals%20of%20Wavelets", "left"],\
                    ["TEXT#", "1", "Data%20Smart", "left"],\
                    ["TEXT#", "2", "God%20Created%20the%20Integers", "left"],\
                    ["TEXT#", "3", "Superfreakonomics", "left"],\
                    ["TEXT#", "4", "Orientalism", "left"],\
                    ["TEXT#", "5", "The%20Nature%20of%20Statistical%20Learning%20Theory", "left"],\
                    ["TEXT#", "6", "Integration%20of%20the%20Indian%20States", "left"],\
                    ["TEXT#", "7", "The%20Drunkard\'s%20Walk", "left"],\
                    ["TEXT#", "8", "Image%20Processing%20%26%20Mathematical%20Morphology", "left"],\
                    ["TEXT#", "9", "How%20to%20Think%20Like%20Sherlock%20Holmes", "left"],\
                    ["TEXT#", "10", "Data%20Scientists%20at%20Work", "left"],\
                    ["TEXT#", "11", "Slaughterhouse%20Five", "left"],\
                    ["TEXT#", "12", "Birth%20of%20a%20Theorem", "left"],\
                    ["TEXT#", "13", "Structure%20%26%20Interpretation%20of%20Computer%20Programs", "left"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment8",\
            "name": "Use%20a%20Select%20node%20to%20access%20a%20specific%20row.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5547.36",\
            "y": "550",\
            "z": "7",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment10",\
            "name": "The%20Column%20node%20selects",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5781",\
            "y": "1244",\
            "z": "8",\
            "active": "true"\
            },\
            {\
            "type": "ITEMS",\
            "id": "list2",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5264.36",\
            "y": "441",\
            "z": "9",\
            "active": "true",\
            "width": "240.731602604638",\
            "height": "142",\
            "params":\
            [\
                    ["TEXT#", "0", "Fundamentals%20of%20Wavelets", "left"],\
                    ["TEXT#", "1", "Jaideva%20Goswami", "left"],\
                    ["TEXT#", "2", "signal_processing", "left"],\
                    ["TEXT#", "3", "228", "left"],\
                    ["TEXT#", "4", "Wiley", "left"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select2",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5114.36",\
            "y": "607",\
            "z": "10",\
            "params":\
            [\
                    ["NUM#", "index", "1,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "A%20table%20in%20Generator%20is%20a%20list%20of%20rows%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5275.36",\
            "y": "7",\
            "z": "11",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "with%20%3Cb%3EThe%20Title%3C%2Fb%3E%2C%20so%20that%20the%20extra%20commas",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3707.64",\
            "y": "400",\
            "z": "12",\
            "active": "true"\
            },\
            {\
            "type": "ITEMS",\
            "id": "list3",\
            "name": "list",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5264.36",\
            "y": "607",\
            "z": "13",\
            "active": "true",\
            "width": "240.731602604638",\
            "height": "142",\
            "params":\
            [\
                    ["TEXT#", "0", "Data%20Smart", "left"],\
                    ["TEXT#", "1", "John%20Foreman", "left"],\
                    ["TEXT#", "2", "data_science", "left"],\
                    ["TEXT#", "3", "235", "left"],\
                    ["TEXT#", "4", "Wiley", "left"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5114.36",\
            "y": "441",\
            "z": "14",\
            "params":\
            [\
                    ["NUM#", "index", "0,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "don\'t%20confuse%20the%20CSV%20parser",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3710.64",\
            "y": "440",\
            "z": "15",\
            "active": "true"\
            },\
            {\
            "type": "CLMN",\
            "id": "column",\
            "name": "column",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5105",\
            "y": "1044",\
            "z": "16"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment7",\
            "name": "and%20each%20row%20is%20a%20list%20of%20values.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5273.36",\
            "y": "44",\
            "z": "17",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment9",\
            "name": "Use%20a%20List%20node%20to%20see%20the%20contents%20of%20a%20list.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5547.36",\
            "y": "592",\
            "z": "18",\
            "active": "true"\
            },\
            {\
            "type": "CLMN",\
            "id": "column2",\
            "name": "column",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5103",\
            "y": "1438",\
            "z": "19",\
            "params":\
            [\
                    ["NUM#", "index", "1,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment11",\
            "name": "Selecting%20a%20column%20from%20a%20list",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5779",\
            "y": "1325",\
            "z": "20",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment12",\
            "name": "a%20column%20from%20a%20table.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5781",\
            "y": "1284",\
            "z": "21",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment13",\
            "name": "will%20just%20select%20the%20entire%20list.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5778",\
            "y": "1368",\
            "z": "22",\
            "active": "true"\
            },\
            {\
            "type": "SUBLST",\
            "id": "sublist",\
            "name": "sublist",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4608",\
            "y": "560",\
            "z": "23",\
            "_connected": "false",\
            "params":\
            [\
                    ["NUM#", "start", "1,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "Use%20a%20Sublist%20node%20to%20remove",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4494",\
            "y": "408",\
            "z": "24",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment14",\
            "name": "the%20first%20row%20of%20column%20titles.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4495",\
            "y": "451",\
            "z": "25",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment15",\
            "name": "Setting%20%3Cb%3Eend%3C%2Fb%3E%20to%20%3Cb%3E%3F%3C%2Fb%3E%20means%20",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4521",\
            "y": "703",\
            "z": "26",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment16",\
            "name": "%22until%20the%20end%20of%20the%20list%22%2C",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4504",\
            "y": "752",\
            "z": "27",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment17",\
            "name": "kind%20of%20like%20in%20JavaScript.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4515",\
            "y": "799",\
            "z": "28",\
            "active": "true"\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "rows",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5064",\
            "y": "364",\
            "z": "29",\
            "active": "true",\
            "width": "1106.2307721110105",\
            "height": "448.152098098478",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel2",\
            "name": "columns",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5059.97",\
            "y": "962",\
            "z": "30",\
            "active": "true",\
            "width": "1178.0253496830796",\
            "height": "861",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "Dataset%20taken%20from",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3048",\
            "y": "862",\
            "z": "31",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment18",\
            "name": "%3Ca%20href%3D%22https%3A%2F%2Fgist.github.com%2Fjaidevd%2F23aef12e9bf56c618c41%22%3Ehttps%3A%2F%2Fgist.github.com%2Fjaidevd%2F23aef12e9bf56c618c41%3C%2Fa%3E",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3048",\
            "y": "908",\
            "z": "32",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "replace",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "csv",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "column2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list5",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "text3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "replace",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sublist",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "column",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list4",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sublist",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "select2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "select2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "list3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sublist",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sublist",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "column",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sublist",\
            "outputId": "h0",\
            "outputOrder": "4",\
            "inputNodeId": "column2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "csv",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "sublist",\
            "inputId": "h0",\
            "list": "true"\
            }\
        ]\
    }';
