
import { ComponentDefinition } from '@/types/designer';

export const defaultComponents: ComponentDefinition[] = [
  {
    type: 'container',
    name: 'Container',
    icon: 'layout',
    defaultStyles: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100px',
      padding: '20px',
      width: '100%',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
    }
  },
  {
    type: 'text',
    name: 'Text',
    icon: 'type',
    defaultContent: 'Add your text here',
    defaultStyles: {
      fontSize: '16px',
      color: '#111827',
      marginBottom: '16px',
      fontFamily: 'sans-serif',
    }
  },
  {
    type: 'heading',
    name: 'Heading',
    icon: 'heading',
    defaultContent: 'Your Heading',
    defaultStyles: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '24px',
      fontFamily: 'sans-serif',
    }
  },
  {
    type: 'button',
    name: 'Button',
    icon: 'square',
    defaultContent: 'Button',
    defaultStyles: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '6px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'inline-block',
    }
  },
  {
    type: 'image',
    name: 'Image',
    icon: 'image',
    defaultStyles: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '4px',
    },
    defaultAttributes: {
      src: 'https://via.placeholder.com/400x300',
      alt: 'Placeholder image',
    }
  },
  {
    type: 'link',
    name: 'Link',
    icon: 'link',
    defaultContent: 'Link Text',
    defaultStyles: {
      color: '#3b82f6',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    defaultAttributes: {
      href: '#',
      target: '_blank',
    }
  },
  {
    type: 'divider',
    name: 'Divider',
    icon: 'minus',
    defaultStyles: {
      width: '100%',
      height: '1px',
      backgroundColor: '#e5e7eb',
      margin: '16px 0',
    }
  },
  {
    type: 'grid',
    name: 'Grid',
    icon: 'layout-grid',
    defaultStyles: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      width: '100%',
      minHeight: '100px',
      padding: '20px',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
    }
  },
  {
    type: 'row',
    name: 'Flex Row',
    icon: 'layout-align-middle',
    defaultStyles: {
      display: 'flex',
      flexDirection: 'row',
      gap: '20px',
      width: '100%',
      minHeight: '50px',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '10px',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
    }
  },
];

export const getComponentDefinition = (type: string): ComponentDefinition | undefined => {
  return defaultComponents.find(comp => comp.type === type);
};

export const propertyGroups = [
  {
    name: 'Layout',
    properties: [
      { name: 'display', label: 'Display', type: 'select', options: ['block', 'inline', 'flex', 'grid', 'none'] },
      { name: 'width', label: 'Width', type: 'text' },
      { name: 'height', label: 'Height', type: 'text' },
      { name: 'padding', label: 'Padding', type: 'text' },
      { name: 'margin', label: 'Margin', type: 'text' },
    ]
  },
  {
    name: 'Typography',
    properties: [
      { name: 'fontSize', label: 'Font Size', type: 'text' },
      { name: 'fontWeight', label: 'Font Weight', type: 'select', options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
      { name: 'color', label: 'Color', type: 'color' },
      { name: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right', 'justify'] },
      { name: 'lineHeight', label: 'Line Height', type: 'text' },
    ]
  },
  {
    name: 'Background',
    properties: [
      { name: 'backgroundColor', label: 'Background Color', type: 'color' },
      { name: 'backgroundImage', label: 'Background Image', type: 'text' },
      { name: 'backgroundSize', label: 'Background Size', type: 'select', options: ['cover', 'contain', 'auto'] },
    ]
  },
  {
    name: 'Border',
    properties: [
      { name: 'border', label: 'Border', type: 'text' },
      { name: 'borderRadius', label: 'Border Radius', type: 'text' },
      { name: 'boxShadow', label: 'Box Shadow', type: 'text' },
    ]
  },
  {
    name: 'Flexbox',
    properties: [
      { name: 'flexDirection', label: 'Direction', type: 'select', options: ['row', 'column', 'row-reverse', 'column-reverse'] },
      { name: 'justifyContent', label: 'Justify', type: 'select', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'] },
      { name: 'alignItems', label: 'Align', type: 'select', options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'] },
      { name: 'gap', label: 'Gap', type: 'text' },
    ]
  },
];
