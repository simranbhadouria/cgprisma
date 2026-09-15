const { prisma } = require("./db");

async function checkAdmin() {
    try {
        const admins = await prisma.admin.findMany({
            select: {
                id: true,
                email: true,
                role: true
            }
        });

        console.log(admins);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

checkAdmin();