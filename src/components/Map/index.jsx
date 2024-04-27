import { useEffect, useRef, useState } from "react";
import H from "@here/maps-api-for-javascript";
import Button from "../Button";
import { API_KEY } from "../../contants";
import { downloadImage, getEdgeCoordinates } from "../../helpers";
import styles from "./Map.module.scss";
import Loader from "../Loader";
import Modal from "../Modal";

const Map = () => {
  const [isCaptureAvailable, setIsCaptureAvailable] = useState(false);
  const [mapSnapshot, setMapSnapshot] = useState();
  const [isDataSending, setIsDataSending] = useState(false);
  const [imageURL, setImageURL] = useState(null);

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
        .getMapTileService({ type: "aerial" })
        .createTileLayer("maptile", "satellite.day", 256, "png8");

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
      newMap.addEventListener("mapviewchange", function () {
        const currentZoom = newMap.getZoom();
        console.log(currentZoom);
        setIsCaptureAvailable(currentZoom >= 14);
        if (currentZoom >= 14 && changeLayer) {
          changeLayer = false;
          newMap.setBaseLayer(satelliteLayer);
        }
        if (currentZoom < 14 && !changeLayer) {
          changeLayer = true;
          newMap.setBaseLayer(defaultLayers.raster.satellite.map);
        }
      });

      map.current = newMap;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (imageURL) {
        window.URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (map.current) {
        var bounds = map.current
          .getViewModel()
          .getLookAtData()
          .bounds.getBoundingBox();
        var SWlong = bounds.getLeft();
        var SWlat = bounds.getBottom();
        var NElong = bounds.getRight();
        var NElat = bounds.getTop();
        fetch(
          `http://localhost:8000/pinpoints/?max_latitude=${NElat}&min_latitude=${SWlat}&max_longitude=${NElong}&min_longitude=${SWlong}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            setIsDataSending(false); // Update the UI based on the response
          })
          .catch((error) => {
            console.error("Error:", error);
            setIsDataSending(false); // Handle errors here
          });
      }
    }, 5000); // every 5 seconds

    return () => {
      clearInterval(intervalId);
      if (imageURL) {
        window.URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  const captureMap = () => {
    setIsDataSending(true);
    if (behavior.current) {
      behavior.current.disable();
    }

    const endX = window.innerWidth;
    const endY = window.innerHeight;
    const curZoom = map.current.getZoom();

    map.current.capture(
      async function (canvas) {
        if (canvas) {
          setMapSnapshot(canvas);
          const dataURL = canvas.toDataURL("image/png");
          const blob = await fetch(dataURL).then((res) => res.blob());

          const formData = new FormData();
          formData.append("file", blob, "map-screenshot.png");

          // Post the FormData to your local server
          fetch("http://localhost:8000/images/mask", {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.blob(); // Assuming the server responds with a file to download
            })
            .then((blob) => {
              const downloadUrl = window.URL.createObjectURL(blob);
              setImageURL(downloadUrl); // Set image URL in state
              setIsModalOpen(true); // Open modal once image is ready
              setIsDataSending(false);
            })
            .catch((error) => {
              console.error("Error:", error);
              setIsDataSending(false);
            });

          behavior.current.enable();
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
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          imgSrc={imageURL || "/assets/images/modal-test.png"} // Fallback to default if imageURL not yet set
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
