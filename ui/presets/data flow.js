const presetIfElse = '\
    {\
        "nodes":\
        [\
            {\
            "type": "STAR",\
            "id": "star",\
            "name": "star",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2674",\
            "y": "3997",\
            "z": "0",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2482",\
            "y": "3924",\
            "z": "1",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "50.00000000000002,0"],\
                    ["NUM#", "c2", "100,0"],\
                    ["NUM#", "c3", "80,0"]\
            ]\
            },\
            {\
            "type": "IF",\
            "id": "ifElse",\
            "name": "if%2Felse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "2",\
            "x": "2874",\
            "y": "3953",\
            "z": "2",\
            "active": "true"\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "2674",\
            "y": "3757",\
            "z": "3",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Change%20the%20condition%20of%20if%2Felse%20to%20see%20how%20that%20affects",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3086",\
            "y": "3979",\
            "z": "4",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "the%20output.%20Try%20disconnecting%20one%20of%20the%20red%20wires%20%E2%80%94",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3089",\
            "y": "4025",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "with%20only%20one%20input%20it%20works%20as%20pass-or-not.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3085",\
            "y": "4070",\
            "z": "6",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "%E2%9F%B5",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3023",\
            "y": "3979",\
            "z": "7",\
            "active": "true"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "star",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "ellipse",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "star",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ifElse",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "ellipse",\
            "inputId": "props",\
            "list": "false"\
            }\
        ]\
    }';

    
    
const presetSelect = '\
    {\
        "nodes":\
        [\
            {\
            "type": "TRPZ",\
            "id": "trapeze",\
            "name": "trapeze",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1601",\
            "y": "3082",\
            "z": "0",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "ELPS",\
            "id": "ellipse",\
            "name": "ellipse",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1600",\
            "y": "2850",\
            "z": "1",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1332",\
            "y": "3140",\
            "z": "2",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "88,0"],\
                    ["NUM#", "c2", "85,0"],\
                    ["NUM#", "c3", "66,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1602",\
            "y": "2665",\
            "z": "3",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "POLY",\
            "id": "poly",\
            "name": "polygon",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1601",\
            "y": "3298",\
            "z": "4",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Change%20the%20select%20index%20to%20decide",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1863",\
            "y": "3293",\
            "z": "5",\
            "active": "true"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "which%20object%20goes%20through.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1864",\
            "y": "3339",\
            "z": "6",\
            "active": "true"\
            },\
            {\
            "type": "STAR",\
            "id": "star",\
            "name": "star",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1601",\
            "y": "3522",\
            "z": "7",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "2073",\
            "y": "3181",\
            "z": "8",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "index", "0,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "1862",\
            "y": "3152",\
            "z": "9",\
            "width": "120",\
            "height": "90"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "2",\
            "inputNodeId": "trapeze",\
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
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "3",\
            "inputNodeId": "poly",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "4",\
            "inputNodeId": "star",\
            "inputId": "props",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "rect",\
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
            "outputNodeId": "trapeze",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h2",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "poly",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h3",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "star",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h4",\
            "list": "false"\
            }\
        ]\
    }';


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
            "type": "LIST",\
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
                    ["NUM#", "regex", "1,0"],\
                    ["TEXT#", "value", "Title%2CAuthor%2CGenre%2CHeight%2CPublisher%0AFundamentals%20of%20Wavelets%2CJaideva%20Goswami%2Csignal_processing%2C228%2CWiley%0AData%20Smart%2CJohn%20Foreman%2Cdata_science%2C235%2CWiley%0AGod%20Created%20the%20Integers%2CStephen%20Hawking%2Cmathematics%2C197%2CPenguin%0ASuperfreakonomics%2CStephen%20Dubner%2Ceconomics%2C179%2CHarperCollins%0AOrientalism%2CEdward%20Said%2Chistory%2C197%2CPenguin%0AThe%20Nature%20of%20Statistical%20Learning%20Theory%2CVladimir%20Vapnik%2Cdata_science%2C230%2CSpringer%0AIntegration%20of%20the%20Indian%20States%2CV%20P%20Menon%2Chistory%2C217%2COrient%20Blackswan%0AThe%20Drunkard\'s%20Walk%2CLeonard%20Mlodinow%2Cscience%2C197%2CPenguin%0AImage%20Processing%20%26%20Mathematical%20Morphology%2CFrank%20Shih%2Csignal_processing%2C241%2CCRC%0AHow%20to%20Think%20Like%20Sherlock%20Holmes%2CMaria%20Konnikova%2Cpsychology%2C240%2CPenguin%0AData%20Scientists%20at%20Work%2CSebastian%20Gutierrez%2Cdata_science%2C230%2CApress%0ASlaughterhouse%20Five%2CKurt%20Vonnegut%2Cfiction%2C198%2CRandom%20House%0ABirth%20of%20a%20Theorem%2CCedric%20Villani%2Cmathematics%2C234%2CBodley%20Head%0AStructure%20%26%20Interpretation%20of%20Computer%20Programs%2CGerald%20Sussman%2Ccomputer_science%2C240%2CMIT%20Press", "left"]\
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
            "type": "LIST",\
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
            "type": "LIST",\
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
            "type": "LIST",\
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
            "type": "LIST",\
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



