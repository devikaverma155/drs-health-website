'use client';

interface Location {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
}

const locations: Location[] = [
  {
    id: 1,
    name: 'Head Office',
    type: 'Corporate Office',
    address: '123 Healthcare Plaza, New Delhi, India',
    phone: '+91 11 XXXX XXXX',
    email: 'info@drshealth.com',
    latitude: 28.7041,
    longitude: 77.1025,
  },
  {
    id: 2,
    name: 'Manufacturing Unit',
    type: 'Manufacturing Facility',
    address: '456 Industrial Zone, Bhopal, India',
    phone: '+91 755 XXXX XXXX',
    email: 'manufacturing@drshealth.com',
    latitude: 23.1815,
    longitude: 79.9864,
  },
  {
    id: 3,
    name: 'Clinic Center',
    type: 'Wellness Clinic',
    address: '789 Wellness Street, Bangalore, India',
    phone: '+91 80 XXXX XXXX',
    email: 'clinic@drshealth.com',
    latitude: 12.9716,
    longitude: 77.5946,
  },
];

export function LocationMapSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-lime/5 via-soft-bg to-accent-green/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-foreground mb-4">Find Us</h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            Visit our offices, clinics, and manufacturing facilities across India
          </p>
        </div>

        {/* Map Container */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-card border border-border">
          <div className="w-full h-96 bg-body-muted/10 relative">
            {/* Placeholder Map */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent-green/5">
              <div className="text-center">
                <p className="text-2xl mb-2">🗺️</p>
                <p className="text-foreground font-semibold">Interactive Map</p>
                <p className="text-body-muted text-sm mt-2">
                  Google Maps integration will be added here
                </p>
              </div>
            </div>

            {/* Map Pin Overlays - Placeholder Positions */}
            <div className="absolute inset-0 pointer-events-none">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="absolute w-8 h-8 bg-primary rounded-full border-4 border-white shadow-card flex items-center justify-center text-white font-bold pointer-events-auto cursor-pointer hover:bg-primary-dark transition-colors"
                  style={{
                    left: `${30 + location.id * 25}%`,
                    top: `${40 + location.id * 10}%`,
                  }}
                  title={location.name}
                >
                  {location.id}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all p-8 border border-border"
            >
              {/* Header */}
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {location.type}
                </span>
                <h3 className="text-2xl font-semibold text-foreground">{location.name}</h3>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                {/* Address */}
                <div className="flex gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="text-sm text-body-muted font-semibold">Address</p>
                    <p className="text-foreground">{location.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="text-sm text-body-muted font-semibold">Phone</p>
                    <p className="text-foreground">{location.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3">
                  <span className="text-xl">✉️</span>
                  <div>
                    <p className="text-sm text-body-muted font-semibold">Email</p>
                    <p className="text-foreground">{location.email}</p>
                  </div>
                </div>

                {/* Coordinates */}
                <div className="flex gap-3">
                  <span className="text-xl">🧭</span>
                  <div>
                    <p className="text-sm text-body-muted font-semibold">Coordinates</p>
                    <p className="text-foreground text-sm">
                      {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href={`https://maps.google.com/?q=${location.latitude},${location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-block text-center"
              >
                Get Directions
              </a>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-2">General Inquiries</p>
              <p className="text-lg text-gray-900">info@drshealth.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-2">Business Partnerships</p>
              <p className="text-lg text-gray-900">business@drshealth.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-2">Customer Support</p>
              <p className="text-lg text-gray-900">support@drshealth.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
