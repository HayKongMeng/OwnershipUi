// // pages/admin/asset/page.js
//
// import AssetListClient from "../../components/client/AssetListClient";
// import assetData from "../../utils/asset.json";
//
// export async function getServerSideProps() {
//     // Fetch data from API or database here, e.g.,:
//     // const res = await fetch("API_ENDPOINT");
//     // const data = await res.json();
//
//     return {
//         props: {
//             initialData: assetData, // Replace with actual fetched data
//         },
//     };
// }
//
// export default function CategoryListPage({ initialData }) {
//     return <AssetListClient initialData={initialData} />;
// }
// pages/admin/asset/page.js

import AssetListClient from "../../components/client/AssetListClient";
import assetData from "../../utils/asset.json"; // Directly import JSON data

export default function CategoryListPage() {
    return <AssetListClient initialData={assetData} />;
}
