#
# Makefile for tanb.github.io
#


NODEDIR = $(CURDIR)/node
NPM = `which npm`
JEKYLL = `which jekyll`
COFFEE = $(NODEDIR)/node_modules/coffee-script/bin/coffee
JSDIR = $(CURDIR)/js
CSDIR = $(CURDIR)/cs

install_requisite:
	cd $(NODEDIR);\
	$(NPM) install coffee-script;

run: js_compile
	$(JEKYLL) serve;

js_compile:
	$(COFFEE) --join $(JSDIR)/packed.js -c $(CSDIR)/*.coffee
watch:
	$(COFFEE) --join $(JSDIR)/packed.js -cw $(CSDIR)/*.coffee
