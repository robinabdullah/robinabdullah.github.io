import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the portfolio data from the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to load portfolio data' },
      { status: 500 }
    );
  }
}