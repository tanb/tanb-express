#
# Makefile for tanb.github.io
#

NODEDIR = $(CURDIR)/node
NPM = `which npm`
JEKYLL = `which jekyll`
COFFEE = $(NODEDIR)/node_modules/coffee-script/bin/coffee
JSDIR = $(CURDIR)/js
CSDIR = $(CURDIR)/cs
BNJS = $(JSDIR)/bluenote.js
DISTJS = $(JSDIR)/app.js
CAKE = $(NODEDIR)/node_modules/coffee-script/bin/cake

install_requisite:
	cd $(NODEDIR);\
	$(NPM) install coffee-script;

run: bn_compile js_compile
	$(JEKYLL) serve;

bn_compile:
	$(CAKE) -l -s $(CSDIR)/bluenote -o $(BNJS) -m core.coffee -p $(COFFEE) build

js_compile:
	$(CAKE) -s $(CSDIR)/app -o $(DISTJS) -m main.coffee -p $(COFFEE) build
