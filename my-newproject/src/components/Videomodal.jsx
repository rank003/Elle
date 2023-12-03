
// VideoModal.jsx

import PropTypes from 'prop-types';
import './componentStyle/Videomodal.css'

const VideoModal = ({ videoId, onClose }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <iframe title="YouTube Video" width="200" height="200" src={embedUrl} style={{ border: 0 }} allowFullScreen />

      </div>
    </div>
  );
};

VideoModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VideoModal;

