import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const PageNotFound = () => {
const {setCurrentPage} = useAuth();

    useEffect(() => {
        setCurrentPage("Error");
    }, [setCurrentPage]);


  return (
    <div className="pageNotFoundDiv">
      <h1 className="pageNotFound">Page Not Found: Error 404</h1>
    </div>
  );
};

export default PageNotFound;
