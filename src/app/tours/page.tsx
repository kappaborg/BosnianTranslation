import dynamic from 'next/dynamic';

// Make this a server component
export default function ToursPage() {
  return <ClientToursPage />;
}

// Client component with all the interactive features
const ClientToursPage = dynamic(() => import('@/components/ClientToursPage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen pt-20 px-4 md:px-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
        <div className="h-[500px] bg-gray-200 rounded-lg mb-8"></div>
      </div>
    </div>
  ),
}); 