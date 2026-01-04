import pool from './index';
import fs from 'fs';
import path from 'path';

async function migrate() {
    console.log('🔄 Running database migrations...');

    try {
        const migrationsDir = path.join(__dirname, 'migrations');
        const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

        for (const file of files) {
            console.log(`  📄 Running migration: ${file}`);
            const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
            await pool.query(sql);
            console.log(`  ✅ Completed: ${file}`);
        }

        console.log('✨ All migrations completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

migrate();
