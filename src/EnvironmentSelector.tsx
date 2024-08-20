import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";

interface Environment {
    name: string;
    baseUrl: string;
}

const environments: Environment[] = [
    {
        name: 'Desarrollo',
        baseUrl: 'https://uelzpay-widget-cdn-develop.vercel.app/v1.0.0/uelz-widget.js',
    },
    {
        name: 'Demo',
        baseUrl: 'https://uelzpay-widget-cdn-demo.vercel.app/v1.0.0/uelz-widget.js',
    },
    {
        name: 'Producción',
        baseUrl: 'https://uelzpay-widget-cdn.vercel.app/v1.0.0/uelz-widget.js',
    },
];

const apiUrls = [
    { name: 'Desarrollo', url: 'https://widget.develop.uelzpay.com/' },
    { name: 'Demo', url: 'https://widget.demo.uelzpay.com/' },
    { name: 'Producción', url: 'https://widget.app.uelzpay.com/' },
];

const paymentsUrls = [
    { name: 'Desarrollo', url: 'https://payments.develop.uelzpay.com' },
    { name: 'Demo', url: 'https://payments.demo.uelzpay.com' },
    { name: 'Producción', url: 'https://payments.app.uelzpay.com' },
];

const EnvironmentSelector: React.FC = () => {
    const [selectedEnvironment, setSelectedEnvironment] = useState<Environment>(environments[0]);
    const [apiKey, setApiKey] = useState<string>('');
    const [selectedApiUrl, setSelectedApiUrl] = useState<string>(apiUrls[0].url);
    const [selectedPaymentsUrl, setSelectedPaymentsUrl] = useState<string>(paymentsUrls[0].url);

    const location = useLocation();

    useEffect(() => {
        const uelzWidget = (window as any).uelzWidget;
        if (uelzWidget) {
            uelzWidget.initializeComponent();
        }
        return () => {
            if (uelzWidget) {
                uelzWidget.unloadComponent(); // Asegura que el widget se desmonte cuando el componente se desmonte o la ruta cambie
            }
        };
    }, [location.pathname]);

    const handleEnvironmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEnv = environments.find(env => env.name === event.target.value);
        if (selectedEnv) {
            setSelectedEnvironment(selectedEnv);
        }
    };

    const handleApiUrlChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedApiUrl(event.target.value);
    };

    const handlePaymentsUrlChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPaymentsUrl(event.target.value);
    };

    const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(event.target.value);
    };

    const handleButtonClick = () => {
        // Eliminar cualquier script de widget previamente cargado
        const existingScript = document.getElementById('uelz-script');
        if (existingScript) {
            const uelzWidget = (window as any).uelzWidget;
            if (uelzWidget) {
                uelzWidget.unloadComponent();
            }
            existingScript.remove();
            alert("Descargado el script del widget de la pagina.");
        }

        // Construir la URL del script con los query params
        const scriptUrl = `${selectedEnvironment.baseUrl}?uelz-api-key=${apiKey}&uelz-api-url=${selectedApiUrl}&uelz-payments-url=${selectedPaymentsUrl}`;

        // Crear y añadir el script del widget del entorno seleccionado
        const script = document.createElement('script');
        script.id = 'uelz-script';
        script.src = scriptUrl;
        script.async = true;
        script.defer = true;

        // Añadir un manejador de eventos para confirmar la carga del script
        script.onload = () => {
            console.log(`Script cargado desde ${scriptUrl}`);
        };

        script.onerror = () => {
            console.error(`Error al cargar el script desde ${scriptUrl}`);
        };

        document.body.appendChild(script);
        alert("Carga completada del nuevo script.");
    };

    return (
        <div>
            <nav>
                <Link to="/">Back to main</Link>
            </nav>
            <br/>
            <label htmlFor="environment-select">Selecciona el entorno:</label>
            <select id="environment-select" name="environment" value={selectedEnvironment.name}
                    onChange={handleEnvironmentChange}>
                {environments.map(env => (
                    <option key={env.name} value={env.name}>
                        {env.name}
                    </option>
                ))}
            </select>

            <div>
                <label htmlFor="apiKey">API Key:</label>
                <input
                    type="text"
                    id="apiKey"
                    name="apiKey"
                    value={apiKey}
                    onChange={handleApiKeyChange}
                />
            </div>

            <div>
                <label htmlFor="apiUrl">API URL:</label>
                <select id="apiUrl" name="apiUrl" value={selectedApiUrl} onChange={handleApiUrlChange}>
                    {apiUrls.map(api => (
                        <option key={api.name} value={api.url}>
                            {api.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="paymentsUrl">Payments URL:</label>
                <select id="paymentsUrl" name="paymentsUrl" value={selectedPaymentsUrl}
                        onChange={handlePaymentsUrlChange}>
                    {paymentsUrls.map(payments => (
                        <option key={payments.name} value={payments.url}>
                            {payments.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleButtonClick}>Cargar Script</button>
        </div>
    );
};

export default EnvironmentSelector;
