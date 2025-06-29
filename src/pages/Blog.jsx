const Blog = () => {
  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Organic Farming",
      excerpt: "Discover how traditional farming methods combine with modern techniques to produce the highest quality grains.",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      date: "June 15, 2023",
      category: "Farming"
    },
    {
      id: 2,
      title: "Rice Varieties Explained",
      excerpt: "Learn about the different types of rice we grow and their unique characteristics and culinary uses.",
      image: "https://www.shutterstock.com/image-photo/south-indian-food-plates-idly-260nw-1685958112.jpg",
      date: "May 28, 2023",
      category: "Products"
    },
    {
      id: 3,
      title: "Sustainable Agriculture Practices",
      excerpt: "How we're implementing eco-friendly farming methods to protect the environment while maintaining quality.",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "April 10, 2023",
      category: "Sustainability"
    }
  ];

  return (
    <div className="bg-[#f3f3ef] py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Blog Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium uppercase tracking-wider text-gray-800 mb-4">
            The Prakash Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, stories, and updates from our farm to your table
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* Blog Image */}
              <div className="h-48 md:h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-purple-600">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>

                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">{post.title}</h2>

                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <button className="text-purple-600 font-medium hover:text-purple-800 transition-colors">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300">
            View All Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;