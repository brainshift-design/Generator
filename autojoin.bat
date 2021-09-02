@echo off
TITLE Generator
"c:\users\alex\documents\github\autojoin\bin\debug\autojoin.exe" ^
    autojoin/generator.aj ../output/generator.html ^
    autojoin/ui.aj        ../output/ui.html ^
    -watch
@echo on