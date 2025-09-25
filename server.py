#!/usr/bin/env python3
"""
Simple HTTP server to serve static HTML files for Suarez Professional Services website.
Configured for Replit environment with proper CORS and caching headers.
"""

import http.server
import socketserver
import os
import mimetypes
from urllib.parse import urlparse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for Replit proxy
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        # Prevent caching to ensure updates are visible immediately
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        
        super().end_headers()
    
    def do_GET(self):
        # Parse the URL path
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Handle root path - serve index.html
        if path == '/' or path == '':
            self.path = '/index.html'
        
        # Serve the file
        super().do_GET()
    
    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == "__main__":
    # Change to the directory containing the HTML files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    PORT = 5000
    HOST = "0.0.0.0"
    
    # Create server
    with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Serving Suarez Professional Services website at http://{HOST}:{PORT}")
        print("Press Ctrl+C to stop the server")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            httpd.shutdown()