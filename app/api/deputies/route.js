import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.toLowerCase() || '';

    // Read CSV file
    const filePath = path.join(process.cwd(), 'resources', 'liste_deputes.csv');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Parse CSV
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });

    // Filter based on search query
    const filteredDeputies = records.filter(deputy => 
        deputy.Prénom.toLowerCase().includes(query) ||
        deputy.Nom.toLowerCase().includes(query)
    ).slice(0, 10); // Limit to 10 suggestions

    return Response.json(filteredDeputies);
} 