import { redirect } from "next/navigation";
import ReviewDashboard from "@/sections/admin/ReviewDashboard";
import { createClient } from "@/lib/supabase/server";

const getUploadsWithPracticeNames = async (supabase) => {
  const { data: uploads, error } = await supabase
    .from("tax_uploads")
    .select(
      "id, user_id, filename, created_at, status, potential_savings, analyzed_at"
    )
    .order("created_at", { ascending: false });

  if (error || !uploads?.length) {
    return [];
  }

  const userIds = [...new Set(uploads.map((upload) => upload.user_id))];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, practice_name")
    .in("id", userIds);

  const practiceMap = new Map(
    (profiles || []).map((profile) => [
      profile.id,
      profile.practice_name || "Practice",
    ])
  );

  return uploads.map((upload) => ({
    ...upload,
    practice_name: practiceMap.get(upload.user_id) || "Practice",
  }));
};

const ensureAdmin = async (supabase, userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error || data?.role !== "Financial_Admin") {
    return false;
  }
  return true;
};

export default async function Page() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect("/");
  }

  const isAdmin = await ensureAdmin(supabase, authData.user.id);
  if (!isAdmin) {
    redirect("/");
  }

  const uploads = await getUploadsWithPracticeNames(supabase);

  async function analyzeUpload(uploadId, potentialSavings) {
    "use server";
    const supabaseAction = await createClient();
    const { data: auth } = await supabaseAction.auth.getUser();
    if (!auth?.user) {
      throw new Error("Not authenticated");
    }

    const isAuthorized = await ensureAdmin(supabaseAction, auth.user.id);
    if (!isAuthorized) {
      throw new Error("Forbidden");
    }

    const parsedSavings = Number(potentialSavings);
    if (!Number.isFinite(parsedSavings) || parsedSavings < 0) {
      throw new Error("Invalid savings amount");
    }

    const { error } = await supabaseAction
      .from("tax_uploads")
      .update({
        status: "analyzed",
        potential_savings: parsedSavings,
        analyzed_at: new Date().toISOString(),
        reviewer_id: auth.user.id,
      })
      .eq("id", uploadId);

    if (error) {
      throw new Error(error.message);
    }
  }

  return <ReviewDashboard uploads={uploads} onAnalyze={analyzeUpload} />;
}
