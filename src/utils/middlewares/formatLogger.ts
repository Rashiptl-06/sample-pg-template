import { Response } from 'express';
import { Request } from '../../interfaces/Request';

export const formatLogger = (req: Request, _: Response, formatter: (str: string) => string) => {
  return formatter(
    `:remote-addr - ${req.id} - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"`,
  );
};
