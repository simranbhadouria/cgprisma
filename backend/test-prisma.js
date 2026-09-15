const { prisma } = require("./db");

async function test() {
    try {
        await prisma.$queryRawUnsafe("SELECT 1");

        console.log("Prisma PostgreSQL connection successful");
    } catch (error) {
        console.error("Prisma connection failed:");
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

test();