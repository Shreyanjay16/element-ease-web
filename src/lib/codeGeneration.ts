
import { ComponentBase } from '@/types/designer';

// Generate HTML from the component tree
export const generateHTML = (components: ComponentBase[]): string => {
  const generateComponentHTML = (component: ComponentBase): string => {
    let html = '';
    const attributes = component.attributes || {};
    
    switch (component.type) {
      case 'container':
        html = `<div${generateStyles(component.styles)}${generateAttributes(attributes)}>
  ${component.children?.map(child => generateComponentHTML(child)).join('\n  ') || ''}
</div>`;
        break;
      case 'text':
        html = `<p${generateStyles(component.styles)}${generateAttributes(attributes)}>${component.content || ''}</p>`;
        break;
      case 'heading':
        html = `<h2${generateStyles(component.styles)}${generateAttributes(attributes)}>${component.content || ''}</h2>`;
        break;
      case 'button':
        html = `<button${generateStyles(component.styles)}${generateAttributes(attributes)}>${component.content || ''}</button>`;
        break;
      case 'image':
        html = `<img src="${attributes.src || ''}" alt="${attributes.alt || ''}"${generateStyles(component.styles)}${generateAttributes(attributes)} />`;
        break;
      case 'link':
        html = `<a href="${attributes.href || '#'}" target="${attributes.target || '_blank'}"${generateStyles(component.styles)}${generateAttributes(attributes)}>${component.content || ''}</a>`;
        break;
      case 'divider':
        html = `<hr${generateStyles(component.styles)}${generateAttributes(attributes)} />`;
        break;
      case 'grid':
        html = `<div${generateStyles(component.styles)}${generateAttributes(attributes)}>
  ${component.children?.map(child => generateComponentHTML(child)).join('\n  ') || ''}
</div>`;
        break;
      case 'row':
        html = `<div${generateStyles(component.styles)}${generateAttributes(attributes)}>
  ${component.children?.map(child => generateComponentHTML(child)).join('\n  ') || ''}
</div>`;
        break;
      default:
        html = `<div${generateStyles(component.styles)}${generateAttributes(attributes)}>Unknown component type</div>`;
    }
    
    return html;
  };
  
  return components.map(component => generateComponentHTML(component)).join('\n');
};

// Generate CSS from the component tree
export const generateCSS = (components: ComponentBase[]): string => {
  let css = '';
  let index = 0;
  
  const processComponent = (component: ComponentBase) => {
    const className = `component-${index}`;
    index++;
    
    css += `.${className} {\n`;
    Object.entries(component.styles).forEach(([property, value]) => {
      css += `  ${kebabCase(property)}: ${value};\n`;
    });
    css += '}\n\n';
    
    component.children?.forEach(child => processComponent(child));
  };
  
  components.forEach(component => processComponent(component));
  
  return css;
};

// Generate inline styles string
const generateStyles = (styles: Record<string, string>): string => {
  if (!styles || Object.keys(styles).length === 0) return '';
  
  const styleStr = Object.entries(styles)
    .map(([key, value]) => `${kebabCase(key)}: ${value};`)
    .join(' ');
  
  return ` style="${styleStr}"`;
};

// Generate attributes string
const generateAttributes = (attributes: Record<string, string>): string => {
  if (!attributes || Object.keys(attributes).length === 0) return '';
  
  const filteredAttributes = Object.entries(attributes).filter(
    ([key]) => !['src', 'alt', 'href', 'target'].includes(key)
  );
  
  if (filteredAttributes.length === 0) return '';
  
  return ' ' + filteredAttributes
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
};

// Convert camelCase to kebab-case
const kebabCase = (str: string): string => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

// Generate JS from the component tree
export const generateJS = (components: ComponentBase[]): string => {
  return `// JavaScript for interactive components
document.addEventListener('DOMContentLoaded', function() {
  // You can add event listeners and other logic here
  console.log('Webpage loaded successfully');
});`;
};

// Generate a complete HTML document
export const generateCompleteHTML = (components: ComponentBase[]): string => {
  const htmlContent = generateHTML(components);
  const cssContent = generateCSS(components);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <style>
${cssContent}
  </style>
</head>
<body>
${htmlContent}

<script>
${generateJS(components)}
</script>
</body>
</html>`;
};
