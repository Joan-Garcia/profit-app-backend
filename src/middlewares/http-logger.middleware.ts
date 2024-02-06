import logger from "@common/logger";
import morgan, { StreamOptions } from "morgan";

const stream: StreamOptions = {
    write: (message) => logger.http(message)
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

/**
 * * Buold the morgan middleware
 */
const morganMiddleware = morgan(
    ":method :remote-addr :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);
  
export default morganMiddleware;