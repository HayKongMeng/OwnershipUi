import CategoryShow from "./CategoryShow";
import assetData from "../../../../utils/asset.json";

export default function Page({ params }) {
  const { id } = params;
  const record = assetData?.find((item) => item.id === id);

  console.log("Record", record);
  return <CategoryShow initialRecord={record} />;
}

