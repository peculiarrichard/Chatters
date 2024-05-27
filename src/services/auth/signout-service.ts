import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const signoutUser = async (router: AppRouterInstance) => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/");
    }
    return data;
  } catch (error: any) {
    console.error(error);
  }
};
