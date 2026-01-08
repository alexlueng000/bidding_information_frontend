// API configuration for different environments
const isServer = typeof window === 'undefined';

// Server-side: use direct backend URL (required for SSR)
// Client-side: use relative path (works with Next.js rewrites in dev, or same-domain routing in prod)
const getApiBase = () => {
  if (isServer) {
    // Server-side always needs the full backend URL
    return process.env.BACKEND_URL || 'http://127.0.0.1:8000';
  }
  // Client-side uses relative path - proxy/rewrite handles the routing
  return '/api/v1';
};

const API_BASE = getApiBase();

export async function getBidInfo(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const res = await fetch(
      `${API_BASE}/bidding/?skip=${skip}&limit=${limit}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) throw new Error('Failed to fetch bidding info');

    return res.json();
  }


export async function getBidInfoTotal() {
    const response = await fetch(`${API_BASE}/bidding/count`)

    if (!response.ok) {
        throw new Error('Failed to fetch total bid count')
    }

    const data = await response.json()
    return data.total
}

export async function getUniversityInfo() {
    const response = await fetch(`${API_BASE}/bidding/universities`)

    if (!response.ok) {
        throw new Error('Failed to fetch university info')
    }

    const data = await response.json()
    return data
}

export async function getOneUniversityInfo(university: string) {
    const response = await fetch(`${API_BASE}/bidding/universities/${university}`)

    if (!response.ok) {
        throw new Error('Failed to fetch university info')
    }

    const data = await response.json()
    return data
}

export async function getBiddingItemById(id: string) {
    const response = await fetch(`${API_BASE}/bidding/item/${id}`, {
        cache: 'no-store',
    })

    if (!response.ok) {
        throw new Error('Failed to fetch bidding item')
    }

    const data = await response.json()
    return data
}
