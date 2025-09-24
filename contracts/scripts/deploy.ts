import { mkdirSync, writeFileSync } from "fs";
import hre from "hardhat";
import { resolve } from "path";

async function main() {
  const Todo = await hre.ethers.getContractFactory("Todo");
  const todo = await Todo.deploy();
  await todo.waitForDeployment();

  const address = await todo.getAddress();
  console.log("Todo deployed to:", address);

  // Export ABI and address to the frontend
  const artifact = await hre.artifacts.readArtifact("Todo");
  const outDir = resolve(process.cwd(), "../frontend/src/contracts");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "Todo.json"), JSON.stringify(artifact, null, 2));
  writeFileSync(resolve(outDir, "address.json"), JSON.stringify({ address }, null, 2));
  console.log("ABI and address written to frontend/src/contracts");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
