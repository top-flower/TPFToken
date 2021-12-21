const {
  BN, // Big Number support
  constants, // Common constants, like the zero address and largest integers
  expectEvent, // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const { expect } = require("chai");

const TPFToken = artifacts.require("TPFToken");

function ether(n) {
  return web3.utils.toWei(new BN(n), "ether");
}
function TokenTest(
  [admin, user1, user2, user3],
  tokenName,
  tokenSymbol,
  totalSupply
) {
  describe("TPFToken", function () {
    describe("Token detail", function () {
      it("check token name", async function () {
        expect(await this.TPFToken.name()).to.be.equal(tokenName);
      });

      it("check token symboi", async function () {
        expect(await this.TPFToken.symbol()).to.be.equal(tokenSymbol);
      });

      it("check token totalSupply", async function () {
        expect(await this.TPFToken.totalSupply()).to.be.bignumber.equal(
          totalSupply
        );
      });

      it("check owner totalSupply", async function () {
        expect(await this.TPFToken.balanceOf(this.admin)).to.be.bignumber.equal(
          totalSupply
        );
      });
    });

    describe("Token behavior", function () {
      it("check token transfer", async function () {
        const amount = ether(1);
        await this.TPFToken.transfer(user1, amount, { from: admin });
        const user1Balance = await this.TPFToken.balanceOf(user1);
        expect(user1Balance).to.be.bignumber.equal(amount);
      });

      describe("Token behavior pause", function () {
        it("Fails when called by a non-admin account", async function () {
          await expectRevert(
            this.TPFToken.pause({ from: user1 }),
            "ERC20PresetMinterPauser"
          );
        });

        it("Success when called by a admin account", async function () {
          await this.TPFToken.pause({ from: admin });
          expect(await this.TPFToken.paused()).to.be.true;
        });

        it("Fails to called tranfer token when paused", async function () {
          // pause token
          await this.TPFToken.pause({ from: admin });
          // test transfer
          const amount = ether(1);
          await expectRevert(
            this.TPFToken.transfer(user1, amount, { from: admin }),
            "ERC20Pausable"
          );
        });
      });
    });

    describe("Token maximum cap", function () {
      it("Fails to called mint after deployed due to max cap", async function () {
        await expectRevert(
          this.TPFToken.mint(admin, ether(1), { from: admin }),
          "ERC20Capped"
        );
      });
    });
  });
}

module.exports = {
  TokenTest,
};
