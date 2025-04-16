# Use an official Nginx image as the base image
FROM nginx:alpine

# Copy the website files from your project directory into the container's web server directory
COPY . /usr/share/nginx/html

# Expose port 80 (the default HTTP port Nginx listens on)
EXPOSE 80

# The command to run when the container starts (Nginx handles this by default)
# CMD ["nginx", "-g", "daemon off;"] # This line is often implicit in the nginx base image