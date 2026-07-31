import { PrismaClient } from "../../generated/prisma/client.ts";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config();



const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});


const prisma = new PrismaClient({
  adapter,
});


export default prisma;