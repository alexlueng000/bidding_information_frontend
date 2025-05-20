export async function getBidInfo(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const res = await fetch(
      `http://localhost:8000/api/v1/bidding/?skip=${skip}&limit=${limit}`,
      {
        cache: 'no-store', // Disable caching for real-time data
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  
    if (!res.ok) throw new Error('Failed to fetch bidding info');
  
    return res.json();
  }


export async function getBidInfoTotal() {
    const response = await fetch('http://localhost:8000/api/v1/bidding/count')
    
    if (!response.ok) {
      throw new Error('Failed to fetch total bid count')
    }
    
    const data = await response.json()
    return data.total
}

export async function getUniversityInfo() {
    const response = await fetch('http://localhost:8000/api/v1/bidding/universities')
    
    if (!response.ok) {
      throw new Error('Failed to fetch university info')
    }
    
    const data = await response.json()
    return data 
}

export async function getOneUniversityInfo(university: string) {
    const response = await fetch('http://localhost:8000/api/v1/bidding/universities/' + university)
    
    if (!response.ok) {
      throw new Error('Failed to fetch university info')
    }
    
    const data = await response.json()
    return data
}
