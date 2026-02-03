import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Loader, Camera } from 'lucide-react';

const Photography = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const allPosts = await api.getArticles();
        const imagePosts = allPosts.filter(post => post.category === 'Image posts');
        setPhotos(imagePosts);
      } catch (error) {
        console.error("Failed to load photos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="animate-spin text-emerald-600" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
              <Camera size={36} className="text-emerald-600" /> Photography
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Capturing moments, light, and shadows.
            </p>
        </div>

        {photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
               <div 
                 key={photo.id} 
                 className="group relative h-96 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-200"
               >
                  <img 
                    src={photo.image} 
                    alt={photo.title} 
                    className="w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* 👇 UPDATED OVERLAY SECTION */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                                  transition-opacity duration-300 flex flex-col justify-end p-6
                                  opacity-100 md:opacity-0 md:group-hover:opacity-100">
                                  
                     <h3 className="text-white font-bold text-xl transition-transform duration-300
                                    translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                        {photo.title}
                     </h3>
                     
                     <p className="text-gray-300 text-sm mt-1 transition-transform duration-300 delay-75
                                   translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                        {new Date(photo.created_at?.toDate ? photo.created_at.toDate() : photo.created_at).toLocaleDateString()}
                     </p>
                  </div>
               </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
             <Camera className="mx-auto text-gray-300 mb-4" size={48} />
             <p className="text-gray-500 text-lg">No photos uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photography;