#!/usr/bin/env python
"""
Run Django server with optimized settings for Replit.
"""
import os
import sys
from django.core.management import execute_from_command_line

# Add the current directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set default Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "eyecheck.settings")

# Run Django server
if __name__ == "__main__":
    try:
        print("Starting Django server...")
        execute_from_command_line(["manage.py", "migrate"])
        execute_from_command_line(["manage.py", "runserver", "0.0.0.0:8000"])
    except Exception as e:
        print(f"Error starting server: {e}")