@echo off
TITLE Generator
"E:\Brainshift\github\autojoin\bin\debug\autojoin.exe" ^
    autojoin/figma.aj     ../output/main.ts ^
    autojoin/generator.aj ../output/generator.html ^
    autojoin/ui.aj        ../output/ui.html ^
    ^
    -watch
@echo on