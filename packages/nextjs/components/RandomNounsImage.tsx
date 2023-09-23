import { useEffect, useState } from 'react';
import { useFetchNounImage } from '~~/hooks/scaffold-eth';


const RandomNounsImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [seed, setSeed] = useState('');
  const { svgBase64 } = useFetchNounImage();

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const fetchRandomImage = async () => {
    // const seed = Math.floor(Math.random() * 1000000) + ".eth";
    // console.log("seed", seed);
    // const url = 'https://api.cloudnouns.com/v1/pfp?txt=' + seed;
    // setImageUrl(url);
    // setSeed(seed);
  };

  return (
    <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
      {
        svgBase64 && <img src={"data:image/svg+xml;base64," + svgBase64} />
      }
    </div>
  );
};

export default RandomNounsImage;
