import { useState, useEffect, useCallback } from 'react';
import { ImageData, getNounSeedFromBlockHash, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
const { palette } = ImageData; // Used with `buildSVG``

/** 
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

export const useFetchNounImage = () => {
    const [seed, setSeed] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [svgBase64, setSvgBase64] = useState('');
  
    const fetchNounsImage = useCallback(async () => {
        setIsLoading(true);
        setError(null);
    
        try {

        const latestBlockHash = '0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01';
        const nextNounId = 116;
        const seed = getNounSeedFromBlockHash(nextNounId, latestBlockHash);
        const { parts, background } = getNounData(seed);
        const svgBinary = buildSVG(parts, palette, background);
        const converted_svgBase64 = btoa(svgBinary);

        setSvgBase64(converted_svgBase64)

        } catch (err) {
          setError(err instanceof Error ? err : new Error("An error occurred."));
        }
        setIsLoading(false);
      }, [seed]);
    
    

    useEffect(() => {
        fetchNounsImage();
      }, [fetchNounsImage]);

    return {
        svgBase64,
        setSeed,
        isLoading,
        error,
    };

}
