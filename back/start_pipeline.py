# start_pipeline.py
import subprocess
import sys
import os

def start_pipeline_service():
    """Start the training pipeline as a background service"""
    
    # Start the main API server
    print("Starting FastAPI server...")
    api_process = subprocess.Popen([
        sys.executable, "optimised_backend_app.py"
    ])
    
    # Start the training scheduler
    print("Starting training pipeline scheduler...")
    pipeline_process = subprocess.Popen([
        sys.executable, "model_training_pipeline.py"
    ])
    
    print("✅ Both services started successfully!")
    print(f"API Process ID: {api_process.pid}")
    print(f"Pipeline Process ID: {pipeline_process.pid}")
    
    return api_process, pipeline_process

if __name__ == "__main__":
    api_proc, pipeline_proc = start_pipeline_service()
    
    try:
        # Keep running until interrupted
        api_proc.wait()
        pipeline_proc.wait()
    except KeyboardInterrupt:
        print("\n🛑 Shutting down services...")
        api_proc.terminate()
        pipeline_proc.terminate()