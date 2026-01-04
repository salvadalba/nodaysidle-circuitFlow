import pool from './index';
import fs from 'fs';
import path from 'path';

async function seed() {
    console.log('🌱 Seeding database...');

    try {
        const seedsDir = path.join(__dirname, 'seeds');
        const files = fs.readdirSync(seedsDir).filter(f => f.endsWith('.sql')).sort();

        for (const file of files) {
            console.log(`  📄 Running seed: ${file}`);
            const sql = fs.readFileSync(path.join(seedsDir, file), 'utf-8');
            await pool.query(sql);
            console.log(`  ✅ Completed: ${file}`);
        }

        console.log('✨ Database seeded successfully!');

        // Verify seeded data
        const result = await pool.query('SELECT id, title, type FROM documents');
        console.log('\n📋 Documents in database:');
        result.rows.forEach(doc => {
            console.log(`  - ${doc.id}: ${doc.title} (${doc.type})`);
        });

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

seed();
