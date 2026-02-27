'use client';

import { useState } from 'react';

type Tab = 'description' | 'shipping';

interface ProductTabsProps {
  descriptionHtml?: string;
  description?: string;
}

export function ProductTabs({ descriptionHtml, description }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('description');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'shipping', label: 'Shipping & Delivery' },
  ];

  return (
    <div className="mt-16 border-t border-border">
      {/* Tab headers */}
      <div className="flex gap-0 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-colors
              ${activeTab === tab.id
                ? 'text-foreground'
                : 'text-body-muted hover:text-foreground'
              }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-8">
        {activeTab === 'description' && (
          <div>
            {descriptionHtml ? (
              <div
                className="text-body-muted leading-relaxed prose prose-sm max-w-none
                  prose-p:my-3 prose-ul:my-3 prose-ol:my-3 prose-li:my-1
                  prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-6 prose-headings:mb-3
                  prose-a:text-primary prose-strong:text-foreground
                  prose-br:block prose-br:content-[''] prose-br:mt-2"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            ) : description ? (
              <p className="text-body-muted leading-relaxed">{description}</p>
            ) : (
              <p className="text-body-muted italic">No description available.</p>
            )}
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="text-body-muted leading-relaxed space-y-4">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Free Shipping</p>
                  <p className="text-sm">Free shipping on orders above ₹499</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Delivery Time</p>
                  <p className="text-sm">Delivered within 5–7 business days</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Secure Packaging</p>
                  <p className="text-sm">All products are safely packaged to prevent damage</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Easy Returns</p>
                  <p className="text-sm">7-day return policy on eligible products</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <span className="font-medium text-foreground">Note:</span> We ship across India via trusted courier partners.
                Cash on Delivery (COD) is available on select pin codes. For any delivery queries, contact us at{' '}
                <a href="mailto:support@drshealth.in" className="text-primary hover:underline">support@drshealth.in</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
