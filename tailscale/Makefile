wasm_exec:
	curl -O https://raw.githubusercontent.com/tinygo-org/tinygo/v0.24.0/targets/wasm_exec.js


wasm:
	cd src; \
	tinygo build -o ../dist/hujson.wasm -target wasm ./main.go


dist:
	mkdir -p ./dist

build: dist wasm wasm_exec
	cp ./src/index.html ./dist/index.html
	cp ./src/wasm_exec.js ./dist/wasm_exec.js


serve:
	python3 -m http.server --directory ./dist 4201
