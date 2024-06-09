import React from "react";
import { EPages } from "../../App";

type THeader = {
    setPageName: (name: EPages) => void;
}

const Header: React.FC<THeader> = (props : THeader) => {
    const { setPageName } = props;

    return (<>
        <button onClick={() => setPageName(EPages.graph3D)}>Graph3D</button>
        <button onClick={() => setPageName(EPages.graph2D)}>Graph2D</button>
        <button onClick={() => setPageName(EPages.calculator)}>Калькулятор</button>
        
    </>);
}

export default Header;