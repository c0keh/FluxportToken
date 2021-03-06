var FPBeuthToken = artifacts.require("./FPBeuthToken.sol");

contract('FPBeuthToken', function (accounts) {

    it("should assert true", function (done) {
        var f_p_beuth_token = FPBeuthToken.deployed();
        assert.isTrue(true);
        done();
    });

    // Token owner
    var john_address = accounts[0];

    var jane_address = accounts[1];
    var dave_address = accounts[2];


    // Test Case#1
    it("should assert true", function () {
        var token;
        return FPBeuthToken.deployed().then(function (instance) {
            token = instance;
            return token.totalSupply.call();
        }).then(function (result) {
            console.log("Initial Supply=", result.valueOf());

            assert.equal(result.valueOf(), 1000000000000000000, "Token Contract initialized with value");
            return token.name.call();
        }).then(function (result) {
            console.log("Token=", result);
            assert.equal(result, "BeuthToken")
            return token.symbol.call();
        }).then(function (result) {
            console.log("TokenSymbol=", result);
            assert.equal(result, "T")


            token.transfer(jane_address, 100, {from: john_address})

            return token.balanceOf.call(jane_address);
        }).then(function (result) {
            console.log("Jane's balance=", result.valueOf());

            assert.equal(result.valueOf(), 100, "Jane's Token Balance!!!");

            return token.balanceOf.call(john_address);
        }).then(function (result) {
            console.log("John's balance=", result.valueOf());

            assert.equal(result.valueOf(), 999999999999999900, "John's Token Balance!!!");
        });
    });
    //TestCase 2
    it("should assert true", function () {
        var token;
        return FPBeuthToken.deployed().then(function (instance) {
            token = instance;
            //console.log(token.owner);
            token.setPrices(1, 1, {address: john_address});
            return token.buyPrice.call();
        }).then(function (result) {
            console.log("Token BuyPrice=", result.valueOf());

            assert.equal(result.valueOf(), 1, "Token BuyPrice ist 1!!!");
            token.buy({from: jane_address, value: 1});
            return token.balanceOf.call(jane_address);
        }).then(function (result) {
            console.log("Jane's balance=", result.valueOf());

            assert.equal(result.valueOf(), 101, "Jane's Token Balance!!!");
            /*return token.balanceOf.call(john_address);
        }).then(function (result) {
            console.log("John's balance=", result.valueOf());

            assert.equal(result.valueOf(), 999999999999999990, "John's Token Balance!!!");
*/
        });
    });
});


