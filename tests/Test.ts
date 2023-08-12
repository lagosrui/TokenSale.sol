import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";  
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ERC20, TokenSale } from "../typechain-types";
import { MyERC20 } from "../typechain-types/contracts/MyERC20.sol";

const RATIO = 10;
describe("NFT Shop", async () => {
  let tokenSaleContract: TokenSale;
  let paymentTokenContract: MyERC20;
  let deployer: HardhatEthersSigner;
  let acc1: HardhatEthersSigner;
  let acc2: HardhatEthersSigner;

  async function deployContracts() {
    //primeiro contrato da moeda
    const paymentTokenContractFactory_ = await ethers.getContractFactory("MyERC20");
    const paymentTokenContract_ = await paymentTokenContractFactory_.deploy();
    await paymentTokenContract_.waitForDeployment();
    

    //Deploy do segundo contracto que usa a moeda (vende)

    const tokenSaleContractFactory_ = await ethers.getContractFactory("TokenSale");
    const tokenSaleContract_ = await tokenSaleContractFactory_.deploy(RATIO, ethers.ZeroAddress);
    await tokenSaleContract_.waitForDeployment(); 
    return {tokenSaleContract_, paymentTokenContract_}; 
  };

  beforeEach(async () => {
    [deployer, acc1, acc2] = await ethers.getSigners();  
    const {tokenSaleContract_, paymentTokenContract_} = await loadFixture(deployContracts);
     paymentTokenContract = paymentTokenContract_;
     tokenSaleContract = tokenSaleContract_;
  });

  describe("When the Shop contract is deployed", async () => {
    it("defines the ratio as provided in parameters", async () => {
      const ratio = await tokenSaleContract.ratio();
      expect(ratio).to.eq(RATIO);
    });

    it("uses a valid ERC20 as payment token", async () => {
      const paymentTokenAddress = await tokenSaleContract.paymentToken();
      const tokenContractFactory = await ethers.getContractFactory("ERC20");
      const paymentTokenContract = tokenContractFactory.attach(paymentTokenAddress) as ERC20;
      await expect(paymentTokenContract.balanceOf(ethers.ZeroAddress)).not.to.be.reverted;
      await expect(paymentTokenContract.totalSupply()).not.to.be.reverted;
    });
  });

  describe("When a user buys an ERC20 from the Token contract", async () => {
    beforeEach(async () => {});

    it("charges the correct amount of ETH", async () => {
      throw new Error("Not implemented");
    });

    it("gives the correct amount of tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user burns an ERC20 at the Shop contract", async () => {
    it("gives the correct amount of ETH", async () => {
      throw new Error("Not implemented");
    });

    it("burns the correct amount of tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user buys an NFT from the Shop contract", async () => {
    it("charges the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });

    it("gives the correct NFT", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user burns their NFT at the Shop contract", async () => {
    it("gives the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When the owner withdraws from the Shop contract", async () => {
    it("recovers the right amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });

    it("updates the owner pool account correctly", async () => {
      throw new Error("Not implemented");
    });
  });
});