import requests
import json
from typing import Optional, Dict, Any


class SamuraiAuth:
    """Samurai API Authentication Client"""
    
    def __init__(self, base_url: str = "https://magenta.samurai-app.com"):
        """
        Initialize the Samurai authentication client
        
        Args:
            base_url (str): Base URL for the Samurai API
        """
        self.base_url = base_url.rstrip('/')
        self.auth_endpoint = f"{self.base_url}/v2/auth/login"
        self.session = requests.Session()
        
        # Set default headers
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    
    def login(self, username: str, password: str) -> Optional[str]:
        """
        Authenticate with username and password to get access token
        
        Args:
            username (str): Username for authentication
            password (str): Password for authentication
            
        Returns:
            Optional[str]: Access token if successful, None if failed
            
        Raises:
            requests.RequestException: If the request fails
        """
        try:
            # Prepare login payload
            payload = {
                "username": "chenbenoliel@gmail.com",
                "password": "admin0000"
            }
            
            # Make authentication request
            response = self.session.post(
                self.auth_endpoint,
                json=payload,
                timeout=30
            )
            
            # Check if request was successful
            response.raise_for_status()
            
            # Parse response
            data = response.json()
            
            # Extract token from response
            # The exact field name may vary based on API response structure
            # Common field names: 'token', 'access_token', 'accessToken', 'auth_token'
            token = None
            if 'token' in data:
                token = data['token']
            elif 'access_token' in data:
                token = data['access_token']
            elif 'accessToken' in data:
                token = data['accessToken']
            elif 'auth_token' in data:
                token = data['auth_token']
            elif 'data' in data and isinstance(data['data'], dict):
                # Check if token is nested in a 'data' field
                data_field = data['data']
                if 'token' in data_field:
                    token = data_field['token']
                elif 'access_token' in data_field:
                    token = data_field['access_token']
            
            if token:
                print(f"✅ Authentication successful! Token generated.")
                return token
            else:
                print(f"❌ Authentication failed: No token found in response")
                print(f"Response data: {json.dumps(data, indent=2)}")
                return None
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Request failed: {e}")
            return None
        except json.JSONDecodeError as e:
            print(f"❌ Failed to parse response: {e}")
            return None
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            return None
    
    def logout(self, token: str) -> bool:
        """
        Logout and invalidate the token
        
        Args:
            token (str): The access token to invalidate
            
        Returns:
            bool: True if logout successful, False otherwise
        """
        try:
            logout_endpoint = f"{self.base_url}/v2/auth/logout"
            
            # Add token to headers
            headers = {'Authorization': f'Bearer {token}'}
            
            response = self.session.post(
                logout_endpoint,
                headers=headers,
                timeout=30
            )
            
            response.raise_for_status()
            print("✅ Logout successful")
            return True
            
        except requests.exceptions.RequestException as e:
            print(f"❌ Logout failed: {e}")
            return False
        except Exception as e:
            print(f"❌ Unexpected error during logout: {e}")
            return False


def main():
    """Example usage of the SamuraiAuth class"""
    
    # Configuration
    BASE_URL = "https://magenta.samurai-app.com"
    USERNAME = "chenbenoliel@gmail.com"
    PASSWORD = "admin0000"
    
    # Create auth client
    auth_client = SamuraiAuth(BASE_URL)
    
    print("🔐 Samurai API Authentication")
    print("=" * 40)
    
    # Attempt to login
    print(f"Attempting to authenticate with username: {USERNAME}")
    token = auth_client.login(USERNAME, PASSWORD)
    
    if token:
        print(f"\n🎉 Success! Access Token:")
        print(f"Token: {token}")
        
        # Example of how to use the token
        print(f"\n📝 Usage example:")
        print(f"Authorization: Bearer {token[:20]}...")
        
        # Optional: Logout
        # auth_client.logout(token)
        
    else:
        print("\n💥 Authentication failed. Please check your credentials.")
    
    print("\n" + "=" * 40)


if __name__ == "__main__":
    main() 