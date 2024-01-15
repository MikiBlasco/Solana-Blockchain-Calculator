import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Mycalculatordapp } from "../target/types/mycalculatordapp";
import { assert } from "chai";
// import { SystemProgram } from "@coral-xyz/anchor";
const {SystemProgram} = anchor.web3

describe("mycalculatordapp", () => {

  const provider = anchor.AnchorProvider.local()
  anchor.setProvider(provider)
  const calculator = anchor.web3.Keypair.generate()
  const program = anchor.workspace.Mycalculatordapp as Program<Mycalculatordapp>;

  it("Creates a Calculator", async () => {
    const tx = await program.methods
    .initialize("Please work")
    .accounts({
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      })
      .signers([calculator])
      .rpc();

    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.greeting === "Please work")
    console.log("Your transaction signature", tx);
  });
  it("Adds two numbers", async () => {
    const tx = await program.methods
    .add(new anchor.BN(2), new anchor.BN(3))
    .accounts({
        calculator: calculator.publicKey,
      })
      .rpc();

    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(5)))
  });
  it("Subtract two numbers", async () => {
    const tx = await program.methods
    .subtract(new anchor.BN(2), new anchor.BN(3))
    .accounts({
        calculator: calculator.publicKey,
      })
      .rpc();

    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(-1)))
  });
  it("Multiply two numbers", async () => {
    const tx = await program.methods
    .multiply(new anchor.BN(2), new anchor.BN(3))
    .accounts({
        calculator: calculator.publicKey,
      })
      .rpc();

    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(6)))
  });
  it("Divide two numbers", async () => {
    const tx = await program.methods
    .divide(new anchor.BN(10), new anchor.BN(3))
    .accounts({
        calculator: calculator.publicKey,
      })
      .rpc();

    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(3)))
    assert.ok(account.remainder.eq(new anchor.BN(1)))
  });
});
