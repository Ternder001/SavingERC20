import {
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// const { expect } = require("chai");
// const { ethers } = require("hardhat");
import { ethers } from "hardhat";
import { expect } from "chai";
const { parseEther } = require("ethers/lib/utils");




describe("SaveERC20", function() {

  async function deploySaveERC20() {
    let owner;
    let addr1;
    let addr2;

    const SaveERC20 = await ethers.getContractFactory("SaveERC20");
    [owner, addr1, addr2] = await ethers.getSigners();

    const saveERC20 = await SaveERC20.deploy(addr1.address);

    await saveERC20.waitForDeployment();

    return { saveERC20, owner };
  }

  it("Should deposit tokens successfully", async function() {
    const depositAmount = parseEther("100");
    const { saveERC20, owner } = await loadFixture(deploySaveERC20);
    await expect(saveERC20.deposit(depositAmount))
      .to.emit(saveERC20, "SavingSuccessful")
      .withArgs(owner.address, depositAmount);
  });

  it("Should withdraw tokens successfully", async function() {
    const depositAmount = parseEther("100");
    const withdrawAmount = parseEther("50");
    const { saveERC20, owner } = await loadFixture(deploySaveERC20);

    await saveERC20.deposit(depositAmount);

    await expect(saveERC20.withdraw(withdrawAmount))
      .to.emit(saveERC20, "WithdrawSuccessful")
      .withArgs(owner.address, withdrawAmount);
  });

  it("Should check user balance correctly", async function() {
    const depositAmount = parseEther("100");
    const { saveERC20, owner } = await loadFixture(deploySaveERC20);

    await saveERC20.deposit(depositAmount);

    expect(await saveERC20.checkUserBalance(owner.address))
      .to.equal(depositAmount);
  });

  it("Should check contract balance correctly", async function() {
    const depositAmount = parseEther("100");
    const { saveERC20, owner } = await loadFixture(deploySaveERC20);

    await saveERC20.deposit(depositAmount);

    expect(await saveERC20.checkContractBalance())
      .to.equal(depositAmount);
  });

  it("Should allow owner to withdraw tokens", async function() {
    const depositAmount = parseEther("100");
    const withdrawAmount = parseEther("50");
    const { saveERC20, owner } = await loadFixture(deploySaveERC20);

    await saveERC20.deposit(depositAmount);

    await expect(saveERC20.connect(owner).ownerWithdraw(withdrawAmount))
      .to.emit(saveERC20, "WithdrawSuccessful")
      .withArgs(owner.address, withdrawAmount);
  });
});