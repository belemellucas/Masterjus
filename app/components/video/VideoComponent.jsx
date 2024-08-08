function VideoComponent({ infoSite }) {
  const extractYouTubeID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : url; 
  };

  const videoId = infoSite && infoSite.length > 0 ? extractYouTubeID(infoSite[0].linkVideo) : null;
  const title = infoSite && infoSite.length > 0 ? infoSite[0].tituloVideo : 'Título';
  const description = infoSite && infoSite.length > 0 ? infoSite[0].descVideo : 'Descrição';
  console.log(infoSite)
  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-blue-900 h-[450px]">
      {/* Title and Description Section */}
      <div className="pt-4 flex-1 p-6 flex flex-col justify-center text-white h-[400px]">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>

      {/* Video Section */}
      <div className="pt-4 flex-1  h-[400px]">
        <div className="relative w-full h-[400px]">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="youtube video"
              allowFullScreen
              className="w-full h-[400px]"
            ></iframe>
          ) : (
            <p className="text-white text-center">Loading Video...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoComponent;
