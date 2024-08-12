import React, {useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

const PayButton: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        // Inicializar el widget al montar el componente
        const uelzWidget = (window as any).uelzWidget;
        if (uelzWidget && uelzWidget.init) {
            uelzWidget.init();
        }

        // Desmontar el widget cuando el componente se desmonte o la ruta cambie
        return () => {
            if (uelzWidget && uelzWidget.unload) {
                uelzWidget.unload();
            }
        };
    }, [location.pathname]);

    return (
        <div>
            <button className="uelz-button uelz-button-styles" data-service-id="clugt6j6e02k0pk01zsy80r2c">Comprar</button>
            <br/>
            <Link to="/">Counter</Link>
        </div>
    );
};

export default PayButton;
