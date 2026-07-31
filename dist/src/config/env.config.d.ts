declare const ENV: {
    nodeEnv: string;
    db_port: string | undefined;
    port: string | number;
    db: {
        host: string | undefined;
        user: string | undefined;
        password: string | undefined;
        name: string | undefined;
        dialect: string | undefined;
    };
    jwt: {
        secret: string | undefined;
        expiresIn: string;
    };
    mail: {
        user: string | undefined;
        pass: string | undefined;
    };
    brevo: {
        user: string | undefined;
        key: string | undefined;
    };
    email: {
        host: string | undefined;
        port: string | undefined;
        user: string | undefined;
        pass: string | undefined;
    };
    baseUrl: {
        development: string | undefined;
        production: string | undefined;
    };
    openai: {
        apiKey: string | undefined;
    };
    google: {
        apiKey: string | undefined;
    };
    groq: {
        apiKey: string | undefined;
    };
    redis: {
        url: string | undefined;
        host: string | undefined;
        port: number;
        password: string | undefined;
        username: string | undefined;
    };
};
export default ENV;
//# sourceMappingURL=env.config.d.ts.map