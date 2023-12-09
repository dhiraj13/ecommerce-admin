import { useState, useEffect } from "react";

import { checkPermission } from "./checkPermission";

const Permission = (props) => {
  const {
    children,
    noAccess,
    entityOwnerEmail,
    roles = [],
    type = "one-of",
    debug = false,
  } = props;

  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);
  const token = userObject ? userObject.token : "";

  const [hasAccess, setHasAccess] = useState(
    token
      ? checkPermission(token, roles, {
          type,
          entityOwnerEmail,
          debug,
        })
      : false
  );

  useEffect(() => {
    if (!token) {
      setHasAccess(false);
    } else {
      // debugger;
      const doesHaveAccess = checkPermission(token, roles, {
        type,
        entityOwnerEmail,
        debug,
      });
      setHasAccess(doesHaveAccess);
    }
  }, [token, entityOwnerEmail, roles, type]);

  const renderNoAccess = () => {
    if (typeof noAccess === "function") {
      return noAccess({
        token,
        hasAccess,
      });
    }
    return noAccess || null;
  };

  // Ensure that the component always returns a valid JSX element or null
  return hasAccess ? children : renderNoAccess() || null;
};

export default Permission;
