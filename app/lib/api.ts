// lib/api.ts
// Thin API client for the Familiar Lite demo.
// Keeps all HTTP details in one place so components stay clean.

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(
      `API error ${res.status}: ${res.statusText} ${
        body ? `- ${body.slice(0, 200)}` : ''
      }`,
    );
  }

  return (await res.json()) as T;
}

// NOTE: Intentionally not importing types here to avoid naming mistakes.
// In components, we can cast if we want stronger typing.

export async function fetchHotels() {
  const res = await fetch(`${baseUrl}/hotels`, {
    cache: 'no-store',
  });

  return handleResponse<any[]>(res);
}

export async function fetchHotelDetails(id: string) {
  const res = await fetch(`${baseUrl}/hotels/${id}`, {
    cache: 'no-store',
  });

  return handleResponse<any>(res);
}
