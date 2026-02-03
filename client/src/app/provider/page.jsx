import { redirect } from "next/navigation";
import ProviderPortal from "../../sections/ProviderPortal.jsx";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/provider/app");
  }

  return <ProviderPortal />;
}
