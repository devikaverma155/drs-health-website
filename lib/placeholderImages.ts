/**
 * Themed placeholder images (drshealth.in). Use instead of external Unsplash to avoid broken images.
 */
const BASE = 'https://drshealth.in/wp-content/uploads';

export const PLACEHOLDER_IMAGES = {
  /** Generic product / herbal */
  product1: `${BASE}/2024/11/Syadwad-Combo.webp`,
  product2: `${BASE}/2024/11/SW-Products.png`,
  product3: `${BASE}/2024/12/Herbalis-Shampoo-scaled.webp`,
  product4: `${BASE}/2024/11/6-12-scaled.webp`,
  consultation: `${BASE}/2026/02/consultation.jpg`,
  /** Logo for certifications / badges placeholder */
  logo: 'https://drshealth.in/wp-content/uploads/2025/01/cropped-DRS-Logo-e1771510375912.png',
} as const;
