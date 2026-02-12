import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get('/portfolio/:userId', async (req, res) => {
    const { userId } = req.params;

    const cashRes = await pool.query('SELECT cash_balance FROM portfolios WHERE user_id = $1', [userId]);

    const stockRes = await pool.query(`
        SELECT symbol, SUM(shares) as quantity 
        FROM transactions 
        WHERE user_id = $1 
        GROUP BY symbol 
        HAVING SUM(shares) > 0
    `, [userId]);

    res.json({
        cash: cashRes.rows[0].cash_balance,
        holdings: stockRes.rows
    });
});

app.post('/trade', async (req, res) => {
    const { userId, symbol, shares, price, type } = req.body;

    const cost = shares * price;
    await pool.query(
        'UPDATE portfolios SET cash_balance = cash_balance - $1 WHERE user_id = $2',
        [type === 'BUY' ? cost : -cost, userId]
    );

    await pool.query(
        'INSERT INTO transactions (user_id, symbol, shares, price_at_transaction) VALUES ($1, $2, $3, $4)',
        [userId, symbol, type === 'BUY' ? shares : -shares, price]
    );

    res.json({ message: 'Trade successful' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));