"use client";

import Link from "next/link";
import { Button } from '@/design-system/buttons/Button';
import { Search, BarChart, Plus, Download, Settings, User, Mail, Calendar } from 'react-feather';
import { typography } from '@/design-system/typography/tokens';

export default function ButtonDemoPage() {
  return (
    <div style={{ fontFamily: 'Rubik', backgroundColor: 'white', minHeight: '100vh' }}>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 1000,
        padding: '16px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{
            textDecoration: 'none',
            color: '#6b7280',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.color = '#374151';
            e.currentTarget.style.borderColor = '#d1d5db';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#6b7280';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}>
            ← Back to Home
          </Link>
          <h1 style={{ margin: 0, color: '#2F3036' }}>Button Component Demo</h1>
        </div>
      </header>
      
      <div style={{ padding: '80px 40px 40px' }}>
        {/* Variants */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#464F60', marginBottom: '20px' }}>Button Variants</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'nowrap', alignItems: 'center' }}>
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

        {/* With React Feather Icons */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#464F60', marginBottom: '20px' }}>Buttons with React Feather Icons</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button variant="primary" icon={Search}>Search</Button>
            <Button variant="secondary" icon={BarChart} iconPosition="right">Analytics</Button>
            <Button variant="tertiary" icon={Plus}>Add New</Button>
            <Button variant="ghost" icon={Download}>Download</Button>
          </div>
        </section>

        {/* Icon Only Buttons */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#464F60', marginBottom: '20px' }}>Icon Only Buttons</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" icon={Settings} size="sm">{}</Button>
            <Button variant="secondary" icon={User} size="md">{}</Button>
            <Button variant="tertiary" icon={Mail} size="lg">{}</Button>
            <Button variant="ghost" icon={Calendar} size="md">{}</Button>
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
    </div>
  );
}
