const API_BASE_URL = "https://seido-webservice-307d89e1f16a.azurewebsites.net/api";

// Helper function to fetch total count of items
const fetchTotalCount = async (endpoint) => {
  const response = await fetch(
    `${API_BASE_URL}/${endpoint}/Read?seeded=true&flat=true&pageNr=0&pageSize=1`
  );
  
  if (!response.ok) {
    throw new Error(`Could not fetch count of ${endpoint.toLowerCase()}`);
  }
  
  const data = await response.json();
  return data.dbItemsCount;
};

export const fetchMusicGroups = async (page = 0, pageSize = 10, searchTerm = '') => {
  try {
    const totalCount = await fetchTotalCount('MusicGroup');
    
    // Fetch all groups
    const params = new URLSearchParams({
      seeded: 'true',
      flat: 'true',
      pageNr: '0',
      pageSize: totalCount.toString()
    });

    const response = await fetch(`${API_BASE_URL}/MusicGroup/Read?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Could not fetch music groups');
    }
    
    const data = await response.json();
    
    // Filter on client side if search term exists
    if (searchTerm?.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      data.pageItems = data.pageItems.filter(group => 
        group.name.toLowerCase().includes(searchLower)
      );
      data.dbItemsCount = data.pageItems.length;
    }
    
    // Handle pagination on client side
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    data.pageItems = data.pageItems.slice(startIndex, endIndex);
    
    return data;
  } catch (error) {
    console.error('Error fetching music groups:', error);
    throw error;
  }
};

export const fetchMusicGroupDetails = async (groupId) => {
  try {
    const totalCount = await fetchTotalCount('MusicGroup');
    const pageSize = 10;
    const totalPages = Math.ceil(totalCount / pageSize);
    
    // Search through all pages until we find the group
    for (let page = 0; page < totalPages; page++) {
      const response = await fetch(
        `${API_BASE_URL}/MusicGroup/Read?seeded=true&flat=false&pageNr=${page}&pageSize=${pageSize}`
      );
      
      if (!response.ok) {
        throw new Error('Could not fetch music groups');
      }
      
      const data = await response.json();
      const group = data.pageItems.find(group => String(group.musicGroupId) === String(groupId));
      
      if (group) {
        return group;
      }
    }
    
    throw new Error(`No music group found with ID: ${groupId}`);
  } catch (error) {
    console.error('Error fetching music group:', error);
    throw error;
  }
};

export const fetchStatistics = async () => {
  try {
    const [musicGroupsCount, albumsCount, artistsCount] = await Promise.all([
      fetchTotalCount('MusicGroup'),
      fetchTotalCount('Album'),
      fetchTotalCount('Artist')
    ]);

    return {
      musicGroups: musicGroupsCount,
      albums: albumsCount,
      artists: artistsCount
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

export const searchMusicGroups = async (searchTerm, page = 0, pageSize = 10) => {
  try {
    return await fetchMusicGroups(page, pageSize, searchTerm);
  } catch (error) {
    console.error('Error searching music groups:', error);
    throw error;
  }
};
