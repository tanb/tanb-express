NPM := npm
NPX := npx

.PHONY: install
install:
	$(NPM) install

.PHONY: ci
ci:
	$(NPM) ci

.PHONY: serve
serve:
	$(NPX) ng serve

# Production build
.PHONY: build
build:
	$(NPX) ng build

.PHONY: format
format:
	$(NPX) prettier --write .

.PHONY: check-format
check-format:
	$(NPX) prettier --check .

.PHONY: test
test:
	$(NPX) ng test

.PHONY: lint
lint:
	$(NPX) ng lint

.PHONY: lint-fix
lint-fix:
	$(NPX) ng lint --fix=true