const presetCountryData = '\
    {\
        "nodes":\
        [\
            {\
            "type": "T2N",\
            "id": "textToNum",\
            "name": "to%20number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5141",\
            "y": "672",\
            "z": "0"\
            },\
            {\
            "type": "TREPL",\
            "id": "replace",\
            "name": "replace",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5140",\
            "y": "1042",\
            "z": "1",\
            "width": "120",\
            "height": "98",\
            "params":\
            [\
                    ["TEXT#", "what", "(.*)%20(The)", "center"],\
                    ["TEXT#", "with", "%242%20%241", "center"],\
                    ["NUM#", "regex", "1,0"]\
            ]\
            },\
            {\
            "type": "NANISNUM",\
            "id": "nanIsNum2",\
            "name": "NaN%20%E2%9F%B6%20number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5429",\
            "y": "672",\
            "z": "2"\
            },\
            {\
            "type": "CMB",\
            "id": "combine",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6064",\
            "y": "831",\
            "z": "3",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence2",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6309.2",\
            "y": "1225",\
            "z": "4",\
            "params":\
            [\
                    ["NUM#", "step", "12,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4810",\
            "y": "867",\
            "z": "5",\
            "params":\
            [\
                    ["NUM#", "index", "19,0"]\
            ]\
            },\
            {\
            "type": "TCSV",\
            "id": "csv",\
            "name": "csv",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4395",\
            "y": "928",\
            "z": "6",\
            "params":\
            [\
                    ["TEXT#", "columnSeparator", "%3B", "left"]\
            ]\
            },\
            {\
            "type": "COL",\
            "id": "color",\
            "name": "color",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5316",\
            "y": "1338",\
            "z": "7",\
            "prevSpace": "hsv",\
            "params":\
            [\
                    ["NUM#", "space", "2,0"],\
                    ["NUM#", "c1", "29.99999999999997,0"],\
                    ["NUM#", "c2", "69.56521739130434,0"],\
                    ["NUM#", "c3", "92,0"]\
            ]\
            },\
            {\
            "type": "CMB",\
            "id": "combine2",\
            "name": "combine",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5518",\
            "y": "1420",\
            "z": "8",\
            "width": "120",\
            "height": "51"\
            },\
            {\
            "type": "SEL",\
            "id": "select2",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4990",\
            "y": "1042",\
            "z": "9",\
            "params":\
            [\
                    ["NUM#", "index", "0,0"]\
            ]\
            },\
            {\
            "type": "TEXT",\
            "id": "text3",\
            "name": "country%20data",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3933",\
            "y": "928",\
            "z": "10",\
            "width": "422",\
            "height": "252.6703650307108",\
            "params":\
            [\
                    ["TEXT#", "value", "Country%3BArea(sq%20km)%3BBirth%20rate(births%2F1000%20population)%3BCurrent%20account%20balance%3BDeath%20rate(deaths%2F1000%20population)%3BDebt%20-%20external%3BElectricity%20-%20consumption(kWh)%3BElectricity%20-%20production(kWh)%3BExports%3BGDP%3BGDP%20-%20per%20capita%3BGDP%20-%20real%20growth%20rate(%25)%3BHIV%2FAIDS%20-%20adult%20prevalence%20rate(%25)%3BHIV%2FAIDS%20-%20deaths%3BHIV%2FAIDS%20-%20people%20living%20with%20HIV%2FAIDS%3BHighways(km)%3BImports%3BIndustrial%20production%20growth%20rate(%25)%3BInfant%20mortality%20rate(deaths%2F1000%20live%20births)%3BInflation%20rate%20(consumer%20prices)(%25)%3BInternet%20hosts%3BInternet%20users%3BInvestment%20(gross%20fixed)(%25%20of%20GDP)%3BLabor%20force%3BLife%20expectancy%20at%20birth(years)%3BMilitary%20expenditures%20-%20dollar%20figure%3BMilitary%20expenditures%20-%20percent%20of%20GDP(%25)%3BNatural%20gas%20-%20consumption(cu%20m)%3BNatural%20gas%20-%20exports(cu%20m)%3BNatural%20gas%20-%20imports(cu%20m)%3BNatural%20gas%20-%20production(cu%20m)%3BNatural%20gas%20-%20proved%20reserves(cu%20m)%3BOil%20-%20consumption(bbl%2Fday)%3BOil%20-%20exports(bbl%2Fday)%3BOil%20-%20imports(bbl%2Fday)%3BOil%20-%20production(bbl%2Fday)%3BOil%20-%20proved%20reserves(bbl)%3BPopulation%3BPublic%20debt(%25%20of%20GDP)%3BRailways(km)%3BReserves%20of%20foreign%20exchange%20%26%20gold%3BTelephones%20-%20main%20lines%20in%20use%3BTelephones%20-%20mobile%20cellular%3BTotal%20fertility%20rate(children%20born%2Fwoman)%3BUnemployment%20rate(%25)%0AString%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%3Bdouble%0AAfghanistan%3B647500%3B47.02%3B%3B20.75%3B8000000000%3B652200000%3B540000000%3B446000000%3B21500000000%3B800%3B7.50%3B0.01%3B%3B%3B21000%3B3759000000%3B%3B163.07%3B10.30%3B%3B1000%3B%3B11800000%3B42.90%3B188400000%3B2.60%3B220000000%3B0%3B0%3B220000000%3B49980000000%3B3500%3B%3B%3B0%3B0%3B29928987%3B%3B%3B%3B33100%3B15000%3B6.75%3B%0AAkrotiri%3B123%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AAlbania%3B28748%3B15.08%3B-504000000%3B5.12%3B1410000000%3B6760000000%3B5680000000%3B552400000%3B17460000000%3B4900%3B5.60%3B%3B%3B%3B18000%3B2076000000%3B3.10%3B21.52%3B3.20%3B455%3B30000%3B18.40%3B1090000%3B77.24%3B56500000%3B1.49%3B30000000%3B0%3B0%3B30000000%3B3316000000%3B7500%3B0%3B5500%3B2000%3B185500000%3B3563112%3B%3B447%3B1206000000%3B255000%3B1100000%3B2.04%3B14.80%0AAlgeria%3B2381740%3B17.13%3B11900000000%3B4.60%3B21900000000%3B23610000000%3B25760000000%3B32160000000%3B212300000000%3B6600%3B6.10%3B0.10%3B500%3B9100%3B104000%3B15250000000%3B6.00%3B31.00%3B3.10%3B897%3B500000%3B26.20%3B9910000%3B73.00%3B2480000000%3B3.20%3B22320000000%3B57980000000%3B0%3B80300000000%3B4739000000000%3B209000%3B%3B%3B1200000%3B11870000000%3B32531853%3B37.40%3B3973%3B43550000000%3B2199600%3B1447310%3B1.92%3B25.40%0AAmerican%20Samoa%3B199%3B23.13%3B%3B3.33%3B%3B120900000%3B130000000%3B30000000%3B500000000%3B8000%3B%3B%3B%3B%3B185%3B123000000%3B%3B9.27%3B%3B%3B%3B%3B14000%3B75.84%3B%3B%3B%3B%3B%3B%3B%3B3800%3B%3B%3B0%3B%3B57881%3B%3B%3B%3B15000%3B2377%3B3.25%3B6.00%0AAndorra%3B468%3B9.00%3B%3B6.07%3B%3B%3B%3B58000000%3B1900000000%3B26800%3B2.00%3B%3B%3B%3B269%3B1077000000%3B%3B4.05%3B4.30%3B4144%3B24500%3B%3B33000%3B83.51%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B70549%3B%3B%3B%3B35000%3B23500%3B1.29%3B0.00%0AAngola%3B1246700%3B44.64%3B-37880000%3B25.90%3B10450000000%3B1587000000%3B1707000000%3B12760000000%3B23170000000%3B2100%3B11.70%3B3.90%3B21000%3B240000%3B51429%3B4896000000%3B1.00%3B191.19%3B43.80%3B17%3B41000%3B34.50%3B5410000%3B36.61%3B183580000%3B10.60%3B530000000%3B0%3B0%3B530000000%3B79570000000%3B31000%3B%3B%3B980000%3B22880000000%3B11190786%3B%3B2761%3B800000000%3B96300%3B130000%3B6.27%3B%0AAnguilla%3B102%3B14.26%3B%3B5.43%3B8800000%3B42600000%3B%3B2600000%3B112000000%3B7500%3B2.80%3B%3B%3B%3B105%3B80900000%3B3.10%3B21.03%3B2.30%3B%3B3000%3B%3B6049%3B77.11%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B13254%3B%3B%3B%3B6200%3B1800%3B1.73%3B8.00%0AAntarctica%3B14000000%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B0%3B%3B%3B%0AAntigua%20and%20Barbuda%3B443%3B17.26%3B%3B5.44%3B231000000%3B103000000%3B110800000%3B689000000%3B750000000%3B11000%3B3.00%3B%3B%3B%3B250%3B692000000%3B6.00%3B19.46%3B0.40%3B1665%3B10000%3B%3B30000%3B71.90%3B%3B%3B%3B%3B%3B%3B%3B3600%3B%3B%3B0%3B%3B68722%3B%3B%3B%3B38000%3B38200%3B2.26%3B11.00%0AArgentina%3B2766890%3B16.90%3B5473000000%3B7.56%3B157700000000%3B81650000000%3B81390000000%3B33780000000%3B483500000000%3B12400%3B8.30%3B0.70%3B1500%3B130000%3B215471%3B22060000000%3B12.00%3B15.18%3B6.10%3B742358%3B4100000%3B18.30%3B15040000%3B75.91%3B4300000000%3B1.30%3B31100000000%3B6050000000%3B0%3B37150000000%3B768000000000%3B486000%3B%3B%3B755000%3B2900000000%3B39537943%3B118.00%3B34091%3B19470000000%3B8009400%3B6500000%3B2.19%3B14.80%0AArmenia%3B29800%3B11.76%3B-240400000%3B8.16%3B905000000%3B5797000000%3B6492000000%3B850000000%3B13650000000%3B4600%3B9.00%3B0.10%3B200%3B2600%3B8431%3B1300000000%3B15.00%3B23.28%3B3.50%3B2206%3B150000%3B19.80%3B1400000%3B71.55%3B135000000%3B6.50%3B1400000000%3B0%3B1400000000%3B0%3B%3B5700%3B%3B%3B0%3B%3B2982904%3B%3B845%3B555000000%3B562600%3B114400%3B1.32%3B30.00%0AAruba%3B193%3B11.26%3B%3B6.57%3B285000000%3B751200000%3B807700000%3B128000000%3B1940000000%3B28000%3B-1.50%3B%3B%3B%3B800%3B841000000%3B%3B5.89%3B3.20%3B923%3B24000%3B%3B41500%3B79.14%3B%3B%3B%3B%3B%3B%3B%3B6500%3B%3B%3B0%3B%3B71566%3B%3B%3B%3B37100%3B53000%3B1.79%3B0.60%0AAshmore%20and%20Cartier%20Islands%3B5%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AAustralia%3B7686850%3B12.26%3B-38300000000%3B7.44%3B308700000000%3B195600000000%3B210300000000%3B86890000000%3B611700000000%3B30700%3B3.50%3B0.10%3B%3B14000%3B811603%3B98100000000%3B1.90%3B4.69%3B2.30%3B2847763%3B9472000%3B25.30%3B10350000%3B80.39%3B1665000000%3B2.70%3B23330000000%3B9744000000%3B0%3B33080000000%3B2407000000000%3B796500%3B523400%3B530800%3B537500%3B3664000000%3B20090437%3B17.40%3B43802%3B35140000000%3B10815000%3B14347000%3B1.76%3B5.10%0AAustria%3B83870%3B8.81%3B-3283000000%3B9.70%3B15500000000%3B55090000000%3B58490000000%3B102700000000%3B255900000000%3B31300%3B1.90%3B0.30%3B100%3B10000%3B200000%3B101200000000%3B3.30%3B4.66%3B1.80%3B387006%3B3730000%3B22.60%3B3450000%3B78.92%3B1497000000%3B0.90%3B7810000000%3B403000000%3B6033000000%3B1731000000%3B24900000000%3B262400%3B35470%3B262000%3B20670%3B85690000%3B8184691%3B64.20%3B6021%3B12730000000%3B3881000%3B7094500%3B1.36%3B4.40%0AAzerbaijan%3B86600%3B20.40%3B-2899000000%3B9.86%3B1832000000%3B17370000000%3B17550000000%3B3168000000%3B30010000000%3B3800%3B9.80%3B0.10%3B100%3B1400%3B28030%3B3622000000%3B4.00%3B81.74%3B4.60%3B586%3B300000%3B65.10%3B5090000%3B63.35%3B121000000%3B2.60%3B6720000000%3B0%3B1000000000%3B5720000000%3B62300000000%3B140000%3B%3B%3B312800%3B589000000%3B7911974%3B18.90%3B2957%3B875000000%3B923800%3B870000%3B2.44%3B1.20%0ABahamas%20The%3B13940%3B17.87%3B%3B8.97%3B308500000%3B1596000000%3B1716000000%3B636000000%3B5295000000%3B17700%3B3.00%3B3.00%3B200%3B5600%3B2693%3B1630000000%3B%3B25.21%3B1.20%3B302%3B84000%3B%3B156000%3B65.54%3B%3B%3B%3B%3B%3B%3B%3B23000%3B29000%3B%3B0%3B%3B301790%3B%3B%3B%3B131700%3B121800%3B2.20%3B10.20%0ABahrain%3B665%3B18.10%3B586100000%3B4.08%3B6215000000%3B6379000000%3B6860000000%3B8205000000%3B13010000000%3B19200%3B5.60%3B0.20%3B200%3B600%3B3459%3B5870000000%3B2.00%3B17.27%3B2.10%3B1334%3B195700%3B12.80%3B370000%3B74.23%3B628900000%3B6.30%3B32700000000%3B0%3B0%3B32700000000%3B46000000000%3B40000%3B%3B%3B44000%3B126000000%3B688345%3B63.80%3B%3B2141000000%3B185800%3B443100%3B2.63%3B15.00%0ABaker%20Island%3B1%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0ABangladesh%3B144000%3B30.01%3B216600000%3B8.40%3B19970000000%3B15300000000%3B16450000000%3B7478000000%3B275700000000%3B2000%3B4.90%3B0.10%3B650%3B13000%3B207486%3B10030000000%3B6.50%3B62.60%3B6.00%3B1%3B243000%3B23.50%3B65490000%3B62.08%3B995300000%3B1.80%3B9900000000%3B0%3B0%3B9900000000%3B150300000000%3B71000%3B%3B%3B3581%3B28450000%3B144319628%3B43.00%3B2706%3B3000000000%3B740000%3B1365000%3B3.13%3B40.00%0ABarbados%3B431%3B12.83%3B%3B9.17%3B668000000%3B744000000%3B800000000%3B206000000%3B4569000000%3B16400%3B2.30%3B1.50%3B200%3B2500%3B1600%3B1039000000%3B-3.20%3B12.50%3B-0.50%3B204%3B100000%3B%3B128500%3B71.41%3B%3B%3B29170000%3B0%3B0%3B29170000%3B70790000%3B10900%3B%3B%3B1271%3B1254000%3B279254%3B%3B%3B%3B134000%3B140000%3B1.65%3B10.70%0ABassas%20da%20India%3B0%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0ABelarus%3B207600%3B10.83%3B-1119000000%3B14.15%3B600000000%3B34300000000%3B30000000000%3B11470000000%3B70500000000%3B6800%3B6.40%3B0.30%3B1000%3B15000%3B79990%3B13570000000%3B4.00%3B13.37%3B17.40%3B5308%3B1391900%3B21.80%3B4305000%3B68.72%3B176100000%3B1.40%3B18800000000%3B0%3B18500000000%3B250000000%3B%3B285000%3B14500%3B360000%3B36000%3B%3B10300483%3B%3B5523%3B770200000%3B3071300%3B1118000%3B1.39%3B2.00%0ABelgium%3B30528%3B10.48%3B11400000000%3B10.22%3B28300000000%3B78820000000%3B76580000000%3B255700000000%3B316200000000%3B30600%3B2.60%3B0.20%3B100%3B10000%3B149028%3B235000000000%3B3.50%3B4.68%3B1.90%3B166799%3B3400000%3B19.10%3B4750000%3B78.62%3B3999000000%3B1.30%3B15500000000%3B0%3B15400000000%3B0%3B%3B595100%3B450000%3B1042000%3B0%3B%3B10364388%3B96.20%3B3518%3B14450000000%3B5120400%3B8135500%3B1.64%3B12.00%0ABelize%3B22966%3B29.34%3B-115000000%3B6.04%3B1362000000%3B108800000%3B117000000%3B401400000%3B1778000000%3B6500%3B3.50%3B2.40%3B%3B3600%3B2872%3B579900000%3B4.60%3B25.69%3B2.90%3B2613%3B30000%3B33.60%3B90000%3B67.49%3B18000000%3B2.00%3B%3B%3B%3B%3B%3B5000%3B%3B%3B0%3B%3B279457%3B%3B%3B111100000%3B33300%3B60400%3B3.68%3B12.90%0ABenin%3B112620%3B41.99%3B-159900000%3B13.76%3B1600000000%3B565200000%3B285200000%3B720900000%3B8338000000%3B1200%3B5.00%3B1.90%3B5800%3B68000%3B6787%3B934500000%3B8.30%3B85.00%3B2.80%3B879%3B70000%3B19.30%3B%3B50.51%3B96500000%3B2.40%3B%3B%3B%3B%3B608800000%3B11500%3B%3B%3B700%3B4105000%3B7460025%3B%3B578%3B839300000%3B66500%3B236200%3B5.86%3B%0ABermuda%3B53%3B11.60%3B%3B7.63%3B160000000%3B598000000%3B643000000%3B879000000%3B2330000000%3B36000%3B2.00%3B%3B%3B%3B450%3B5523000000%3B%3B8.53%3B3.30%3B5161%3B34500%3B%3B37470%3B77.79%3B4030000%3B0.11%3B%3B%3B%3B%3B%3B4000%3B%3B%3B0%3B%3B65365%3B%3B%3B%3B56000%3B37873%3B1.89%3B5.00%0ABhutan%3B47000%3B34.03%3B%3B12.94%3B245000000%3B312900000%3B2001000000%3B154000000%3B2900000000%3B1400%3B5.30%3B0.10%3B%3B100%3B4007%3B196000000%3B9.30%3B100.44%3B3.00%3B985%3B15000%3B%3B%3B54.39%3B13700000%3B1.80%3B%3B%3B%3B%3B%3B1020%3B%3B%3B0%3B%3B2232291%3B%3B%3B%3B25200%3B22000%3B4.81%3B%0ABolivia%3B1098580%3B23.76%3B273000000%3B7.64%3B5439000000%3B3848000000%3B4132000000%3B1986000000%3B22330000000%3B2600%3B3.70%3B0.10%3B%3B4900%3B60282%3B1595000000%3B5.70%3B53.11%3B4.90%3B7080%3B270000%3B10.40%3B3800000%3B65.50%3B132200000%3B1.60%3B1150000000%3B2900000000%3B0%3B8440000000%3B727200000000%3B49000%3B%3B%3B39000%3B458800000%3B8857870%3B%3B3519%3B1214000000%3B600100%3B1401500%3B2.94%3B9.20%0ABosnia%20and%20Herzegovina%3B51129%3B12.49%3B-2100000000%3B8.44%3B3000000000%3B8318000000%3B10040000000%3B1700000000%3B26210000000%3B6500%3B5.00%3B0.10%3B100%3B900%3B21846%3B5200000000%3B5.50%3B21.05%3B1.10%3B6994%3B100000%3B%3B1026000%3B72.85%3B234300000%3B4.50%3B300000000%3B0%3B300000000%3B0%3B%3B20000%3B%3B%3B0%3B%3B4025476%3B%3B1021%3B2000000000%3B938000%3B1050000%3B1.71%3B44.00%0ABotswana%3B600370%3B23.33%3B337000000%3B29.36%3B531000000%3B1890000000%3B930000000%3B2940000000%3B15050000000%3B9200%3B3.50%3B37.30%3B33000%3B350000%3B10217%3B2255000000%3B4.40%3B54.58%3B7.00%3B1920%3B60000%3B25.50%3B264000%3B33.87%3B338500000%3B3.90%3B%3B%3B%3B%3B%3B16000%3B%3B%3B0%3B%3B1640115%3B8.60%3B888%3B5700000000%3B142400%3B435000%3B2.85%3B23.80%0ABouvet%20Island%3B59%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0ABrazil%3B8511965%3B16.83%3B8000000000%3B6.15%3B219800000000%3B351900000000%3B339000000000%3B95000000000%3B1492000000000%3B8100%3B5.10%3B0.70%3B15000%3B660000%3B1724929%3B61000000000%3B6.00%3B29.61%3B7.60%3B3163349%3B14300000%3B19.80%3B89000000%3B71.69%3B11000000000%3B1.80%3B9590000000%3B0%3B3640000000%3B5950000000%3B221700000000%3B2199000%3B%3B%3B1788000%3B13900000000%3B186112794%3B52.00%3B29412%3B52940000000%3B38810000%3B46373300%3B1.93%3B11.50%0ABritish%20Indian%20Ocean%20Territory%3B60%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0ABritish%20Virgin%20Islands%3B153%3B14.96%3B%3B4.42%3B36100000%3B33740000%3B36280000%3B25300000%3B2498000000%3B38500%3B1.00%3B%3B%3B%3B177%3B187000000%3B%3B18.05%3B2.50%3B%3B4000%3B%3B12770%3B76.27%3B%3B%3B%3B%3B%3B%3B%3B420%3B%3B%3B0%3B%3B22643%3B%3B%3B%3B11700%3B8000%3B1.72%3B3.00%0ABrunei%3B5770%3B19.01%3B%3B3.42%3B0%3B2286000000%3B2458000000%3B7700000000%3B6842000000%3B23600%3B3.20%3B0.10%3B200%3B200%3B2525%3B5200000000%3B5.00%3B12.61%3B0.30%3B6409%3B35000%3B%3B158000%3B74.80%3B290700000%3B5.10%3B1350000000%3B9000000000%3B0%3B10350000000%3B315000000000%3B13000%3B199000%3B%3B204000%3B1255000000%3B372361%3B%3B%3B%3B90000%3B137000%3B2.30%3B3.20%0ABulgaria%3B110910%3B9.66%3B682900000%3B14.26%3B16100000000%3B32710000000%3B43070000000%3B9134000000%3B61630000000%3B8200%3B5.30%3B0.10%3B100%3B346%3B37077%3B12230000000%3B5.20%3B20.55%3B6.10%3B53421%3B630000%3B18.60%3B3398000%3B72.03%3B356000000%3B2.60%3B5804000000%3B0%3B5800000000%3B4000000%3B3724000000%3B94000%3B%3B%3B603%3B8100000%3B7450349%3B41.90%3B4294%3B7526000000%3B2868200%3B2597500%3B1.38%3B12.70%0ABurkina%20Faso%3B274200%3B44.17%3B-471700000%3B18.86%3B1300000000%3B335700000%3B361000000%3B418600000%3B15740000000%3B1200%3B4.80%3B4.20%3B29000%3B300000%3B12506%3B866300000%3B14.00%3B97.57%3B2.40%3B442%3B48000%3B29.10%3B5000000%3B43.92%3B64200000%3B1.30%3B%3B%3B%3B%3B%3B8000%3B%3B%3B0%3B%3B13925313%3B%3B622%3B474900000%3B65400%3B227000%3B6.23%3B%0ABurma%3B678500%3B18.11%3B-185000000%3B12.15%3B6752000000%3B3484000000%3B5068000000%3B2137000000%3B74300000000%3B1700%3B-1.30%3B1.20%3B20000%3B330000%3B28200%3B1754000000%3B%3B67.24%3B17.20%3B3%3B28000%3B10.20%3B27010000%3B56.22%3B39000000%3B2.10%3B1569000000%3B8424000000%3B0%3B9980000000%3B2460000000000%3B60950%3B3356%3B49230%3B17550%3B3200000000%3B42909464%3B%3B3955%3B590000000%3B357300%3B66500%3B2.01%3B5.20%0ABurundi%3B27830%3B39.66%3B-59500000%3B17.43%3B1133000000%3B137800000%3B132000000%3B31840000%3B4001000000%3B600%3B3.00%3B6.00%3B25000%3B250000%3B14480%3B138200000%3B18.00%3B69.29%3B8.50%3B22%3B14000%3B10.70%3B2990000%3B43.50%3B38700000%3B6.00%3B%3B%3B%3B%3B%3B2750%3B%3B%3B0%3B%3B6370609%3B%3B%3B76890000%3B23900%3B64000%3B5.81%3B%0ACambodia%3B181040%3B27.08%3B-316200000%3B8.97%3B2400000000%3B100600000%3B122000000%3B2311000000%3B26990000000%3B2000%3B5.40%3B2.60%3B15000%3B170000%3B12323%3B3129000000%3B22.00%3B71.48%3B3.10%3B818%3B30000%3B20.90%3B7000000%3B58.87%3B112000000%3B3.00%3B%3B%3B%3B%3B%3B7200%3B%3B%3B0%3B%3B13607069%3B%3B602%3B997500000%3B35400%3B380000%3B3.44%3B2.50%0ACameroon%3B475440%3B34.67%3B-149100000%3B15.40%3B8460000000%3B3321000000%3B3571000000%3B2445000000%3B30170000000%3B1900%3B4.90%3B6.90%3B49000%3B560000%3B34300%3B1979000000%3B4.20%3B68.26%3B1.00%3B479%3B60000%3B16.10%3B6680000%3B47.84%3B221100000%3B1.60%3B0%3B0%3B0%3B0%3B55220000000%3B22000%3B%3B%3B94000%3B80000000%3B16380005%3B69.10%3B1008%3B687500000%3B110900%3B1077000%3B4.47%3B30.00%0ACanada%3B9984670%3B10.84%3B28200000000%3B7.73%3B570000000000%3B487300000000%3B548900000000%3B315600000000%3B1023000000000%3B31500%3B2.40%3B0.30%3B1500%3B56000%3B1408800%3B256100000000%3B2.00%3B4.75%3B1.90%3B3210081%3B16110000%3B19.40%3B17370000%3B80.10%3B9801700000%3B1.10%3B55800000000%3B91520000000%3B8730000000%3B165800000000%3B1691000000000%3B2200000%3B1370000%3B987000%3B3110000%3B178900000000%3B32805041%3B%3B48909%3B36270000000%3B19950900%3B13221800%3B1.61%3B7.00%0ACape%20Verde%3B4033%3B25.33%3B-93760000%3B6.62%3B325000000%3B40060000%3B43080000%3B61110000%3B600000000%3B1400%3B5.00%3B0.04%3B225%3B775%3B1100%3B387300000%3B%3B47.77%3B1.50%3B118%3B20400%3B19.20%3B%3B70.45%3B14100000%3B1.50%3B%3B%3B%3B%3B%3B2000%3B%3B%3B0%3B%3B418224%3B%3B%3B112700000%3B71700%3B53300%3B3.48%3B21.00%0ACayman%20Islands%3B262%3B12.92%3B%3B4.81%3B70000000%3B382100000%3B410800000%3B1200000%3B1391000000%3B32300%3B1.70%3B%3B%3B%3B785%3B457400000%3B%3B8.19%3B2.80%3B%3B9909%3B%3B19820%3B79.95%3B%3B%3B%3B%3B%3B%3B%3B2400%3B%3B%3B0%3B%3B44270%3B%3B%3B%3B38000%3B17000%3B1.90%3B4.10%0ACentral%20African%20Republic%3B622984%3B35.17%3B%3B20.27%3B881400000%3B98580000%3B106000000%3B172000000%3B4248000000%3B1100%3B0.50%3B13.50%3B23000%3B260000%3B23810%3B136000000%3B3.00%3B91.00%3B3.60%3B6%3B5000%3B%3B%3B41.01%3B15500000%3B1.00%3B%3B%3B%3B%3B%3B2400%3B%3B%3B0%3B%3B3799897%3B%3B%3B%3B9000%3B13000%3B4.50%3B8.00%0AChad%3B1284000%3B45.98%3B330200000%3B16.41%3B1100000000%3B89400000%3B96130000%3B365000000%3B15660000000%3B1600%3B38.00%3B4.80%3B18000%3B200000%3B33400%3B500700000%3B5.00%3B93.82%3B8.00%3B8%3B15000%3B24.70%3B%3B47.94%3B101300000%3B2.10%3B%3B%3B%3B%3B%3B1500%3B%3B%3B200000%3B%3B9826419%3B%3B%3B652700000%3B11800%3B65000%3B6.32%3B%0AChile%3B756950%3B15.44%3B2185000000%3B5.76%3B44600000000%3B41800000000%3B48600000000%3B29200000000%3B169100000000%3B10700%3B5.80%3B0.30%3B1400%3B26000%3B79605%3B22530000000%3B7.80%3B8.80%3B2.40%3B202429%3B3575000%3B23.90%3B6200000%3B76.58%3B3420000000%3B3.80%3B6517000000%3B0%3B5337000000%3B1180000000%3B99050000000%3B240000%3B0%3B221500%3B18500%3B150000000%3B15980912%3B12.80%3B6585%3B16020000000%3B3467000%3B6445700%3B2.02%3B8.50%0AChina%3B9596960%3B13.14%3B30320000000%3B6.94%3B233300000000%3B1630000000000%3B1910000000000%3B583100000000%3B7262000000000%3B5600%3B9.10%3B0.10%3B44000%3B840000%3B1765222%3B552400000000%3B17.10%3B24.18%3B4.10%3B160421%3B94000000%3B46.00%3B760800000%3B72.27%3B67490000000%3B4.30%3B29180000000%3B0%3B0%3B35000000000%3B2230000000000%3B4956000%3B427800%3B2414000%3B3392000%3B17740000000%3B1306313812%3B31.40%3B70058%3B609900000000%3B263000000%3B269000000%3B1.72%3B9.80%0AChristmas%20Island%3B135%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B240%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B361%3B%3B%3B%3B%3B%3B%3B%0AClipperton%20Island%3B6%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0ACocos%20(Keeling)%20Islands%3B14%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B15%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B628%3B%3B%3B%3B287%3B%3B%3B60.00%0AColombia%3B1138910%3B20.82%3B-1706000000%3B5.59%3B38700000000%3B41140000000%3B44870000000%3B15500000000%3B281100000000%3B6600%3B3.60%3B0.70%3B3600%3B190000%3B112998%3B15340000000%3B4.00%3B20.97%3B5.90%3B115158%3B2732200%3B15.80%3B20700000%3B71.72%3B3300000000%3B3.40%3B5700000000%3B0%3B0%3B5700000000%3B132000000000%3B252000%3B%3B%3B531100%3B1700000000%3B42954279%3B51.80%3B3304%3B11940000000%3B8768100%3B6186200%3B2.56%3B13.60%0AComoros%3B2170%3B37.52%3B%3B8.40%3B232000000%3B22170000%3B23840000%3B28000000%3B441000000%3B700%3B2.00%3B0.12%3B%3B%3B880%3B88000000%3B-2.00%3B74.93%3B3.50%3B11%3B5000%3B%3B144500%3B61.96%3B11600000%3B3.00%3B%3B%3B%3B%3B%3B700%3B%3B%3B0%3B%3B671247%3B%3B%3B%3B13200%3B2000%3B5.09%3B20.00%0ACongo%20Democratic%20Republic%20of%20the%3B2345410%3B44.38%3B%3B14.43%3B11600000000%3B4168000000%3B6086000000%3B1417000000%3B42740000000%3B700%3B7.50%3B4.20%3B100000%3B1100000%3B157000%3B933000000%3B%3B92.87%3B14.00%3B153%3B50000%3B%3B14510000%3B49.35%3B93500000%3B1.50%3B%3B%3B%3B%3B104800000000%3B14000%3B%3B%3B24000%3B1538000000%3B60085804%3B%3B5138%3B%3B10000%3B1000000%3B6.54%3B%0ACongo%20Republic%20of%20the%3B342000%3B27.88%3B266000000%3B14.82%3B5000000000%3B573600000%3B348000000%3B2224000000%3B2324000000%3B800%3B3.70%3B4.90%3B9700%3B90000%3B12800%3B749300000%3B0.00%3B92.41%3B1.80%3B46%3B15000%3B25.80%3B%3B48.97%3B126500000%3B2.80%3B0%3B0%3B0%3B0%3B495500000%3B5000%3B%3B%3B227000%3B93500000%3B3039126%3B%3B894%3B40420000%3B7000%3B330000%3B3.54%3B%0ACook%20Islands%3B240%3B%3B%3B%3B141000000%3B25110000%3B27000000%3B9100000%3B105000000%3B5000%3B7.10%3B%3B%3B%3B320%3B50700000%3B1.00%3B%3B3.20%3B%3B3600%3B%3B8000%3B%3B%3B%3B%3B%3B%3B%3B%3B450%3B%3B%3B0%3B%3B21388%3B%3B%3B%3B6200%3B1500%3B%3B13.00%0ACosta%20Rica%3B51100%3B18.60%3B-980300000%3B4.33%3B5962000000%3B5733000000%3B6614000000%3B6184000000%3B37970000000%3B9600%3B3.90%3B0.60%3B900%3B12000%3B35303%3B7842000000%3B3.10%3B9.95%3B11.50%3B10826%3B800000%3B19.20%3B1810000%3B76.84%3B64200000%3B0.40%3B%3B%3B%3B%3B%3B37000%3B%3B%3B0%3B%3B4016173%3B58.00%3B950%3B1736000000%3B1132000%3B528047%3B2.28%3B6.60%0ACote%20d\'Ivoire%3B322460%3B35.51%3B-421500000%3B14.94%3B11810000000%3B2976000000%3B4759000000%3B5124000000%3B24780000000%3B1500%3B-1.00%3B7.00%3B47000%3B570000%3B50400%3B3360000000%3B15.00%3B90.83%3B1.40%3B3795%3B90000%3B11.30%3B6700000%3B48.62%3B180200000%3B1.20%3B1350000000%3B0%3B0%3B1350000000%3B14870000000%3B32000%3B%3B%3B29300%3B220000000%3B17298040%3B74.80%3B660%3B1950000000%3B328000%3B1236000%3B4.58%3B13.00%0ACroatia%3B56542%3B9.57%3B-1925000000%3B11.38%3B26400000000%3B15200000000%3B12510000000%3B7845000000%3B50330000000%3B11200%3B3.70%3B0.10%3B10%3B200%3B28344%3B16700000000%3B2.70%3B6.84%3B2.50%3B29644%3B1014000%3B28.60%3B1710000%3B74.45%3B620000000%3B2.39%3B2840000000%3B0%3B1080000000%3B1760000000%3B34360000000%3B89000%3B%3B%3B21000%3B93600000%3B4495904%3B41.70%3B2726%3B8563000000%3B1825000%3B2553000%3B1.39%3B13.80%0ACuba%3B110860%3B12.03%3B-185100000%3B7.19%3B12090000000%3B13400000000%3B14410000000%3B2104000000%3B33920000000%3B3000%3B3.00%3B0.10%3B200%3B3300%3B60858%3B5296000000%3B1.40%3B6.33%3B3.10%3B1529%3B120000%3B11.20%3B4550000%3B77.23%3B572300000%3B1.80%3B600000000%3B0%3B0%3B600000000%3B42620000000%3B163000%3B%3B%3B77900%3B532000000%3B11346670%3B%3B4226%3B738600000%3B574400%3B17900%3B1.66%3B2.50%0ACyprus%3B9250%3B12.57%3B-619900000%3B7.64%3B7327000000%3B602000000%3B4000000000%3B49300000%3B4540000000%3B7135%3B2.60%3B0.10%3B%3B1000%3B13943%3B415200000%3B-0.30%3B7.18%3B2.40%3B5901%3B210000%3B17.90%3B95025%3B77.65%3B384000000%3B3.80%3B%3B%3B%3B%3B%3B49000%3B%3B%3B300%3B%3B780133%3B74.90%3B%3B941600000%3B86228%3B143178%3B1.83%3B3.20%0ACzech%20Republic%3B78866%3B9.07%3B-5730000000%3B10.54%3B36280000000%3B55330000000%3B71750000000%3B66510000000%3B172200000000%3B16800%3B3.70%3B0.10%3B10%3B2500%3B127204%3B68190000000%3B4.70%3B3.93%3B3.20%3B295677%3B2700000%3B29.00%3B5250000%3B76.02%3B2170000000%3B2.02%3B9892000000%3B1000000%3B9521000000%3B160000000%3B3057000000%3B175700%3B26670%3B192300%3B7419%3B17250000%3B10241138%3B33.50%3B9520%3B32780000000%3B3626000%3B9708700%3B1.20%3B10.60%0ADenmark%3B43094%3B11.36%3B6529000000%3B10.43%3B21700000000%3B31630000000%3B36380000000%3B73060000000%3B174400000000%3B32200%3B2.10%3B0.20%3B100%3B5000%3B71847%3B63450000000%3B1.70%3B4.56%3B1.40%3B1219925%3B2756000%3B19.80%3B2870000%3B77.62%3B3271600000%3B1.50%3B5280000000%3B3100000000%3B0%3B8380000000%3B81980000000%3B218000%3B332100%3B195000%3B346200%3B1230000000%3B5432335%3B42.50%3B3002%3B37980000000%3B3610100%3B4785300%3B1.74%3B6.20%0ADhekelia%3B131%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0ADjibouti%3B23000%3B39.98%3B%3B19.39%3B366000000%3B167400000%3B180000000%3B155000000%3B619000000%3B1300%3B3.50%3B2.90%3B690%3B9100%3B2890%3B665000000%3B3.00%3B104.13%3B2.00%3B702%3B6500%3B%3B282000%3B43.10%3B28600000%3B4.40%3B%3B%3B%3B%3B%3B11300%3B%3B%3B0%3B%3B476703%3B%3B100%3B%3B9500%3B23000%3B5.40%3B50.00%0ADominica%3B754%3B15.73%3B%3B6.81%3B161500000%3B63620000%3B68410000%3B39000000%3B384000000%3B5500%3B-1.00%3B%3B%3B%3B780%3B98200000%3B-10.00%3B14.15%3B1.00%3B681%3B12500%3B%3B25000%3B74.65%3B%3B%3B%3B%3B%3B%3B%3B600%3B%3B%3B0%3B%3B69029%3B%3B%3B%3B23700%3B9400%3B1.96%3B23.00%0ADominican%20Republic%3B48730%3B23.28%3B762200000%3B7.35%3B7745000000%3B8912000000%3B9583000000%3B5446000000%3B55680000000%3B6300%3B1.70%3B1.70%3B7900%3B88000%3B12600%3B8093000000%3B2.00%3B32.38%3B55.00%3B64197%3B500000%3B18.90%3B%3B67.26%3B180000000%3B1.10%3B%3B%3B%3B%3B%3B129000%3B%3B129900%3B0%3B%3B8950034%3B61.10%3B1743%3B426000000%3B901800%3B2120400%3B2.86%3B17.00%0AEast%20Timor%3B15007%3B27.19%3B%3B6.30%3B%3B%3B%3B8000000%3B370000000%3B400%3B1.00%3B%3B%3B%3B3800%3B167000000%3B8.50%3B47.41%3B4.00%3B%3B%3B%3B%3B65.90%3B4400000%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B1040880%3B%3B%3B%3B%3B%3B3.61%3B50.00%0AEcuador%3B283560%3B22.67%3B261100000%3B4.24%3B16810000000%3B75580000000%3B81270000000%3B7560000000%3B49510000000%3B3700%3B5.80%3B0.30%3B1700%3B21000%3B43197%3B7650000000%3B10.00%3B23.66%3B2.00%3B3188%3B569700%3B20.60%3B4530000%3B76.21%3B655000000%3B2.20%3B160000000%3B0%3B0%3B160000000%3B106500000000%3B129000%3B387000%3B%3B523000%3B4408000000%3B13363593%3B49.20%3B966%3B1436000000%3B1549000%3B2394400%3B2.72%3B11.10%0AEgypt%3B1001450%3B23.32%3B2113000000%3B5.26%3B33750000000%3B75580000000%3B81270000000%3B11000000000%3B316300000000%3B4200%3B4.50%3B0.10%3B700%3B12000%3B64000%3B19210000000%3B2.50%3B32.59%3B9.50%3B3401%3B2700000%3B15.80%3B20710000%3B71.00%3B2440000000%3B3.40%3B21200000000%3B0%3B0%3B21200000000%3B1264000000000%3B562000%3B%3B%3B740000%3B2700000000%3B77505756%3B102.70%3B5063%3B14030000000%3B8735700%3B5797500%3B2.88%3B10.90%0AEl%20Salvador%3B21040%3B27.04%3B-880500000%3B5.85%3B4792000000%3B4450000000%3B4158000000%3B3249000000%3B32350000000%3B4900%3B1.80%3B0.70%3B2200%3B29000%3B10029%3B5968000000%3B0.70%3B25.10%3B5.40%3B4084%3B550000%3B16.60%3B2750000%3B71.22%3B157000000%3B1.10%3B%3B%3B%3B%3B%3B39000%3B%3B%3B0%3B%3B6704932%3B41.70%3B283%3B1888000000%3B752600%3B1149800%3B3.16%3B6.30%0AEquatorial%20Guinea%3B28051%3B36.18%3B-578600000%3B12.00%3B248000000%3B24820000%3B26690000%3B2771000000%3B1270000000%3B2700%3B20.00%3B3.40%3B370%3B5900%3B2880%3B1167000000%3B30.00%3B85.13%3B8.50%3B3%3B1800%3B50.80%3B%3B55.56%3B126200000%3B2.50%3B20000000%3B0%3B0%3B20000000%3B68530000000%3B2000%3B%3B%3B350000%3B563500000%3B535881%3B%3B%3B235200000%3B9600%3B41500%3B4.62%3B30.00%0AEritrea%3B121320%3B38.62%3B-144900000%3B13.53%3B311000000%3B229400000%3B246600000%3B64440000%3B4154000000%3B900%3B2.50%3B2.70%3B6300%3B60000%3B4010%3B622000000%3B%3B74.87%3B10.00%3B1047%3B9500%3B26.30%3B%3B52.16%3B151000000%3B13.40%3B%3B%3B%3B%3B%3B6000%3B%3B%3B0%3B%3B4561599%3B%3B306%3B30870000%3B38100%3B%3B5.61%3B%0AEstonia%3B45226%3B9.91%3B-1169000000%3B13.21%3B8373000000%3B6358000000%3B8301000000%3B5701000000%3B19230000000%3B14300%3B6.00%3B1.10%3B200%3B7800%3B55944%3B7318000000%3B5.00%3B7.87%3B3.00%3B82142%3B444000%3B28.20%3B660000%3B71.77%3B155000000%3B2.00%3B1270000000%3B0%3B1270000000%3B0%3B%3B24000%3B%3B%3B5100%3B%3B1332893%3B5.40%3B958%3B1503000000%3B475000%3B881000%3B1.39%3B9.60%0AEthiopia%3B1127127%3B38.61%3B-464400000%3B15.06%3B2900000000%3B1998000000%3B2149000000%3B562800000%3B54890000000%3B800%3B11.60%3B4.40%3B120000%3B1500000%3B33297%3B2104000000%3B6.70%3B95.32%3B2.40%3B9%3B75000%3B17.80%3B%3B48.83%3B337100000%3B4.60%3B%3B%3B%3B%3B12460000000%3B23000%3B%3B%3B0%3B214000%3B73053286%3B%3B681%3B923100000%3B435000%3B97800%3B5.33%3B%0AEuropa%20Island%3B28%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0A%23European%20Union%3B3976372%3B10.10%3B%3B10.10%3B%3B2661000000000%3B2888000000000%3B1109000000000%3B11650000000000%3B26900%3B2.40%3B%3B%3B%3B4634810%3B1123000000000%3B2.40%3B5.20%3B2.10%3B22000414%3B206032067%3B19.50%3B215000000%3B78.20%3B%3B%3B467700000000%3B78100000000%3B297800000000%3B242600000000%3B3256000000000%3B14540000%3B5322000%3B15690000%3B2648000%3B28210000000%3B457030418%3B%3B222293%3B%3B238763162%3B314644700%3B1.48%3B9.50%0AFalkland%20Islands%20(Islas%20Malvinas)%3B12173%3B%3B%3B%3B%3B17720000%3B19060000%3B82000000%3B75000000%3B25000%3B%3B%3B%3B%3B440%3B53000000%3B%3B%3B3.60%3B%3B%3B%3B1100%3B%3B%3B%3B%3B%3B%3B%3B%3B200%3B%3B%3B0%3B%3B2967%3B%3B%3B%3B2400%3B0%3B%3B%0AFaroe%20Islands%3B1399%3B13.97%3B%3B8.69%3B64000000%3B204600000%3B220000000%3B408000000%3B1000000000%3B22000%3B10.00%3B%3B%3B%3B463%3B466000000%3B8.00%3B6.24%3B5.10%3B%3B25000%3B%3B24250%3B79.21%3B%3B%3B%3B%3B%3B%3B%3B4500%3B%3B%3B0%3B%3B46962%3B%3B%3B%3B23000%3B30700%3B2.20%3B1.00%0AFiji%3B18270%3B22.73%3B%3B5.65%3B188100000%3B697500000%3B750000000%3B609000000%3B5173000000%3B5900%3B3.60%3B0.10%3B200%3B600%3B3440%3B835000000%3B%3B12.62%3B1.60%3B493%3B55000%3B%3B137000%3B69.53%3B36000000%3B2.20%3B%3B%3B%3B%3B%3B5700%3B%3B%3B0%3B%3B893354%3B%3B597%3B%3B102000%3B109900%3B2.75%3B7.60%0AFinland%3B338145%3B10.50%3B11390000000%3B9.79%3B30000000000%3B78580000000%3B71590000000%3B61040000000%3B151200000000%3B29000%3B3.00%3B0.10%3B100%3B1500%3B78197%3B45170000000%3B2.00%3B3.57%3B0.70%3B1219173%3B2650000%3B18.30%3B2660000%3B78.35%3B1800000000%3B2.00%3B4557000000%3B0%3B4567000000%3B0%3B%3B211400%3B101000%3B318300%3B0%3B%3B5223442%3B46.80%3B5851%3B11170000000%3B2548000%3B4700000%3B1.73%3B8.90%0AFrance%3B547030%3B12.15%3B-305000000%3B9.08%3B%3B414700000000%3B528600000000%3B419000000000%3B1737000000000%3B28700%3B2.10%3B0.40%3B1000%3B120000%3B893100%3B419700000000%3B1.70%3B4.26%3B2.30%3B2396761%3B21900000%3B19.20%3B27700000%3B79.60%3B45238100000%3B2.60%3B42010000000%3B1725000000%3B40260000000%3B1898000000%3B12860000000%3B2026000%3B409600%3B2281000%3B34920%3B144300000%3B60656178%3B67.70%3B32175%3B70760000000%3B33905400%3B41683100%3B1.85%3B10.10%0AFrench%20Guiana%3B91000%3B20.70%3B%3B4.85%3B1200000000%3B427900000%3B460100000%3B155000000%3B1551000000%3B8300%3B%3B%3B%3B%3B817%3B625000000%3B%3B12.07%3B1.50%3B%3B3200%3B%3B58800%3B77.09%3B%3B%3B%3B%3B%3B%3B%3B6500%3B%3B%3B0%3B%3B195506%3B%3B%3B%3B51000%3B138200%3B3.01%3B22.00%0AFrench%20Polynesia%3B4167%3B16.93%3B%3B4.63%3B%3B353400000%3B380000000%3B244000000%3B4580000000%3B17500%3B%3B%3B%3B%3B2590%3B1341000000%3B%3B8.44%3B1.50%3B5123%3B35000%3B%3B70000%3B75.90%3B%3B%3B%3B%3B%3B%3B%3B4750%3B%3B%3B0%3B%3B270485%3B%3B%3B%3B52500%3B90000%3B2.04%3B11.80%0AFrench%20Southern%20and%20Antarctic%20Lands%3B7829%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AGabon%3B267667%3B36.24%3B196800000%3B11.72%3B3804000000%3B1080000000%3B1161000000%3B3710000000%3B7966000000%3B5900%3B1.90%3B8.10%3B3000%3B48000%3B8464%3B1225000000%3B1.60%3B53.64%3B1.50%3B93%3B35000%3B21.80%3B650000%3B55.75%3B184800000%3B2.00%3B80000000%3B0%3B0%3B80000000%3B66470000000%3B13000%3B%3B%3B264900%3B2022000000%3B1389201%3B29.30%3B814%3B268600000%3B38400%3B300000%3B4.77%3B21.00%0AGambia%20The%3B11300%3B39.86%3B-16400000%3B11.81%3B476000000%3B83990000%3B90310000%3B114400000%3B2799000000%3B1800%3B6.00%3B1.20%3B600%3B6800%3B2700%3B180900000%3B%3B72.02%3B7.00%3B568%3B25000%3B25.30%3B400000%3B55.20%3B1000000%3B0.30%3B%3B%3B%3B%3B%3B1900%3B%3B%3B0%3B%3B1593256%3B%3B%3B113100000%3B38400%3B100000%3B5.38%3B%0AGaza%20Strip%3B360%3B40.03%3B%3B3.87%3B108000000%3B%3B%3B205000000%3B768000000%3B600%3B4.50%3B%3B%3B%3B%3B1900000000%3B%3B22.93%3B2.20%3B%3B60000%3B%3B725000%3B71.79%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B1376289%3B%3B%3B%3B95729%3B320000%3B5.91%3B50.00%0AGeorgia%3B69700%3B10.25%3B-632900000%3B9.09%3B1800000000%3B6811000000%3B6732000000%3B909400000%3B14450000000%3B3100%3B9.50%3B0.10%3B200%3B3000%3B20229%3B1806000000%3B3.00%3B18.59%3B5.50%3B5160%3B150500%3B18.50%3B2100000%3B75.88%3B23000000%3B0.59%3B1160000000%3B0%3B1100000000%3B60000000%3B%3B31500%3B%3B%3B2000%3B%3B4677401%3B%3B1612%3B231400000%3B650500%3B522300%3B1.41%3B17.00%0AGermany%3B357021%3B8.33%3B73590000000%3B10.55%3B%3B519500000000%3B560000000000%3B893300000000%3B2362000000000%3B28700%3B1.70%3B0.10%3B1000%3B43000%3B230735%3B716700000000%3B2.20%3B4.16%3B1.60%3B2686119%3B39000000%3B17.60%3B42630000%3B78.65%3B35063000000%3B1.50%3B99550000000%3B7731000000%3B85020000000%3B21000000000%3B293000000000%3B2891000%3B12990%3B2135000%3B74100%3B395800000%3B82431390%3B65.80%3B46039%3B96840000000%3B54350000%3B64800000%3B1.39%3B10.60%0AGhana%3B239460%3B23.97%3B83870000%3B10.84%3B7396000000%3B6137000000%3B6922000000%3B3010000000%3B48270000000%3B2300%3B5.40%3B3.10%3B30000%3B350000%3B46176%3B3699000000%3B3.80%3B51.43%3B13.00%3B407%3B170000%3B19.70%3B10240000%3B56.00%3B49200000%3B0.60%3B%3B%3B%3B%3B11890000000%3B38000%3B%3B%3B7000%3B8255000%3B21029853%3B%3B953%3B1267000000%3B302300%3B799900%3B3.02%3B20.00%0AGibraltar%3B7%3B10.87%3B%3B9.18%3B%3B96760000%3B104000000%3B136000000%3B769000000%3B27900%3B%3B%3B%3B%3B29%3B1743000000%3B%3B5.13%3B1.50%3B%3B6200%3B%3B14800%3B79.67%3B%3B%3B%3B%3B%3B%3B%3B42000%3B%3B%3B0%3B%3B27884%3B%3B%3B%3B24512%3B9797%3B1.65%3B2.00%0AGlorioso%20Islands%3B5%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AGreece%3B131940%3B9.72%3B-8000000000%3B10.15%3B67230000000%3B47420000000%3B47220000000%3B15500000000%3B226400000000%3B21300%3B3.70%3B0.20%3B100%3B9100%3B117000%3B54280000000%3B4.10%3B5.53%3B2.90%3B208977%3B1718400%3B27.00%3B4400000%3B79.09%3B5890000000%3B4.30%3B2021000000%3B0%3B2018000000%3B35000000%3B254900000%3B405700%3B84720%3B468300%3B5992%3B4500000%3B10668354%3B112.00%3B2571%3B7300000000%3B5205100%3B8936200%3B1.33%3B10.00%0AGreenland%3B2166086%3B15.93%3B%3B7.77%3B25000000%3B227900000%3B245000000%3B388000000%3B1100000000%3B20000%3B1.80%3B%3B%3B100%3B%3B445000000%3B%3B15.82%3B1.60%3B2642%3B20000%3B%3B24500%3B69.65%3B%3B%3B%3B%3B%3B%3B%3B3700%3B%3B%3B0%3B%3B56375%3B%3B%3B%3B26000%3B16747%3B2.41%3B10.00%0AGrenada%3B344%3B22.30%3B%3B7.17%3B196000000%3B138600000%3B149000000%3B46000000%3B440000000%3B5000%3B2.50%3B%3B%3B%3B1040%3B208000000%3B0.70%3B14.62%3B2.80%3B18%3B15000%3B%3B42300%3B64.53%3B%3B%3B%3B%3B%3B%3B%3B1000%3B%3B%3B0%3B%3B89502%3B%3B%3B%3B33500%3B7600%3B2.37%3B12.50%0AGuadeloupe%3B1780%3B15.42%3B%3B6.06%3B%3B1079000000%3B1160000000%3B140000000%3B3513000000%3B7900%3B%3B%3B%3B%3B947%3B1700000000%3B%3B8.60%3B%3B%3B20000%3B%3B125900%3B77.90%3B%3B%3B%3B%3B%3B%3B%3B13000%3B%3B%3B0%3B%3B448713%3B%3B%3B%3B210000%3B323500%3B1.91%3B27.80%0AGuam%3B549%3B19.03%3B%3B4.41%3B%3B776600000%3B835000000%3B38000000%3B3200000000%3B21000%3B%3B%3B%3B%3B977%3B462000000%3B%3B6.94%3B0.00%3B%3B50000%3B%3B60000%3B78.40%3B%3B%3B%3B%3B%3B%3B%3B20000%3B%3B%3B0%3B%3B168564%3B%3B%3B%3B84134%3B32600%3B2.60%3B15.00%0AGuatemala%3B108890%3B34.11%3B-1381000000%3B6.81%3B5969000000%3B5760000000%3B6608000000%3B2911000000%3B59470000000%3B4200%3B2.60%3B1.10%3B5800%3B78000%3B14118%3B7770000000%3B4.10%3B35.93%3B7.20%3B20360%3B400000%3B14.90%3B3680000%3B65.14%3B201900000%3B0.80%3B%3B%3B%3B%3B1543000000%3B61000%3B3104%3B%3B25000%3B263000000%3B14655189%3B32.00%3B886%3B3084000000%3B846000%3B1577100%3B4.53%3B7.50%0AGuernsey%3B78%3B9.01%3B%3B9.95%3B%3B%3B%3B%3B2590000000%3B40000%3B3.00%3B%3B%3B%3B%3B%3B%3B4.71%3B4.90%3B%3B%3B%3B32290%3B80.30%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B65228%3B%3B%3B%3B55000%3B31500%3B1.38%3B0.50%0AGuinea%3B245857%3B42.03%3B-308300000%3B15.38%3B3250000000%3B795200000%3B855000000%3B709200000%3B19500000000%3B2100%3B1.00%3B3.20%3B9000%3B140000%3B30500%3B641500000%3B3.20%3B90.37%3B18.00%3B380%3B40000%3B21.00%3B3000000%3B49.86%3B56700000%3B1.70%3B%3B%3B%3B%3B%3B8600%3B%3B%3B0%3B%3B9467866%3B%3B837%3B201700000%3B26200%3B111500%3B5.83%3B%0AGuinea-Bissau%3B36120%3B37.65%3B%3B16.53%3B941500000%3B51150000%3B55000000%3B54000000%3B1008000000%3B700%3B2.60%3B10.00%3B1200%3B17000%3B4400%3B104000000%3B2.60%3B107.17%3B4.00%3B2%3B19000%3B%3B480000%3B46.97%3B8900000%3B3.10%3B%3B%3B%3B%3B%3B2500%3B%3B%3B0%3B%3B1416027%3B%3B%3B%3B10600%3B1300%3B4.93%3B%0AGuyana%3B214970%3B18.45%3B-129400000%3B8.32%3B1200000000%3B751400000%3B808000000%3B570200000%3B2899000000%3B3800%3B1.90%3B2.50%3B1100%3B11000%3B7970%3B650100000%3B7.10%3B33.26%3B4.50%3B613%3B125000%3B34.50%3B418000%3B65.50%3B6500000%3B0.90%3B%3B%3B%3B%3B%3B11000%3B%3B%3B0%3B%3B765283%3B%3B187%3B280600000%3B80400%3B87300%3B2.05%3B%0AHaiti%3B27750%3B36.59%3B-27630000%3B12.34%3B1200000000%3B574700000%3B618000000%3B338100000%3B12050000000%3B1500%3B-3.50%3B5.60%3B24000%3B280000%3B4160%3B1085000000%3B%3B73.45%3B22.00%3B%3B80000%3B%3B3600000%3B52.92%3B26000000%3B0.90%3B%3B%3B%3B%3B%3B11000%3B%3B%3B0%3B%3B8121622%3B%3B%3B80640000%3B130000%3B140000%3B5.02%3B%0AHeard%20Island%20and%20McDonald%20Islands%3B412%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AHoly%20See%20(Vatican%20City)%3B0%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B9%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B921%3B%3B%3B%3B%3B%3B%3B%0AHonduras%3B112090%3B30.38%3B258300000%3B6.87%3B5365000000%3B3771000000%3B3626000000%3B1457000000%3B18790000000%3B2800%3B4.20%3B1.80%3B4100%3B63000%3B13603%3B3332000000%3B7.70%3B29.32%3B7.00%3B1944%3B168600%3B24.10%3B2470000%3B65.60%3B100600000%3B1.40%3B%3B%3B%3B%3B%3B29000%3B%3B%3B0%3B%3B6975204%3B74.10%3B699%3B1464000000%3B322500%3B326500%3B3.87%3B28.50%0AHong%20Kong%3B1092%3B7.23%3B14850000000%3B5.98%3B417600000000%3B38450000000%3B35510000000%3B268100000000%3B234500000000%3B34200%3B7.90%3B0.10%3B200%3B2600%3B1831%3B275900000000%3B1.00%3B2.97%3B-0.30%3B591993%3B3212800%3B22.70%3B3540000%3B81.39%3B%3B%3B680900000%3B0%3B680900000%3B%3B%3B257000%3B%3B%3B0%3B%3B6898686%3B2.10%3B%3B123600000000%3B3801300%3B7241400%3B0.91%3B6.70%0AHowland%20Island%3B2%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AHungary%3B93030%3B9.76%3B-7941000000%3B13.19%3B57000000000%3B35990000000%3B34070000000%3B54620000000%3B149300000000%3B14900%3B3.90%3B0.10%3B100%3B2800%3B159568%3B58680000000%3B9.60%3B8.57%3B7.00%3B383071%3B1600000%3B22.80%3B4170000%3B72.40%3B1080000000%3B1.75%3B13370000000%3B4000000%3B9587000000%3B3231000000%3B50450000000%3B140700%3B47180%3B136600%3B41190%3B110700000%3B10006835%3B58.30%3B7937%3B14800000000%3B3666400%3B6862800%3B1.32%3B5.90%0AIceland%3B103000%3B13.73%3B-570000000%3B6.68%3B3073000000%3B7692000000%3B8271000000%3B2902000000%3B9373000000%3B31900%3B1.80%3B0.20%3B100%3B220%3B13004%3B3307000000%3B8.80%3B3.31%3B4.00%3B122175%3B195000%3B23.80%3B158100%3B80.19%3B%3B%3B%3B%3B%3B%3B%3B16300%3B0%3B15470%3B0%3B%3B296737%3B35.90%3B%3B935000000%3B190700%3B279100%3B1.92%3B3.10%0AIndia%3B3287590%3B22.32%3B4897000000%3B8.28%3B117200000000%3B510100000000%3B547200000000%3B69180000000%3B3319000000000%3B3100%3B6.20%3B0.90%3B310000%3B5100000%3B2525989%3B89330000000%3B7.40%3B56.29%3B4.20%3B86871%3B18481000%3B23.80%3B482200000%3B64.35%3B16970000000%3B2.50%3B22750000000%3B0%3B0%3B22750000000%3B542400000000%3B2130000%3B%3B%3B780000%3B5700000000%3B1080264388%3B59.70%3B63140%3B126000000000%3B48917000%3B26154400%3B2.78%3B9.20%0AIndonesia%3B1919440%3B20.71%3B7338000000%3B6.25%3B141500000000%3B92350000000%3B110200000000%3B69860000000%3B827400000000%3B3500%3B4.90%3B0.10%3B2400%3B110000%3B342700%3B45070000000%3B10.50%3B35.60%3B6.10%3B62036%3B8000000%3B16.60%3B111500000%3B69.57%3B1300000000%3B3.00%3B55300000000%3B39700000000%3B0%3B77600000000%3B2549000000000%3B1183000%3B518100%3B370500%3B971000%3B4900000000%3B241973879%3B56.20%3B6458%3B35820000000%3B7750000%3B11700000%3B2.44%3B9.20%0AIran%3B1648000%3B16.83%3B2100000000%3B5.55%3B13400000000%3B119900000000%3B129000000000%3B38790000000%3B516700000000%3B7700%3B6.30%3B0.10%3B800%3B31000%3B167157%3B31300000000%3B3.50%3B41.58%3B15.50%3B5269%3B4300000%3B31.30%3B23000000%3B69.96%3B4300000000%3B3.30%3B72400000000%3B3400000000%3B4920000000%3B79000000000%3B26700000000000%3B1400000%3B2500000%3B%3B3962000%3B130800000000%3B68017860%3B27.00%3B7203%3B29870000000%3B14571100%3B3376500%3B1.82%3B11.20%0AIraq%3B437072%3B32.50%3B-560000000%3B5.49%3B125000000000%3B33700000000%3B32600000000%3B10100000000%3B89800000000%3B3500%3B52.30%3B0.10%3B%3B500%3B45550%3B9900000000%3B%3B50.25%3B25.40%3B%3B25000%3B%3B6700000%3B68.70%3B1300000000%3B%3B2350000000%3B0%3B0%3B2350000000%3B3149000000000%3B383000%3B1490000%3B%3B2250000%3B112500000000%3B26074906%3B%3B1963%3B%3B675000%3B20000%3B4.28%3B25.00%0AIreland%3B70280%3B14.47%3B-2881000000%3B7.85%3B11000000000%3B21780000000%3B22880000000%3B103800000000%3B126400000000%3B31900%3B5.10%3B0.10%3B100%3B2800%3B95736%3B60650000000%3B7.00%3B5.39%3B2.20%3B162228%3B1260000%3B23.80%3B1920000%3B77.56%3B700000000%3B0.90%3B4199000000%3B0%3B3384000000%3B815000000%3B9911000000%3B174400%3B27450%3B178600%3B0%3B0%3B4015676%3B31.20%3B3312%3B4152000000%3B1955000%3B3400000%3B1.87%3B4.30%0AIsrael%3B20770%3B18.21%3B211900000%3B6.18%3B74460000000%3B38300000000%3B42670000000%3B34410000000%3B129000000000%3B20800%3B3.90%3B0.10%3B100%3B3000%3B16903%3B36840000000%3B4.50%3B7.03%3B0.00%3B437516%3B2000000%3B17.60%3B2680000%3B79.32%3B9110000000%3B8.70%3B10000000%3B0%3B0%3B10000000%3B20810000000%3B260000%3B%3B%3B80%3B1920000%3B6276883%3B104.50%3B640%3B28480000000%3B3006000%3B6334000%3B2.44%3B10.70%0AItaly%3B301230%3B8.89%3B-21100000000%3B10.30%3B913900000000%3B293900000000%3B261600000000%3B336400000000%3B1609000000000%3B27700%3B1.30%3B0.50%3B1000%3B140000%3B479688%3B329300000000%3B0.70%3B5.94%3B2.30%3B1437511%3B18500000%3B19.30%3B24270000%3B79.68%3B28182800000%3B1.80%3B71180000000%3B61000000%3B54780000000%3B15490000000%3B209700000000%3B1866000%3B456600%3B2158000%3B79460%3B586600000%3B58103033%3B105.60%3B19507%3B61500000000%3B26596000%3B55918000%3B1.28%3B8.60%0AJamaica%3B10991%3B16.56%3B-830700000%3B5.37%3B5964000000%3B5849000000%3B6289000000%3B1679000000%3B11130000000%3B4100%3B1.90%3B1.20%3B900%3B22000%3B18700%3B3624000000%3B-2.00%3B12.36%3B12.40%3B1480%3B600000%3B32.00%3B1140000%3B76.29%3B31200000%3B0.40%3B%3B%3B%3B%3B%3B66000%3B%3B%3B0%3B%3B2731832%3B146.10%3B272%3B1400000000%3B444400%3B1400000%3B1.95%3B15.00%0AJan%20Mayen%3B373%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AJapan%3B377835%3B9.47%3B170200000000%3B8.95%3B%3B971000000000%3B1044000000000%3B538800000000%3B3745000000000%3B29400%3B2.90%3B0.10%3B500%3B12000%3B1171647%3B401800000000%3B6.60%3B3.26%3B-0.10%3B12962065%3B57200000%3B24.00%3B66970000%3B81.15%3B45841000000%3B1.00%3B80420000000%3B0%3B77730000000%3B2519000000%3B20020000000%3B5290000%3B93360%3B5449000%3B17330%3B29290000%3B127417244%3B164.30%3B23705%3B664600000000%3B71149000%3B86658600%3B1.39%3B4.70%0AJarvis%20Island%3B5%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AJersey%3B116%3B9.66%3B%3B9.19%3B%3B630100000%3B%3B%3B3600000000%3B40000%3B%3B%3B%3B%3B577%3B%3B%3B5.24%3B5.30%3B%3B%3B%3B52790%3B79.24%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B90812%3B%3B%3B%3B73900%3B61400%3B1.57%3B0.90%0AJohnston%20Atoll%3B3%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B361%3B%3B%3B%3B%3B%3B%3B%0AJordan%3B92300%3B21.76%3B203200000%3B2.63%3B7320000000%3B7094000000%3B7307000000%3B3200000000%3B25500000000%3B4500%3B5.10%3B0.10%3B500%3B600%3B7301%3B7600000000%3B5.00%3B17.35%3B3.20%3B3160%3B457000%3B11.60%3B1410000%3B78.24%3B1460000000%3B14.60%3B290000000%3B0%3B0%3B290000000%3B3256000000%3B103000%3B0%3B100000%3B40%3B445000%3B5759732%3B85.80%3B505%3B5457000000%3B622600%3B1325300%3B2.71%3B15.00%0AJuan%20de%20Nova%20Island%3B4%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AKazakhstan%3B2717300%3B15.78%3B-39020000%3B9.46%3B26030000000%3B62210000000%3B66820000000%3B18470000000%3B118400000000%3B7800%3B9.10%3B0.20%3B200%3B16500%3B82980%3B13070000000%3B10.60%3B29.21%3B6.90%3B21984%3B250000%3B23.90%3B7950000%3B66.55%3B221800000%3B0.90%3B14300000000%3B11010000000%3B8696000000%3B11600000000%3B1800000000000%3B189400%3B890000%3B47000%3B1200000%3B26000000000%3B15185844%3B13.70%3B13601%3B14350000000%3B2081900%3B1027000%3B1.89%3B8.00%0AKenya%3B582650%3B40.13%3B-459200000%3B14.65%3B6792000000%3B4337000000%3B4475000000%3B2589000000%3B34680000000%3B1100%3B2.20%3B6.70%3B150000%3B1200000%3B63942%3B4190000000%3B2.60%3B61.47%3B9.00%3B8325%3B400000%3B14.70%3B11400000%3B47.99%3B177100000%3B1.30%3B%3B%3B%3B%3B%3B57000%3B%3B%3B0%3B%3B33829590%3B74.30%3B2778%3B1500000000%3B328400%3B1590800%3B4.96%3B40.00%0AKingman%20Reef%3B1%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AKiribati%3B811%3B30.86%3B%3B8.37%3B10000000%3B6510000%3B7000000%3B35000000%3B79000000%3B800%3B1.50%3B%3B%3B%3B670%3B83000000%3B0.70%3B48.52%3B2.50%3B%3B2000%3B%3B7870%3B61.71%3B%3B%3B%3B%3B%3B%3B%3B190%3B%3B%3B0%3B%3B103092%3B%3B%3B%3B4500%3B500%3B4.20%3B2.00%0AKorea%20North%3B120540%3B16.09%3B%3B7.05%3B12000000000%3B31260000000%3B33620000000%3B1200000000%3B30880000000%3B1400%3B1.00%3B%3B%3B%3B31200%3B2100000000%3B%3B24.04%3B%3B%3B%3B%3B9600000%3B71.37%3B5217400000%3B%3B%3B%3B%3B%3B%3B85000%3B%3B11500%3B0%3B%3B22912177%3B%3B5214%3B%3B1100000%3B%3B2.15%3B%0AKorea%20South%3B98480%3B10.08%3B26780000000%3B6.26%3B160000000000%3B293600000000%3B322500000000%3B250600000000%3B925100000000%3B19200%3B4.60%3B0.10%3B200%3B8300%3B86990%3B214200000000%3B10.10%3B7.05%3B3.60%3B694206%3B29220000%3B28.70%3B22900000%3B75.82%3B16180000000%3B2.80%3B20920000000%3B0%3B21110000000%3B0%3B%3B2070000%3B630100%3B2263000%3B0%3B%3B48422644%3B21.30%3B3125%3B199100000000%3B22877000%3B33591800%3B1.26%3B3.60%0AKuwait%3B17820%3B21.88%3B12040000000%3B2.42%3B15020000000%3B30160000000%3B32430000000%3B27420000000%3B48000000000%3B21300%3B6.80%3B0.12%3B%3B%3B4450%3B11120000000%3B-5.00%3B9.95%3B2.30%3B3437%3B567000%3B8.00%3B1420000%3B77.03%3B2584500000%3B5.30%3B8700000000%3B0%3B0%3B8700000000%3B1548000000000%3B293000%3B1970000%3B%3B2319000%3B96500000000%3B2335648%3B29.60%3B%3B7333000000%3B486900%3B1420000%3B2.97%3B2.20%0AKyrgyzstan%3B198500%3B22.48%3B-87920000%3B7.13%3B1970000000%3B10210000000%3B11720000000%3B646700000%3B8495000000%3B1700%3B6.00%3B0.10%3B200%3B3900%3B18500%3B775100000%3B6.00%3B35.64%3B3.20%3B12299%3B152000%3B17.00%3B2700000%3B68.16%3B19200000%3B1.40%3B2016000000%3B0%3B2000000000%3B16000000%3B%3B20000%3B%3B%3B2000%3B%3B5146281%3B%3B470%3B498700000%3B394800%3B53100%3B2.70%3B18.00%0ALaos%3B236800%3B35.99%3B-80760000%3B11.83%3B2490000000%3B3036000000%3B3560000000%3B365500000%3B11280000000%3B1900%3B6.00%3B0.10%3B200%3B1700%3B21716%3B579500000%3B9.70%3B85.22%3B12.30%3B937%3B15000%3B%3B2600000%3B55.08%3B10700000%3B0.50%3B%3B%3B%3B%3B%3B2750%3B%3B%3B0%3B%3B6217141%3B%3B%3B193100000%3B61900%3B55200%3B4.77%3B5.70%0ALatvia%3B64589%3B9.04%3B-1251000000%3B13.70%3B7368000000%3B5829000000%3B4547000000%3B3569000000%3B26530000000%3B11500%3B7.60%3B0.60%3B500%3B7600%3B60472%3B5970000000%3B8.50%3B9.55%3B6.00%3B51758%3B936000%3B26.10%3B1170000%3B71.05%3B87000000%3B1.20%3B1700000000%3B0%3B1700000000%3B0%3B%3B44000%3B%3B%3B0%3B%3B2290237%3B11.80%3B2303%3B1650000000%3B653900%3B1219600%3B1.26%3B8.80%0ALebanon%3B10400%3B18.88%3B-2389000000%3B6.24%3B15840000000%3B8591000000%3B8066000000%3B1783000000%3B18830000000%3B5000%3B4.00%3B0.10%3B200%3B2800%3B7300%3B8162000000%3B%3B24.52%3B2.00%3B6998%3B400000%3B26.00%3B2600000%3B72.63%3B540600000%3B3.10%3B%3B%3B%3B%3B%3B107000%3B%3B%3B0%3B%3B3826018%3B177.90%3B401%3B16300000000%3B678800%3B775100%3B1.92%3B18.00%0ALesotho%3B30355%3B26.53%3B-108300000%3B25.03%3B735000000%3B308000000%3B314000000%3B484500000%3B5892000000%3B3200%3B3.30%3B28.90%3B29000%3B320000%3B5940%3B730900000%3B15.50%3B84.23%3B5.30%3B119%3B21000%3B39.60%3B838000%3B36.68%3B32300000%3B2.30%3B%3B%3B%3B%3B%3B1500%3B%3B%3B0%3B%3B1867035%3B%3B%3B402200000%3B28600%3B92000%3B3.35%3B45.00%0ALiberia%3B111370%3B44.22%3B%3B17.87%3B2100000000%3B454600000%3B488800000%3B1079000000%3B2903000000%3B900%3B21.80%3B5.90%3B7200%3B100000%3B10600%3B5051000000%3B%3B128.87%3B15.00%3B14%3B1000%3B%3B%3B47.69%3B1500000%3B0.20%3B%3B%3B%3B%3B%3B3100%3B%3B%3B0%3B%3B3482211%3B%3B490%3B%3B7000%3B2000%3B6.09%3B85.00%0ALibya%3B1759540%3B26.82%3B9895000000%3B3.48%3B4069000000%3B19430000000%3B20890000000%3B18650000000%3B37480000000%3B6700%3B4.90%3B0.30%3B%3B10000%3B83200%3B7224000000%3B%3B24.60%3B2.90%3B67%3B160000%3B9.90%3B1590000%3B76.50%3B1300000000%3B3.90%3B5410000000%3B770000000%3B0%3B6180000000%3B1321000000000%3B216000%3B%3B%3B1518000%3B38000000000%3B5765563%3B8.80%3B%3B24180000000%3B750000%3B100000%3B3.34%3B30.00%0ALiechtenstein%3B160%3B10.41%3B%3B7.06%3B0%3B%3B%3B2470000000%3B825000000%3B25000%3B11.00%3B%3B%3B%3B250%3B917300000%3B%3B4.70%3B1.00%3B3727%3B20000%3B%3B29000%3B79.55%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B33717%3B%3B%3B%3B19900%3B11400%3B1.51%3B1.30%0ALithuania%3B65200%3B8.62%3B-1600000000%3B10.92%3B10010000000%3B10170000000%3B17930000000%3B8880000000%3B45230000000%3B12500%3B6.60%3B0.10%3B200%3B1300%3B77148%3B11020000000%3B12.00%3B6.89%3B1.10%3B67769%3B695700%3B21.90%3B1630000%3B73.97%3B230800000%3B1.90%3B2760000000%3B0%3B2760000000%3B0%3B%3B72000%3B%3B%3B4594%3B%3B3596617%3B25.20%3B1998%3B4610000000%3B824200%3B2169900%3B1.19%3B8.00%0ALuxembourg%3B2586%3B12.06%3B%3B8.41%3B%3B5735000000%3B2511000000%3B13400000000%3B27270000000%3B58900%3B2.30%3B0.20%3B100%3B500%3B5210%3B16300000000%3B2.90%3B4.81%3B2.40%3B28214%3B165000%3B19.80%3B293700%3B78.74%3B231600000%3B0.90%3B865000000%3B0%3B867000000%3B0%3B%3B50650%3B634%3B50700%3B0%3B%3B468571%3B%3B274%3B%3B355400%3B473000%3B1.79%3B4.50%0AMacau%3B25%3B8.04%3B%3B4.23%3B2700000000%3B1772000000%3B1719000000%3B2580000000%3B9100000000%3B19400%3B15.60%3B%3B%3B%3B341%3B2760000000%3B%3B4.39%3B2.00%3B89%3B120000%3B%3B231500%3B82.03%3B%3B%3B%3B%3B%3B%3B%3B11190%3B%3B%3B0%3B%3B449198%3B%3B%3B%3B174600%3B364000%3B0.93%3B4.70%0AMacedonia%3B25333%3B12.00%3B-311000000%3B8.73%3B1863000000%3B7216000000%3B6273000000%3B1629000000%3B14400000000%3B7100%3B1.30%3B0.10%3B100%3B200%3B8684%3B2677000000%3B0.00%3B10.09%3B0.40%3B3738%3B100000%3B17.50%3B855000%3B73.73%3B200000000%3B6.00%3B%3B%3B%3B%3B%3B22000%3B%3B%3B0%3B%3B2045262%3B20.00%3B699%3B928000000%3B560000%3B365300%3B1.57%3B37.70%0AMadagascar%3B587040%3B41.66%3B-281900000%3B11.35%3B4600000000%3B781400000%3B840200000%3B868200000%3B14560000000%3B800%3B5.50%3B1.70%3B7500%3B140000%3B49827%3B1147000000%3B3.00%3B76.83%3B7.50%3B773%3B70500%3B14.70%3B7300000%3B56.95%3B44600000%3B1.20%3B%3B%3B%3B%3B0%3B13000%3B%3B%3B0%3B0%3B18040341%3B%3B732%3B500300000%3B59600%3B279500%3B5.66%3B%0AMalawi%3B118480%3B43.95%3B-55500000%3B23.39%3B3129000000%3B1012000000%3B1088000000%3B503400000%3B7410000000%3B600%3B4.00%3B14.20%3B84000%3B900000%3B28400%3B521100000%3B1.40%3B103.32%3B12.00%3B18%3B36000%3B10.70%3B4500000%3B36.97%3B11100000%3B0.70%3B%3B%3B%3B%3B%3B5400%3B%3B%3B0%3B%3B12158924%3B228.30%3B797%3B160500000%3B85000%3B135100%3B5.98%3B%0AMalaysia%3B329750%3B23.07%3B11810000000%3B5.06%3B53360000000%3B68400000000%3B75330000000%3B123500000000%3B229300000000%3B9700%3B7.10%3B0.40%3B2000%3B52000%3B65877%3B99300000000%3B10.20%3B17.70%3B1.30%3B107971%3B8692100%3B21.70%3B10490000%3B72.24%3B1690000000%3B2.03%3B31250000000%3B22410000000%3B0%3B53660000000%3B2230000000000%3B460000%3B230200%3B%3B785000%3B3200000000%3B23953136%3B45.40%3B2418%3B55270000000%3B4571600%3B11124100%3B3.07%3B3.00%0AMaldives%3B300%3B35.43%3B%3B7.24%3B281000000%3B115700000%3B124400000%3B90000000%3B1250000000%3B3900%3B2.30%3B0.10%3B%3B100%3B%3B392000000%3B4.40%3B56.52%3B1.00%3B532%3B15000%3B%3B88000%3B64.06%3B41100000%3B5.50%3B%3B%3B%3B%3B%3B3200%3B%3B%3B0%3B%3B349106%3B%3B%3B%3B28700%3B41900%3B5.02%3B%0AMali%3B1240000%3B46.77%3B%3B19.05%3B3300000000%3B651000000%3B700000000%3B915000000%3B11000000000%3B900%3B4.00%3B1.90%3B12000%3B140000%3B15100%3B927000000%3B%3B116.79%3B4.50%3B187%3B25000%3B%3B3930000%3B45.09%3B22400000%3B0.40%3B%3B%3B%3B%3B%3B4000%3B%3B%3B0%3B%3B12291529%3B%3B729%3B%3B56600%3B250000%3B6.50%3B5.30%0AMalta%3B316%3B10.17%3B-241000000%3B8.00%3B130000000%3B2000000000%3B2150000000%3B2625000000%3B7223000000%3B18200%3B1.00%3B0.20%3B100%3B500%3B2222%3B3407000000%3B%3B3.89%3B2.90%3B7156%3B120000%3B26.40%3B160000%3B78.86%3B31100000%3B0.70%3B%3B%3B%3B%3B%3B20000%3B%3B%3B0%3B%3B398534%3B%3B%3B2865000000%3B208300%3B290000%3B1.50%3B7.00%0AMan%20Isle%20of%3B572%3B11.18%3B%3B11.26%3B%3B%3B%3B%3B2113000000%3B28500%3B%3B%3B%3B%3B800%3B%3B3.20%3B5.93%3B3.60%3B%3B%3B%3B39690%3B78.34%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B75049%3B%3B61%3B%3B51000%3B%3B1.65%3B0.60%0AMarshall%20Islands%3B181%3B33.52%3B%3B4.88%3B86500000%3B%3B%3B9000000%3B115000000%3B1600%3B1.00%3B%3B%3B%3B65%3B54000000%3B%3B29.45%3B2.00%3B6%3B1400%3B%3B28700%3B70.01%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B59071%3B%3B%3B%3B4500%3B600%3B3.93%3B30.90%0AMartinique%3B1100%3B14.14%3B%3B6.44%3B180000000%3B1095000000%3B1178000000%3B250000000%3B6117000000%3B14400%3B%3B%3B%3B%3B2105%3B2000000000%3B%3B7.09%3B3.90%3B%3B40000%3B%3B165900%3B79.04%3B%3B%3B%3B%3B%3B%3B%3B13500%3B%3B%3B0%3B%3B432900%3B%3B%3B%3B172000%3B319900%3B1.79%3B27.20%0AMauritania%3B1030700%3B41.43%3B%3B12.44%3B2500000000%3B176900000%3B190200000%3B541000000%3B5534000000%3B1800%3B3.00%3B0.60%3B%3B9500%3B7660%3B860000000%3B2.00%3B70.89%3B7.00%3B25%3B10000%3B%3B786000%3B52.73%3B20800000%3B1.70%3B%3B%3B%3B%3B%3B24000%3B%3B%3B0%3B%3B3086859%3B%3B%3B%3B31500%3B300000%3B5.94%3B20.00%0AMauritius%3B2040%3B15.62%3B284100000%3B6.83%3B1780000000%3B1707000000%3B1836000000%3B2012000000%3B15680000000%3B12800%3B4.70%3B0.10%3B100%3B700%3B2000%3B2245000000%3B8.00%3B15.03%3B4.50%3B3985%3B150000%3B22.50%3B560000%3B72.38%3B12500000%3B0.20%3B%3B%3B%3B%3B%3B21000%3B%3B%3B0%3B%3B1230602%3B29.20%3B%3B1676000000%3B348200%3B462400%3B1.96%3B10.80%0AMayotte%3B374%3B41.58%3B%3B7.90%3B%3B%3B%3B3440000%3B466800000%3B2600%3B%3B%3B%3B%3B93%3B141300000%3B%3B62.40%3B%3B%3B%3B%3B48800%3B61.39%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B193633%3B%3B%3B%3B10000%3B21700%3B5.89%3B38.00%0AMexico%3B1972550%3B21.01%3B-4113000000%3B4.73%3B149900000000%3B189700000000%3B203600000000%3B182400000000%3B1006000000000%3B9600%3B4.10%3B0.30%3B5000%3B160000%3B329532%3B190800000000%3B3.80%3B20.91%3B5.40%3B1333406%3B10033000%3B19.40%3B34730000%3B75.19%3B6043000000%3B0.90%3B55100000000%3B0%3B7850000000%3B47300000000%3B420000000000%3B1752000%3B1863000%3B205000%3B3460000%3B18000000000%3B106202903%3B23.50%3B19510%3B60670000000%3B15958700%3B28125000%3B2.45%3B3.20%0AMicronesia%20Federated%20States%20of%3B702%3B25.11%3B%3B4.87%3B53100000%3B178600000%3B192000000%3B22000000%3B277000000%3B2000%3B1.00%3B%3B%3B%3B240%3B149000000%3B%3B30.21%3B1.00%3B%3B6000%3B%3B%3B69.75%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B108105%3B%3B%3B%3B10100%3B1800%3B3.25%3B16.00%0AMidway%20Islands%3B6%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AMoldova%3B33843%3B15.27%3B-148400000%3B12.79%3B1400000000%3B4605000000%3B3876000000%3B1030000000%3B8581000000%3B1900%3B6.80%3B0.20%3B300%3B5500%3B12719%3B1830000000%3B17.00%3B40.42%3B11.50%3B11984%3B150000%3B17.10%3B1360000%3B65.18%3B8700000%3B0.40%3B2050000000%3B0%3B2050000000%3B0%3B%3B24000%3B%3B%3B0%3B%3B4455421%3B63.40%3B1138%3B390000000%3B706900%3B338200%3B1.81%3B8.00%0AMonaco%3B2%3B9.26%3B%3B12.71%3B18000000000%3B%3B%3B%3B870000000%3B27000%3B0.90%3B%3B%3B%3B50%3B%3B%3B5.43%3B1.90%3B533%3B16000%3B%3B30540%3B79.57%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B32409%3B%3B%3B%3B33700%3B19300%3B1.76%3B22.00%0AMongolia%3B1564116%3B21.52%3B%3B7.03%3B1191000000%3B2209000000%3B2692000000%3B853000000%3B5332000000%3B1900%3B10.60%3B0.10%3B200%3B500%3B49256%3B1000000000%3B4.10%3B53.79%3B11.00%3B1000%3B220000%3B%3B1488000%3B64.52%3B23100000%3B2.20%3B%3B%3B%3B%3B%3B11000%3B497%3B11000%3B542%3B%3B2791272%3B%3B%3B%3B142300%3B404400%3B2.26%3B6.70%0AMontserrat%3B102%3B17.56%3B%3B7.17%3B8900000%3B1674000%3B1800000%3B700000%3B29000000%3B3400%3B-1.00%3B%3B%3B%3B227%3B17000000%3B%3B7.35%3B2.60%3B%3B%3B%3B4521%3B78.71%3B%3B%3B%3B%3B%3B%3B%3B400%3B%3B%3B0%3B%3B9341%3B%3B%3B%3B%3B70%3B1.78%3B6.00%0AMorocco%3B446550%3B22.29%3B765400000%3B5.64%3B17070000000%3B14240000000%3B13910000000%3B9754000000%3B134600000000%3B4200%3B4.40%3B0.10%3B%3B15000%3B57694%3B15630000000%3B%3B41.62%3B2.10%3B3627%3B800000%3B22.40%3B11020000%3B70.66%3B2305600000%3B5.00%3B50000000%3B0%3B0%3B50000000%3B665400000%3B167000%3B%3B%3B1000%3B300000000%3B32725847%3B70.20%3B1907%3B15140000000%3B1219200%3B7332800%3B2.73%3B12.10%0AMozambique%3B801590%3B35.79%3B-101200000%3B20.99%3B966000000%3B5046000000%3B8859000000%3B689400000%3B23380000000%3B1200%3B8.20%3B12.20%3B110000%3B1300000%3B30400%3B972900000%3B3.40%3B130.79%3B12.80%3B3249%3B50000%3B47.00%3B9200000%3B40.32%3B117300000%3B2.20%3B60000000%3B0%3B0%3B60000000%3B63710000000%3B8500%3B%3B%3B0%3B0%3B19406703%3B%3B3123%3B1206000000%3B83700%3B428900%3B4.70%3B21.00%0ANamibia%3B825418%3B25.16%3B234300000%3B18.36%3B1136000000%3B1920000000%3B1167000000%3B1356000000%3B14760000000%3B7300%3B4.80%3B21.30%3B16000%3B210000%3B42237%3B1473000000%3B%3B48.98%3B4.20%3B3164%3B65000%3B19.60%3B840000%3B43.93%3B168400000%3B3.10%3B%3B%3B%3B%3B31150000000%3B13000%3B%3B%3B0%3B0%3B2030692%3B38.50%3B2382%3B360000000%3B127400%3B223700%3B3.18%3B35.00%0ANauru%3B21%3B25.14%3B%3B6.82%3B33300000%3B27900000%3B30000000%3B640000%3B60000000%3B5000%3B%3B%3B%3B%3B30%3B19800000%3B%3B9.95%3B-3.60%3B%3B300%3B%3B%3B62.73%3B%3B%3B%3B%3B%3B%3B%3B1000%3B%3B%3B0%3B%3B13048%3B%3B%3B%3B1900%3B1500%3B3.19%3B90.00%0ANavassa%20Island%3B5%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0ANepal%3B140800%3B31.45%3B%3B9.47%3B2700000000%3B2005000000%3B2054000000%3B568000000%3B39530000000%3B1500%3B3.00%3B0.50%3B3100%3B61000%3B13223%3B1419000000%3B8.70%3B66.98%3B2.90%3B917%3B80000%3B%3B10000000%3B59.80%3B99200000%3B1.50%3B%3B%3B%3B%3B%3B16000%3B%3B%3B0%3B%3B27676547%3B%3B59%3B%3B371800%3B50400%3B4.19%3B47.00%0ANetherlands%3B41526%3B11.14%3B19900000000%3B8.68%3B%3B100700000000%3B90610000000%3B293100000000%3B481100000000%3B29500%3B1.20%3B0.20%3B100%3B19000%3B116500%3B252700000000%3B0.80%3B5.04%3B1.40%3B4518226%3B8500000%3B19.90%3B7530000%3B78.81%3B9408000000%3B1.60%3B49720000000%3B49280000000%3B20780000000%3B77750000000%3B1693000000000%3B895300%3B1418000%3B2284000%3B46200%3B88060000%3B16407491%3B55.80%3B2808%3B21440000000%3B10004000%3B12500000%3B1.66%3B6.00%0ANetherlands%20Antilles%3B960%3B15.00%3B%3B6.41%3B1350000000%3B934300000%3B1005000000%3B1579000000%3B2450000000%3B11400%3B0.50%3B%3B%3B%3B600%3B2233000000%3B%3B10.03%3B2.10%3B119%3B2000%3B%3B89000%3B75.83%3B%3B%3B%3B%3B%3B%3B%3B72000%3B%3B%3B0%3B%3B219958%3B%3B%3B%3B81000%3B81000%3B2.00%3B15.60%0ANew%20Caledonia%3B19060%3B18.49%3B%3B5.65%3B79000000%3B1471000000%3B1581000000%3B448000000%3B3158000000%3B15000%3B%3B%3B%3B%3B5432%3B1007000000%3B-0.60%3B7.72%3B-0.60%3B4449%3B60000%3B%3B79400%3B74.04%3B%3B%3B%3B%3B%3B%3B%3B8750%3B%3B%3B0%3B%3B216494%3B%3B%3B%3B52000%3B80000%3B2.31%3B19.00%0ANew%20Zealand%3B268680%3B13.90%3B-3647000000%3B7.53%3B47340000000%3B35710000000%3B38390000000%3B19850000000%3B92510000000%3B23200%3B4.80%3B0.10%3B200%3B1400%3B92382%3B19770000000%3B5.90%3B5.85%3B2.40%3B474395%3B2110000%3B22.40%3B2050000%3B78.66%3B1147000000%3B1.00%3B6504000000%3B0%3B0%3B6504000000%3B58940000000%3B132700%3B30220%3B119700%3B42160%3B89620000%3B4035461%3B22.10%3B3898%3B4805000000%3B1765000%3B2599000%3B1.79%3B4.20%0ANicaragua%3B129494%3B24.88%3B-843100000%3B4.49%3B4573000000%3B2318000000%3B2553000000%3B750000000%3B12340000000%3B2300%3B4.00%3B0.20%3B%3B6400%3B18712%3B2020000000%3B4.40%3B29.11%3B9.30%3B7094%3B90000%3B28.00%3B1930000%3B70.33%3B32800000%3B0.70%3B%3B%3B%3B%3B%3B25770%3B738%3B27950%3B0%3B%3B5465100%3B69.50%3B6%3B670000000%3B171600%3B202800%3B2.81%3B7.80%0ANiger%3B1267000%3B48.30%3B%3B21.33%3B1600000000%3B327600000%3B266200000%3B280000000%3B9716000000%3B900%3B3.50%3B1.20%3B4800%3B70000%3B10100%3B400000000%3B%3B121.69%3B3.00%3B134%3B15000%3B%3B70000%3B42.13%3B33300000%3B1.10%3B%3B%3B%3B%3B%3B5000%3B%3B%3B0%3B%3B11665937%3B%3B%3B%3B22400%3B24000%3B6.75%3B%0ANigeria%3B923768%3B40.65%3B5228000000%3B17.18%3B30550000000%3B18430000000%3B19850000000%3B33990000000%3B125700000000%3B1000%3B6.20%3B5.40%3B310000%3B3600000%3B194394%3B17140000000%3B1.80%3B98.80%3B16.50%3B1142%3B750000%3B18.00%3B55670000%3B46.74%3B544600000%3B0.80%3B7850000000%3B7830000000%3B0%3B15680000000%3B4007000000000%3B275000%3B%3B%3B2356000%3B34000000000%3B128771988%3B20.00%3B3557%3B14710000000%3B853100%3B3149500%3B5.53%3B%0ANiue%3B260%3B%3B%3B%3B418000%3B2790000%3B3000000%3B137200%3B7600000%3B3600%3B-0.30%3B%3B%3B%3B234%3B2380000%3B%3B%3B1.00%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B20%3B%3B%3B0%3B%3B2166%3B%3B%3B%3B1100%3B400%3B%3B%0ANorfolk%20Island%3B35%3B%3B%3B%3B%3B%3B%3B1500000%3B%3B%3B%3B%3B%3B%3B80%3B17900000%3B%3B%3B%3B%3B700%3B%3B1345%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B1828%3B%3B%3B%3B2532%3B0%3B%3B0.00%0ANorthern%20Mariana%20Islands%3B477%3B19.51%3B%3B2.30%3B%3B%3B%3B%3B900000000%3B12500%3B%3B%3B%3B%3B362%3B%3B%3B7.11%3B1.20%3B%3B%3B%3B6006%3B75.88%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B80362%3B%3B%3B%3B21000%3B3000%3B1.27%3B%0ANorway%3B324220%3B11.67%3B30520000000%3B9.45%3B0%3B107400000000%3B125900000000%3B76640000000%3B183000000000%3B40000%3B3.30%3B0.10%3B100%3B2100%3B91852%3B45960000000%3B5.20%3B3.70%3B1.00%3B593850%3B2288000%3B17.50%3B2380000%3B79.40%3B4033500000%3B1.90%3B4100000000%3B50500000000%3B0%3B54600000000%3B1716000000000%3B171100%3B3466000%3B88870%3B3310000%3B9859000000%3B4593041%3B33.10%3B4077%3B%3B3343000%3B4163400%3B1.78%3B4.30%0AOman%3B212460%3B36.73%3B2674000000%3B3.86%3B4814000000%3B9792000000%3B9896000000%3B13140000000%3B38090000000%3B13100%3B1.20%3B0.10%3B200%3B1300%3B34965%3B6373000000%3B-1.20%3B19.51%3B0.20%3B726%3B180000%3B13.50%3B920000%3B73.13%3B252990000%3B11.40%3B6340000000%3B7430000000%3B0%3B13770000000%3B829700000000%3B54000%3B721000%3B%3B775000%3B5500000000%3B3001583%3B10.30%3B%3B4144000000%3B233900%3B464900%3B5.84%3B15.00%0APakistan%3B803940%3B30.42%3B1400000000%3B8.45%3B33970000000%3B52660000000%3B75270000000%3B15070000000%3B347300000000%3B2200%3B6.10%3B0.10%3B4900%3B74000%3B257683%3B14010000000%3B13.10%3B72.44%3B4.80%3B15124%3B1500000%3B16.40%3B45430000%3B63.00%3B3848000000%3B4.90%3B23400000000%3B0%3B0%3B23400000000%3B695600000000%3B365000%3B%3B%3B61000%3B325500000%3B162419946%3B71.40%3B8163%3B12580000000%3B3982800%3B2624800%3B4.14%3B8.30%0APalau%3B458%3B18.37%3B%3B6.85%3B0%3B%3B%3B18000000%3B174000000%3B9000%3B1.00%3B%3B%3B%3B61%3B99000000%3B%3B14.84%3B3.40%3B%3B%3B%3B9845%3B70.14%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B20303%3B%3B%3B%3B6700%3B1000%3B2.46%3B2.30%0APalmyra%20Atoll%3B12%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0APanama%3B78200%3B19.96%3B-469600000%3B6.54%3B8780000000%3B4473000000%3B4873000000%3B5699000000%3B20570000000%3B6900%3B6.00%3B0.90%3B%3B16000%3B11643%3B7164000000%3B5.40%3B20.47%3B2.00%3B7129%3B120000%3B25.00%3B1320000%3B71.94%3B147000000%3B1.10%3B%3B%3B%3B%3B%3B40520%3B%3B%3B0%3B%3B3039150%3B69.20%3B355%3B1076000000%3B386900%3B834000%3B2.45%3B12.60%0APapua%20New%20Guinea%3B462840%3B29.95%3B29150000%3B7.37%3B2463000000%3B1561000000%3B1679000000%3B2437000000%3B11990000000%3B2200%3B0.90%3B0.60%3B600%3B16000%3B19600%3B1353000000%3B%3B51.45%3B4.20%3B389%3B75000%3B13.60%3B3320000%3B64.93%3B16900000%3B1.40%3B110000000%3B0%3B0%3B110000000%3B385500000000%3B15000%3B%3B%3B46200%3B170000000%3B5545268%3B59.30%3B%3B635800000%3B62000%3B15000%3B3.96%3B%0AParaguay%3B406750%3B29.43%3B-36110000%3B4.53%3B3239000000%3B2469000000%3B48360000000%3B2936000000%3B29930000000%3B4800%3B2.80%3B0.50%3B600%3B15000%3B29500%3B3330000000%3B0.00%3B25.63%3B5.10%3B9243%3B120000%3B18.10%3B2660000%3B74.89%3B53100000%3B0.90%3B%3B%3B%3B%3B%3B25000%3B%3B%3B0%3B%3B6347884%3B39.20%3B441%3B1164000000%3B273200%3B1770300%3B3.93%3B15.10%0APeru%3B1285220%3B20.87%3B-30000000%3B6.26%3B29790000000%3B20220000000%3B22880000000%3B12300000000%3B155300000000%3B5600%3B4.50%3B0.50%3B4200%3B82000%3B78230%3B9600000000%3B5.20%3B31.94%3B3.80%3B65868%3B2850000%3B17.80%3B11000000%3B69.53%3B829300000%3B1.40%3B910000000%3B0%3B0%3B910000000%3B245100000000%3B161000%3B49000%3B%3B95500%3B408800000%3B27925628%3B44.10%3B3462%3B12700000000%3B1839200%3B2908800%3B2.56%3B9.60%0APhilippines%3B300000%3B25.31%3B3600000000%3B5.47%3B55600000000%3B46050000000%3B52860000000%3B38630000000%3B430600000000%3B5000%3B5.90%3B0.10%3B500%3B9000%3B202124%3B37500000000%3B5.00%3B23.51%3B5.50%3B38440%3B3500000%3B17.00%3B35860000%3B69.91%3B805500000%3B1.00%3B25000000%3B0%3B0%3B2500000%3B107600000000%3B338000%3B0%3B312000%3B26000%3B152000000%3B87857473%3B74.20%3B897%3B16050000000%3B3310900%3B15201000%3B3.16%3B11.70%0APitcairn%20Islands%3B47%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B6%3B%3B%3B%3B%3B%3B%3B%3B15%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B46%3B%3B%3B%3B1%3B%3B%3B%0APoland%3B312685%3B10.78%3B-3831000000%3B10.01%3B99150000000%3B117400000000%3B133800000000%3B75980000000%3B463000000000%3B12000%3B5.60%3B0.10%3B100%3B14000%3B364697%3B81610000000%3B10.00%3B8.51%3B3.40%3B804915%3B8970000%3B18.40%3B17020000%3B74.41%3B3500000000%3B1.71%3B13850000000%3B41000000%3B8782000000%3B5471000000%3B154400000000%3B424100%3B53000%3B413700%3B17180%3B116400000%3B38635144%3B49.90%3B23852%3B41880000000%3B12300000%3B17401000%3B1.39%3B19.50%0APortugal%3B92391%3B10.82%3B-8120000000%3B10.43%3B274700000000%3B42150000000%3B43280000000%3B37680000000%3B188700000000%3B17900%3B1.10%3B0.40%3B1000%3B22000%3B17135%3B52100000000%3B1.10%3B5.05%3B2.10%3B346078%3B3600000%3B22.30%3B5480000%3B77.53%3B3497800000%3B2.30%3B2542000000%3B0%3B2553000000%3B0%3B%3B339800%3B28830%3B357300%3B0%3B%3B10566212%3B61.50%3B2850%3B12300000000%3B4278800%3B9341400%3B1.47%3B6.50%0APuerto%20Rico%3B9104%3B13.93%3B%3B7.86%3B%3B20540000000%3B22090000000%3B46900000000%3B68950000000%3B17700%3B2.70%3B%3B%3B7397%3B25328%3B29100000000%3B%3B8.24%3B6.50%3B%3B600000%3B%3B1300000%3B77.62%3B%3B%3B630000000%3B0%3B630000000%3B0%3B%3B190000%3B%3B%3B0%3B%3B3916632%3B%3B96%3B%3B1329500%3B1211111%3B1.91%3B12.00%0AQatar%3B11437%3B15.54%3B5187000000%3B4.61%3B18620000000%3B9046000000%3B9727000000%3B15000000000%3B19490000000%3B23200%3B8.70%3B0.09%3B%3B%3B1230%3B6150000000%3B10.00%3B18.61%3B3.00%3B221%3B126000%3B22.90%3B140000%3B73.67%3B723000000%3B10.00%3B15860000000%3B18200000000%3B0%3B32400000000%3B14410000000000%3B30000%3B%3B%3B790000%3B16000000000%3B863051%3B%3B%3B3351000000%3B184500%3B376500%3B2.87%3B2.70%0AReunion%3B2517%3B19.26%3B%3B5.48%3B%3B1084000000%3B1166000000%3B214000000%3B4570000000%3B6000%3B2.50%3B%3B%3B%3B1214%3B2500000000%3B%3B7.78%3B%3B%3B150000%3B%3B309900%3B73.95%3B%3B%3B%3B%3B%3B%3B%3B18000%3B%3B%3B0%3B%3B776948%3B%3B%3B%3B300000%3B489800%3B2.47%3B36.00%0ARomania%3B237500%3B10.70%3B-3631000000%3B11.74%3B24590000000%3B57500000000%3B56530000000%3B23540000000%3B171500000000%3B7700%3B8.10%3B0.10%3B350%3B6500%3B198755%3B28430000000%3B4.00%3B26.43%3B9.60%3B50807%3B4000000%3B23.30%3B9660000%3B71.35%3B985000000%3B2.47%3B18500000000%3B0%3B5400000000%3B12600000000%3B111100000000%3B253800%3B%3B%3B128000%3B1055000000%3B22329977%3B23.60%3B11385%3B16210000000%3B4300000%3B6900000%3B1.36%3B6.30%0ARussia%3B17075200%3B9.80%3B46040000000%3B14.52%3B169600000000%3B894300000000%3B915000000000%3B162500000000%3B1408000000000%3B9800%3B6.70%3B1.10%3B9000%3B860000%3B537289%3B92910000000%3B6.40%3B15.39%3B11.50%3B560874%3B6000000%3B19.10%3B71830000%3B67.10%3B%3B%3B405800000000%3B171000000000%3B32700000000%3B578600000000%3B47000000000000%3B2310000%3B6110000%3B%3B8420000%3B69000000000%3B143420309%3B28.20%3B87157%3B124500000000%3B35500000%3B17608800%3B1.27%3B8.30%0ARwanda%3B26338%3B40.60%3B-212500000%3B16.32%3B1300000000%3B195000000%3B166700000%3B69780000%3B10430000000%3B1300%3B0.90%3B5.10%3B22000%3B250000%3B12000%3B260000000%3B7.00%3B91.23%3B7.00%3B1495%3B25000%3B20.00%3B4600000%3B46.96%3B50100000%3B3.20%3B%3B%3B%3B%3B28320000000%3B5300%3B%3B%3B0%3B0%3B8440820%3B%3B%3B210900000%3B23200%3B134000%3B5.49%3B%0ASaint%20Helena%3B410%3B12.33%3B%3B6.43%3B%3B4650000%3B5000000%3B17000000%3B18000000%3B2500%3B%3B%3B%3B%3B198%3B42000000%3B%3B19.00%3B3.20%3B%3B500%3B%3B3500%3B77.76%3B%3B%3B%3B%3B%3B%3B%3B200%3B%3B%3B0%3B%3B7460%3B%3B%3B%3B2200%3B0%3B1.54%3B14.00%0ASaint%20Kitts%20and%20Nevis%3B261%3B18.12%3B%3B8.47%3B171000000%3B98440000%3B105800000%3B70000000%3B339000000%3B8800%3B-1.90%3B%3B%3B%3B320%3B195000000%3B%3B14.49%3B1.70%3B51%3B10000%3B%3B18170%3B72.15%3B%3B%3B%3B%3B%3B%3B%3B710%3B%3B%3B0%3B%3B38958%3B%3B50%3B%3B23500%3B5000%3B2.33%3B4.50%0ASaint%20Lucia%3B616%3B20.05%3B%3B5.12%3B214000000%3B251300000%3B270300000%3B66000000%3B866000000%3B5400%3B3.30%3B%3B%3B%3B1210%3B267000000%3B-8.90%3B13.53%3B3.00%3B41%3B13000%3B%3B43800%3B73.61%3B%3B%3B%3B%3B%3B%3B%3B2400%3B%3B%3B0%3B%3B166312%3B%3B%3B%3B51100%3B14300%3B2.21%3B20.00%0ASaint%20Pierre%20and%20Miquelon%3B242%3B13.83%3B%3B6.70%3B%3B40060000%3B43080000%3B10000000%3B48300000%3B7000%3B%3B%3B%3B%3B114%3B106000000%3B%3B7.54%3B2.10%3B%3B%3B%3B3261%3B78.46%3B%3B%3B%3B%3B%3B%3B%3B600%3B%3B%3B0%3B%3B7012%3B%3B%3B%3B4800%3B0%3B2.03%3B9.80%0ASaint%20Vincent%20and%20the%20Grenadines%3B389%3B16.34%3B%3B6.00%3B167200000%3B84820000%3B91200000%3B38000000%3B342000000%3B2900%3B0.70%3B%3B%3B%3B829%3B174000000%3B-0.90%3B14.78%3B-0.40%3B4%3B7000%3B%3B67000%3B73.62%3B%3B%3B%3B%3B%3B%3B%3B1250%3B%3B%3B0%3B%3B117534%3B%3B%3B%3B27300%3B10000%3B1.85%3B15.00%0ASamoa%3B2944%3B15.95%3B%3B6.54%3B197000000%3B113500000%3B122000000%3B14000000%3B1000000000%3B5600%3B5.00%3B%3B3%3B12%3B790%3B113000000%3B2.80%3B27.71%3B4.00%3B8225%3B4000%3B%3B90000%3B70.72%3B%3B%3B%3B%3B%3B%3B%3B1000%3B%3B%3B0%3B%3B177287%3B%3B%3B%3B11800%3B2700%3B3.01%3B%0ASan%20Marino%3B61%3B10.18%3B%3B8.07%3B%3B%3B%3B%3B940000000%3B34600%3B7.50%3B%3B%3B%3B220%3B%3B6.00%3B5.73%3B3.30%3B1763%3B14300%3B%3B18500%3B81.62%3B700000%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B28880%3B%3B%3B%3B20600%3B16800%3B1.33%3B2.60%0ASao%20Tome%20and%20Principe%3B1001%3B40.80%3B-31500000%3B6.68%3B318000000%3B15810000%3B17000000%3B6700000%3B214000000%3B1200%3B6.00%3B%3B%3B%3B320%3B41000000%3B%3B43.11%3B14.00%3B1069%3B15000%3B31.50%3B%3B66.99%3B700000%3B0.80%3B%3B%3B%3B%3B%3B700%3B%3B%3B0%3B%3B187410%3B%3B%3B29780000%3B7000%3B4800%3B5.71%3B%0ASaudi%20Arabia%3B1960582%3B29.56%3B51500000000%3B2.62%3B34350000000%3B128500000000%3B138200000000%3B113000000000%3B310200000000%3B12000%3B5.00%3B0.01%3B%3B%3B152044%3B36210000000%3B2.80%3B13.24%3B0.80%3B15931%3B1500000%3B17.20%3B6620000%3B75.46%3B18000000000%3B10.00%3B56400000000%3B0%3B0%3B56400000000%3B6339000000000%3B1550000%3B7920000%3B0%3B9021000%3B261700000000%3B26417599%3B75.00%3B1392%3B23620000000%3B3502600%3B7238200%3B4.05%3B25.00%0ASenegal%3B196190%3B35.21%3B-518800000%3B10.60%3B3476000000%3B1615000000%3B1737000000%3B1374000000%3B18360000000%3B1700%3B3.20%3B0.80%3B3500%3B44000%3B14576%3B2128000000%3B4.70%3B55.51%3B0.80%3B672%3B225000%3B20.10%3B4650000%3B56.75%3B107300000%3B1.50%3B50000000%3B0%3B0%3B50000000%3B%3B31000%3B%3B%3B0%3B%3B11126832%3B55.20%3B906%3B820000000%3B228800%3B575900%3B4.75%3B48.00%0ASerbia%20and%20Montenegro%3B102350%3B12.12%3B-3008000000%3B10.49%3B12970000000%3B32330000000%3B31640000000%3B3245000000%3B26270000000%3B2400%3B6.50%3B0.20%3B100%3B10000%3B45290%3B9538000000%3B1.70%3B12.89%3B8.80%3B20207%3B847000%3B14.40%3B3200000%3B74.73%3B654000000%3B%3B602000000%3B0%3B0%3B602000000%3B24070000000%3B64000%3B%3B%3B15000%3B38750000%3B10829175%3B80.00%3B4380%3B3550000000%3B2611700%3B3634600%3B1.67%3B30.00%0ASeychelles%3B455%3B16.22%3B-98420000%3B6.34%3B218100000%3B202800000%3B218000000%3B256200000%3B626000000%3B7800%3B1.50%3B%3B%3B%3B373%3B393400000%3B%3B15.53%3B5.00%3B264%3B11700%3B39.50%3B30900%3B71.82%3B12300000%3B1.80%3B%3B%3B%3B%3B%3B4000%3B%3B%3B0%3B%3B81188%3B122.80%3B%3B70940000%3B21700%3B54500%3B1.75%3B%0ASierra%20Leone%3B71740%3B42.84%3B%3B20.61%3B1500000000%3B237400000%3B255300000%3B49000000%3B3335000000%3B600%3B6.00%3B7.00%3B11000%3B170000%3B11300%3B264000000%3B%3B143.64%3B1.00%3B277%3B8000%3B%3B1369000%3B42.52%3B13200000%3B1.70%3B%3B%3B%3B%3B%3B6500%3B%3B%3B0%3B%3B6017643%3B%3B%3B%3B24000%3B67000%3B5.72%3B%0ASingapore%3B693%3B9.49%3B8800000000%3B4.16%3B19400000000%3B32000000000%3B35330000000%3B174000000000%3B120900000000%3B27800%3B8.10%3B0.20%3B200%3B4100%3B3130%3B155200000000%3B11.10%3B2.29%3B1.70%3B484825%3B2310000%3B27.40%3B2180000%3B81.62%3B4470000000%3B4.90%3B2500000000%3B0%3B2500000000%3B0%3B%3B700000%3B%3B%3B0%3B%3B4425720%3B102.50%3B%3B112800000000%3B1896100%3B3521800%3B1.05%3B3.40%0ASlovakia%3B48845%3B10.62%3B-1400000000%3B9.43%3B19540000000%3B28890000000%3B31150000000%3B29240000000%3B78890000000%3B14500%3B5.30%3B0.10%3B100%3B200%3B42970%3B29670000000%3B5.10%3B7.41%3B7.50%3B89592%3B1375800%3B24.00%3B2200000%3B74.50%3B406000000%3B1.89%3B6800000000%3B0%3B6600000000%3B190000000%3B7504000000%3B82000%3B%3B%3B1000%3B4500000%3B5431363%3B46.60%3B3661%3B14910000000%3B1294700%3B3678800%3B1.32%3B13.10%0ASlovenia%3B20273%3B8.95%3B-51640000%3B10.22%3B14650000000%3B11800000000%3B12490000000%3B14970000000%3B39410000000%3B19600%3B3.90%3B0.10%3B100%3B280%3B20250%3B16070000000%3B3.90%3B4.45%3B3.30%3B45491%3B750000%3B24.90%3B870000%3B76.14%3B370000000%3B1.70%3B1040000000%3B0%3B1040000000%3B0%3B%3B53300%3B%3B%3B20%3B%3B2011070%3B31.50%3B1201%3B8493000000%3B812300%3B1739100%3B1.24%3B6.40%0ASolomon%20Islands%3B28450%3B30.74%3B%3B3.98%3B180400000%3B29760000%3B32000000%3B74000000%3B800000000%3B1700%3B5.80%3B%3B%3B%3B1360%3B67000000%3B%3B21.29%3B10.00%3B398%3B2200%3B%3B26840%3B72.66%3B%3B%3B%3B%3B%3B%3B%3B1250%3B%3B%3B0%3B%3B538032%3B%3B%3B%3B6600%3B1000%3B4.04%3B%0ASomalia%3B637657%3B45.62%3B%3B16.97%3B3000000000%3B223500000%3B240300000%3B79000000%3B4597000000%3B600%3B2.80%3B1.00%3B%3B43000%3B22100%3B344000000%3B%3B116.70%3B%3B4%3B89000%3B%3B3700000%3B48.09%3B18900000%3B0.90%3B%3B%3B%3B%3B2832000000%3B4000%3B%3B%3B0%3B0%3B8591629%3B%3B%3B%3B100000%3B35000%3B6.84%3B%0ASouth%20Africa%3B1219912%3B18.48%3B-2480000000%3B21.32%3B27010000000%3B189400000000%3B202600000000%3B41970000000%3B491400000000%3B11100%3B3.50%3B21.50%3B370000%3B5300000%3B275971%3B39420000000%3B5.50%3B61.81%3B4.50%3B288633%3B3100000%3B16.70%3B16630000%3B43.27%3B3172000000%3B1.50%3B1800000000%3B0%3B0%3B1800000000%3B14160000000%3B460000%3B%3B%3B196200%3B7840000%3B44344136%3B45.90%3B22298%3B11680000000%3B4844000%3B16860000%3B2.24%3B26.20%0ASouth%20Georgia%20and%20the%20South%20Sandwich%20Islands%3B3903%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0ASpain%3B504782%3B10.10%3B-30890000000%3B9.63%3B771100000000%3B218400000000%3B229000000000%3B172500000000%3B937600000000%3B23300%3B2.60%3B0.70%3B1000%3B140000%3B664852%3B222000000000%3B3.00%3B4.42%3B3.20%3B1056950%3B9789000%3B25.40%3B19330000%3B79.52%3B9906500000%3B1.20%3B17960000000%3B0%3B17260000000%3B516000000%3B254900000%3B1497000%3B135100%3B1582000%3B7099%3B10500000%3B40341462%3B53.20%3B14268%3B19700000000%3B17567500%3B37506700%3B1.28%3B10.40%0ASpratly%20Islands%3B5%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0ASri%20Lanka%3B65610%3B15.63%3B-587300000%3B6.49%3B10850000000%3B6228000000%3B6697000000%3B5306000000%3B80580000000%3B4000%3B5.20%3B0.10%3B200%3B3500%3B11650%3B7265000000%3B7.10%3B14.35%3B5.80%3B1882%3B200000%3B22.40%3B7260000%3B73.17%3B514800000%3B2.60%3B%3B%3B%3B%3B%3B75000%3B%3B%3B0%3B%3B20064776%3B104.30%3B1449%3B2475000000%3B881400%3B931600%3B1.85%3B7.80%0ASudan%3B2505810%3B35.17%3B-763600000%3B9.16%3B21000000000%3B2400000000%3B2581000000%3B3395000000%3B76190000000%3B1900%3B6.40%3B2.30%3B23000%3B400000%3B11900%3B3496000000%3B8.50%3B62.50%3B9.00%3B%3B300000%3B16.00%3B11000000%3B58.54%3B587000000%3B3.00%3B%3B%3B%3B%3B99110000000%3B70000%3B275000%3B0%3B345000%3B1600000000%3B40187486%3B79.70%3B5995%3B1652000000%3B900000%3B650000%3B4.85%3B18.70%0ASuriname%3B163270%3B18.39%3B%3B7.16%3B321000000%3B1845000000%3B1984000000%3B495000000%3B1885000000%3B4300%3B4.20%3B1.70%3B500%3B5200%3B4492%3B604000000%3B6.50%3B23.57%3B23.00%3B18%3B20000%3B%3B104000%3B68.96%3B7500000%3B0.70%3B%3B%3B%3B%3B0%3B14000%3B1370%3B1644%3B12000%3B99000000%3B438144%3B%3B%3B%3B79800%3B168100%3B2.34%3B17.00%0ASvalbard%3B62049%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B0.00%3B0%3B0%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B2701%3B%3B%3B%3B%3B%3B%3B%0ASwaziland%3B17363%3B27.72%3B-82400000%3B25.26%3B320000000%3B1173000000%3B402000000%3B900100000%3B6018000000%3B5100%3B2.50%3B38.80%3B17000%3B220000%3B3107%3B1140000000%3B3.70%3B69.27%3B5.40%3B1401%3B27000%3B23.60%3B383200%3B35.65%3B40500000%3B1.40%3B%3B%3B%3B%3B%3B3500%3B%3B%3B0%3B%3B1173900%3B%3B301%3B320500000%3B46200%3B88000%3B3.70%3B34.00%0ASweden%3B449964%3B10.36%3B24080000000%3B10.36%3B66500000000%3B138100000000%3B142800000000%3B121700000000%3B255400000000%3B28400%3B3.60%3B0.10%3B100%3B3600%3B213237%3B97970000000%3B5.50%3B2.77%3B0.70%3B945221%3B5125000%3B15.80%3B4460000%3B80.40%3B5729000000%3B1.70%3B949000000%3B0%3B968000000%3B0%3B%3B328600%3B203700%3B553100%3B0%3B%3B9001774%3B51.60%3B11481%3B19990000000%3B6579200%3B7949000%3B1.66%3B5.60%0ASwitzerland%3B41290%3B9.77%3B40950000000%3B8.48%3B%3B54530000000%3B63470000000%3B130700000000%3B251900000000%3B33800%3B1.80%3B0.40%3B100%3B13000%3B71212%3B121100000000%3B4.70%3B4.39%3B0.90%3B667275%3B2556000%3B20.40%3B3770000%3B80.39%3B2548000000%3B1.00%3B3093000000%3B0%3B3093000000%3B0%3B%3B290400%3B10420%3B289500%3B0%3B%3B7489370%3B57.20%3B4533%3B69580000000%3B5419000%3B6172000%3B1.42%3B3.40%0ASyria%3B185180%3B28.29%3B1100000000%3B4.88%3B4000000000%3B24320000000%3B26150000000%3B6086000000%3B60440000000%3B3400%3B2.30%3B0.10%3B200%3B500%3B45697%3B5042000000%3B7.00%3B29.53%3B2.10%3B11%3B220000%3B16.30%3B5120000%3B70.03%3B858000000%3B5.90%3B5840000000%3B0%3B0%3B5840000000%3B240700000000%3B240000%3B285000%3B%3B525000%3B2500000000%3B18448752%3B32.00%3B2711%3B5000000000%3B2099300%3B400000%3B3.50%3B20.00%0ATaiwan%3B35980%3B12.64%3B21160000000%3B6.38%3B55500000000%3B147400000000%3B158500000000%3B170500000000%3B576200000000%3B25300%3B6.00%3B%3B%3B%3B37299%3B165400000000%3B12.20%3B6.40%3B1.70%3B2777085%3B13800000%3B18.00%3B10220000%3B77.26%3B7574000000%3B2.60%3B6640000000%3B410000000%3B6300000000%3B750000000%3B38230000000%3B988000%3B%3B%3B500%3B2900000%3B22894384%3B32.40%3B2508%3B246500000000%3B13355000%3B25089600%3B1.57%3B4.50%0ATajikistan%3B143100%3B32.58%3B-52000000%3B8.39%3B888000000%3B14410000000%3B15080000000%3B1130000000%3B7950000000%3B1100%3B10.50%3B0.10%3B100%3B200%3B27767%3B1300000000%3B8.20%3B110.76%3B8.00%3B69%3B4100%3B22.00%3B3187000%3B64.56%3B35400000%3B3.90%3B1300000000%3B0%3B1250000000%3B50000000%3B%3B20000%3B%3B%3B250%3B%3B7163506%3B%3B482%3B145300000%3B242100%3B47600%3B4.05%3B40.00%0ATanzania%3B945087%3B38.16%3B-327400000%3B16.71%3B7321000000%3B2566000000%3B2727000000%3B1248000000%3B23710000000%3B700%3B5.80%3B8.80%3B160000%3B1600000%3B88200%3B1972000000%3B8.40%3B98.54%3B5.40%3B5534%3B250000%3B16.20%3B19000000%3B45.24%3B20600000%3B0.20%3B%3B%3B%3B%3B11330000000%3B17000%3B%3B%3B0%3B0%3B36766356%3B5.00%3B3690%3B2175000000%3B149100%3B891200%3B5.06%3B%0AThailand%3B514000%3B15.70%3B6736000000%3B7.02%3B50590000000%3B106100000000%3B118900000000%3B87910000000%3B524800000000%3B8100%3B6.10%3B1.50%3B58000%3B570000%3B57403%3B80840000000%3B8.50%3B20.48%3B2.80%3B103700%3B6971500%3B22.50%3B36430000%3B71.57%3B1775000000%3B1.80%3B23930000000%3B0%3B5200000000%3B18730000000%3B368200000000%3B785000%3B%3B%3B225000%3B600000000%3B65444371%3B47.60%3B4071%3B48300000000%3B6617400%3B26500000%3B1.88%3B1.50%0ATogo%3B56785%3B33.48%3B-125600000%3B11.80%3B1400000000%3B451200000%3B108800000%3B663100000%3B8684000000%3B1600%3B3.00%3B4.10%3B10000%3B110000%3B7520%3B824900000%3B%3B66.61%3B1.00%3B82%3B210000%3B19.10%3B1740000%3B52.64%3B35500000%3B1.90%3B%3B%3B%3B%3B%3B10000%3B%3B%3B0%3B%3B5681519%3B%3B568%3B267400000%3B60600%3B220000%3B4.61%3B%0ATokelau%3B10%3B%3B%3B%3B0%3B%3B%3B98000%3B1500000%3B1000%3B%3B%3B%3B%3B%3B323000%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B1405%3B%3B%3B%3B300%3B0%3B%3B%0ATonga%3B748%3B25.18%3B%3B5.35%3B63400000%3B23060000%3B24790000%3B27000000%3B244000000%3B2300%3B1.50%3B%3B%3B%3B680%3B86000000%3B8.60%3B12.62%3B10.30%3B18906%3B2900%3B%3B33910%3B69.53%3B%3B%3B%3B%3B%3B%3B%3B1000%3B%3B%3B0%3B%3B112422%3B%3B%3B%3B11200%3B9000%3B3.00%3B13.30%0ATrinidad%20and%20Tobago%3B5128%3B12.81%3B1548000000%3B9.37%3B2940000000%3B5341000000%3B5743000000%3B6671000000%3B11480000000%3B10500%3B5.70%3B3.20%3B1900%3B29000%3B8320%3B4650000000%3B7.20%3B24.31%3B3.30%3B8003%3B138000%3B19.40%3B590000%3B68.91%3B66700000%3B0.60%3B13760000000%3B11790000000%3B0%3B25000000000%3B589000000000%3B24000%3B%3B%3B140000%3B990000000%3B1088644%3B54.40%3B%3B2927000000%3B325100%3B361900%3B1.75%3B10.40%0ATromelin%20Island%3B1%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0ATunisia%3B163610%3B15.50%3B71850000%3B5.09%3B14710000000%3B10050000000%3B10720000000%3B9926000000%3B70880000000%3B7100%3B5.10%3B0.10%3B200%3B1000%3B18997%3B11520000000%3B4.40%3B24.77%3B4.10%3B281%3B630000%3B24.50%3B3550000%3B74.89%3B356000000%3B1.50%3B3830000000%3B0%3B1580000000%3B2250000000%3B77160000000%3B87000%3B%3B%3B72580%3B1700000000%3B10074951%3B59.20%3B2152%3B3509000000%3B1163800%3B1899900%3B1.75%3B13.80%0ATurkey%3B780580%3B16.83%3B-15300000000%3B5.96%3B16900000000%3B117900000000%3B139700000000%3B69460000000%3B508700000000%3B7400%3B8.20%3B0.10%3B%3B%3B354421%3B94500000000%3B16.50%3B41.04%3B9.30%3B355215%3B5500000%3B17.30%3B25300000%3B72.36%3B12155000000%3B5.30%3B15940000000%3B0%3B15750000000%3B312000000%3B8685000000%3B619500%3B46110%3B616500%3B48000%3B288400000%3B69660559%3B74.30%3B8671%3B37100000000%3B18916700%3B27887500%3B1.94%3B9.30%0ATurkmenistan%3B488100%3B27.68%3B114000000%3B8.78%3B2400000000%3B8908000000%3B11410000000%3B4000000000%3B27600000000%3B5700%3B7.50%3B0.10%3B100%3B200%3B24000%3B2850000000%3B22.00%3B73.08%3B9.00%3B524%3B8000%3B29.00%3B2320000%3B61.39%3B90000000%3B3.40%3B9600000000%3B43500000000%3B0%3B58570000000%3B1430000000000%3B63000%3B%3B%3B162500%3B273000000%3B4952081%3B%3B2440%3B3034000000%3B374000%3B52000%3B3.41%3B60.00%0ATurks%20and%20Caicos%20Islands%3B430%3B22.23%3B%3B4.28%3B%3B4650000%3B5000000%3B169200000%3B216000000%3B11500%3B4.90%3B%3B%3B%3B121%3B175600000%3B%3B15.67%3B4.00%3B%3B%3B%3B4848%3B74.51%3B%3B%3B%3B%3B%3B%3B%3B0%3B%3B%3B0%3B%3B20556%3B%3B%3B%3B5700%3B1700%3B3.08%3B10.00%0ATuvalu%3B26%3B21.91%3B%3B7.22%3B%3B%3B%3B1000000%3B12200000%3B1100%3B3.00%3B%3B%3B%3B8%3B79000000%3B%3B20.03%3B5.00%3B%3B1300%3B%3B7000%3B68.01%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B11636%3B%3B%3B%3B700%3B0%3B3.00%3B%0AUganda%3B236040%3B47.39%3B-590800000%3B12.80%3B3865000000%3B1401000000%3B1775000000%3B621700000%3B39390000000%3B1500%3B5.00%3B4.10%3B78000%3B530000%3B27000%3B1306000000%3B5.60%3B67.83%3B3.50%3B2692%3B125000%3B22.40%3B12410000%3B51.59%3B170300000%3B2.20%3B%3B%3B%3B%3B%3B8750%3B%3B%3B0%3B%3B27269482%3B73.90%3B1241%3B1200000000%3B61000%3B776200%3B6.74%3B%0AUkraine%3B603700%3B10.49%3B4584000000%3B16.42%3B16370000000%3B132000000000%3B180000000000%3B32910000000%3B299100000000%3B6300%3B12.00%3B1.40%3B20000%3B360000%3B169679%3B31450000000%3B16.50%3B20.34%3B12.00%3B94345%3B3800000%3B18.80%3B21110000%3B66.85%3B617900000%3B1.40%3B79860000000%3B5800000000%3B60400000000%3B19600000000%3B560700000000%3B303000%3B%3B%3B72000%3B395000000%3B47425336%3B24.70%3B22473%3B11330000000%3B10833300%3B4200000%3B1.40%3B3.50%0AUnited%20Arab%20Emirates%3B82880%3B18.78%3B6300000000%3B4.26%3B5900000000%3B36510000000%3B45120000000%3B69480000000%3B63670000000%3B25200%3B5.70%3B0.18%3B%3B%3B1088%3B45660000000%3B4.00%3B14.51%3B3.20%3B56283%3B1110200%3B20.80%3B2360000%3B75.24%3B1600000000%3B3.10%3B33700000000%3B7190000000%3B0%3B44400000000%3B6060000000000%3B310000%3B2500000%3B0%3B2335000%3B97800000000%3B2563212%3B17.60%3B%3B18640000000%3B1135800%3B2972300%3B2.94%3B2.40%0AUnited%20Kingdom%3B244820%3B10.78%3B-33460000000%3B10.18%3B4710000000000%3B337400000000%3B395900000000%3B347200000000%3B1782000000000%3B29600%3B3.20%3B0.20%3B500%3B51000%3B392931%3B439400000000%3B0.90%3B5.16%3B1.40%3B3398708%3B25000000%3B16.20%3B29780000%3B78.38%3B42836500000%3B2.40%3B92850000000%3B15750000000%3B2700000000%3B105900000000%3B714900000000%3B1692000%3B1498000%3B1084000%3B1957000%3B25410000000%3B60441457%3B39.60%3B17186%3B48730000000%3B34898000%3B49677000%3B1.66%3B4.80%0AUnited%20States%3B9631418%3B14.14%3B-646500000000%3B8.25%3B1400000000000%3B3660000000000%3B3839000000000%3B795000000000%3B11750000000000%3B40100%3B4.40%3B0.60%3B14000%3B950000%3B6393603%3B1476000000000%3B4.40%3B6.50%3B2.50%3B115311958%3B159000000%3B15.70%3B147400000%3B77.71%3B370700000000%3B3.30%3B640900000000%3B11160000000%3B114100000000%3B548100000000%3B5195000000000%3B19650000%3B%3B%3B7800000%3B22450000000%3B295734134%3B65.00%3B228464%3B85940000000%3B181599900%3B158722000%3B2.08%3B5.50%0AUruguay%3B176220%3B14.09%3B181800000%3B9.06%3B12800000000%3B5878000000%3B8536000000%3B2200000000%3B49270000000%3B14500%3B10.20%3B0.30%3B500%3B6000%3B8983%3B2071000000%3B22.00%3B11.95%3B7.60%3B87630%3B400000%3B9.60%3B1560000%3B76.13%3B257500000%3B2.00%3B64500000%3B0%3B65000000%3B0%3B%3B41500%3B%3B%3B0%3B%3B3415920%3B%3B2073%3B2362000000%3B946500%3B652000%3B1.91%3B13.00%0AUzbekistan%3B447400%3B26.22%3B461900000%3B7.95%3B4351000000%3B46660000000%3B47700000000%3B3700000000%3B47590000000%3B1800%3B4.40%3B0.10%3B500%3B11000%3B81600%3B2820000000%3B6.20%3B71.10%3B3.00%3B1040%3B492000%3B%3B14640000%3B64.19%3B200000000%3B2.00%3B45200000000%3B17900000000%3B0%3B63100000000%3B937300000000%3B142000%3B%3B%3B143300%3B297000000%3B26851195%3B41.50%3B3950%3B1603000000%3B1717100%3B320800%3B2.94%3B0.60%0AVanuatu%3B12200%3B23.06%3B%3B7.90%3B83700000%3B45030000%3B48420000%3B26600000%3B580000000%3B2900%3B1.10%3B%3B%3B%3B1070%3B138000000%3B1.00%3B55.16%3B3.10%3B512%3B7500%3B%3B%3B62.49%3B%3B%3B%3B%3B%3B%3B%3B600%3B%3B%3B0%3B%3B205754%3B%3B%3B%3B6500%3B7800%3B2.77%3B%0AVenezuela%3B912050%3B18.91%3B14590000000%3B4.90%3B33290000000%3B89300000000%3B89700000000%3B35840000000%3B145200000000%3B5800%3B16.80%3B0.70%3B4100%3B110000%3B96155%3B14980000000%3B12.30%3B22.20%3B22.40%3B35301%3B1274400%3B12.90%3B12250000%3B74.31%3B1687000000%3B1.50%3B29400000000%3B0%3B0%3B29400000000%3B4190000000000%3B500000%3B2100000%3B%3B2600000%3B78000000000%3B25375281%3B43.10%3B682%3B25750000000%3B2841800%3B6463600%3B2.26%3B17.10%0AVietnam%3B329560%3B17.07%3B-2061000000%3B6.20%3B16550000000%3B32060000000%3B34480000000%3B23720000000%3B227200000000%3B2700%3B7.70%3B0.40%3B9000%3B220000%3B93300%3B26310000000%3B16.00%3B25.95%3B9.50%3B340%3B3500000%3B36.60%3B42980000%3B70.61%3B650000000%3B2.50%3B1300000000%3B0%3B0%3B1300000000%3B192600000000%3B185000%3B%3B%3B359400%3B650000000%3B83535576%3B65.90%3B2600%3B6510000000%3B4402000%3B2742000%3B1.94%3B1.90%0AVirgin%20Islands%3B352%3B14.20%3B%3B6.26%3B%3B962600000%3B1035000000%3B%3B2500000000%3B17200%3B2.00%3B%3B%3B%3B1257%3B%3B%3B8.03%3B2.20%3B%3B30000%3B%3B48900%3B78.91%3B%3B%3B%3B%3B%3B%3B%3B66000%3B%3B%3B0%3B%3B108708%3B%3B%3B%3B69400%3B41000%3B2.19%3B9.30%0AWake%20Island%3B7%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%0AWallis%20and%20Futuna%3B274%3B%3B%3B%3B%3B%3B%3B250000%3B60000000%3B3800%3B%3B%3B%3B%3B120%3B300000%3B%3B%3B%3B%3B900%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B16025%3B%3B%3B%3B1900%3B0%3B%3B%0AWest%20Bank%3B5860%3B32.37%3B%3B3.99%3B108000000%3B%3B%3B205000000%3B1800000000%3B800%3B6.00%3B%3B%3B%3B4500%3B1500000000%3B%3B19.62%3B2.20%3B%3B145000%3B%3B364000%3B73.08%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B%3B2385615%3B%3B%3B%3B301600%3B480000%3B4.40%3B27.20%0AWestern%20Sahara%3B266000%3B%3B%3B%3B%3B83700000%3B90000000%3B%3B%3B%3B%3B%3B%3B%3B6200%3B%3B%3B%3B%3B%3B%3B%3B12000%3B%3B%3B%3B%3B%3B%3B%3B%3B1800%3B%3B%3B0%3B%3B273008%3B%3B%3B%3B%3B0%3B%3B%0AYemen%3B527970%3B43.07%3B369900000%3B8.53%3B5400000000%3B2827000000%3B3040000000%3B4468000000%3B16250000000%3B800%3B1.90%3B0.10%3B%3B12000%3B67000%3B3734000000%3B3.00%3B61.50%3B12.20%3B138%3B100000%3B16.10%3B5980000%3B61.75%3B885500000%3B7.80%3B0%3B0%3B0%3B0%3B480000000000%3B78000%3B370300%3B%3B417500%3B4000000000%3B20727063%3B46.40%3B%3B5300000000%3B542200%3B411100%3B6.67%3B35.00%0AZambia%3B752614%3B41.38%3B-181400000%3B20.23%3B5353000000%3B5345000000%3B8167000000%3B1548000000%3B9409000000%3B900%3B4.60%3B16.50%3B89000%3B920000%3B91440%3B1519000000%3B6.90%3B88.29%3B18.30%3B1880%3B68200%3B41.40%3B4630000%3B39.70%3B106800000%3B1.80%3B%3B%3B%3B%3B%3B11000%3B%3B%3B0%3B%3B11261795%3B127.50%3B2173%3B345000000%3B88400%3B241000%3B5.47%3B50.00%0AZimbabwe%3B390580%3B29.74%3B-230300000%3B24.66%3B4086000000%3B11220000000%3B8839000000%3B1409000000%3B24370000000%3B1900%3B-8.20%3B24.60%3B170000%3B1800000%3B18338%3B1599000000%3B-7.80%3B67.69%3B133.00%3B4501%3B500000%3B9.90%3B4230000%3B36.67%3B217000000%3B4.30%3B%3B%3B%3B%3B%3B23000%3B%3B%3B0%3B%3B12746990%3B52.30%3B3077%3B57000000%3B300900%3B379100%3B3.54%3B70.00%0A", "left"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment4",\
            "name": "%3Ca%20href%3D%22https%3A%2F%2Fperso.telecom-paristech.fr%2Feagan%2Fclass%2Figr204%2Fdatasets%22%3Ehttps%3A%2F%2Fperso.telecom-paristech.fr%2Feagan%2Fclass%2Figr204%2Fdatasets%3C%2Fa%3E",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3947",\
            "y": "1340",\
            "z": "11"\
            },\
            {\
            "type": "MINMAX",\
            "id": "minmax",\
            "name": "min%2Fmax",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5588",\
            "y": "709",\
            "z": "12",\
            "params":\
            [\
                    ["NUM#", "value", "0.5,1"],\
                    ["NUM#", "operation", "1,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5519",\
            "y": "1084",\
            "z": "13",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "200,0"]\
            ]\
            },\
            {\
            "type": "TXTS",\
            "id": "text",\
            "name": "text",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5837",\
            "y": "1017",\
            "z": "14",\
            "params":\
            [\
                    ["TEXT#", "text", "Baker%20Island", "center"],\
                    ["NUM#", "width", "200,0"],\
                    ["NUM#", "height", "12,0"],\
                    ["NUM#", "size", "10,0"],\
                    ["TEXT#", "style", "Regular"],\
                    ["NUM#", "alignH", "2,0"],\
                    ["NUM#", "alignV", "2,0"]\
            ]\
            },\
            {\
            "type": "SEL",\
            "id": "select3",\
            "name": "select",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4993",\
            "y": "672",\
            "z": "15",\
            "params":\
            [\
                    ["NUM#", "index", "37,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment2",\
            "name": "to%20get%20the%20full%20list%20of%20countries.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6525",\
            "y": "1430",\
            "z": "16"\
            },\
            {\
            "type": "NUM",\
            "id": "num3",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5430",\
            "y": "751",\
            "z": "17",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "0.5,1"]\
            ]\
            },\
            {\
            "type": "MOVE",\
            "id": "move",\
            "name": "move",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6505.2",\
            "y": "838",\
            "z": "18",\
            "params":\
            [\
                    ["NUM#", "y", "228,0"]\
            ]\
            },\
            {\
            "type": "SUBLST",\
            "id": "sublist",\
            "name": "sublist",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4569",\
            "y": "955",\
            "z": "19",\
            "_connected": "false",\
            "params":\
            [\
                    ["NUM#", "start", "2,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment",\
            "name": "Connect%20the%20%3Cb%3Ecount%3C%2Fb%3E%20to%20the%20%3Cb%3Erepeat%3C%2Fb%3E",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6525",\
            "y": "1386",\
            "z": "20"\
            },\
            {\
            "type": "DRSH",\
            "id": "dropShadow",\
            "name": "drop%20shadow",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5316",\
            "y": "1487",\
            "z": "21",\
            "params":\
            [\
                    ["NUM#", "x", "0.5,1"],\
                    ["NUM#", "y", "0.5,1"],\
                    ["NUM#", "blur", "0,0"],\
                    ["FILL#", "fill", "0,0 0,0 0,0 100,0 0,0"]\
            ]\
            },\
            {\
            "type": "SEQ",\
            "id": "sequence",\
            "name": "sequence",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "4620",\
            "y": "1110",\
            "z": "22",\
            "params":\
            [\
                    ["NUM#", "step", "1,0"],\
                    ["NUM#", "end", "?,0"]\
            ]\
            },\
            {\
            "type": "REPT",\
            "id": "repeat",\
            "name": "repeat",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "6766",\
            "y": "1230",\
            "z": "23",\
            "active": "true",\
            "params":\
            [\
                    ["NUM#", "count", "20,0"]\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment3",\
            "name": "Dataset%20taken%20from%20",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "3946",\
            "y": "1296",\
            "z": "24"\
            },\
            {\
            "type": "SMATH",\
            "id": "math",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5666",\
            "y": "908",\
            "z": "25",\
            "params":\
            [\
                    ["NUM#", "value", "206,0"],\
                    ["NUM#", "operand", "6,0"]\
            ]\
            },\
            {\
            "type": "NUM",\
            "id": "num2",\
            "name": "number",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5519",\
            "y": "1151",\
            "z": "26",\
            "width": "120",\
            "height": "54",\
            "params":\
            [\
                    ["NUM#", "value", "12,0"]\
            ]\
            },\
            {\
            "type": "COUNT",\
            "id": "count",\
            "name": "count",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "6565",\
            "y": "1228",\
            "z": "27",\
            "params":\
            [\
                    ["NUM#", "value", "264,0"]\
            ]\
            },\
            {\
            "type": "SMATH",\
            "id": "math2",\
            "name": "math",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5290",\
            "y": "672",\
            "z": "28",\
            "params":\
            [\
                    ["NUM#", "value", "?,0"],\
                    ["NUM#", "operation", "3,0"],\
                    ["NUM#", "operand", "5000000,0"]\
            ]\
            },\
            {\
            "type": "RECT",\
            "id": "rect",\
            "name": "rectangle",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "5829",\
            "y": "648",\
            "z": "29",\
            "params":\
            [\
                    ["NUM#", "x", "206,0"],\
                    ["NUM#", "y", "2,0"],\
                    ["NUM#", "width", "0.5,1"],\
                    ["NUM#", "height", "10,0"]\
            ]\
            },\
            {\
            "type": "PANEL",\
            "id": "panel",\
            "name": "",\
            "renamed": "false",\
            "enabled": "true",\
            "highlight": "4",\
            "x": "6499",\
            "y": "1371",\
            "z": "30",\
            "width": "450",\
            "height": "181.17321025985186",\
            "params":\
            [\
            ]\
            },\
            {\
            "type": "CMNT",\
            "id": "comment5",\
            "name": "Warning%3A%20%3Cb%3Eit\'s%20slow%3C%2Fb%3E.",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6523",\
            "y": "1489",\
            "z": "31"\
            },\
            {\
            "type": "CMNT",\
            "id": "comment6",\
            "name": "%E2%9F%B6",\
            "renamed": "true",\
            "enabled": "true",\
            "highlight": "0",\
            "x": "6705",\
            "y": "1250",\
            "z": "32"\
            }\
        ],\
        "connections":\
        [\
            {\
            "outputNodeId": "select3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "textToNum",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "replace",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "nanIsNum2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "rect",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sublist",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select",\
            "inputId": "index",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "text3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "csv",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "color",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "dropShadow",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "combine2",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "select2",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "nanIsNum2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "minmax",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num3",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "minmax",\
            "inputId": "h1",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "replace",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "text",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "num2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "text",\
            "inputId": "height",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "text",\
            "inputId": "props",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "select",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "select3",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "combine",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "sequence2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "move",\
            "inputId": "y",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "csv",\
            "outputId": "value",\
            "outputOrder": "0",\
            "inputNodeId": "sublist",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "move",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "repeat",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "num",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "math",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "sublist",\
            "outputId": "h0",\
            "outputOrder": "1",\
            "inputNodeId": "count",\
            "inputId": "h0",\
            "list": "true"\
            },\
            {\
            "outputNodeId": "textToNum",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "math2",\
            "inputId": "h0",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "math",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "x",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "minmax",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "width",\
            "list": "false"\
            },\
            {\
            "outputNodeId": "combine2",\
            "outputId": "h0",\
            "outputOrder": "0",\
            "inputNodeId": "rect",\
            "inputId": "props",\
            "list": "true"\
            }\
        ]\
    }';