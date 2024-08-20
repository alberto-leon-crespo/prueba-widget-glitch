import React, { useState } from 'react';

interface Environment {
    name: string;
    value: string;
}

interface UrlOption {
    name: string;
    url: string;
}

const environments: Environment[] = [
    { name: 'Desarrollo', value: 'develop' },
    { name: 'Demo', value: 'demo' },
    { name: 'Producción', value: 'prod' },
];

const apiUrls: UrlOption[] = [
    { name: 'Desarrollo', url: 'https://widget.develop.uelzpay.com/' },
    { name: 'Demo', url: 'https://widget.demo.uelzpay.com/' },
    { name: 'Producción', url: 'https://widget.app.uelzpay.com/' },
];

const paymentsUrls: UrlOption[] = [
    { name: 'Desarrollo', url: 'https://payments.develop.uelzpay.com' },
    { name: 'Demo', url: 'https://payments.demo.uelzpay.com' },
    { name: 'Producción', url: 'https://payments.app.uelzpay.com' },
];

const EnvironmentSelector: React.FC = () => {
    const [selectedEnvironment, setSelectedEnvironment] = useState<string>(() => {
        return localStorage.getItem('uelz-env') || environments[0].value;
    });
    const [selectedApiUrl, setSelectedApiUrl] = useState<string>(() => {
        return localStorage.getItem('uelz-api-url') || apiUrls[0].url;
    });
    const [selectedPaymentsUrl, setSelectedPaymentsUrl] = useState<string>(() => {
        return localStorage.getItem('uelz-payments-url') || paymentsUrls[0].url;
    });
    const [apiKey, setApiKey] = useState<string>(() => {
        return localStorage.getItem('uelz-api-key') || '';
    });

    const handleEnvironmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEnv = event.target.value;
        setSelectedEnvironment(selectedEnv);
        localStorage.setItem('uelz-env', selectedEnv);
    };

    const handleApiUrlChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUrl = event.target.value;
        setSelectedApiUrl(selectedUrl);
        localStorage.setItem('uelz-api-url', selectedUrl);
    };

    const handlePaymentsUrlChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUrl = event.target.value;
        setSelectedPaymentsUrl(selectedUrl);
        localStorage.setItem('uelz-payments-url', selectedUrl);
    };

    const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.value;
        setApiKey(key);
        localStorage.setItem('uelz-api-key', key);
    };

    const handleButtonClick = () => {
        window.location.reload(); // Recargar la página para aplicar la configuración
    };

    return (
        <div>
            <label htmlFor="environment-select">Selecciona el entorno:</label>
            <select id="environment-select" value={selectedEnvironment} onChange={handleEnvironmentChange}>
                {environments.map(env => (
                    <option key={env.value} value={env.value}>
                        {env.name}
                    </option>
                ))}
            </select>

            <div>
                <label htmlFor="apiUrl">API URL:</label>
                <select id="apiUrl" value={selectedApiUrl} onChange={handleApiUrlChange}>
                    {apiUrls.map(api => (
                        <option key={api.url} value={api.url}>
                            {api.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="paymentsUrl">Payments URL:</label>
                <select id="paymentsUrl" value={selectedPaymentsUrl} onChange={handlePaymentsUrlChange}>
                    {paymentsUrls.map(payments => (
                        <option key={payments.url} value={payments.url}>
                            {payments.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="apiKey">API Key:</label>
                <input
                    type="text"
                    id="apiKey"
                    value={apiKey}
                    onChange={handleApiKeyChange}
                />
            </div>

            <button onClick={handleButtonClick}>Guardar y Recargar</button>
        </div>
    );
};

export default EnvironmentSelector;
