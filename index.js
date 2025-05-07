const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/summary', async (req, res) => {
  try {
    const gasUrl = 'https://script.google.com/macros/s/AKfycbx4g6rnax9jDt4JQb2e-KPIyCuXeRe6OWJplL9lQAk70Ubee5r_IRILfFFFpf2aing7Bg/exec';

    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('中継サーバーエラー:', error);
    res.status(500).json({ summary: ['中継エラーが発生しました'] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy Server running on port ${PORT}`));
