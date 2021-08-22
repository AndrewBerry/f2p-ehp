import { Queue } from "bullmq";
import { redis } from "../../utils/redis";

const queue = new Queue("worker", { connection: redis });

export async function createUpdateRequest(ign: string) {
  await queue.add("updateRequest", ign, { jobId: ign, removeOnComplete: true });
}
