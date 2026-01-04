import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

// Document type interface
interface Document {
    id: string;
    title: string;
    type: string;
    content: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

// GET /api/documents - Fetch all documents
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'SELECT id, title, type, description, created_at, updated_at FROM documents ORDER BY created_at ASC'
        );

        res.json({
            documents: result.rows.map(doc => ({
                id: doc.id,
                title: doc.title,
                type: doc.type,
                description: doc.description,
                createdAt: doc.created_at,
                updatedAt: doc.updated_at
            }))
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({
            error: 'Failed to fetch documents',
            code: 'DATABASE_ERROR'
        });
    }
});

// GET /api/documents/:id - Fetch single document with content
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM documents WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: `Document with id '${id}' not found`,
                code: 'NOT_FOUND'
            });
        }

        const doc = result.rows[0];
        res.json({
            id: doc.id,
            title: doc.title,
            type: doc.type,
            description: doc.description,
            content: doc.content,
            createdAt: doc.created_at,
            updatedAt: doc.updated_at
        });
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({
            error: 'Failed to fetch document',
            code: 'DATABASE_ERROR'
        });
    }
});

// GET /api/documents/:id/download - Download document as markdown file
router.get('/:id/download', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT title, content FROM documents WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: `Document with id '${id}' not found`,
                code: 'NOT_FOUND'
            });
        }

        const doc = result.rows[0];
        const filename = `${doc.title.replace(/\s+/g, '_')}.md`;

        res.setHeader('Content-Type', 'text/markdown');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(doc.content);
    } catch (error) {
        console.error('Error downloading document:', error);
        res.status(500).json({
            error: 'Failed to download document',
            code: 'DATABASE_ERROR'
        });
    }
});

export default router;
