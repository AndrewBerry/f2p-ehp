import { Worker } from "bullmq";
import { redis } from "../utils/redis";

import * as statsModel from "../models/statsModel/insertStats";
import * as hiscoresService from "../services/hiscoresService";

export function workerLoader() {
  new Worker(
    "worker",
    async (job) => {
      try {
        const stats = await hiscoresService.fetchPlayer(job.data);
        await statsModel.insertStats(stats);
      } catch (err) {
        console.log(err);
      }
      return true;
    },
    { connection: redis }
  );
}
