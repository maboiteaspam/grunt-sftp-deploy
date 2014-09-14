-include test/test.env

test_all:
	./node_modules/mocha/bin/mocha --verbose --reporter spec
