// Icon generator utility for PWA icons
export const generateAppIcon = (size: number): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  canvas.width = size;
  canvas.height = size;
  
  // Background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#030213'); // Primary color
  gradient.addColorStop(1, '#1a1a2e');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Add rounded corners
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  const radius = size * 0.2;
  ctx.roundRect(0, 0, size, size, radius);
  ctx.fill();
  
  // Reset composite operation
  ctx.globalCompositeOperation = 'source-over';
  
  // Icon (simplified banknote/currency symbol)
  const iconSize = size * 0.6;
  const x = (size - iconSize) / 2;
  const y = (size - iconSize) / 2;
  
  // Draw banknote outline
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = size * 0.03;
  ctx.roundRect(x, y, iconSize, iconSize * 0.6, size * 0.05);
  ctx.stroke();
  
  // Draw currency symbol (K for Kwacha)
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.35}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('K', size / 2, size / 2);
  
  return canvas.toDataURL('image/png');
};

export const generateAndDownloadIcons = () => {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  
  sizes.forEach(size => {
    const dataUrl = generateAppIcon(size);
    const link = document.createElement('a');
    link.download = `icon-${size}x${size}.png`;
    link.href = dataUrl;
    link.click();
  });
};

// Create icons directory and save icons (for manual setup)
export const createIconsForManualSetup = () => {
  const instructions = `
To set up app icons:

1. Create a 'public/icons' directory in your project
2. Run generateAndDownloadIcons() in the browser console
3. Save the downloaded icons to the public/icons directory

Or use any icon generator service with these specifications:
- Sizes: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
- Format: PNG
- Design: LoanPro logo or "K" symbol on dark background (#030213)
- Purpose: maskable any
`;
  
  console.log(instructions);
  return instructions;
};