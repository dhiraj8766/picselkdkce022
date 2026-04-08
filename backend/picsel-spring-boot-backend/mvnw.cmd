@echo off
setlocal
set "MAVEN_PROJECTBASEDIR=%~dp0"
set "MAVEN_WRAPPER_PROPERTIES=%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.properties"

if not exist "%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven" (
    echo Downloading Maven...
    mkdir "%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven"
    powershell -Command "Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip' -OutFile '%TEMP%\maven.zip'"
    powershell -Command "Expand-Archive -Path '%TEMP%\maven.zip' -DestinationPath '%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven' -Force"
    del "%TEMP%\maven.zip"
)

for /d %%i in ("%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven\apache-maven-*") do set "MAVEN_HOME=%%i"
"%MAVEN_HOME%\bin\mvn.cmd" %*
