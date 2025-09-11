# auth.py
import hashlib

def hash_key(k: str) -> str:
    return hashlib.sha256(k.encode()).hexdigest()
