import { cookies } from "next/headers";

export async function useDarkMode() {
  const cookieStore = await cookies();
  return cookieStore.get("darkMode")?.value === "true";
}
