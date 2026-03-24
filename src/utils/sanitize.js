export const cleanString = (val) => {
  if (typeof val !== "string") return val;

  return val
    .replace(/<[^>]*>?/gm, "") 
    .replace(/\$/g, "")        
    .replace(/\./g, "")       
    .trim();
};