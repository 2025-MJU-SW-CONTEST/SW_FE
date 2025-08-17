import {authService} from "@apis/authService.js";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

import useAuth from "@store/useAuth.js";

export const useRegister = () => {
  const navigate = useNavigate();
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
     navigate("/");
   },
   onError: (error) => {
     console.error(error.message);
   }
 })
}