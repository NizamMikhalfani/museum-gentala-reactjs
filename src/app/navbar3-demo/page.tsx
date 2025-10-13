"use client";

import { Navbar3 } from "@/components/Navbar3";

export default function Navbar3DemoPage() {
  return (
    <div>
      <Navbar3 />
      <div style={{ padding: '8rem 2rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Navbar3 Component Demo
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '2rem' }}>
          This is a demonstration page for the Navbar3 component. Hover over the menu items
          to see the dropdown functionality.
        </p>
        
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Features</h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem', lineHeight: '2' }}>
            <li>Responsive navigation bar with avatar</li>
            <li>Hover-based dropdown menus for items with sub-items</li>
            <li>Search functionality with Material Icons</li>
            <li>Smooth transitions and animations</li>
            <li>Fixed positioning at the top of the page</li>
          </ul>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Menu Items</h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem', lineHeight: '2' }}>
            <li><strong>About:</strong> No dropdown items</li>
            <li><strong>Skills:</strong> UI/UX, Development, Design</li>
            <li><strong>Projects:</strong> Chatbot, Calculator, Weather</li>
            <li><strong>Work:</strong> Portfolio, Resume, GitHub</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
