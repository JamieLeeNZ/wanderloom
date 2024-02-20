export function calculateProximity(attraction1, attraction2) {
  if (attraction1.district === attraction2.district) {
    return 1; 
  } else if (attraction1.ward === attraction2.ward) {
    return 2; 
  } else if (areAdjacent(attraction1.ward, attraction2.ward)) {
    return 3; 
  } 
  return -1; 
}

const adjacentWards = {
  'Adachi': ['Kita', 'Katsushika', 'Arakawa'],
  'Arakawa': ['Adachi', 'Kita', 'Bunkyo', 'Sumida', 'Katsushika'],
  'Bunkyo': ['Taito', 'Chiyoda', 'Toshima', 'Minato', 'Shinjuku'],
  'Chiyoda': ['Taito', 'Bunkyo', 'Chuo', 'Minato', 'Shinjuku'],
  'Chofu': ['Koganei', 'Mitaka', 'Setagaya', 'Suginami'],
  'Chuo': ['Chiyoda', 'Minato', 'Sumida', 'Koto', 'Taito'],
  'Edogawa': ['Katsushika', 'Sumida', 'Koto'],
  'Itabashi': ['Toshima', 'Kita', 'Nerima'],
  'Katsushika': ['Edogawa', 'Sumida', 'Arakawa', 'Adachi'],
  'Kita': ['Adachi', 'Arakawa', 'Itabashi', 'Toshima'],
  'Koganei': ['Chofu', 'Mitaka', 'Musashino'],
  'Koto': ['Chuo', 'Sumida', 'Edogawa', 'Minato'],
  'Meguro': ['Shibuya', 'Setagaya', 'Shinagawa', 'Ota'],
  'Minato': ['Chiyoda', 'Chuo', 'Shinjuku', 'Shibuya', 'Shinagawa', 'Koto'],
  'Mitaka': ['Chofu', 'Koganei', 'Musashino', 'Suginami', 'Nerima'],
  'Musashino': ['Koganeiu', 'Mitaka', 'Suginami, Setagaya'],
  'Nakano': ['Suginami', 'Nerima', 'Shinjuku', 'Shibuya'],
  'Nerima': ['Itabashi', 'Mitaka', 'Suginami', 'Toshima'],
  'Ota': ['Shinagawa', 'Setagaya', 'Meguro'],
  'Setagaya': ['Chofu', 'Meguro', 'Mushashino', 'Shibuya', 'Suginami', 'Ota'],
  'Shibuya': ['Meguro', 'Setagaya', 'Nakano', 'Shinjuku', 'Minato', 'Suginami', 'Shinagawa'],
  'Shinagawa': ['Minato', 'Ota', 'Meguro', 'Shibuya'],
  'Shinjuku': ['Minato', 'Shibuya', 'Nakano', 'Toshima', 'Bunkyo', 'Chiyoda'],
  'Suginami': ['Chofu', 'Mitaka', 'Musashino', 'Nakano', 'Nerima', 'Setagaya', 'Shibuya'],
  'Sumida': ['Chuo', 'Koto', 'Edogawa', 'Katsushika', 'Taito', 'Arakawa', 'Adachi'],
  'Taito': ['Arakawa', 'Sumida', 'Chuo', 'Chiyoda', 'Bunkyo'],
  'Toshima': ['Itabashi', 'Kita', 'Nerima', 'Shinjuku', 'Bunkyo']
};


export function areAdjacent(ward1, ward2) {
  if (!adjacentWards[ward1] || !adjacentWards[ward2]) {
    return false;
  }
  return adjacentWards[ward1].includes(ward2) || adjacentWards[ward2].includes(ward1);
}

export function getAdjacentWards(ward) {
  return adjacentWards[ward];
}

// Example attractions
const sensojiTemple = { name: 'Sensoji Temple', district: 'Asakusa', ward: 'Taito' };
const uenoPark = { name: 'Ueno Park', district: 'Ueno', ward: 'Taito' };
const skyTree = { name: 'Skytree', district: 'Oshiage', ward: 'Sumida' };

// Calculate proximity between attractions
console.log('Proximity between Sensoji Temple and Ueno Park:', calculateProximity(sensojiTemple, uenoPark));
console.log('Proximity between Sensoji Temple and Skytree:', calculateProximity(sensojiTemple, skyTree));
console.log('Proximity between Ueno Park and Skytree:', calculateProximity(uenoPark, skyTree));
