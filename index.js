const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// ✅ どんなオリジンからでも受け付ける
app.use(cors({
  origin: '*',
}));

// ✅ JSONをパース
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const gasUrl = 'https://script.google.com/macros/s/AKfycbx4g6rnax9jDt4JQb2e-KPIyCuXeRe6OWJplL9lQAk70Ubee5r_IRILfFFFpf2aing7Bg/exec';

    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*'); // ✅ 明示的に追加
    res.json(data);
  } catch (err) {
    console.error('エラー:', err);
    res.status(500).json({ error: 'GASとの通信に失敗しました' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ サーバー起動中: http://localhost:${PORT}`));
