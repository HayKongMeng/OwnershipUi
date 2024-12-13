import assetData from "../../../../utils/asset.json";
import CategoryEdit from "../../../../components/client/UpdateAssetClient";

export default function Page({ params }) {
  const { id } = params;
  const record = assetData.find((item) => item.id === id);

  return <CategoryEdit initialRecord={record} />;
}
