// import React, { useState } from 'react';
// import { 
//   Users, 
//   Calendar, 
//   FileText, 
//   DollarSign, 
//   Activity,
//   Bell,
//   Search,
//   Menu,
//   X
// } from 'lucide-react';

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');

//   // Sample data
//   const stats = [
//     { title: 'Total Patients', value: '1,234', icon: Users, color: 'bg-blue-500' },
//     { title: 'Appointments', value: '56', icon: Calendar, color: 'bg-green-500' },
//     { title: 'Medical Records', value: '892', icon: FileText, color: 'bg-purple-500' },
//     { title: 'Revenue', value: '$45,678', icon: DollarSign, color: 'bg-orange-500' }
//   ];

//   const recentPatients = [
//     { id: 1, name: 'John Doe', condition: 'Fever', time: '10:30 AM', status: 'Completed' },
//     { id: 2, name: 'Sarah Smith', condition: 'Checkup', time: '11:15 AM', status: 'In Progress' },
//     { id: 3, name: 'Mike Johnson', condition: 'Dental', time: '02:45 PM', status: 'Pending' },
//     { id: 4, name: 'Emily Davis', condition: 'Emergency', time: '03:20 PM', status: 'Completed' }
//   ];

//   const upcomingAppointments = [
//     { id: 1, patient: 'Robert Wilson', doctor: 'Dr. Sarah Miller', time: '10:00 AM', type: 'Consultation' },
//     { id: 2, patient: 'Lisa Brown', doctor: 'Dr. James Wilson', time: '11:30 AM', type: 'Follow-up' },
//     { id: 3, patient: 'David Lee', doctor: 'Dr. Maria Garcia', time: '02:00 PM', type: 'Surgery' }
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
//         <div className="flex items-center justify-between p-4 border-b">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
//             <span className="text-xl font-bold text-gray-800">MediCare</span>
//           </div>
//           <button 
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>
        
//         <nav className="mt-8">
//           {['Overview', 'Patients', 'Appointments', 'Doctors', 'Staff', 'Billing', 'Settings'].map((item) => (
//             <button
//               key={item}
//               className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ${
//                 activeTab === item.toLowerCase() 
//                   ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//               onClick={() => setActiveTab(item.toLowerCase())}
//             >
//               <span className="font-medium">{item}</span>
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow-sm z-40">
//           <div className="flex items-center justify-between px-6 py-4">
//             <div className="flex items-center">
//               <button 
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden mr-4"
//               >
//                 <Menu className="w-6 h-6" />
//               </button>
//               <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
              
//               <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
//                 <Bell className="w-6 h-6" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
              
