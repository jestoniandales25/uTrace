//   const handleSearch = async (text) => {
//     setSearchText(text);
//     setSelection({ start: text.length, end: text.length });
//     const searchQuery = text.toLowerCase();

//     if (text.trim() === "") {
//       setFilteredSuggestions([]);
//       return;
//     }

//     try {
//       const response = await fetch("http://<YOUR_BACKEND_URL>/search", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: text }),
//       });

//       const results = await response.json();

//         } catch (error) {
//       console.error("Error fetching semantic search results:", error);
//       setFilteredSuggestions([]);
//     }

//     const filteredBuildings = data.buildings
//       .filter(
//         (building) =>
//           building.building_key.toLowerCase().includes(searchQuery) ||
//           building.building_name.toLowerCase().includes(searchQuery)
//       )
//       .map((building) => ({
//         type: "building",
//         key: building.building_key,
//         name: building.building_name,
//         image: building.building_image,
//         description: building.building_description,
//         coordinates: building.coordinates,
//       }));

//     const filteredRooms = data.buildings.flatMap((building) =>
//       building.floors.flatMap((floor) =>
//         floor.rooms
//           .filter(
//             (room) =>
//               room.room_id?.toLowerCase().includes(searchQuery) ||
//               room.room_name.toLowerCase().includes(searchQuery)
//           )
//           .map((room) => ({
//             type: "room",
//             id: room.room_id,
//             name: room.room_name,
//             location: `${building.building_name} | ${ordinalSuffixOf(
//               floor.floor_number
//             )} floor`,
//             image: building.building_image,
//             room_type: room.room_type,
//             coordinates: building.coordinates,
//           }))
//       )
//     );

//     setFilteredSuggestions(
//       [...filteredBuildings, ...filteredRooms].slice(0, 7)
//     );
//   };