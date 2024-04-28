import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import H from "@here/maps-api-for-javascript";
import Button from "../Button";
import { API_KEY } from "../../contants";
import { downloadImage, getEdgeCoordinates } from "../../helpers";
import styles from "./Map.module.scss";
import Loader from "../Loader";
import Modal from "../Modal";
import PinpointCard from "../PinpointCard/PinpointCard";

const Map = () => {
  const [isCaptureAvailable, setIsCaptureAvailable] = useState(false);
  const [mapSnapshot, setMapSnapshot] = useState();
  const [isDataSending, setIsDataSending] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [userData, setUserData] = useState([]);
  const [activePinpointId, setActivePinpointId] = useState(null);

  const mapRef = useRef(null);
  const map = useRef(null);
  const platform = useRef(null);
  const behavior = useRef(null);
  const ui = useRef(null);
  const markers = useRef([]);

  let changeLayer = true;
  let timeoutId = null;

  const testUser = {
    id: 1213,
    latitude: 48.2589117,
    longitude: 11.6709184,
    user: { id: 1, full_name: "David Podolskiy" },

    comment: "237",
  };

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
        if (!ui.current) {
          // This checks if ui.current has not been initialized
          ui.current = H.ui.UI.createDefault(map.current, defaultLayers);
        }
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
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
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
                setUserData(data.pinpoints);
                setIsDataSending(false); // Update the UI based on the response
              })
              .catch((error) => {
                console.error("Error:", error);
                setIsDataSending(false); // Handle errors here
              });

            if (imageURL) {
              window.URL.revokeObjectURL(imageURL);
            }
          }
        }, 1000);
      });

      newMap.addEventListener("dragend", (ev) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
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
                setUserData(data.pinpoints);
                setIsDataSending(false); // Update the UI based on the response
              })
              .catch((error) => {
                console.error("Error:", error);
                setIsDataSending(false); // Handle errors here
              });

            if (imageURL) {
              window.URL.revokeObjectURL(imageURL);
            }
          }
        }, 1000); // 1  second after move
      });

      map.current = newMap;
    }
  }, []);

  useEffect(() => {
    if (map.current && userData.length > 0) {
      addMarkers(); // Ensure addMarkers is called within useEffect
    }
  }, [userData]);

  const addMarkers = () => {
    markers.current.forEach((marker) => map.current.removeObject(marker)); // Clear existing markers
    markers.current = [];

    userData.forEach((data) => {
      if (!data.latitude || !data.longitude) return; // Skip if data is incomplete

      // Create a marker at the specified location
      const marker = new H.map.Marker({
        lat: data.latitude,
        lng: data.longitude,
      });

      marker.setData(data.id);

      // Add a tap event listener to the marker to show the InfoBubble
      marker.addEventListener(
        "tap",
        function (evt) {
          let curId = evt.target.getData();
          setActivePinpointId(curId);
        },
        false
      );

      // Add the marker to the map and store it in the markers ref
      map.current.addObject(marker);
      markers.current.push(marker);
    });
  };

  useEffect(() => {
    return () => {
      if (imageURL) {
        window.URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  const captureMap = () => {
    setIsCaptureAvailable(false);
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
      <Wrapper>
        <Title>What's poppin</Title>
        <MapGrid>
          <MapFlex>
            <MapRelativeWrapper>
              {isModalOpen && (
                <Modal
                  setIsCaptureAvailable={setIsCaptureAvailable}
                  setIsModalOpen={setIsModalOpen}
                  imgSrc={imageURL || "/assets/images/modal-test.png"} // Fallback to default if imageURL not yet set
                />
              )}
              <MapItself ref={mapRef} />
            </MapRelativeWrapper>
            <Button active={isCaptureAvailable} onClick={captureMap}>
              Capture Map
            </Button>
          </MapFlex>
          <ReviewCardList>
            {userData.map((item) => (
              <PinpointCard
                key={item.id}
                id={item.id}
                user={item.user}
                initialText={item.comment}
                isActive={item.id === activePinpointId}
              />
            ))}
          </ReviewCardList>
        </MapGrid>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const MapGrid = styled.div`
  display: grid;
  column-gap: 50px;
  grid-template-columns: 512px auto;
`;

const Title = styled.p`
  font-weight: bold;
  color: #fff;
  font-size: 64px;
  text-align: center;
`;

const ReviewCardList = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-right: 20px;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #525252;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #b8b8b8;
    border-radius: 2px;
  }
`;

const MapFlex = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  position: relative;
`;

const MapItself = styled.div`
  width: 512px;
  height: 512px;
`;

const MapRelativeWrapper = styled.div`
  position: relative;
  width: 512px;
  height: 512px;
`;

export default Map;
