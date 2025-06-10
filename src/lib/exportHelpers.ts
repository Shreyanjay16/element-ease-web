
import { saveAs } from 'file-saver';
import { ComponentBase } from '@/types/designer';
import { generateHTML, generateCSS, generateJS, generateCompleteHTML } from './codeGeneration';

// Export code to clipboard
export const copyToClipboard = (content: string) => {
  navigator.clipboard.writeText(content);
};

// Export code to a single HTML file
export const exportAsHTML = (components: ComponentBase[], projectName: string) => {
  const completeHTML = generateCompleteHTML(components);
  const blob = new Blob([completeHTML], { type: 'text/html;charset=utf-8' });
  saveAs(blob, `${projectName || 'website'}.html`);
};

// Export code as separate files in a ZIP
export const exportAsZip = async (components: ComponentBase[], projectName: string) => {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();
  
  const html = generateHTML(components);
  const css = generateCSS(components);
  const js = generateJS(components);
  
  // Create index.html with references to CSS and JS files
  const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName || 'Generated Website'}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
${html}

<script src="script.js"></script>
</body>
</html>`;
  
  zip.file('index.html', indexHTML);
  zip.file('styles.css', css);
  zip.file('script.js', js);
  
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, `${projectName || 'website'}.zip`);
};

// Create a downloadable screenshot (in a real implementation, this would use html2canvas or similar)
export const exportScreenshot = (canvasElement: HTMLElement | null, projectName: string) => {
  // In a real implementation, this would capture the canvas as an image
  alert('Screenshot export is not implemented in this demo');
};
