import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { logout } from "../logout/action";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-2xl font-semibold">
        Welcome, {userName ? `${userName} 👋` : "Guest"}
      </h1>

      {user && (
        <form action={logout}>
          <Button
            type="submit"
            variant="destructive"
            className="hover:cursor-pointer"
          >
            Logout
          </Button>
        </form>
      )}
    </main>
  );
}
