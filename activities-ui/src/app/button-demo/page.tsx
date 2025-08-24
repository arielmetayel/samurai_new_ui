"use client";

import { Button } from '@/components/ui/Button';

export default function ButtonDemoPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Rubik', backgroundColor: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: '#2F3036', marginBottom: '32px' }}>Button Component Demo</h1>
      
      {/* Variants */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#464F60', marginBottom: '20px' }}>Button Variants</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="tertiary">Tertiary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#464F60', marginBottom: '20px' }}>Button Sizes</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </section>

      {/* With Icons */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#464F60', marginBottom: '20px' }}>Buttons with Icons</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="primary" icon="🔍">Search</Button>
          <Button variant="secondary" icon="📊" iconPosition="right">Report</Button>
          <Button variant="tertiary" icon="➕">Add New</Button>
        </div>
      </section>

      {/* States */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#464F60', marginBottom: '20px' }}>Button States</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="primary">Normal</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </section>

      {/* All Variants in All Sizes */}
      <section>
        <h2 style={{ color: '#464F60', marginBottom: '20px' }}>All Variants in All Sizes</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="primary" size="sm">Primary S</Button>
          <Button variant="primary" size="md">Primary M</Button>
          <Button variant="primary" size="lg">Primary L</Button>
          
          <Button variant="secondary" size="sm">Secondary S</Button>
          <Button variant="secondary" size="md">Secondary M</Button>
          <Button variant="secondary" size="lg">Secondary L</Button>
          
          <Button variant="tertiary" size="sm">Tertiary S</Button>
          <Button variant="tertiary" size="md">Tertiary M</Button>
          <Button variant="tertiary" size="lg">Tertiary L</Button>
        </div>
      </section>
    </div>
  );
}
