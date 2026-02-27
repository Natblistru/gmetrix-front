import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCurrentStudent } from "../ReduxComp/actions";

function GoogleCallback() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log(params)

    const token = params.get("token");
    const username = params.get("username");
    const role = params.get("role");
    const roleId = params.get("roleId");

    if (!token) {
      history.replace("/login");
      return;
    }

    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_log", token); // ca înainte
    localStorage.setItem("auth_name", username || "");
    localStorage.setItem("auth_role", role || "student");
    localStorage.setItem("auth_roleId", roleId || 0);

    if (role === "student" && roleId) {
      dispatch(updateCurrentStudent(Number(roleId)));
    }

    if (role === "admin") {
      history.replace("/admin/dashboard");
    } else {
      history.replace("/home"); // sau "/"
    }
  }, [history, dispatch]);

  return <div>Logging you in...</div>;
}

export default GoogleCallback;