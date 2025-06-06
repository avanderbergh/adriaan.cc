import { describe, it, expect } from 'vitest';

function renderOpenGraph({ title, description, image, base }: { title: string; description: string; image: string; base: string }) {
  const imageUrl = new URL(image, base).toString();
  return `\n<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${description}" />\n<meta property="og:image" content="${imageUrl}" />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="${base}" />\n\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${title}" />\n<meta name="twitter:description" content="${description}" />\n<meta name="twitter:image" content="${imageUrl}" />\n`; 
}

describe('OpenGraph', () => {
  it('renders absolute image URLs', () => {
    const html = renderOpenGraph({ title: 'Title', description: 'Desc', image: '/img.png', base: 'https://example.com/' });
    expect(html).toContain('<meta property="og:image" content="https://example.com/img.png" />');
    expect(html).toContain('<meta name="twitter:image" content="https://example.com/img.png" />');
  });
});
