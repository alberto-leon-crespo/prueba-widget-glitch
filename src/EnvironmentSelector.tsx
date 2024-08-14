import React, { useState } from 'react';
import {Link} from "react-router-dom";

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

const EnvironmentSelector: React.FC = () => {
    const [selectedEnvironment, setSelectedEnvironment] = useState<Environment>(environments[0]);
    const [apiKey, setApiKey] = useState<string>('');
    const [apiUrl, setApiUrl] = useState<string>('');
    const [paymentsUrl, setPaymentsUrl] = useState<string>('');

    const handleEnvironmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEnv = environments.find(env => env.name === event.target.value);
        if (selectedEnv) {
            setSelectedEnvironment(selectedEnv);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'apiKey') setApiKey(value);
        if (name === 'apiUrl') setApiUrl(value);
        if (name === 'paymentsUrl') setPaymentsUrl(value);
    };

    const handleButtonClick = () => {
        // Eliminar cualquier script de widget previamente cargado
        const existingScript = document.getElementById('uelz-script');
        if (existingScript) {
            existingScript.remove();
        }

        // Construir la URL del script con los query params
        const scriptUrl = `${selectedEnvironment.baseUrl}?uelz-api-key=${apiKey}&uelz-api-url=${encodeURIComponent(apiUrl)}&uelz-payments-url=${encodeURIComponent(paymentsUrl)}`;

        // Crear y añadir el script del widget del entorno seleccionado
        const script = document.createElement('script');
        script.id = 'uelz-script';
        script.src = scriptUrl;
        script.async = true;

        // Añadir un manejador de eventos para confirmar la carga del script
        script.onload = () => {
            console.log(`Script cargado desde ${scriptUrl}`);
        };

        script.onerror = () => {
            console.error(`Error al cargar el script desde ${scriptUrl}`);
        };

        document.body.appendChild(script);
    };

    return (
        <div>
            <nav>
                <Link to="/">Back to main</Link>
            </nav>
            <br />
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
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor="apiUrl">API URL:</label>
                <input
                    type="text"
                    id="apiUrl"
                    name="apiUrl"
                    value={apiUrl}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor="paymentsUrl">Payments URL:</label>
                <input
                    type="text"
                    id="paymentsUrl"
                    name="paymentsUrl"
                    value={paymentsUrl}
                    onChange={handleInputChange}
                />
            </div>

            <button onClick={handleButtonClick}>Cargar Script</button>
        </div>
    );
};

export default EnvironmentSelector;
