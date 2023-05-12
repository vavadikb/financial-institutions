import cron from "node-cron";
import { spawn } from "child_process";
import { updateDeal } from "./cron_func.js";

export async function update() {
  const cron = spawn("node", ["./src/cron/cron_func.js"]);

  cron.stdout.on("data", async (data) => {
    console.log(`stdout: ${data}`);
    await updateDeal();
  });

  cron.stderr.on("data", async (data) => {
    console.error(`stderr: ${data}`);
  });

  cron.on("close", async (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

cron.schedule("0 0 * * *", async () => {
  console.log("you earned money for yesterday");
  await update();
});
