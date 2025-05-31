const API_BASE_URL = "https://seido-webservice-307d89e1f16a.azurewebsites.net/api";

export const fetchMusicGroups = async (page = 0, pageSize = 10, searchTerm = '') => {
  try {
    // First get the total count of music groups
    const countRes = await fetch(
      `${API_BASE_URL}/MusicGroup/Read?seeded=true&flat=true&pageNr=0&pageSize=1`
    );
    
    if (!countRes.ok) {
      throw new Error("Kunde inte hämta antal musikgrupper");
    }
    
    const countData = await countRes.json();
    const totalCount = countData.dbItemsCount;

    // Then get all groups using the total count
    const params = new URLSearchParams({
      seeded: 'true',
      flat: 'true',
      pageNr: '0',
      pageSize: totalCount.toString()  // Use the actual total count
    });

    const url = `${API_BASE_URL}/MusicGroup/Read?${params.toString()}`;
    console.log('API URL:', url);

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('All groups:', data);
    
    // Filter on client side if searchTerm exists
    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      data.pageItems = data.pageItems.filter(group => 
        group.name.toLowerCase().includes(searchLower)
      );
      data.dbItemsCount = data.pageItems.length;
      data.pageCount = Math.ceil(data.pageItems.length / pageSize);
    }
    
    // Handle pagination on client side
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    data.pageItems = data.pageItems.slice(startIndex, endIndex);
    
    console.log('Processed Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching music groups:', error);
    throw error;
  }
};

export const fetchMusicGroupDetails = async (groupId) => {
  try {
    console.log("Försöker hämta musikgrupp med ID:", groupId);
    
    // First get total count to know how many pages to check
    const countRes = await fetch(
      `${API_BASE_URL}/MusicGroup/Read?seeded=true&flat=true&pageNr=0&pageSize=1`
    );
    
    if (!countRes.ok) {
      throw new Error("Kunde inte hämta antal musikgrupper");
    }
    
    const countData = await countRes.json();
    const totalCount = countData.dbItemsCount;
    const pageSize = 1000; // Use max page size like in the working code
    const totalPages = Math.ceil(totalCount / pageSize);
    
    console.log(`Söker bland ${totalCount} musikgrupper på ${totalPages} sidor...`);
    
    // Try each page until we find the music group
    for (let page = 0; page < totalPages; page++) {
      console.log(`Kontrollerar sida ${page + 1} av ${totalPages}...`);
      
      const musicGroupRes = await fetch(
        `${API_BASE_URL}/MusicGroup/Read?seeded=true&flat=false&pageNr=${page}&pageSize=${pageSize}`
      );
      
      if (!musicGroupRes.ok) {
        throw new Error("Kunde inte hämta musikgrupper");
      }
      
      const musicGroupData = await musicGroupRes.json();
      const band = musicGroupData.pageItems.find(group => String(group.musicGroupId) === String(groupId));
      
      if (band) {
        console.log("Hittad musikgrupp:", band.name);
        console.log("Antal artister:", band.artists ? band.artists.length : 0);
        console.log("Antal album:", band.albums ? band.albums.length : 0);
        return band;
      }
    }
    
    throw new Error(`Ingen musikgrupp hittades med ID: ${groupId}`);
  } catch (error) {
    console.error("Fel vid hämtning av musikgrupp:", error);
    throw error;
  }
};

export const fetchStatistics = async () => {
  try {
    // Get music groups count
    const musicGroupsRes = await fetch(
      `${API_BASE_URL}/MusicGroup/Read?seeded=true&flat=true&pageNr=0&pageSize=1`
    );
    if (!musicGroupsRes.ok) throw new Error("Kunde inte hämta info");
    const musicGroupsData = await musicGroupsRes.json();

    // Get albums count
    const albumsRes = await fetch(
      `${API_BASE_URL}/Album/Read?seeded=true&flat=true&pageNr=0&pageSize=1`
    );
    if (!albumsRes.ok) throw new Error("Kunde inte hämta info");
    const albumsData = await albumsRes.json();

    // Get artists count
    const artistsRes = await fetch(
      `${API_BASE_URL}/Artist/Read?seeded=true&flat=true&pageNr=0&pageSize=1`
    );
    if (!artistsRes.ok) throw new Error("Kunde inte hämta info");
    const artistsData = await artistsRes.json();

    return {
      musicGroups: musicGroupsData.dbItemsCount,
      albums: albumsData.dbItemsCount,
      artists: artistsData.dbItemsCount
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

export const searchMusicGroups = async (searchTerm, page = 0, pageSize = 10) => {
  try {
    console.log('Searching for:', searchTerm, 'Page:', page);
    
    // Use the existing fetchMusicGroups function with the searchTerm
    const data = await fetchMusicGroups(page, pageSize, searchTerm);
    console.log('Search results:', data);
    
    return data;
  } catch (error) {
    console.error('Error searching music groups:', error);
    throw error;
  }
};
