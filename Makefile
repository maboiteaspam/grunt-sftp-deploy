-include test/ENV

test_all:
	./node_modules/mocha/bin/mocha --reporter spec
