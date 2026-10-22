const baseUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';
const apiUrl = process.env.API_URL ?? 'http://localhost:3000';

async function check(url, expected, label) {
  const response = await fetch(url);
  if (response.status !== expected) {
    throw new Error(`${label}: expected ${expected}, received ${response.status}`);
  }
  console.log(`PASS ${label}`);
}

await check(`${apiUrl}/api/v1/health`, 200, 'backend health');
await check(baseUrl, 200, 'frontend');
