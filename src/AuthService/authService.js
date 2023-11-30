"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Authenticator(props) {
  const router = useRouter();
  const pathname = usePathname();
  const userData = useSelector((state) => state.user);
  const access_token = userData.access_token;
  const excludedURLs = ["/", "/login", "/forgotPassword", "/passwordReset"];
  const isExcluded = excludedURLs.includes(pathname);

  if (access_token) {
    if (!isExcluded) {
      return props.children;
    } else {
      router.push("/dashboard");
    }
  } else {
    return props.children;
  }
}
