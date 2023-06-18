import * as React from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';

import './styles/TestPage.css'

function TestPage() {
    const globeRef = React.useRef<GlobeMethods>();

    const arcsData2 = [{
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: 'red',
        arcLabel: "LABEL"
    }]

    React.useEffect(() => {
  
        //Portugal
        const MAP_CENTER = { lat: 37.6, lng: -16.6, altitude: .8 };
        globeRef.current?.pointOfView(MAP_CENTER, 4000);
      }, [globeRef]);

    return<>
        <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            arcsData={arcsData2}
            arcLabel={'arcLabel'}
            arcColor={'color'}
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={1500}

            pointColor={'orange'}

            width={256}
            height={256}
            

        />
    </>
}

export default TestPage;