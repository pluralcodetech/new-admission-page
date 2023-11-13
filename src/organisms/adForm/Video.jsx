
import playicon from '../../assets/images/Group 3.png'

const Video = () => {
    const handlePlay = () => {
        const videocard = document.querySelector("#video1");
        const videoWrapper = document.querySelector(".video");
        const wrapper = document.querySelector(".wrapper");
        const close =document.querySelector('.ex');
        const playimg =document.querySelector('.playimg');
        playimg.style.display="none"
        videocard.play();
        videoWrapper.style.display = "block";
        close.style.display="block";
        wrapper.classList.add('wrapper2') 
        wrapper.classList.remove('wrapper') 
      };
      
    
      
      const handleClose = () => {
        const videoWrapper = document.querySelector(".video");
        const wrapper = document.querySelector(".wrapper2");
        const videocard = document.querySelector("#video1");
        const playimg =document.querySelector('.playimg');
        const close =document.querySelector('.ex');
        playimg.style.display="block"
        close.style.display="none"
        videocard.pause();
        videocard.currentTime = 0;
        videoWrapper.style.display = "none";
        wrapper.classList.add('wrapper')
        wrapper.classList.remove('wrapper2')
      };
    
      return (
        <div className="w-full flex justify-center">
          <div className="wrapper">
          <button
            className="ex text-xl md:text-3xl btn lg:p-5 text-black"
            onClick={handleClose}
          >
            x
          </button>
          <div className="playimg" id="play" onClick={handlePlay}>
            <img src={playicon} alt="" />
          </div>
          <div className="video">
            <video width="100%" height="100%" id="video1" className="vid" controls>
              <source
                src="https://pluralcode.academy/video_asset/video.mp4"
                type="video/mp4"
              />
              Your browser does not support HTML video.
            </video>
          </div>
        </div>
    
        </div>
      );
}

export default Video
