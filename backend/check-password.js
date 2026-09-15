const { prisma } = require("./db");
const bcrypt = require("bcryptjs");

async function checkPassword() {
    try {
        const admin = await prisma.admin.findFirst({
            where: {
                email: {
                    equals: "CynoxGlobal@company.com",
                    mode: "insensitive"
                }
            }
        });

        if (!admin) {
            console.log("ADMIN NOT FOUND");
            return;
        }

        const result = await bcrypt.compare(
            "YOUR_REAL_PASSWORD",
            admin.password_hash
        );

        console.log("Password match:", result);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

checkPassword();