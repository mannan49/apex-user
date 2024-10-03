const https = require('https');
const axios = require('axios');
const fs = require('fs'); // Ensure fs is imported

const apiUrl = 'https://apex-scholarships-backend.vercel.app/api/blogs'; 
const routesFilePath = 'routes.txt';

const agent = new https.Agent({
  rejectUnauthorized: false // Ignore SSL errors
});

async function fetchBlogIds() {
  try {
    console.log('Fetching blog IDs from API...');
    const response = await axios.get(apiUrl, { httpsAgent: agent });
    console.log('API response:', response.data); // Debugging output

    const blogs = response.data; 
    const blogIds = blogs.map(blog => `/api/blogs/${blog._id}`);
    console.log('Mapped blog IDs:', blogIds); // Debugging output

    return blogIds;
  } catch (error) {
    console.error('Error fetching blogs:', error.message); // More specific error output
    console.error('Full error details:', error); // Full error object for more context
    return [];
  }
}

async function generateRoutesFile() {
  console.log('Generating routes file...');
  const routes = await fetchBlogIds();

  // Debugging output
  console.log('Fetched routes:', routes);

  const allRoutes = ['/', ...routes]; // Add your base route
  console.log('All routes to be written:', allRoutes); // Debugging output

  fs.writeFile(routesFilePath, allRoutes.join('\n'), err => {
    if (err) {
      console.error('Error writing routes file:', err);
    } else {
      console.log(`Routes have been written to ${routesFilePath}`);
    }
  });
}

// Start the process
generateRoutesFile();
