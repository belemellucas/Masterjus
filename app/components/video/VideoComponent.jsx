function VideoComponent({ infoSite }) {
  const extractYouTubeID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : url; 
  }

  const videoId = infoSite && infoSite.length > 0 ? extractYouTubeID(infoSite[0].linkVideo) : null;
  return (
    <>
      <div className="flex flex-col justify-center bg-teal-950">
        <div className="flex flex-col justify-center w-full bg-black max-md:max-w-full">
          <div className="flex overflow-hidden relative flex-col w-full min-h-[300px] max-md:max-w-full">
            <div className="w-full h-[300px] flex justify-center items-center">
             {videoId ? (
               <iframe
               src={`https://www.youtube.com/embed/${videoId}`}
               title="youtube video"
               allowFullScreen
               className="w-full h-full"
             ></iframe>
             ):(
              <p>Loading Video...</p>
             )}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoComponent;
