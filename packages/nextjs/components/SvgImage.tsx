const SvgImage = ({ src } : any) => {

  return (
<section className="hero container max-w-screen-lg mx-auto pb-10">
      {
        src && <img src={"data:image/svg+xml;base64," + src} className="mx-auto"/>
      }
</section>    

  );
};

export default SvgImage;
