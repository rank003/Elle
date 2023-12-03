import  { useState, useEffect } from 'react';
import axios from 'axios';
import VideoList from './components/Videolist.jsx';
import VideoModal from './components/Videomodal.jsx';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = 'AIzaSyCL5ohoVZ1nntfYJnk-Qtnxv9slq6yx8Uw';
  const SEARCH_QUERY = 'workout';

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            q: SEARCH_QUERY,
            type: 'video',
            key: API_KEY,
            maxResults: 10, 
          },
        });
        if (response.data && response.data.items) {
          setVideos(response.data.items);
          setError(null); // Clear any previous errors if the request is successful
        } else {
          setError('No video items found.'); // Set an error message if the response format is unexpected
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Error fetching videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []); // Empty dependency array means this effect runs once on component mount

  const openModal = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
   
      <header className="header">
        <h1>Fitness Platform</h1>
        <p>Your journey to a healthier lifestyle starts here.</p>
      </header>



      
      
      <div className='crousel-container'>
        <section className="main-content">
          <div className="card">
            <h2>Welcome to our Fitness Platform</h2>
            <p>Discover a variety of workouts, nutrition plans, and expert guidance.</p>
          </div>

          <div className="cta">
            <h3>Get Started Today!</h3>
            <button onClick={() => setCount(count + 1)}>Join Now</button>
            <p>{` ${count} people have joined the site.`}</p>
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <h4>Personalized Workouts</h4>
            <p>Access customized workout plans tailored to your fitness goals.</p>
          </div>

          <div className="feature">
            <h4>Nutrition Guidance</h4>
            <p>Explore nutrition plans designed to complement your fitness routine.</p>
          </div>

          <div className="feature">
            <h4>Expert Advice</h4>
            <p>Receive guidance from experienced trainers to maximize your results.</p>
          </div>
        </section>

        
        
          {
            !loading && !error && (
              <section className="videos">
                <h2>YouTube Workout Videos</h2>
                <VideoList videos={videos} onVideoClick={openModal} />
                {selectedVideo && <VideoModal videoId={selectedVideo} onClose={closeModal} />}
              </section>
            )
          }


        <section className="videos">
          <h2>YouTube Workout Videos</h2>
          <VideoList videos={videos} onVideoClick={openModal} />
        </section>
        {selectedVideo && <VideoModal videoId={selectedVideo} onClose={closeModal} />}
        <footer className="footer">
          <p>&copy; 2023 Fitness Platform. All rights reserved.</p>
        </footer>
      </div>
      
    </>
  );
}

export default App;
