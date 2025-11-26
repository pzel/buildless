.PHONY: build serve stop watch test lint

serve:
	(cd public && python3 -m http.server 1355 >../serve-lf3.log 2>&1) &

stop:
	pkill -fec 'http.server 1355'

watch:
	watchexec --watch=./ --watch=./public --exts=js,json,m4 $(MAKE) build

build: public/index.html public/test.html
	@echo "BUILT"

test:
	open http://localhost:1355/test.html

public/%.html: src/%.html.m4 $(wildcard ./importmap*.json) $(wildcard ./public/**.js)
	m4 --define=BUSTER=$(shell openssl rand 6 | base64) --prefix-builtins $< > $@

lint:
	deno lint
