import Converter from "../components/converter";

import { storeData } from "@/constants/storage";
import IndexTopBar from "@/components/IndexTopBar";
import ClearCache from "@/components/ClearCache";

async function clearCache() {
  storeData("selected_coins", {});
  storeData("coins", null);
}

// TODO: hacer un whatsapp://send?text?... (deeplink)

export default function Index() {
  return (
    <>
      <IndexTopBar />
      <Converter />
      <ClearCache title="Clear Cache" onPress={() => clearCache()} />
    </>
  );
}
