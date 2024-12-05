 function createSlug(text){
    if (!text) return '';
    return text
      .toString() 
      .trim() 
      .toLowerCase() 
      .replace(/[^a-z0-9\s-]/g, '') 
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-'); 
  };
  
  export default createSlug;