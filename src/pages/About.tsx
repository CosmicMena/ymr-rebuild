import { useState } from 'react';
import PartnersCarousel from '../components/PartnersCarousel';
import { 
  Target, Eye, Heart, Users, Award, Clock, 
  ArrowRight, Star, TrendingUp,
  Calendar,
  Building2, Shield, BookOpen, X
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  content: string;
}

const About = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);

  // ===== DADOS DOS VALORES DA EMPRESA =====
  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We never compromise on quality. Every product we offer meets the highest industrial standards.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Client-Centered Service',
      description: 'Our clients are at the heart of everything we do. We provide personalized solutions and support.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'We are committed to sustainable practices and environmentally responsible solutions.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Safety & Reliability',
      description: 'Every product is tested and certified to ensure maximum safety and reliability in industrial environments.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // ===== DADOS DAS ESTATÍSTICAS =====
  const stats = [
    { number: '10+', label: 'Years of Experience', icon: Clock },
    { number: '500+', label: 'Satisfied Clients', icon: Users },
    { number: '1000+', label: 'Products Available', icon: Building2 },
    { number: '24/7', label: 'Customer Support', icon: Shield }
  ];

  // ===== DADOS DOS BLOGS =====
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Industrial Safety Equipment',
      excerpt: 'Exploring the latest innovations in safety gear and how they\'re revolutionizing workplace protection.',
      author: 'Maria Santos',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Safety',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      content: `
        <p>The industrial safety equipment sector is experiencing unprecedented innovation, driven by technological advances and a growing emphasis on worker protection. In this comprehensive analysis, we explore the cutting-edge developments that are reshaping workplace safety across Angola and beyond.</p>
        
        <h3>Smart Safety Gear Integration</h3>
        <p>Modern safety equipment now incorporates IoT sensors and connectivity features that provide real-time monitoring of worker conditions. Smart helmets can detect falls, monitor vital signs, and automatically alert emergency services when needed.</p>
        
        <h3>Advanced Materials and Design</h3>
        <p>New composite materials are making safety equipment lighter, more durable, and more comfortable. These innovations ensure that workers can maintain peak performance while staying protected throughout their shifts.</p>
        
        <h3>Predictive Safety Analytics</h3>
        <p>AI-powered systems can now predict potential safety incidents before they occur, allowing companies to take proactive measures and prevent accidents before they happen.</p>
        
        <h3>Environmental Adaptability</h3>
        <p>Safety equipment is becoming more adaptable to various environmental conditions, from extreme temperatures to hazardous chemical exposure, ensuring comprehensive protection in all industrial settings.</p>
        
        <p>These innovations represent just the beginning of a new era in industrial safety, where technology and protection work hand in hand to create safer, more efficient workplaces.</p>
      `
    },
    {
      id: 2,
      title: 'Sustainable Manufacturing: A New Era',
      excerpt: 'How industrial companies are adopting eco-friendly practices without compromising efficiency.',
      author: 'João Silva',
      date: '2024-01-10',
      readTime: '7 min read',
      category: 'Sustainability',
      image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      content: `
        <p>Sustainable manufacturing is no longer just a trend—it's a necessity for companies looking to thrive in the modern industrial landscape. This comprehensive guide explores how Angolan manufacturers are leading the way in eco-friendly practices.</p>
        
        <h3>Energy Efficiency Revolution</h3>
        <p>Modern manufacturing facilities are implementing smart energy management systems that reduce consumption by up to 40% while maintaining production efficiency. Solar panels, wind turbines, and energy storage systems are becoming standard features.</p>
        
        <h3>Waste Reduction Strategies</h3>
        <p>Zero-waste manufacturing processes are being adopted across various industries, with companies achieving 95% waste diversion from landfills through innovative recycling and reuse programs.</p>
        
        <h3>Circular Economy Implementation</h3>
        <p>Companies are redesigning their production processes to create closed-loop systems where materials are continuously reused, reducing the need for virgin resources and minimizing environmental impact.</p>
        
        <h3>Green Supply Chain Management</h3>
        <p>Supply chains are being optimized for sustainability, with companies working closely with suppliers to ensure environmentally responsible practices throughout the entire production process.</p>
        
        <p>The future of manufacturing lies in sustainable practices that protect our environment while driving economic growth and innovation.</p>
      `
    },
    {
      id: 3,
      title: 'Advanced Tools for Modern Construction',
      excerpt: 'Discover the cutting-edge tools that are transforming construction projects across Angola.',
      author: 'Ana Costa',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Tools',
      image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      content: `
        <p>The construction industry in Angola is experiencing a technological revolution, with advanced tools and equipment transforming how projects are planned, executed, and completed. This detailed overview examines the latest innovations.</p>
        
        <h3>Digital Construction Tools</h3>
        <p>3D modeling software and augmented reality applications are enabling more precise planning and execution of construction projects, reducing errors and improving efficiency by up to 30%.</p>
        
        <h3>Automated Equipment</h3>
        <p>Self-driving construction vehicles and robotic systems are taking over repetitive tasks, allowing human workers to focus on complex problem-solving and quality control.</p>
        
        <h3>Smart Materials</h3>
        <p>Self-healing concrete, smart glass, and adaptive materials are revolutionizing building construction, creating structures that can respond to environmental changes and maintain themselves.</p>
        
        <h3>Precision Measurement Tools</h3>
        <p>Laser-guided systems and GPS-enabled equipment ensure millimeter-perfect accuracy in construction projects, reducing waste and improving quality standards.</p>
        
        <p>These advanced tools are not just improving efficiency—they're redefining what's possible in construction and infrastructure development.</p>
      `
    },
    {
      id: 4,
      title: 'Maintenance Best Practices for Industrial Equipment',
      excerpt: 'Essential tips to extend the life of your industrial machinery and reduce downtime.',
      author: 'Carlos Mendes',
      date: '2024-01-01',
      readTime: '8 min read',
      category: 'Maintenance',
      image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      content: `
        <p>Proper maintenance is the cornerstone of industrial efficiency and equipment longevity. This comprehensive guide provides proven strategies for maintaining industrial equipment at peak performance.</p>
        
        <h3>Predictive Maintenance Strategies</h3>
        <p>Implementing IoT sensors and AI analytics allows companies to predict equipment failures before they occur, reducing unplanned downtime by up to 50% and extending equipment life significantly.</p>
        
        <h3>Lubrication Management</h3>
        <p>Proper lubrication is critical for equipment performance. Automated lubrication systems and high-quality lubricants can reduce friction, prevent wear, and extend equipment life by years.</p>
        
        <h3>Regular Inspection Protocols</h3>
        <p>Systematic inspection schedules help identify potential issues early. Visual inspections, vibration analysis, and thermal imaging are essential tools for comprehensive equipment assessment.</p>
        
        <h3>Training and Documentation</h3>
        <p>Well-trained maintenance teams and comprehensive documentation ensure consistent, high-quality maintenance practices that protect your investment and ensure operational continuity.</p>
        
        <h3>Spare Parts Management</h3>
        <p>Strategic spare parts inventory management ensures quick response to equipment failures while optimizing inventory costs and storage requirements.</p>
        
        <p>Effective maintenance practices not only protect your equipment investment but also ensure consistent production quality and operational efficiency.</p>
      `
    },
    {
      id: 5,
      title: 'Digital Transformation in Industrial Operations',
      excerpt: 'How digital technologies are revolutionizing industrial operations and improving efficiency across Angola.',
      author: 'Pedro Fernandes',
      date: '2023-12-28',
      readTime: '6 min read',
      category: 'Technology',
      image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      content: `
        <p>Digital transformation is reshaping the industrial landscape in Angola, bringing unprecedented opportunities for efficiency, innovation, and growth. This comprehensive analysis explores the key trends and technologies driving this transformation.</p>
        
        <h3>Industry 4.0 Implementation</h3>
        <p>Smart factories are becoming a reality with interconnected systems, real-time data analytics, and autonomous decision-making capabilities that optimize production processes and reduce waste.</p>
        
        <h3>Cloud Computing Integration</h3>
        <p>Industrial companies are leveraging cloud platforms to store, process, and analyze vast amounts of operational data, enabling better decision-making and predictive maintenance.</p>
        
        <p>The future of industrial operations lies in embracing digital technologies that enhance productivity while maintaining the highest standards of quality and safety.</p>
      `
    },
    {
      id: 6,
      title: 'Workplace Safety Regulations Update 2024',
      excerpt: 'Important updates to workplace safety regulations that every industrial company should know.',
      author: 'Isabel Rodrigues',
      date: '2023-12-20',
      readTime: '4 min read',
      category: 'Regulations',
      image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      content: `
        <p>New workplace safety regulations come into effect in 2024, bringing significant changes that industrial companies need to understand and implement. This guide covers the key updates and their implications.</p>
        
        <h3>Enhanced Safety Protocols</h3>
        <p>New requirements for safety equipment certification, regular inspections, and employee training programs that ensure compliance with international standards.</p>
        
        <h3>Environmental Considerations</h3>
        <p>Updated regulations now include environmental safety measures, requiring companies to implement sustainable practices and reduce their environmental footprint.</p>
        
        <p>Staying compliant with these new regulations is essential for maintaining operational continuity and protecting both workers and the environment.</p>
      `
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  const displayedPosts = showAllPosts ? regularPosts : regularPosts.slice(0, 3);

  // ===== FUNÇÕES DO MODAL =====
  const openModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen page-content">
      {/* ===== SEÇÃO HERO - CABEÇALHO PRINCIPAL ===== */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-medium">About Us</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              About YMR Industrial
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Your trusted partner in delivering industrial-grade products that improve safety, 
              performance, and durability across Angola.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-300 mb-1">10+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-green-300 mb-1">500+</div>
                <div className="text-sm text-gray-300">Happy Clients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-purple-300 mb-1">1000+</div>
                <div className="text-sm text-gray-300">Products</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-orange-300 mb-1">24/7</div>
                <div className="text-sm text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO MISSÃO E VISÃO ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl mr-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                    <p className="text-gray-600 mt-1">What drives us forward</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To deliver industrial-grade products that improve safety, performance, and durability. 
                  We are committed to providing our clients with reliable solutions that meet the highest 
                  quality standards while ensuring exceptional service and support.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-100 rounded-xl mr-4">
                    <Eye className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                    <p className="text-gray-600 mt-1">Where we're heading</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become Angola's leading provider of industrial solutions, recognized for our commitment 
                  to quality, innovation, and customer satisfaction. We envision a future where every 
                  industrial project is powered by reliable, sustainable solutions.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Industrial facility"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Modern Industrial Solutions</h3>
                  <p className="text-sm opacity-90">State-of-the-art facilities and equipment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO VALORES DA EMPRESA ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
              <Heart className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Our Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our relationships with clients and partners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div 
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className={`bg-gradient-to-r ${value.color} p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO ESTATÍSTICAS ===== */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <TrendingUp className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">Our Track Record</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Track Record</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and client satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO PARCEIROS ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PartnersCarousel />
        </div>
      </section>

      {/* ===== SEÇÃO DEPOIMENTO ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-50 rounded-3xl p-12 shadow-lg">
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
            "Over 10 years supplying professionals with what they need to build, repair and maintain. 
            YMR Industrial has been our trusted partner for reliable industrial solutions."
          </blockquote>
          <div className="flex items-center justify-center">
            <img 
              src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=200" 
              alt="Client testimonial"
                className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow-lg"
            />
            <div className="text-left">
              <div className="font-semibold text-gray-900">Construction Professional</div>
              <div className="text-gray-600">Long-term Client</div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO BLOG ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Latest Insights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Industry Insights & News</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends, innovations, and best practices in the industrial sector.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {featuredPost.category}
                      </span>
                      <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img 
                          src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=40" 
                          alt={featuredPost.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{featuredPost.author}</div>
                          <div className="text-gray-500 text-sm">{featuredPost.date}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => openModal(featuredPost)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-gray-500 text-sm flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <img 
                        src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=32" 
                        alt={post.author}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">{post.author}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => openModal(post)}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Posts Button */}
          {regularPosts.length > 3 && (
            <div className="text-center mt-12">
              <button 
                onClick={() => setShowAllPosts(!showAllPosts)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 mx-auto"
              >
                <span>{showAllPosts ? 'Show Less' : 'View All Posts'}</span>
                <ArrowRight className={`h-5 w-5 transition-transform duration-200 ${showAllPosts ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== MODAL DO BLOG ===== */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header do Modal */}
            <div className="relative">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-800 rounded-full p-2 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedPost.category}
                </span>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-500 text-sm flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {selectedPost.date}
                </span>
                <span className="text-gray-500 text-sm">{selectedPost.readTime}</span>
                <div className="flex items-center space-x-2">
                  <img 
                    src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=32" 
                    alt={selectedPost.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-900">{selectedPost.author}</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {selectedPost.title}
              </h1>

              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>

            {/* Footer do Modal */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=40" 
                    alt={selectedPost.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{selectedPost.author}</div>
                    <div className="text-gray-500 text-sm">YMR Industrial Team</div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;