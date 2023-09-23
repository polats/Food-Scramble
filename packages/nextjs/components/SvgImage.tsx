const RandomNounsImage = ({ src } : any) => {

  return (
    <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
      {
        src && <img src={"data:image/svg+xml;base64," + src} />
      }
    </div>
  );
};

export default RandomNounsImage;
