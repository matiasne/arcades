import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Futura Std';
        src: url('./fonts/futuraStd/FuturaStdBoldOblique.woff');
        }

        @font-face {
            font-family: 'Source Sans Pro';
            src: url('./fonts/SourceSansPro/SourceSansPro-Bold.ttf');
        }   
            
        body{
            font-family: 'Source Sans Pro', sans-serif;
        }
      `}
  />
);

export default Fonts;
