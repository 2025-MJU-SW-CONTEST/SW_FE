import {authService} from "@apis/authService.js";
import {useMutation} from "@tanstack/react-query";
import {useToast} from "@store/useToast.js";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

import useAuth from "@store/useAuth.js";

export const useRegister = () => {
  const navigate = useNavigate();
  const {t} = useTranslation(['popup'])
  const {showToast} = useToast();
  const setAuthenticated = useAuth((s) => s.setAuthenticated);

 return useMutation({
   mutationFn: ({nickname, profileUrl, tempToken}) => authService.postSignUp({nickname, profileUrl, tempToken}),
   onSuccess: (res) => {
     const token = res.headers["authorization"]
     setAuthenticated({
       token,
       user: {
         id: res.data.id ?? null,
         nickname: res.data.nickname ?? null,
         email: res.data.email ?? null,
         profileUrl: res.data.profileUrl ?? null,
       }
     })
     localStorage.setItem("isLogin", true)
     showToast(t("popup_sign_up"))
     navigate("/");
   },
   onError: (error) => {
     console.error(error.message);
   }
 })
}