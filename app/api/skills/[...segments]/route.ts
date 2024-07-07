import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    // Extract and decode segments after /api/skills
    const segments = url.pathname.split('/').filter(Boolean).slice(2).map(segment => decodeURIComponent(segment));
    console.log('Segments:', segments); // For debugging

    const filePath = path.join(process.cwd(), 'data', 'skills.yml');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = yaml.load(fileContents);

    let current = data;
    for (const segment of segments) {
      if (current[segment]) {
        current = current[segment];
      } else {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
    }

    return NextResponse.json(current);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to load skills data' }, { status: 500 });
  }
}
