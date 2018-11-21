@echo off 
setlocal enabledelayedexpansion 

echo ***** ԭ���� replaced ||��Сдreplaced2 *****
set replaced=rxRnTemplate
set replaced2=rxrntemplate

echo ***** ������ all *****
set /p all='please entry project name':

echo ************************************************* �޸� package.json **************************************************
set file=%cd%\package.json
set "file=%file:"=%" 
for %%i in ("%file%") do set file=%%~fi

echo ***** �������滻 *****
for /f "delims=" %%i in ('type "%file%"') do ( 
  set str=%%i 
  set "str=!str:%replaced%=%all%!"
  echo !str!>>"%file%"_tmp.txt 
)
move "%file%"_tmp.txt "%file%"


echo ************************************************* �޸� app.json **************************************************
set file=%cd%\app.json
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** �������滻 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced%=%all%!"
  echo !str!>>"%file%"_tmp.txt
)
move "%file%"_tmp.txt "%file%"



echo ************************************************* �޸� AndroidManifest.xml **************************************************
set file=%~dp0android\app\src\main\AndroidManifest.xml
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** �������滻 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced2%=%all%!"
  echo !str!>>"%file%"_tmp.txt
)
move "%file%"_tmp.txt "%file%"



echo ************************************************* �޸� strings.xml **************************************************
set file=%~dp0android\app\src\main\res\values\strings.xml
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** �������滻 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced%=%all%!"
  echo !str!>>"%file%"_tmp.xml
)
move "%file%"_tmp.xml "%file%"


echo ************************************************* �޸� MainApplication.java **************************************************
set file=%~dp0android\app\src\main\java\com\rxrntemplate\MainApplication.java
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** �������滻 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced2%=%all%!"
  echo !str!>>"%file%"_tmp.java
)
move "%file%"_tmp.java "%file%"


echo ************************************************* �޸� MainActivity.java **************************************************
set file=%~dp0android\app\src\main\java\com\rxrntemplate\MainActivity.java
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** �������滻 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced2%=%all%!"
  set "str=!str:%replaced%=%all%!"
  echo !str!>>"%file%"_tmp.java
)
move "%file%"_tmp.java "%file%"


echo ************************************************* �޸� settings.gradle **************************************************
set file=%~dp0android\settings.gradle
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** �������滻 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced%=%all%!"
  echo !str!>>"%file%"_tmp.gradle
)
move "%file%"_tmp.gradle "%file%"


echo ************************************************* �޸� build.gradle **************************************************
set file=%~dp0android\app\build.gradle
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** �������滻 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced2%=%all%!"
  echo !str!>>"%file%"_tmp.gradle
)
move "%file%"_tmp.gradle "%file%"



echo ************************************************* �޸İ��� **************************************************
ren %~dp0android\app\src\main\java\com\rxrntemplate %all%


echo ************************************************* �޸� build.gradle �汾 **************************************************

set replaced=3.2.1

set file=%~dp0android\build.gradle
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

set /p all='change build.gradle version 3.2.1 to':
if '%all%'=='' (
echo ************************************************** ���޸� **************************************************
) else (
    for /f "delims=" %%i in ('type "%file%"') do (
      set str=%%i
      set "str=!str:%replaced%=%all%!"
      echo !str!>>"%file%"_tmp.txt
    )
    move "%file%"_tmp.txt "%file%"
)

echo ************************************************* �޸� gradle-wrapper �汾 **************************************************

set replaced=gradle-4.6-all.zip
set file=%~dp0android\gradle\wrapper\gradle-wrapper.properties
set /p all='change gradle-wrapper.properties version gradle-4.6-all.zip to':
if '%all%'=='' (
echo ************************************************** ���޸� **************************************************
) else (
    set "file=%file:"=%"
    for %%i in ("%file%") do set file=%%~fi
    for /f "delims=" %%i in ('type "%file%"') do (
      set str=%%i
      set "str=!str:%replaced%=%all%!"
      echo !str!>>"%file%"_tmp.txt
    )
    move "%file%"_tmp.txt "%file%"
)