import { useEffect, useState } from 'react';

const RandomNounsImage = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const fetchRandomImage = async () => {
    const url = 'https://source.unsplash.com/random';
    const response = await fetch(url);
    setImageUrl(response.url);
  };

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Random from Unsplash" />}
    </div>
  );
};

export default RandomNounsImage;
