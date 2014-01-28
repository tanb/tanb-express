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

install_requisite:
	cd $(NODEDIR);\
	$(NPM) install coffee-script;

run: bn_compile js_compile
	$(JEKYLL) serve;

bn_compile:
	$(COFFEE) --join $(BNJS) -c $(CSDIR)/bluenote/*.coffee

js_compile:
	$(COFFEE) --join $(DISTJS) -c $(CSDIR)/app/*.coffee