//               <div className="flex items-center space-x-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="text-sm font-medium text-gray-700">Dr. John Smith</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 overflow-y-auto p-6">
//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                     <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//                   </div>
//                   <div className={`p-3 rounded-lg ${stat.color}`}>
//                     <stat.icon className="w-6 h-6 text-white" />
//                   </div>
//                 </div>
//                 <div className="mt-4 flex items-center text-sm text-green-600">
//                   <Activity className="w-4 h-4 mr-1" />
//                   <span>+2.5% from last week</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Recent Patients */}
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-lg font-semibold text-gray-800">Recent Patients</h2>
//                 <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                   View All
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 {recentPatients.map((patient) => (
//                   <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
//                         alt={patient.name}
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <div>
//                         <p className="font-medium text-gray-900">{patient.name}</p>
//                         <p className="text-sm text-gray-500">{patient.condition}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm font-medium text-gray-900">{patient.time}</p>
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         patient.status === 'Completed' 
//                           ? 'bg-green-100 text-green-800'
//                           : patient.status === 'In Progress'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {patient.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Upcoming Appointments */}
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
//                 <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                   View Calendar
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 {upcomingAppointments.map((appointment) => (
//                   <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg">
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="font-medium text-gray-900">{appointment.patient}</h3>
//                       <span className="text-sm font-medium text-blue-600">{appointment.time}</span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm text-gray-600">
//                       <span>With {appointment.doctor}</span>
//                       <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
//                         {appointment.type}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {[
//                 { name: 'Add Patient', icon: Users, color: 'bg-blue-500' },
//                 { name: 'Schedule', icon: Calendar, color: 'bg-green-500' },
//                 { name: 'Reports', icon: FileText, color: 'bg-purple-500' },
//                 { name: 'Billing', icon: DollarSign, color: 'bg-orange-500' }
//               ].map((action, index) => (
//                 <button
//                   key={index}
//                   className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   <div className={`p-3 rounded-lg ${action.color} mb-2`}>
//                     <action.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">{action.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


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
  Users,
  Heart,
  Stethoscope,
  Baby,
  Brain,
  Bone,
  Eye,
  
  Ambulance,
  Microscope,
  Shield
} from 'lucide-react';

const HospitalDashboard = () => {
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  // Hero Section Images
  const heroImages = [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

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
    }
  ];

  // Departments Data
  const departments = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Helpdesk",
      description: "We provide 24/7 support for your queries and assistance on hospital services.",
      color: "bg-blue-500"
    },
    {
      icon: <Clipboard className="w-8 h-8" />,
      title: "Registration",
      description: "Quick and hassle-free patient registration with minimal waiting time.",
      color: "bg-green-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Doctor Schedule",
      description: "Check timings and availability of our experienced doctors online.",
      color: "bg-purple-500"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Billing & Accounts",
      description: "Transparent and efficient billing services with in-house pharmacy with all prescribed medicines.",
      color: "bg-orange-500"
    },
    {
      icon: <Ambulance className="w-8 h-8" />,
      title: "Emergency",
      description: "Round-the-clock emergency services with fully equipped facilities.",
      color: "bg-red-500"
    }
  ];

  // Services Data
  const services = [
    {
      icon: <Stethoscope className="w-10 h-10" />,
      title: "General Medicine",
      description: "Comprehensive care for all common illnesses and conditions.",
      color: "text-blue-600"
    },
    {
      icon: <Baby className="w-10 h-10" />,
      title: "Pediatrics",
      description: "Specialized care for infants, children, and adolescents.",
      color: "text-green-600"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Cardiology",
      description: "Expert care for heart conditions and cardiovascular health.",
      color: "text-red-600"
    },
    {
      icon: <Brain className="w-10 h-10" />,
      title: "Neurology",
      description: "Advanced treatment for neurological disorders and brain health.",
      color: "text-purple-600"
    },
    {
      icon: <Bone className="w-10 h-10" />,
      title: "Orthopedics",
      description: "Comprehensive bone and joint care with modern techniques.",
      color: "text-orange-600"
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: "Ophthalmology",
      description: "Complete eye care services and vision correction treatments.",
      color: "text-cyan-600"
    }
  ];

  // Health Centers Data
  const healthCenters = [
    {
      icon: <Ambulance className="w-12 h-12" />,
      title: "Trauma Centre",
      description: "Expert centre for emergency injuries, accidents, and critical situations.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Microscope className="w-12 h-12" />,
      title: "Cancer Centre",
      description: "Advanced secondary treatment for a lifespan of cancer cases.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Heart Centre",
      description: "Certified care and surgery with state-of-the-art facilities.",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Community Health Centre",
      description: "Comprehensive health services for the community, including prevention and wellness programs.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Auto slide effects
  useEffect(() => {
    if (!autoSlide) return;
    
    const slideInterval = setInterval(() => {
      setCurrentDoctorIndex((current) => 
        current === doctors.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [autoSlide, doctors.length]);

  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHeroIndex((current) => 
        current === heroImages.length - 1 ? 0 : current + 1
      );
    }, 4000);

    return () => clearInterval(heroInterval);
  }, []);

  const nextDoctorSlide = () => {
    setCurrentDoctorIndex(current => 
      current === doctors.length - 1 ? 0 : current + 1
    );
    setAutoSlide(false);
  };

  const prevDoctorSlide = () => {
    setCurrentDoctorIndex(current => 
      current === 0 ? doctors.length - 1 : current - 1
    );
    setAutoSlide(false);
  };

  const currentDoctor = doctors[currentDoctorIndex];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Sliding Images */}
      <section className="relative h-96 lg:h-[500px] overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Hospital facility ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
        
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Cambridge Hospital
            </h1>
            <p className="text-xl lg:text-2xl mb-8">
              Leading the way in specialized healthcare for all your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Book Appointment
              </button>
              <button className="bg-transparent hover:bg-white/20 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Emergency Contact
              </button>
            </div>
          </div>
        </div>

        {/* Hero Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentHeroIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Our Departments Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Departments
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Efficient and Patient-Centric Services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${dept.color} text-white rounded-lg mb-4`}>
                  {dept.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {dept.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {dept.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Health Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Providing the best medical care with expertise and compassion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`mb-4 ${service.color}`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center group-hover:underline">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Health Centers Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Health Centres
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leading the way in specialized healthcare for all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {healthCenters.map((center, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={center.image}
                    alt={center.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-blue-600 mr-4">
                      {center.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {center.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {center.description}
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center hover:underline">
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Doctors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced healthcare professionals dedicated to your well-being
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
                  onClick={prevDoctorSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextDoctorSlide}
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
              </div>
            </div>
          </div>

          {/* Doctor Thumbnails */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doctors.map((doctor, index) => (
              <button
                key={doctor.id}
                onClick={() => {
                  setCurrentDoctorIndex(index);
                  setAutoSlide(false);
                }}
                className={`relative group overflow-hidden rounded-2xl transition-all duration-300 ${
                  index === currentDoctorIndex 
                    ? 'ring-4 ring-blue-500 scale-105' 
                    : 'hover:scale-105'
                }`}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <p className="text-sm font-semibold truncate">{doctor.name}</p>
                  <p className="text-xs opacity-90 truncate">{doctor.specialization}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Add missing icon components
const Clipboard = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const CreditCard = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

export default HospitalDashboard;