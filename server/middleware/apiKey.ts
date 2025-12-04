import { Request, Response, NextFunction } from "express";

export interface ApiKeyRequest extends Request {
  apiKeyValid?: boolean;
}

export function validateApiKey(req: ApiKeyRequest, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"] as string;
  const configuredApiKey = process.env.CMS_API_KEY;

  if (!configuredApiKey) {
    console.warn('CMS_API_KEY not configured. API key validation disabled.');
    req.apiKeyValid = true;
    return next();
  }

  if (!apiKey) {
    return res.status(401).json({ 
      message: "API key required",
      error: "Missing x-api-key header" 
    });
  }

  if (apiKey !== configuredApiKey) {
    return res.status(403).json({ 
      message: "Invalid API key",
      error: "The provided API key is not valid" 
    });
  }

  req.apiKeyValid = true;
  next();
}

export function optionalApiKey(req: ApiKeyRequest, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"] as string;
  const configuredApiKey = process.env.CMS_API_KEY;

  if (!configuredApiKey || !apiKey) {
    req.apiKeyValid = false;
    return next();
  }

  req.apiKeyValid = apiKey === configuredApiKey;
  next();
}
