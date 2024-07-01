import winston from 'winston';
import 'winston-daily-rotate-file';
import { format } from 'date-fns';

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: 'logs/%DATE%-error.log',
            zippedArchive: true,
            format: winston.format.printf(info => 
                `${info.timestamp} [${info.level.toUpperCase()}] - ${info.message}`
            )
        })
    ]
});

if (process.env.NODE_ENV === 'development') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(info =>
                `${info.timestamp} [${info.level.toUpperCase()}] - ${info.message}`
            )
        )
    }));
}

export default logger;
