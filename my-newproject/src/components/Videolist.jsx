import PropTypes from 'prop-types';
import './componentStyle/Videolist.css';

const VideoList = ({ videos, onVideoClick }) => {
  return (
    <div className="video-list">
      <h2>Video List</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId} onClick={() => onVideoClick(video.id.videoId)}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            <p>{video.snippet.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

VideoList.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.shape({
        videoId: PropTypes.string.isRequired,
      }),
      snippet: PropTypes.shape({
        thumbnails: PropTypes.shape({
          default: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }),
        }),
        title: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  onVideoClick: PropTypes.func.isRequired,
};

export default VideoList;
