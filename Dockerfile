# 1. Start from a base image. This is the foundation.
# We use an official Python runtime as a parent image.
FROM python:3.9-slim

# 2. Set the working directory inside the container.
# All subsequent commands (COPY, RUN, etc.) will be run in this folder.
WORKDIR /app

# 3. Copy files from your local machine into the container.
# First, copy the file that lists dependencies (for better caching).
COPY requirements.txt .
# Then, install those dependencies into the container's environment.
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy the rest of your application's code.
COPY . .

# 5. Inform Docker that the container listens on a specific port at runtime.
# (Replace 8000 with the port your app uses, e.g., 5000 for Flask)
EXPOSE 8000

# 6. Define the command to run your application when the container starts.
# (Replace this with the command to start YOUR app)
# Example for a Django app: CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# Example for a simple script: CMD ["python", "./app.py"]
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "myapp.wsgi:application"]