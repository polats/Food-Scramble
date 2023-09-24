import { useState, useEffect, useCallback } from 'react';
import { ImageData, getNounSeedFromBlockHash, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
import { NounSeed } from '@nouns/assets/dist/types';
const { palette } = ImageData; // Used with `buildSVG``

/** 
 * OUTPUT:
   {
      background: 1,
      body: 28,
      accessory: 120,
      head: 95,
      glasses: 15
    }
 * OUTPUT:
   {
     parts: [
       {
         filename: 'body-teal',
         data: '...'
       },
       {
         filename: 'accessory-txt-noun-multicolor',
         data: '...'
       },
       {
         filename: 'head-goat',
         data: '...'
       },
       {
         filename: 'glasses-square-red',
         data: '...'
       }
     ],
     background: 'e1d7d5'
   }
*/

export const drawNounFromSeed = (seed: any) => {
  const newSeed = getNounSeedFromBlockHash(
    seed,
    "0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01"
  );
        
  const { parts, background } = getNounData(newSeed);
  const svgBinary = buildSVG(parts, palette, background);
  const converted_svgBase64 = btoa(svgBinary);

  return converted_svgBase64
}

export const useFetchNounImage = () => {
    const [nextNounId, setNextNounId] = useState(1);
    const [latestBlockHash, setLatestBlockHash] = useState('0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01');
    const [seed, setSeed] = useState<NounSeed>(
        {
            background: 1,
            body: 28,
            accessory: 120,
            head: 95,
            glasses: 15
          }        
    );    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [svgBase64, setSvgBase64] = useState('');
  

    const generateRandomNoun = () => {
        const newSeed = Math.floor(Math.random() * 1000000000);
        setNextNounId(newSeed);
    }
    
    const fetchNounsImage = useCallback(async () => {
        setIsLoading(true);
        setError(null);
    
        try {

        // const latestBlockHash = '0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01';
        // const nextNounId = 16;
        const newSeed = getNounSeedFromBlockHash(nextNounId, latestBlockHash);
        
        const { parts, background } = getNounData(newSeed);
        const svgBinary = buildSVG(parts, palette, background);
        const converted_svgBase64 = btoa(svgBinary);

        setSvgBase64(converted_svgBase64)

        } catch (err) {
          setError(err instanceof Error ? err : new Error("An error occurred."));
        }
        setIsLoading(false);
      }, [latestBlockHash, nextNounId]);
    
    

    useEffect(() => {
        fetchNounsImage();
      }, [fetchNounsImage]);

    return {
        svgBase64,
        setNextNounId,
        nextNounId,
        setLatestBlockHash,
        generateRandomNoun,
        setSeed,
        isLoading,
        error,
        drawNounFromSeed
    };

}
