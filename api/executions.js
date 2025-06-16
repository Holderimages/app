
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./public/execution-count.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ count: 1 }));
        return res.status(200).json({ executions: 1 });
      }

      const fileData = fs.readFileSync(filePath, 'utf-8');
      const json = JSON.parse(fileData);

      json.count++;
      fs.writeFileSync(filePath, JSON.stringify(json));

      res.status(200).json({ executions: json.count });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
