import { useState } from "react";

const useAccessControl = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return {
        isAdmin,
        setIsAdmin
    }
}

export default useAccessControl;