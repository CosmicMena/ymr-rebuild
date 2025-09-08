// ===== TIPOS =====
export interface BlogPost {
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

// ===== DADOS DOS BLOGS =====
export const blogPosts: BlogPost[] = [
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
      <p>Proper maintenance is the cornerstone of industrial equipment longevity and efficiency. This comprehensive guide outlines proven strategies that Angolan industrial facilities can implement to maximize equipment performance and minimize costly downtime.</p>
      
      <h3>Predictive Maintenance Technologies</h3>
      <p>Implementing IoT sensors and machine learning algorithms allows for real-time monitoring of equipment conditions, enabling maintenance teams to address issues before they become critical failures.</p>
      
      <h3>Lubrication Management Systems</h3>
      <p>Proper lubrication is essential for equipment longevity. Automated lubrication systems ensure consistent application of the right lubricants at optimal intervals, reducing wear and extending equipment life.</p>
      
      <h3>Thermal Imaging and Vibration Analysis</h3>
      <p>Advanced diagnostic tools like thermal cameras and vibration analyzers help identify potential problems early, allowing for proactive maintenance that prevents catastrophic failures.</p>
      
      <h3>Staff Training and Certification</h3>
      <p>Well-trained maintenance personnel are crucial for effective equipment care. Regular training programs ensure that staff members are up-to-date with the latest maintenance techniques and safety protocols.</p>
      
      <p>By implementing these best practices, industrial facilities can significantly reduce maintenance costs while improving equipment reliability and operational efficiency.</p>
    `
  },
  {
    id: 5,
    title: 'Digital Transformation in Angolan Industries',
    excerpt: 'How technology is revolutionizing traditional industrial processes across the country.',
    author: 'Patricia Fernandes',
    date: '2023-12-28',
    readTime: '6 min read',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    content: `
      <p>Angolan industries are embracing digital transformation at an unprecedented pace, leveraging cutting-edge technologies to modernize operations and improve competitiveness in the global market.</p>
      
      <h3>Industry 4.0 Implementation</h3>
      <p>Smart factories are becoming a reality in Angola, with interconnected systems that enable real-time monitoring, predictive analytics, and automated decision-making processes.</p>
      
      <h3>Cloud Computing and Data Analytics</h3>
      <p>Industrial companies are migrating to cloud-based solutions that provide scalable computing power and advanced analytics capabilities, enabling data-driven decision making.</p>
      
      <h3>Cybersecurity in Industrial Settings</h3>
      <p>As industries become more connected, cybersecurity becomes increasingly important. Companies are implementing robust security measures to protect critical infrastructure and sensitive data.</p>
      
      <h3>Workforce Digital Skills Development</h3>
      <p>Investing in employee training and development is crucial for successful digital transformation. Companies are providing comprehensive training programs to equip workers with necessary digital skills.</p>
      
      <p>The digital transformation journey is ongoing, but the benefits are already evident in improved efficiency, reduced costs, and enhanced competitiveness.</p>
    `
  },
  {
    id: 6,
    title: 'New Safety Regulations: What You Need to Know',
    excerpt: 'Understanding the latest safety regulations affecting industrial operations in Angola.',
    author: 'Miguel Rodrigues',
    date: '2023-12-20',
    readTime: '4 min read',
    category: 'Regulations',
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    content: `
      <p>Recent updates to industrial safety regulations in Angola require immediate attention from all industrial operators. This comprehensive overview outlines the key changes and their implications for your operations.</p>
      
      <h3>Updated Personal Protective Equipment Standards</h3>
      <p>New standards for PPE require higher levels of protection and more frequent testing. Companies must ensure all equipment meets the latest certification requirements.</p>
      
      <h3>Environmental Compliance Requirements</h3>
      <p>Stricter environmental regulations now require more detailed reporting and monitoring of industrial emissions and waste management practices.</p>
      
      <h3>Worker Training and Certification Updates</h3>
      <p>Mandatory training programs have been updated to include new safety protocols and emergency response procedures. All workers must complete updated certification within the next six months.</p>
      
      <h3>Equipment Inspection and Maintenance Schedules</h3>
      <p>New inspection requirements mandate more frequent equipment checks and detailed documentation of all maintenance activities.</p>
      
      <p>Staying compliant with these new regulations is essential for maintaining operational continuity and protecting both workers and the environment.</p>
    `
  }
];

// ===== FUNÇÕES UTILITÁRIAS =====
export const getFeaturedPost = (): BlogPost | undefined => {
  return blogPosts.find(post => post.featured);
};

export const getRegularPosts = (): BlogPost[] => {
  return blogPosts.filter(post => !post.featured);
};

export const getPostById = (id: number): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};
