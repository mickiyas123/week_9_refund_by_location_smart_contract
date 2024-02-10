import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC20 } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("MyERC20Contract", function () {
  let myERc20Contract: ERC20;
  let someAddress: SignerWithAddress;
  let someOtherAddress: SignerWithAddress;
  this.beforeEach(async function () {
    const ERC20ContractFactory = await ethers.getContractFactory("ERC20");
    const myERc20Contract = await ERC20ContractFactory.deploy("Hello", "SYM");
    await myERc20Contract.getDeployedCode();
    someAddress = (await ethers.getSigners())[1];
    someOtherAddress = (await ethers.getSigners())[2];
  });

  describe("when i have 10 tokens", function () {
    beforeEach(async function () {
      await myERc20Contract.transfer(someAddress.address, 10);
    });

    describe("when I transfer 10 tokens", function () {
      it("should transfer tokens correctly", async function () {
        await myERc20Contract
          .connect(someAddress)
          .transfer(someOtherAddress, 10);
        expect(
          await myERc20Contract.balanceOf(someOtherAddress.address)
        ).to.equal(10);
      });
    });
  });
});
