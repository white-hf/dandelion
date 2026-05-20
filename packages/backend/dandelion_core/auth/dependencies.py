from fastapi import Header, HTTPException, Depends, status
from dandelion_core.config.client_config import ClientConfig

def get_admin_key(x_admin_key: str = Header(None, alias="X-Admin-Key")):
    return x_admin_key

def verify_admin_auth(config: ClientConfig):
    def dependency(admin_key: str = Depends(get_admin_key)):
        if not config.admin_api_key:
            # If not configured, only allow in development if explicitly allowed
            # For now, if not configured, we might block for safety
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Admin API Key not configured on server."
            )
        if admin_key != config.admin_api_key:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Admin API Key"
            )
        return True
    return dependency
