import { config } from 'dotenv';

config();
class Config {
    env(): string {
        if (process.env.NODE_ENV !== undefined) {
            if (process.env.NODE_ENV === 'dev') {
                return 'dev';
            } else if (process.env.NODE_ENV === 'production') {
                return 'prod';
            } else {
                throw new Error(
                    "Incorrect Environment Set. Please either set 'production' or 'dev'.",
                );
            }
        } else {
            throw new Error(
                "Incorrect Environment Set. Please either set 'production' or 'dev'.",
            );
        }
    }

    token(): string {
        return process.env.BOT_TOKEN;
    }

    clientId(): string {
        if (process.env.CLIENT_ID !== undefined) {
            return process.env.CLIENT_ID;
        } else {
            throw new Error(
                'You must provide a Client Id with CLIENT_ID set in .env file',
            );
        }
    }

    guild(): string {
        if (process.env.NODE_ENV !== undefined) {
            if (this.env() === 'dev') {
                return '1037908270737784872';
            } else if (this.env() === 'production') {
                return '901078003482783765';
            } else {
                throw new Error('Could not process Guild Properly');
            }
        } else {
            throw new Error(
                "Incorrect Environment Set. Please either set 'production' or 'dev'.",
            );
        }
    }
}

export default new Config();
