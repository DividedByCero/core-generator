## NetCore Template File Generator
CLI Tool to generate basic files for any NETCore Project outside of a VStudio Enviroment.

### Installation
[Still working on it, soon it will be installable via NPM]

### Usage
```
ntcgen [TEMPLATE TYPE] [CLASSNAME] [OUTPUT_PATH]
```
### info
```
- Template type must be expecified as first parameter.
- Avoid any non-letter character inside the [CLASSNAME] (All will be ignore).
- Any non-letter character into [OUTPUT_PATH] would cause "Invalid output" notificacion (Still Untested).
- subdirectories expecified in the [OUTPUT_PATH] would been created.
-- interfaces files will be created with a "I" Preffix.
```

### Available Templates :
```
- wapi:controller -> WebAPI controller
- cm:class        -> Class
- cm:interface    -> Interface
```
