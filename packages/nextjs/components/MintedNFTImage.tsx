import { useState, useEffect, useCallback } from 'react';
import { ImageData, getNounSeedFromBlockHash, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
import { NounSeed } from '@nouns/assets/dist/types';
const { palette } = ImageData; // Used with `buildSVG``


const MintedNFTImage = ({ seed } : any) => {

  const [svgData, setSvgData] = useState("");

 const drawNounFromSeed = (seed: any) => {
    const newSeed = getNounSeedFromBlockHash(
      seed,
      "0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01"
    );
          
    const { parts, background } = getNounData(newSeed);
    const svgBinary = buildSVG(parts, palette, background);
    const converted_svgBase64 = btoa(svgBinary);
  
    return converted_svgBase64
  }
  


  useEffect(() => {
    if (seed) {
    setSvgData(drawNounFromSeed(Number(seed)));
    }
  }, [seed]);


  
  return (
<section className="hero container max-w-screen-lg mx-auto pb-10">
      {
        svgData && <img src={"data:image/svg+xml;base64," + svgData} className="mx-auto"/>
      }
      
</section>    

  );
};

export default MintedNFTImage;
