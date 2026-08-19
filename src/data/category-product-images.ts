export type CategoryImage = {
  id: string;
  src: string;
  alt?: string;
  featured?: boolean;
  tags?: string[];
};

// Keep category ids consistent with taxonomy.ts
export const CATEGORIES = [
  "floor-tiles",
  "wall-tiles",
  "bathroom-tiles",
  "kitchen-tiles",
  "outdoor-tiles",
  "elevation-tiles",
  "sanitaryware",
  "sink",
  "vanity",
  "parking-tiles",
  "marble-granite",
];

// Default placeholder images for each category. These use the recommended public path
// public/images/categories/<category>/*. Replace with real images when available.

const placeholder = (category: string, i: number) => ({
  id: `${category}--${i}`,
  src: `/images/categories/${category}/placeholder-${i + 1}.jpg`,
  alt: `${category} image ${i + 1}`,
  featured: i === 0,
});

export const DEFAULT_CATEGORY_IMAGES: Record<string, CategoryImage[]> = {
  "floor-tiles": [placeholder("floor-tiles", 0), placeholder("floor-tiles", 1)],
  "wall-tiles": [placeholder("wall-tiles", 0), placeholder("wall-tiles", 1)],
  "bathroom-tiles": [placeholder("bathroom-tiles", 0)],
  "kitchen-tiles": [placeholder("kitchen-tiles", 0)],
  "outdoor-tiles": [placeholder("outdoor-tiles", 0)],
  "elevation-tiles": [placeholder("elevation-tiles", 0)],
  sanitaryware: [placeholder("sanitaryware", 0)],
  sink: [placeholder("sink", 0)],
  vanity: [placeholder("vanity", 0)],
  "parking-tiles": [placeholder("parking-tiles", 0)],
  "marble-granite": [placeholder("marble-granite", 0)],
};

export default DEFAULT_CATEGORY_IMAGES;
