# Tailscale HuJSON WebAssembly Build

## What is HUJSON

https://github.com/tailscale/hujson


## Requirements

TinyGo

```
brew tap tinygo-org/tools
brew install tinygo
```

## Wasm Implementation

| method | type | description |
| -- | -- | -- |
| perse() | wasm.exports | Perse HuJSON string. Pass a hujson string to Parse(a string) (Value, error) from JS. |
| log() | | wasm.importObject | logging for debug. |
| onParse() | wasm.importObject | Invoked when hujson parsed correctly from wasm. |
| onParseError() | wasm.importObject | Invoked when a parse error occured from wasm. |
