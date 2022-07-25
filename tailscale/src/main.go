package main

import (
	"encoding/json"
	"github.com/tailscale/hujson"
)

func main() {
}

var buf [1024]byte

//export getBuffer
func getBuffer() *byte {
	return &buf[0]
}

//export parse
func parse(str string) {
	log(str)
	b := []byte(str)

	v, err := hujson.Parse(b)
	if err != nil {
		onParseError(err.Error())
		return
	}
	v.Standardize()
	bytes := v.Pack()
	if !json.Valid(bytes) {
		onParseError("Invalid JSON")
		return
	}
	log(string(bytes))
	onParse(string(bytes))
}

func log(a string)
func onParse(a string)
func onParseError(a string)
