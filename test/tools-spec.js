const expect = require("chai").expect;
const tools = require("../lib/tools")

describe("printName()", function (){
    it("should print the last name first", function () {
        let results = tools.printName({ first: "Alex", last: "Banks"});

        expect(results).to.equal("Banks, Alex");
    });
});