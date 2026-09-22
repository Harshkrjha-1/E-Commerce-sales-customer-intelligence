"""
api/index.py
Vercel Serverless Function entrypoint for FastAPI backend application
Exposes `app` for Vercel @vercel/python builder
"""

import os
import sys

# Add project root directory to sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from backend.main import app
