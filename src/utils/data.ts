import fs from 'fs';
import path from 'path';

export function getPortfolioData() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  return data;
}