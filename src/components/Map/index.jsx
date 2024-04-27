import { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';
import Button from '../Button';
import { API_KEY } from '../../contants';
import { downloadImage } from '../../helpers';
import styles from './Map.module.scss';
import Loader from '../Loader';
import Modal from '../Modal';

const Map = () => {
  const [isCaptureAvailable, setIsCaptureAvailable] = useState(false);
  const [mapSnapshot, setMapSnapshot] = useState();
  const [isDataSending, setIsDataSending] = useState(false);

  const mapRef = useRef(null);
  const map = useRef(null);
  const platform = useRef(null);
  const behavior = useRef(null);

  let changeLayer = true;

  useEffect(() => {
    if (!map.current) {
      platform.current = new H.service.Platform({
        apikey: API_KEY,
      });

      var defaultLayers = platform.current.createDefaultLayers({
        pois: true,
      });

      var satelliteLayer = platform.current
        .getMapTileService({ type: 'aerial' })
        .createTileLayer('maptile', 'satellite.day', 256, 'png8');

      const newMap = new H.Map(
        mapRef.current,
        defaultLayers.raster.satellite.map,
        {
          zoom: 10,
          center: {
            lat: 48.1351, // Latitude for Munich
            lng: 11.582, // Longitude for Munich
          },
        }
      );

      behavior.current = new H.mapevents.Behavior(
        new H.mapevents.MapEvents(newMap)
      );

      // Add event listener for zoom change to toggle capture availability
      newMap.addEventListener('mapviewchange', function () {
        const currentZoom = newMap.getZoom();
        setIsCaptureAvailable(currentZoom >= 16);
        if (currentZoom >= 16 && changeLayer) {
          changeLayer = false;
          newMap.setBaseLayer(satelliteLayer);
        }
        if (currentZoom < 16 && !changeLayer) {
          changeLayer = true;
          newMap.setBaseLayer(defaultLayers.raster.satellite.map);
        }
      });

      map.current = newMap;
    }
  }, []);

  function calculateArea(zoom, width, height) {
    const EARTH_CIRCUMFERENCE = 40075000; // in meters
    const latitude = map.current.getCenter().lat; // Assuming you can get latitude like this
    const radians = latitude * (Math.PI / 180);

    const resolution =
      (EARTH_CIRCUMFERENCE * Math.cos(radians)) / (256 * Math.pow(2, zoom));
    const visibleWidth = resolution * width;
    const visibleHeight = resolution * height;

    return visibleWidth * visibleHeight; // returns area in square meters
  }

  const captureMap = () => {
    setIsDataSending(true);
    if (behavior.current) {
      behavior.current.disable();
    }

    const endX = window.innerWidth;
    const endY = window.innerHeight;
    const curZoom = map.current.getZoom();

    // Call calculateArea to set curArea
    const curArea = calculateArea(curZoom, endX, endY);

    map.current.capture(
      function (canvas) {
        if (canvas) {
          setMapSnapshot(canvas);
          const dataURL = canvas.toDataURL('image/png');
          downloadImage(dataURL, 'map-screenshot.png');
        }
      },
      [],
      0,
      0,
      endX,
      endY
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '100px',
          zIndex: 10,
        }}
        onClick={() => setIsModalOpen(true)}
      >
        KURWA
      </div>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          imgSrc="/assets/images/modal-test.png"
        />
      )}
      <div className={styles.mapWrapper}>
        <Loader
          isLoading={isDataSending}
          infoMessage="Your response is being sent"
        />
        <div className={styles.map} ref={mapRef} />
        {isCaptureAvailable && (
          <Button onClick={captureMap} className={styles.captureBtn}>
            Capture Map
          </Button>
        )}
      </div>
    </>
  );
};
export default Map;
