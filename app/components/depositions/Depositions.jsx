function Depositions({ depositions, infoSite }) {
  // const getYoutubeEmbedUrl = (url) => {
  //     const videoId = url.split('v=')[1];
  //     const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  //     return embedUrl;
  //   };
  return (
    <>
   <div className="w-screen h-800 flex justify-center items-center">
  <iframe
    src={`https://www.youtube.com/embed/${infoSite[0].linkVideo}`}
    title="youtube video"
    allowFullScreen
    className="w-full h-full"
  ></iframe>
</div>
     
    </>
  );
}

export default Depositions;
