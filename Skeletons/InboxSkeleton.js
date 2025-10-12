// // components/skeletons/InboxSkeleton.js
// import React from "react";
// import { View } from "react-native";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";

// const InboxSkeleton = () => {
//   return (
//     <SkeletonPlaceholder>
//       <View style={{ paddingHorizontal: 16, marginVertical: 10 }}>

//         {[...Array(5)].map((_, index) => (
//           <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
//             <View style={{ width: 50, height: 50, borderRadius: 25 }} />
//             <View style={{ marginLeft: 12, flex: 1 }}>
//               <View style={{ width: "50%", height: 15, borderRadius: 4 }} />
//               <View style={{ marginTop: 6, width: "80%", height: 12, borderRadius: 4 }} />
//             </View>
//             <View style={{ marginLeft: 8 }}>
//               <View style={{ width: 40, height: 12, borderRadius: 4 }} />
//             </View>
//           </View>
//         ))}
//       </View>
//     </SkeletonPlaceholder>
//   );
// };

// export default InboxSkeleton;
