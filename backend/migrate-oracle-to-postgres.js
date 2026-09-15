require("dotenv").config();

const oracledb = require("oracledb");
const { Client } = require("pg");

oracledb.fetchAsString = [oracledb.CLOB];

async function main() {
    let oracle;
    const pg = new Client({
        connectionString: process.env.DIRECT_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log("Connecting to Oracle...");

        oracle = await oracledb.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECT_STRING
        });

        console.log("Oracle connected.");

        console.log("Connecting to Prisma PostgreSQL...");

        await pg.connect();

        console.log("Prisma PostgreSQL connected.");

        // --------------------------------------------------
        // Safety check: PostgreSQL target must be empty
        // --------------------------------------------------

        const tables = [
            "admin_users",
            "admin",
            "blogs",
            "admin_password_resets"
        ];

        for (const table of tables) {
            const result = await pg.query(
                `SELECT COUNT(*)::int AS count FROM ${table}`
            );

            const count = result.rows[0].count;

            if (count > 0) {
                throw new Error(
                    `Target table "${table}" is not empty (${count} rows). Migration stopped for safety.`
                );
            }
        }

        console.log("Target PostgreSQL tables are empty.");

        await pg.query("BEGIN");

        // --------------------------------------------------
        // 1. ADMIN_USERS
        // --------------------------------------------------

        console.log("Migrating ADMIN_USERS...");

        const adminUsers = await oracle.execute(
            `SELECT
                ID,
                EMAIL,
                PASSWORD_HASH,
                CREATED_AT
             FROM ADMIN_USERS
             ORDER BY ID`
        );

        for (const row of adminUsers.rows) {
            await pg.query(
                `INSERT INTO admin_users
                    (id, email, password_hash, created_at)
                 VALUES ($1, $2, $3, $4)`,
                [
                    row[0],
                    row[1],
                    row[2],
                    row[3]
                ]
            );
        }

        console.log(`ADMIN_USERS migrated: ${adminUsers.rows.length}`);

        // --------------------------------------------------
        // 2. ADMIN
        // --------------------------------------------------

        console.log("Migrating ADMIN...");

        const admin = await oracle.execute(
            `SELECT
                ID,
                EMAIL,
                PASSWORD_HASH,
                ROLE,
                CREATED_AT,
                UPDATED_AT
             FROM ADMIN
             ORDER BY ID`
        );

        for (const row of admin.rows) {
            await pg.query(
                `INSERT INTO admin
                    (id, email, password_hash, role, created_at, updated_at)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    row[0],
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    row[5]
                ]
            );
        }

        console.log(`ADMIN migrated: ${admin.rows.length}`);

        // --------------------------------------------------
        // 3. BLOGS
        // --------------------------------------------------

        console.log("Migrating BLOGS...");

        const blogs = await oracle.execute(
            `SELECT
                ID,
                TITLE,
                DESCRIPTION,
                CONTENT,
                IMAGE,
                AUTHOR,
                CATEGORY,
                CREATED_AT,
                UPDATED_AT,
                SEO_TITLE,
                META_DESCRIPTION,
                SEO_KEYWORDS,
                FOCUS_KEYWORD,
                URL_SLUG,
                CANONICAL_URL
             FROM BLOGS
             ORDER BY ID`
        );

        for (const row of blogs.rows) {
            await pg.query(
                `INSERT INTO blogs
                    (
                        id,
                        title,
                        description,
                        content,
                        image,
                        author,
                        category,
                        created_at,
                        updated_at,
                        seo_title,
                        meta_description,
                        seo_keywords,
                        focus_keyword,
                        url_slug,
                        canonical_url
                    )
                 VALUES
                    (
                        $1, $2, $3, $4, $5,
                        $6, $7, $8, $9, $10,
                        $11, $12, $13, $14, $15
                    )`,
                [
                    row[0],
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    row[5],
                    row[6],
                    row[7],
                    row[8],
                    row[9],
                    row[10],
                    row[11],
                    row[12],
                    row[13],
                    row[14]
                ]
            );
        }

        console.log(`BLOGS migrated: ${blogs.rows.length}`);

        // --------------------------------------------------
        // 4. ADMIN_PASSWORD_RESETS
        // --------------------------------------------------

        console.log("Migrating ADMIN_PASSWORD_RESETS...");

        const resets = await oracle.execute(
            `SELECT
                ID,
                ADMIN_ID,
                OTP,
                EXPIRES_AT,
                USED,
                CREATED_AT
             FROM ADMIN_PASSWORD_RESETS
             ORDER BY ID`
        );

        for (const row of resets.rows) {
            await pg.query(
                `INSERT INTO admin_password_resets
                    (
                        id,
                        admin_id,
                        otp,
                        expires_at,
                        used,
                        created_at
                    )
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    row[0],
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    row[5]
                ]
            );
        }

        console.log(
            `ADMIN_PASSWORD_RESETS migrated: ${resets.rows.length}`
        );

        // --------------------------------------------------
        // Reset PostgreSQL identity sequences
        // --------------------------------------------------

        console.log("Resetting PostgreSQL identity sequences...");

        for (const table of tables) {
            await pg.query(`
                SELECT setval(
                    pg_get_serial_sequence('${table}', 'id'),
                    COALESCE((SELECT MAX(id) FROM ${table}), 0) + 1,
                    false
                )
            `);
        }

        await pg.query("COMMIT");

        console.log("");
        console.log("==========================================");
        console.log("ORACLE → POSTGRES MIGRATION SUCCESSFUL");
        console.log("==========================================");

        // --------------------------------------------------
        // Verify counts
        // --------------------------------------------------

        for (const table of tables) {
            const result = await pg.query(
                `SELECT COUNT(*)::int AS count FROM ${table}`
            );

            console.log(`${table}: ${result.rows[0].count}`);
        }

    } catch (error) {

        try {
            await pg.query("ROLLBACK");
        } catch {}

        console.error("");
        console.error("==========================================");
        console.error("MIGRATION FAILED");
        console.error("==========================================");
        console.error(error.message);

        process.exitCode = 1;

    } finally {

        if (oracle) {
            try {
                await oracle.close();
            } catch {}
        }

        try {
            await pg.end();
        } catch {}
    }
}

main();