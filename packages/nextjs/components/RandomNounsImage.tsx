import { useEffect, useState } from 'react';

const RandomNounsImage = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const fetchRandomImage = async () => {
    const url = 'https://api.cloudnouns.com/v1/pfp';
    const response = await fetch(url);
    setImageUrl(response.url);
  };

  return (
    <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
      {imageUrl && <img src={imageUrl} alt="Random from Unsplash" />}
    </div>
  );
};

export default RandomNounsImage;
