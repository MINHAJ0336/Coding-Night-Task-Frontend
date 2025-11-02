import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Award,
  Clock,
  Users
} from 'lucide-react';

const DoctorDashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  // Sample doctor data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Miller",
      specialization: "Cardiologist",
      experience: "12 years",
      rating: 4.9,
      reviews: 284,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      availability: "Available Today",
      nextSlot: "2:30 PM",
      education: "MD, Harvard Medical School",
      awards: ["Best Cardiologist 2023", "Patient Choice Award"],
      location: "Cardiology Center, Floor 3",
      phone: "+1 (555) 123-4567",
      email: "sarah.miller@medicare.com"
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      specialization: "Neurologist",
      experience: "15 years",
      rating: 4.8,
      reviews: 196,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      availability: "Available Tomorrow",
      nextSlot: "9:00 AM",
      education: "MD, Johns Hopkins University",
      awards: ["Neurology Excellence Award"],
      location: "Neurology Wing, Floor 2",
      phone: "+1 (555) 123-4568",
      email: "james.wilson@medicare.com"
    },
    {
      id: 3,
      name: "Dr. Maria Garcia",
      specialization: "Pediatrician",
      experience: "10 years",
      rating: 4.9,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      availability: "Available Today",
      nextSlot: "11:15 AM",
      education: "MD, Stanford University",
      awards: ["Top Pediatrician 2023", "Family Care Award"],
      location: "Pediatrics Department, Floor 1",
      phone: "+1 (555) 123-4569",
      email: "maria.garcia@medicare.com"
    },
    {
      id: 4,
      name: "Dr. Robert Chen",
      specialization: "Orthopedic Surgeon",
      experience: "18 years",
      rating: 4.7,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      availability: "Available Monday",
      nextSlot: "3:45 PM",
      education: "MD, Mayo Clinic",
      awards: ["Surgical Excellence Award"],
      location: "Surgery Wing, Floor 4",
      phone: "+1 (555) 123-4570",
      email: "robert.chen@medicare.com"
    },
    {
      id: 5,
      name: "Dr. Emily Davis",
      specialization: "Dermatologist",
      experience: "8 years",
      rating: 4.8,
      reviews: 225,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      availability: "Available Today",
      nextSlot: "4:20 PM",
      education: "MD, UCLA Medical School",
      awards: ["Dermatology Innovation Award"],
      location: "Dermatology Clinic, Floor 1",
      phone: "+1 (555) 123-4571",
      email: "emily.davis@medicare.com"
    },
    {
      id: 6,
      name: "Dr. Michael Brown",
      specialization: "Oncologist",
      experience: "20 years",
      rating: 4.9,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      availability: "Available Wednesday",
      nextSlot: "10:30 AM",
      education: "MD, Cleveland Clinic",
      awards: ["Oncology Research Award", "Patient Care Excellence"],
      location: "Oncology Center, Floor 5",
      phone: "+1 (555) 123-4572",
      email: "michael.brown@medicare.com"
    }
  ];

  // Auto slide effect
  useEffect(() => {
    if (!autoSlide) return;
    
    const slideInterval = setInterval(() => {
      setCurrentIndex((current) => 
        current === doctors.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [autoSlide, doctors.length]);

  const nextSlide = () => {
    setCurrentIndex(current => 
      current === doctors.length - 1 ? 0 : current + 1
    );
    setAutoSlide(false);
  };

  const prevSlide = () => {
    setCurrentIndex(current => 
      current === 0 ? doctors.length - 1 : current - 1
    );
    setAutoSlide(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAutoSlide(false);
  };

  const currentDoctor = doctors[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Medical Team
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our team of experienced healthcare professionals dedicated to your well-being
          </p>
        </div>

        {/* Main Doctor Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Doctor Image Section */}
            <div className="relative h-96 lg:h-auto">
              <img
                src={currentDoctor.image}
                alt={currentDoctor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-black/50 lg:to-transparent" />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Availability Badge */}
              <div className="absolute top-6 left-6">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  currentDoctor.availability.includes('Today') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  <Clock className="w-4 h-4 mr-2" />
                  {currentDoctor.availability}
                </span>
              </div>
            </div>

            {/* Doctor Details Section */}
            <div className="p-8 lg:p-12">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentDoctor.name}
                </h2>
                <p className="text-xl text-blue-600 font-semibold mb-4">
                  {currentDoctor.specialization}
                </p>
                
                {/* Rating and Experience */}
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold text-gray-900">
                      {currentDoctor.rating}
                    </span>
                    <span className="ml-1 text-gray-500">
                      ({currentDoctor.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-1" />
                    {currentDoctor.experience} experience
                  </div>
                </div>
              </div>

              {/* Education and Awards */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Award className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{currentDoctor.education}</span>
                </div>
                <div className="flex items-start">
                  <Award className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    {currentDoctor.awards.map((award, index) => (
                      <div key={index} className="text-gray-700">
                        • {award}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  {currentDoctor.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3" />
                  {currentDoctor.phone}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3" />
                  {currentDoctor.email}
                </div>
              </div>

              {/* Next Available Slot */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Next Available Slot</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {currentDoctor.nextSlot}
                    </p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </button>
                </div>
              </div>

              {/* Specialization Tags */}
              <div className="flex flex-wrap gap-2">
                {['Expert Consultation', 'Emergency Care', 'Follow-up Visits', 'Telemedicine'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {doctors.map((doctor, index) => (
            <button
              key={doctor.id}
              onClick={() => goToSlide(index)}
              className={`relative group overflow-hidden rounded-2xl transition-all duration-300 ${
                index === currentIndex 
                  ? 'ring-4 ring-blue-500 scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-2 left-2 right-2 text-white">
                <p className="text-xs font-semibold truncate">{doctor.name.split(' ')[0]}</p>
                <p className="text-xs opacity-90 truncate">{doctor.specialization}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {doctors.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;